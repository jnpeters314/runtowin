'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowUp, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const STARTERS = [
  "We're 45 days out and fundraising has stalled. What should I do?",
  "Write me a fundraising email for end of quarter.",
  "I haven't posted in two weeks. What should I say?",
  "My opponent just attacked me on social media. How do I respond?",
  "What should I be doing every day in the final 30 days?",
  "How do I convert my social media followers into donors?",
]

const MAX_LENGTH = 2000

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [inputError, setInputError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function validateInput(text: string): string {
    if (text.length > MAX_LENGTH) return `Please keep messages under ${MAX_LENGTH} characters.`
    if (text.includes('```')) return 'Code blocks are not supported. Please describe your question in plain text.'
    return ''
  }

  async function send(text: string) {
    if (!text.trim() || streaming) return

    const error = validateInput(text)
    if (error) { setInputError(error); return }
    setInputError('')

    const userMessage: Message = { role: 'user', content: text.trim() }
    const next = [...messages, userMessage]
    setMessages(next)
    setInput('')
    setStreaming(true)

    const assistantMessage: Message = { role: 'assistant', content: '' }
    setMessages([...next, assistantMessage])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      // API-level rejection (blocked content, length, etc.)
      if (!res.ok) {
        const { error } = await res.json()
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: error ?? 'Something went wrong. Please try again.',
          }
          return updated
        })
        return
      }

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: accumulated }
          return updated
        })
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        }
        return updated
      })
    } finally {
      setStreaming(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value
    setInput(val)
    if (inputError) setInputError(validateInput(val))
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setInputError('File and image uploads are not supported. Please type your question.')
  }

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const items = e.clipboardData.items
    for (const item of items) {
      if (item.kind === 'file') {
        e.preventDefault()
        setInputError('File and image uploads are not supported. Please type your question.')
        return
      }
    }
  }

  const empty = messages.length === 0
  const charsLeft = MAX_LENGTH - input.length
  const nearLimit = charsLeft < 200

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="bg-navy-900 text-white px-4 sm:px-6 py-5 border-b border-navy-800">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-400">Live</span>
          </div>
          <h1 className="text-xl font-bold">Campaign Coach</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Ask anything about running for office — fundraising, messaging, voter contact, or strategy.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {empty ? (
            <div className="py-8">
              <p className="text-slate-500 text-sm mb-5 text-center">Try one of these, or ask your own:</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-blue-600 hover:text-blue-700 transition-colors leading-snug"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}>
                <div
                  className={cn(
                    'w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold',
                    msg.role === 'user' ? 'bg-slate-400' : 'bg-blue-600'
                  )}
                >
                  {msg.role === 'user' ? 'U' : 'C'}
                </div>
                <div
                  className={cn(
                    'max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed prose-chat',
                    msg.role === 'user'
                      ? 'bg-navy-900 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                  )}
                >
                  {msg.content || (
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <Loader2 size={14} className="animate-spin" /> Thinking...
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          {inputError && (
            <p className="text-xs text-red-500 mb-2 px-1">{inputError}</p>
          )}
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onPaste={handlePaste}
              placeholder="Ask about fundraising, messaging, voter contact, strategy..."
              rows={1}
              maxLength={MAX_LENGTH}
              className={cn(
                'flex-1 resize-none border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 max-h-40 leading-relaxed',
                inputError
                  ? 'border-red-300 focus:ring-red-400'
                  : 'border-slate-200 focus:ring-blue-600'
              )}
              style={{ height: 'auto' }}
              onInput={(e) => {
                const el = e.currentTarget
                el.style.height = 'auto'
                el.style.height = `${el.scrollHeight}px`
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || streaming}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
            >
              {streaming ? (
                <Loader2 size={16} className="text-slate-400 animate-spin" />
              ) : (
                <ArrowUp size={16} className="text-white" />
              )}
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-slate-400">
              Campaign-related questions only. Verify legal and compliance details with a professional.
            </p>
            {nearLimit && (
              <p className={cn('text-xs shrink-0 ml-3', charsLeft < 50 ? 'text-red-500' : 'text-slate-400')}>
                {charsLeft} left
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messageCountRef = useRef(0)
  const isAtBottomRef = useRef(true)

  // Track whether user has scrolled away from bottom
  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    isAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120
  }, [])

  // Scroll to bottom on new messages; follow stream only if already at bottom
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const countIncreased = messages.length > messageCountRef.current
    messageCountRef.current = messages.length
    if (countIncreased || isAtBottomRef.current) {
      el.scrollTop = el.scrollHeight
    }
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
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }
    setStreaming(true)
    isAtBottomRef.current = true

    setMessages([...next, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      if (!res.ok) {
        const { error: apiError } = await res.json()
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: apiError ?? 'Something went wrong. Please try again.',
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

  function handleInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setInputError('File and image uploads are not supported. Please type your question.')
  }

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    for (const item of e.clipboardData.items) {
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
    // Fixed container: sits below the sticky nav, fills the rest of the viewport.
    // Using fixed positioning takes this out of document flow so the layout footer
    // doesn't add extra scroll height.
    <div className="fixed inset-x-0 top-16 bottom-0 flex flex-col bg-white">

      {/* Header */}
      <div className="shrink-0 border-b border-slate-100 px-4 sm:px-6 py-4 bg-white">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-black tracking-wide">RTW</span>
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-sm leading-none">Campaign Coach</h1>
            <p className="text-xs text-slate-400 mt-0.5">Ask anything about fundraising, messaging, voter contact, or strategy.</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-400">Live</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          {empty ? (
            <div className="pt-6 pb-4">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-lg font-black">RTW</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Campaign Coach</h2>
                <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                  Your AI-powered strategist for down-ballot campaigns. Ask about fundraising, voter contact, messaging, or anything else on your plate.
                </p>
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">Try asking</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left px-4 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl text-sm text-slate-700 hover:text-blue-700 transition-colors leading-snug"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg, i) => (
                <div key={i} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-white text-[9px] font-black">RTW</span>
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed prose-chat',
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-sm'
                        : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                    )}
                  >
                    {msg.content || (
                      <span className="inline-flex items-center gap-1.5 text-slate-400">
                        <Loader2 size={13} className="animate-spin" /> Thinking…
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="h-2" />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-slate-100 bg-white px-4 sm:px-6 py-3">
        <div className="max-w-2xl mx-auto">
          {inputError && (
            <p className="text-xs text-red-500 mb-2 px-1">{inputError}</p>
          )}
          <div className={cn(
            'flex items-end gap-2 rounded-2xl border bg-slate-50 px-3 py-2 transition-colors focus-within:bg-white',
            inputError ? 'border-red-300 focus-within:border-red-400' : 'border-slate-200 focus-within:border-blue-300'
          )}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onPaste={handlePaste}
              placeholder="Ask your Campaign Coach anything…"
              rows={1}
              maxLength={MAX_LENGTH}
              className="flex-1 resize-none bg-transparent py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none leading-relaxed"
              style={{ maxHeight: '160px' }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || streaming}
              className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0 mb-0.5"
            >
              {streaming
                ? <Loader2 size={14} className="text-slate-400 animate-spin" />
                : <ArrowUp size={14} className="text-white" />
              }
            </button>
          </div>
          <div className="flex justify-between items-center mt-1.5 px-1">
            <p className="text-[11px] text-slate-400">
              Campaign questions only · Verify legal/compliance details with a professional
            </p>
            {nearLimit && (
              <p className={cn('text-[11px] shrink-0 ml-3', charsLeft < 50 ? 'text-red-500' : 'text-slate-400')}>
                {charsLeft} left
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

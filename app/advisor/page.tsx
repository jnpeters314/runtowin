'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowUp, Loader2, ChevronDown, ChevronUp, Settings2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type RaceContext = {
  office: string
  state: string
  district: string
  electionDate: string
  party: string
  isIncumbent: string
}

const EMPTY_CONTEXT: RaceContext = {
  office: '',
  state: '',
  district: '',
  electionDate: '',
  party: '',
  isIncumbent: '',
}

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming','Washington D.C.',
]

const STARTERS = [
  "We're 45 days out and fundraising has stalled. What should I do?",
  "Write me a fundraising email for end of quarter.",
  "I haven't posted in two weeks. What should I say?",
  "My opponent just attacked me on social media. How do I respond?",
  "What should I be doing every day in the final 30 days?",
  "How do I convert my social media followers into donors?",
]

const MAX_LENGTH = 2000

function raceContextSummary(ctx: RaceContext): string {
  const parts: string[] = []
  if (ctx.office) parts.push(ctx.office)
  if (ctx.state) parts.push(ctx.state)
  if (ctx.district) parts.push(ctx.district)
  if (ctx.party) parts.push(ctx.party)
  if (ctx.isIncumbent === 'yes') parts.push('Incumbent')
  else if (ctx.isIncumbent === 'no') parts.push('Challenger')
  return parts.join(' · ')
}

function hasRaceContext(ctx: RaceContext): boolean {
  return Object.values(ctx).some((v) => v !== '')
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamingStatus, setStreamingStatus] = useState('Thinking…')
  const [inputError, setInputError] = useState('')
  const [raceContext, setRaceContext] = useState<RaceContext>(EMPTY_CONTEXT)
  const [showContextForm, setShowContextForm] = useState(false)
  const [contextSaved, setContextSaved] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messageCountRef = useRef(0)
  const isAtBottomRef = useRef(true)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    isAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120
  }, [])

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
    if (inputRef.current) inputRef.current.style.height = 'auto'
    setStreaming(true)
    setStreamingStatus('Thinking…')
    isAtBottomRef.current = true

    setMessages([...next, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next,
          raceContext: hasRaceContext(raceContext) ? raceContext : undefined,
        }),
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
      const STATUS_RE = /%%STATUS:([^%]+)%%\n?/g

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })

        // Extract and strip status signals; update loading label
        let match
        STATUS_RE.lastIndex = 0
        while ((match = STATUS_RE.exec(chunk)) !== null) {
          setStreamingStatus(match[1])
        }
        const content = chunk.replace(STATUS_RE, '')
        if (content) {
          accumulated += content
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { role: 'assistant', content: accumulated }
            return updated
          })
        }
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
    const el = e.target
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

  function saveContext() {
    setShowContextForm(false)
    setContextSaved(true)
    setTimeout(() => setContextSaved(false), 2000)
  }

  function clearContext() {
    setRaceContext(EMPTY_CONTEXT)
    setShowContextForm(false)
  }

  const empty = messages.length === 0
  const charsLeft = MAX_LENGTH - input.length
  const nearLimit = charsLeft < 200
  const summary = raceContextSummary(raceContext)

  return (
    <div className="fixed inset-x-0 top-16 bottom-0 flex flex-col bg-white">

      {/* Header */}
      <div className="shrink-0 border-b border-slate-100 px-4 sm:px-6 py-3 bg-white">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-black tracking-wide">RTW</span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-bold text-slate-900 text-sm leading-none">Campaign Coach</h1>
            {summary ? (
              <p className="text-xs text-blue-600 mt-0.5 truncate">{summary}</p>
            ) : (
              <p className="text-xs text-slate-400 mt-0.5">Ask anything about fundraising, messaging, voter contact, or strategy.</p>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowContextForm((v) => !v)}
              className={cn(
                'flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors',
                showContextForm
                  ? 'bg-blue-50 text-blue-700'
                  : summary
                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              )}
            >
              <Settings2 size={13} />
              <span className="hidden sm:inline">
                {summary ? 'Edit race' : 'Set race'}
              </span>
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-400">Live</span>
            </div>
          </div>
        </div>

        {/* Race context form */}
        {showContextForm && (
          <div className="max-w-2xl mx-auto mt-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-500 mb-3">Your race — the more you fill in, the more tailored the advice</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Office seeking</label>
                <input
                  type="text"
                  placeholder="e.g. City Council"
                  value={raceContext.office}
                  onChange={(e) => setRaceContext((c) => ({ ...c, office: e.target.value }))}
                  className="w-full text-sm px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">State</label>
                <select
                  value={raceContext.state}
                  onChange={(e) => setRaceContext((c) => ({ ...c, state: e.target.value }))}
                  className="w-full text-sm px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-300"
                >
                  <option value="">Select…</option>
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">District / ward</label>
                <input
                  type="text"
                  placeholder="e.g. District 4"
                  value={raceContext.district}
                  onChange={(e) => setRaceContext((c) => ({ ...c, district: e.target.value }))}
                  className="w-full text-sm px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Election date</label>
                <input
                  type="date"
                  value={raceContext.electionDate}
                  onChange={(e) => setRaceContext((c) => ({ ...c, electionDate: e.target.value }))}
                  className="w-full text-sm px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Party</label>
                <select
                  value={raceContext.party}
                  onChange={(e) => setRaceContext((c) => ({ ...c, party: e.target.value }))}
                  className="w-full text-sm px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-300"
                >
                  <option value="">Select…</option>
                  <option>Democrat</option>
                  <option>Republican</option>
                  <option>Independent</option>
                  <option>Green</option>
                  <option>Libertarian</option>
                  <option>Other / Non-partisan</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Incumbent?</label>
                <select
                  value={raceContext.isIncumbent}
                  onChange={(e) => setRaceContext((c) => ({ ...c, isIncumbent: e.target.value }))}
                  className="w-full text-sm px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-300"
                >
                  <option value="">Select…</option>
                  <option value="yes">Yes, I'm the incumbent</option>
                  <option value="no">No, I'm the challenger</option>
                  <option value="open">Open seat</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <button onClick={clearContext} className="text-xs text-slate-400 hover:text-slate-600">
                Clear
              </button>
              <button
                onClick={saveContext}
                className="text-xs font-semibold px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {contextSaved ? 'Saved ✓' : 'Save'}
              </button>
            </div>
          </div>
        )}
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
                {!summary && (
                  <button
                    onClick={() => setShowContextForm(true)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    <Settings2 size={12} /> Set your race for tailored advice
                  </button>
                )}
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
                      'max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-sm'
                        : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                    )}
                  >
                    {msg.role === 'user' ? (
                      msg.content
                    ) : msg.content ? (
                      <div className="prose-chat">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h2: ({ children }) => <h2 className="text-sm font-bold text-slate-900 mt-4 mb-1.5 first:mt-0">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-semibold text-slate-800 mt-3 mb-1 first:mt-0">{children}</h3>,
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-outside pl-4 mb-2 space-y-0.5">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-outside pl-4 mb-2 space-y-0.5">{children}</ol>,
                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                            a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{children}</a>,
                            hr: () => <hr className="border-slate-300 my-3" />,
                            blockquote: ({ children }) => <blockquote className="border-l-2 border-slate-300 pl-3 italic text-slate-600">{children}</blockquote>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-slate-400">
                        <Loader2 size={13} className="animate-spin" />
                        {i === messages.length - 1 && streaming ? streamingStatus : 'Thinking…'}
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

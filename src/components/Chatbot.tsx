import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm here to help. What's the biggest challenge your business is facing right now?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getChatResponse = async (userMessage: string, history: Message[]): Promise<string> => {
    const conversationCount = Math.floor(history.filter(m => m.role === 'user').length / 2)
    
    // System context about Australian Bill Cutters
    const context = `You are a helpful assistant for Australian Bill Cutters, a specialist business advisory firm in Australia with 31+ years experience. 

Services: Business Restructuring, Cashflow & Debt Management, Voluntary Administration, Capital Raising, Tax Debt Solutions, Small Business Restructure.

Key points:
- Qualified accountants (CA, CPA, IPA)
- 500+ businesses helped
- Confidential consultations
- Work with existing accountants/lawyers
- Australia-wide service

Your role: Ask thoughtful questions about their business challenges, show empathy, provide brief relevant insights. After ${conversationCount >= 2 ? 'THIS response' : '2-3 exchanges'}, suggest booking a free consultation.

Keep responses under 400 characters. Sound human and warm, not corporate. ${conversationCount >= 2 ? 'End this response by suggesting: "Would you like to schedule a free confidential consultation? I can help you book a time."' : ''}`

    try {
      // Call your API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: context },
            ...history,
            { role: 'user', content: userMessage }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('API call failed')
      }

      const data = await response.json()
      return data.response
    } catch (error) {
      // Fallback responses for demo/development
      console.error('Chat API error:', error)
      return getFallbackResponse(userMessage, conversationCount)
    }
  }

  const getFallbackResponse = (userMessage: string, count: number): string => {
    const lower = userMessage.toLowerCase()
    
    if (count >= 2) {
      return "I can see this is important to you. Let's get you connected with one of our specialists. Would you like to schedule a free confidential consultation? Click the button below to book a time that works for you."
    }

    // Context-aware responses
    if (lower.includes('debt') || lower.includes('owe')) {
      return "Debt challenges are stressful. We help businesses negotiate with creditors and create sustainable payment plans. What's your current situation with creditors?"
    }
    
    if (lower.includes('cashflow') || lower.includes('cash flow')) {
      return "Cashflow issues affect even well-managed businesses. We've helped 500+ companies stabilize their finances. Are you facing immediate pressure or planning ahead?"
    }
    
    if (lower.includes('tax') || lower.includes('ato')) {
      return "Tax debt can escalate quickly. We negotiate with the ATO and create workable arrangements. How long has this been building?"
    }
    
    if (lower.includes('restructur')) {
      return "Business restructuring can give you a fresh start. We protect assets while optimizing operations. What areas of your business need the most attention?"
    }

    if (lower.includes('help') || lower.includes('consult')) {
      return "We offer free confidential consultations to review your situation and explore options. No pressure, no obligation. What's the main challenge you're facing?"
    }

    // Generic empathetic response
    return "That sounds challenging. With 31+ years experience, we've seen situations like yours before and found solutions. What outcome would be most valuable for you right now?"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await getChatResponse(userMessage, [...messages, { role: 'user', content: userMessage }])
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setMessageCount(prev => prev + 1)
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize for the technical issue. Please use the contact form or call us at (07) 3421 9655 for immediate assistance." 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleBooking = () => {
    setIsOpen(false)
    navigate('/booking')
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all hover:scale-110 flex items-center justify-center z-50 group"
          aria-label="Open chat"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {messageCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              {messageCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Australian Bill Cutters</h3>
                <p className="text-xs text-white/80">Business Advisory</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl px-4 py-2 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Booking CTA */}
          {messageCount >= 2 && (
            <div className="px-4 py-2 bg-primary-50 border-t border-primary-100">
              <button
                onClick={handleBooking}
                className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                📅 Schedule Free Consultation
              </button>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

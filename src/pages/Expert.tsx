import { useState, useEffect, useRef } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface QuestionFlow {
  id: string
  question: string
  type: 'text' | 'choice'
  choices?: string[]
  nextQuestion?: string
}

export default function Expert() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const [currentStep, setCurrentStep] = useState<string>('greeting')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    hasABN: '',
    monthlyBill: '',
    currentProvider: '',
    postcode: '',
    day: '',
    time: '',
    phone: ''
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasInitialized = useRef(false)

  const conversationFlow: Record<string, QuestionFlow> = {
    greeting: {
      id: 'greeting',
      question: "Hey! How are you?",
      type: 'text',
      nextQuestion: 'intro'
    },
    intro: {
      id: 'intro',
      question: "Great! So you're looking to cut your energy bills?",
      type: 'text',
      nextQuestion: 'has_abn'
    },
    has_abn: {
      id: 'has_abn',
      question: "Quick question - do you have an ABN?",
      type: 'choice',
      choices: ['Yes', 'No', 'Not sure'],
      nextQuestion: 'monthly_bill'
    },
    monthly_bill: {
      id: 'monthly_bill',
      question: "How much do you pay each month for energy? Just a rough figure is fine.",
      type: 'text',
      nextQuestion: 'current_provider'
    },
    current_provider: {
      id: 'current_provider',
      question: "Who's your current energy provider?",
      type: 'text',
      nextQuestion: 'postcode'
    },
    postcode: {
      id: 'postcode',
      question: "So I can get a more accurate comparison, what's your postcode?",
      type: 'text',
      nextQuestion: 'get_name'
    },
    get_name: {
      id: 'get_name',
      question: "Perfect. What's your name by the way?",
      type: 'text',
      nextQuestion: 'transition'
    },
    transition: {
      id: 'transition',
      question: "Thanks {name}. For confidential reasons I can't give you details over chat. When would be best to call you so we can go through the comparison?",
      type: 'text',
      nextQuestion: 'phone'
    },
    phone: {
      id: 'phone',
      question: "Great. What's your best number?",
      type: 'text',
      nextQuestion: 'confirmation'
    },
    confirmation: {
      id: 'confirmation',
      question: "Perfect {name}, I'll give you a call {day}. We'll go through your comparison and see how much we can save you. Any other questions?",
      type: 'text',
      nextQuestion: 'end'
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    // Show connecting indicator, then start conversation
    if (!hasInitialized.current) {
      hasInitialized.current = true
      setTimeout(() => {
        setIsConnecting(false)
        sendBotMessage(conversationFlow.greeting.question)
      }, 2000)
    }
  }, [])

  const calculateTypingDelay = (text: string): number => {
    const baseDelay = text.length * 50
    const thinkingTime = Math.random() * 1000 + 500
    const variance = Math.random() * 500
    return Math.min(baseDelay + thinkingTime + variance, 6000)
  }

  const sendBotMessage = async (text: string) => {
    setIsTyping(true)
    
    const delay = calculateTypingDelay(text)
    
    await new Promise(resolve => setTimeout(resolve, delay))
    
    setIsTyping(false)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: text,
      timestamp: new Date()
    }])
  }

  const processAnswer = (answer: string) => {
    const step = conversationFlow[currentStep]
    let nextStep = step.nextQuestion || 'end'
    
    const newUserData = { ...userData }
    
    switch (currentStep) {
      case 'greeting':
        break
      case 'intro':
        break
      case 'has_abn':
        newUserData.hasABN = answer
        break
      case 'monthly_bill':
        newUserData.monthlyBill = answer
        break
      case 'current_provider':
        newUserData.currentProvider = answer
        break
      case 'postcode':
        newUserData.postcode = answer
        break
      case 'get_name':
        newUserData.name = answer
        break
      case 'transition':
        newUserData.day = answer
        newUserData.time = answer
        break
      case 'phone':
        newUserData.phone = answer
        break
      case 'confirmation':
        if (answer.toLowerCase().includes('no') || answer.toLowerCase().includes('all good') || answer.toLowerCase().includes('nope')) {
          sendBotMessage("Awesome. Talk soon!")
          nextStep = 'end'
        } else {
          sendBotMessage("Sure, what would you like to know?")
          return
        }
        break
    }
    
    setUserData(newUserData)
    
    if (nextStep === 'end') {
      return
    }
    
    setCurrentStep(nextStep)
    
    let nextQuestion = conversationFlow[nextStep].question
    
    nextQuestion = nextQuestion
      .replace('{name}', newUserData.name)
      .replace('{day}', newUserData.day)
      .replace('{time}', newUserData.time)
    
    setTimeout(() => {
      sendBotMessage(nextQuestion)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping || isSubmitting) return

    const userMessage = input.trim()
    setInput('')
    setIsSubmitting(true)
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }])

    processAnswer(userMessage)
    
    setTimeout(() => {
      setIsSubmitting(false)
    }, 500)
  }

  const handleChoiceClick = (choice: string) => {
    if (isTyping || isSubmitting) return
    
    setIsSubmitting(true)
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: choice,
      timestamp: new Date()
    }])

    processAnswer(choice)
    
    setTimeout(() => {
      setIsSubmitting(false)
    }, 500)
  }

  const currentQuestion = conversationFlow[currentStep]
  const showChoices = currentQuestion?.type === 'choice' && !isTyping && !isConnecting

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Header - Logo only */}
      <header className="p-4 border-b border-gray-200" style={{ backgroundColor: '#12332A' }}>
        <div className="max-w-md mx-auto">
          <img 
            src="/logo.webp" 
            alt="Bill Cutters" 
            className="h-8 w-auto"
          />
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 overflow-hidden flex flex-col max-w-md mx-auto w-full">
        {/* Expert Profile */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/tim.png" 
                alt="Tim - Energy Expert"
                className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Tim</h2>
              <p className="text-sm text-gray-600">Energy Specialist</p>
              {isTyping && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                  typing...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-green-50">
          {/* Connecting Indicator */}
          {isConnecting && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Connecting you with an expert</span>
                </div>
              </div>
            </div>
          )}
          
          {!isConnecting && messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <img 
                  src="/tim.png" 
                  alt="Tim"
                  className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                />
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-green-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                }`}
              >
                <p className="text-[15px] leading-relaxed">{msg.content}</p>
                <p className={`text-[11px] mt-1 ${msg.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <img 
                src="/tim.png" 
                alt="Tim"
                className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
              />
              <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
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

        {/* Quick Reply Choices */}
        {showChoices && currentQuestion.choices && (
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {currentQuestion.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoiceClick(choice)}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors border border-green-200"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-[15px]"
              disabled={isTyping || isSubmitting || isConnecting}
            />
            <button
              type="submit"
              disabled={isTyping || isSubmitting || isConnecting || !input.trim()}
              className="w-12 h-12 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>

        {/* Energy Providers Footer */}
        <div className="border-t border-gray-200 py-3 px-4" style={{ backgroundColor: '#f4f4f3' }}>
          <p className="text-xs text-gray-500 text-center mb-3">We compare plans from leading providers</p>
          <div className="grid grid-cols-3 gap-3 items-center justify-items-center">
            <img src="/1st-energy.webp" alt="1st Energy" className="h-8 w-auto object-contain" />
            <img src="/shell.webp" alt="Shell Energy" className="h-8 w-auto object-contain" />
            <img src="/energy-locals.webp" alt="Energy Locals" className="h-8 w-auto object-contain" />
            <img src="/agl.webp" alt="AGL" className="h-8 w-auto object-contain" />
            <img src="/origin.webp" alt="Origin" className="h-8 w-auto object-contain" />
            <img src="/superloop.webp" alt="Superloop" className="h-8 w-auto object-contain" />
          </div>
        </div>
      </main>
    </div>
  )
}

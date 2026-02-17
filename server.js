import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.log('No OpenAI API key - using fallback responses')
      return res.json({
        response: getFallbackResponse(messages)
      })
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Fast and cost-effective
        messages: messages,
        max_tokens: 150, // Keep responses concise
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    const assistantMessage = data.choices[0].message.content

    // Ensure response is under 400 characters
    const truncatedMessage = assistantMessage.length > 400 
      ? assistantMessage.substring(0, 397) + '...' 
      : assistantMessage

    res.json({
      response: truncatedMessage
    })

  } catch (error) {
    console.error('Chat API error:', error)
    res.json({
      response: getFallbackResponse(req.body.messages)
    })
  }
})

// Fallback responses when API isn't available
function getFallbackResponse(messages) {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content?.toLowerCase() || ''
  const userMessageCount = messages.filter(m => m.role === 'user').length
  
  if (userMessageCount >= 3) {
    return "I can see this is important. Let's connect you with our specialists. Click below to book a free confidential consultation at a time that works for you."
  }

  if (lastUserMessage.includes('debt') || lastUserMessage.includes('owe')) {
    return "Debt pressure is tough. We negotiate with creditors daily and create sustainable payment plans. What's your biggest concern right now?"
  }
  
  if (lastUserMessage.includes('cashflow') || lastUserMessage.includes('cash')) {
    return "Cashflow challenges affect even well-managed businesses. We've helped 500+ companies stabilize finances. Is this an immediate issue or are you planning ahead?"
  }
  
  if (lastUserMessage.includes('tax') || lastUserMessage.includes('ato')) {
    return "Tax debt can escalate fast. We work with the ATO to negotiate workable arrangements. How long has this been building?"
  }
  
  if (lastUserMessage.includes('help') || lastUserMessage.includes('consult')) {
    return "We offer free, no-obligation consultations. What's the main challenge you're facing? I'm here to help."
  }

  return "I understand. With 31+ years helping businesses through challenges like yours, we've developed proven solutions. What's your biggest concern right now?"
}

app.listen(PORT, () => {
  console.log(`Chat API server running on http://localhost:${PORT}`)
  console.log(`OpenAI integration: ${process.env.OPENAI_API_KEY ? 'ENABLED' : 'DISABLED (using fallback responses)'}`)
})

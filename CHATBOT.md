# Chatbot Feature Documentation

## Overview
The website now includes an AI-powered chatbot that:
- Appears in the bottom right corner
- Engages visitors in conversational dialogue
- Answers questions about services and industry
- Guides users to book a consultation after 2-3 exchanges
- Keeps responses under 400 characters

## Components

### Chatbot (`src/components/Chatbot.tsx`)
- Floating chat button with notification badge
- Conversational interface with message history
- Connects to OpenAI API (with smart fallbacks)
- Automatically suggests booking after user engagement
- Routes to `/booking` page when ready

### Booking Page (`src/pages/Booking.tsx`)
- Three-step booking flow:
  1. User details and challenge description
  2. Date and time selection
  3. Confirmation
- 14-day calendar with business hours
- Mobile-responsive design
- Validation and error handling

### API Server (`server.js`)
- Express server running on port 3001
- OpenAI GPT-4o-mini integration
- 400 character response limit
- Intelligent fallback responses if API unavailable
- Context-aware about Avante Partners services

## Setup

### Development
Both frontend and API server run concurrently:

```bash
npm run dev
```

This starts:
- Vite dev server on `http://localhost:5173`
- API server on `http://localhost:3001`

### OpenAI API Key (Optional)
The chatbot works with or without an OpenAI API key:

**With API key:** Full AI capabilities
**Without API key:** Smart fallback responses

To enable OpenAI:
1. Copy `.env.example` to `.env`
2. Add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Restart dev server

Get API key: https://platform.openai.com/api-keys

### Cost Considerations
- Model: `gpt-4o-mini` (most cost-effective)
- Max tokens: 150 per response
- Estimated cost: ~$0.001 per conversation
- Very affordable for production use

## Features

### Conversational Intelligence
The chatbot:
- Understands business advisory context
- Recognizes keywords (debt, cashflow, tax, restructuring)
- Provides empathetic, human-like responses
- Asks follow-up questions
- Guides naturally to booking

### Smart Fallbacks
If OpenAI API is unavailable, the chatbot uses:
- Context-aware pre-written responses
- Keyword detection for relevant replies
- Always maintains professional, helpful tone
- Never reveals it's using fallbacks

### Booking Integration
After 2-3 messages:
- Shows "Schedule Free Consultation" button
- Routes to dedicated booking page
- Preserves conversation context
- Mobile-friendly calendar interface

## Customization

### Adjust Response Style
Edit system prompt in `Chatbot.tsx` (line ~40):
```typescript
const context = `You are a helpful assistant for Avante Partners...`
```

### Change Conversation Count
Modify when booking appears (currently 2 messages):
```typescript
{messageCount >= 2 && (
  <div className="px-4 py-2">
    <button onClick={handleBooking}>
      Schedule Free Consultation
    </button>
  </div>
)}
```

### Update Fallback Responses
Edit `getFallbackResponse()` in both:
- `src/components/Chatbot.tsx`
- `server.js`

### Modify Character Limit
Current: 400 characters (adjust in `server.js` line ~50)

## Deployment

### Option 1: Serverless Function (Recommended)
Deploy API as serverless function:
- **Vercel:** Add `api/chat.js` function
- **Netlify:** Add `.netlify/functions/chat.js`
- **AWS Lambda:** Deploy as Lambda function

Update `Chatbot.tsx` fetch URL to your function endpoint.

### Option 2: Separate API Server
Deploy Express server separately:
- Deploy to Railway, Render, or Heroku
- Update Vite proxy config with production API URL
- Set OPENAI_API_KEY environment variable

### Option 3: No Backend (Fallback Only)
Remove API dependency:
- Use only `getFallbackResponse()` in `Chatbot.tsx`
- Remove server.js and API calls
- Still provides good user experience

## Environment Variables

### Development (.env)
```bash
OPENAI_API_KEY=sk-your-key-here
```

### Production
Set in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Others: Check hosting docs

## Testing

### Manual Testing
1. Open chatbot
2. Ask about services:
   - "I'm struggling with debt"
   - "Need help with cashflow"
   - "Tax issues with ATO"
3. Verify responses are relevant
4. Check booking CTA appears after 2-3 exchanges
5. Test booking flow completion

### API Testing
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant"},
      {"role": "user", "content": "I need help with business debt"}
    ]
  }'
```

## Troubleshooting

### Chatbot not appearing
- Check if `<Chatbot />` is in `App.tsx`
- Verify React Router is set up
- Check browser console for errors

### API errors
- Verify server is running on port 3001
- Check OpenAI API key is valid
- Review server logs for errors
- Test fallback responses work

### Styling issues
- Run `npm run build` to test production
- Check Tailwind classes are compiling
- Verify mobile responsiveness

### Booking page not loading
- Check React Router route is defined
- Verify `/booking` path in navigation
- Test direct navigation to `/booking`

## Future Enhancements

### Potential Additions
- [ ] Email capture before chat
- [ ] Chat transcript export
- [ ] Multi-language support
- [ ] Analytics tracking (conversation metrics)
- [ ] Integration with CRM
- [ ] Voice input/output
- [ ] Sentiment analysis
- [ ] Lead scoring
- [ ] Follow-up email automation

### Advanced Features
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Video call link generation
- [ ] SMS reminder before consultation
- [ ] Post-consultation feedback
- [ ] Case study recommendations

## Analytics Suggestions

Track these metrics:
- Chat open rate
- Average messages per conversation
- Booking conversion rate
- Most common questions/keywords
- Drop-off points
- Time to booking

Use Google Analytics events or custom tracking.

## Best Practices

### Response Quality
- Keep under 400 characters
- Use plain language
- Show empathy
- Ask clarifying questions
- Be specific about services

### Conversation Flow
1. Greet warmly
2. Ask about their challenge
3. Provide relevant insight
4. Ask follow-up question
5. Suggest booking (after 2-3 exchanges)

### Privacy & Compliance
- Mention confidentiality
- Don't collect sensitive data in chat
- Privacy policy link in booking
- GDPR compliance if applicable

---

**Status:** Production-ready  
**Last Updated:** February 12, 2026  
**Tested:** ✅ Local, ✅ Desktop, ✅ Mobile

# Bill Cutters SOHO - Energy Expert Chat

## Project Overview

A mobile-first conversational platform for qualifying energy comparison leads among residential business owners (SOHO - Small Office Home Office).

**Created:** February 17, 2026  
**Based on:** Avante Partners expert chat template  
**Target:** Residential customers with ABN looking to switch energy providers

## Live URL

**Tunnel:** https://nest-enterprises-cite-ent.trycloudflare.com/expert

## Target Audience

**SOHO (Small Office Home Office):**
- Home-based businesses
- Sole traders
- Freelancers with ABN
- Small business owners with residential energy accounts

## Qualification Flow

### 1. Connecting (2 seconds)
Shows "Connecting you with an expert" animation

### 2. Casual Greeting
**Expert:** "Hey! How are you?"  
*User responds*

### 3. Introduction
**Expert:** "Great! So you're looking to cut your energy bills?"  
*User responds*

### 4. ABN Verification
**Expert:** "Quick question - do you have an ABN?"  
**Quick Replies:** Yes / No / Not sure

### 5. Monthly Bill
**Expert:** "How much do you pay each month for energy? Just a rough figure is fine."  
*User types amount*

### 6. Current Provider
**Expert:** "Who's your current energy provider?"  
*User types provider name*

### 7. Postcode
**Expert:** "So I can get a more accurate comparison, what's your postcode?"  
*User types postcode*

### 8. Name Collection
**Expert:** "Perfect. What's your name by the way?"  
*User types name*

### 9. Transition to Call
**Expert:** "Thanks {name}. For confidential reasons I can't give you details over chat. When would be best to call you so we can go through the comparison?"  
*User types preferred time*

### 10. Phone Number
**Expert:** "Great. What's your best number?"  
*User types phone*

### 11. Confirmation
**Expert:** "Perfect {name}, I'll give you a call {day}. We'll go through your comparison and see how much we can save you. Any other questions?"  
*If no → "Awesome. Talk soon!"*

## Data Collected

```json
{
  "name": "John Smith",
  "hasABN": "Yes",
  "monthlyBill": "$400",
  "currentProvider": "AGL",
  "postcode": "2000",
  "day": "Tomorrow afternoon",
  "phone": "0412 345 678"
}
```

## Technical Features

### Human-Like Conversation
- **Realistic Typing Delays** - Variable based on message length (~50ms per char)
- **Typing Indicator** - Animated dots with "typing..." status
- **Natural Pacing** - 500-1500ms thinking time between messages
- **Connecting Animation** - 2-second intro before expert appears

### Mobile-First Design
- Large touch targets
- Easy one-handed use
- Minimal navigation (logo only)
- Focus on conversation
- Green color scheme (energy theme)

### Quick Reply Buttons
- For ABN question
- Easy tap selection
- Disappear after choice

## Brand Design

### Colors
- **Primary Green:** #16a34a (energy, savings theme)
- **Light Green Background:** Soft gradient
- **White Messages:** Expert responses
- **Green Messages:** User responses

### Avatar
- "BC" initials in green gradient circle
- Green online status indicator
- Professional but approachable

### Typography
- Clean, readable fonts
- 15px message text
- Timestamps on all messages

## Tech Stack

- React 18 + TypeScript
- Vite dev/build
- Tailwind CSS (green theme)
- Express API backend
- Concurrently for multi-server dev

## Project Location

`/Users/dynamiccode/clawd/bill-cutters-soho/`

## Key Files

```
src/
├── pages/
│   └── Expert.tsx          # Main energy expert chat
├── App.tsx                 # Router with /expert route
└── index.css              # Tailwind + green theme

tailwind.config.js         # Green primary colors
package.json              # Dependencies
server.js                 # Chat API (optional)
```

## Conversion Strategy

### Lead Qualification
1. **Verify ABN** - Ensure target audience
2. **Assess Bill Size** - Qualify savings potential
3. **Capture Provider** - Competition intelligence
4. **Get Postcode** - Regional pricing data
5. **Book Call** - Move to phone close

### Why Phone Transition?
- "For confidential reasons" (builds trust)
- "Go through the comparison" (value promise)
- Natural conversation flow
- Higher conversion on phone

## Integration Points

### CRM/Backend
Send collected data after phone capture:
```javascript
POST /api/leads
{
  "name": "John Smith",
  "hasABN": "Yes",
  "monthlyBill": "$400",
  "currentProvider": "AGL",
  "postcode": "2000",
  "callTime": "Tomorrow afternoon",
  "phone": "0412345678",
  "source": "expert_chat",
  "timestamp": "2026-02-17T09:50:00Z"
}
```

### Analytics
Track:
- Completion rate by step
- ABN vs non-ABN split
- Average bill amount
- Top providers
- Postcode distribution
- Time to qualification

### Automation
- SMS confirmation: "Thanks {name}, we'll call you {day}"
- Calendar reminder for sales team
- Lead scoring based on bill amount
- Auto-assign to regional rep by postcode

## Marketing Use Cases

### Direct Response Ads
**Facebook/Instagram:**
> "Aussie business owners: Cut your energy bills by up to 40%. Free comparison, 2 minutes. [Chat Now]"

**Google Ads:**
> "SOHO Energy Comparison | Free Quote | Bill Cutters"

**Landing Page:**
> /expert (this chat interface)

### SMS Campaigns
> "Hi [Name], noticed your business has high energy costs? Free comparison, no obligation. Chat here: [link]/expert"

### Email Campaigns
> "Business owners: Your energy bill is probably too high. Let's fix that. [Start Chat]"

## Advantages Over Forms

✅ **Higher Completion** - Conversational vs boring form  
✅ **Lower Friction** - One question at a time  
✅ **Human Feel** - Typing delays, natural flow  
✅ **Mobile Optimized** - Chat interface familiar  
✅ **Better Qualification** - Can ask follow-ups  
✅ **Trust Building** - Feels like talking to expert  

## Next Steps (Production)

### Essential
1. **Backend API** - Save lead data to database
2. **CRM Integration** - Push to HubSpot/Salesforce
3. **SMS Confirmation** - Twilio/SMS API
4. **Analytics** - Google Analytics + custom events
5. **Lead Routing** - Assign to sales team by postcode

### Recommended
1. **A/B Testing** - Test different question orders
2. **Energy Provider Database** - Autocomplete suggestions
3. **Bill Upload** - Photo of current bill for accuracy
4. **Savings Calculator** - Show estimated savings
5. **Calendar Integration** - Direct booking slot selection

### Advanced
1. **Live Handoff** - Transfer to human if needed
2. **Voice Option** - Voice input for mobile
3. **Multi-language** - Support other languages
4. **Regional Variants** - Different flows by state
5. **Referral Tracking** - Track referral sources

## Performance Metrics

### Target KPIs
- **Completion Rate:** >60%
- **ABN Qualification:** >70% yes
- **Phone Capture:** >80% after qualification
- **Average Time:** <3 minutes
- **Mobile Usage:** >85%

### Current Status
✅ Production-ready code  
✅ Mobile-optimized UI  
✅ Human-like conversation  
✅ Data collection ready  
⚠️ Backend integration needed  
⚠️ Analytics setup needed  

## Deployment

### Quick Deploy (Netlify)
```bash
cd /Users/dynamiccode/clawd/bill-cutters-soho
npm run build
# Drag dist/ folder to app.netlify.com/drop
```

### Environment Variables
```bash
OPENAI_API_KEY=sk-...  # Optional for enhanced chat
```

### Custom Domain
Point DNS to hosting:
- billcutters.com.au/expert
- soho.billcutters.com.au
- compare.billcutters.com.au

## Testing

### Manual Test Flow
1. Open /expert on mobile
2. Wait for connecting animation
3. Start conversation
4. Test all questions
5. Verify quick reply buttons work
6. Complete to phone capture
7. Check data collection

### Edge Cases
- ✅ Double-tap prevention
- ✅ Typing indicator timing
- ✅ Message ordering
- ✅ Input disabled during typing
- ✅ Smooth scrolling
- ✅ Timestamp accuracy

## Support & Maintenance

### Common Issues
**Q: Messages duplicating?**  
A: isSubmitting flag prevents this (500ms cooldown)

**Q: Slow typing?**  
A: Adjust calculateTypingDelay() multiplier (currently 50ms/char)

**Q: Colors wrong?**  
A: Check tailwind.config.js primary color palette

### Updates
To change questions: Edit `conversationFlow` in Expert.tsx  
To change branding: Update tailwind.config.js colors  
To change expert name: Update profile card in Expert.tsx  

---

**Status:** Production-ready  
**Last Updated:** February 17, 2026  
**Version:** 1.0  
**License:** Proprietary - Bill Cutters

# Bill Cutters SOHO - Energy Expert Chat

Mobile-first energy comparison platform for residential business owners (SOHO - Small Office Home Office).

## Features

- **Conversational Energy Expert** - AI-powered chat that qualifies energy comparison leads
- **Mobile-First Design** - Optimized for phone interactions
- **Human-Like Experience** - Realistic typing delays and natural conversation flow
- **Quick Qualification** - 5-6 questions to gather essential comparison data
- **Phone Call Transition** - Seamlessly moves qualified leads to phone consultation

## Target Audience

Residential customers with an ABN (Australian Business Number):
- Home-based businesses
- Small Office Home Office (SOHO)
- Sole traders
- Freelancers with business registration

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Express API for chat backend
- Modern ES6+ JavaScript

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

This starts both:
- Vite dev server at `http://localhost:5173`
- API server at `http://localhost:3001` (for chatbot)

### Expert Page
The main conversion page is at `/expert` - this is where energy comparison leads land.

## Qualification Flow

The Energy Expert asks:

1. **Greeting** - "Hey! How are you?"
2. **Intro** - "Great! So you're looking to cut your energy bills?"
3. **ABN Check** - "Quick question - do you have an ABN?"
4. **Monthly Bill** - "How much do you pay each month for energy?"
5. **Current Provider** - "Who's your current energy provider?"
6. **Postcode** - "So I can get a more accurate comparison, what's your postcode?"
7. **Name** - "Perfect. What's your name by the way?"
8. **Phone Call Booking** - "For confidential reasons I can't give you details over chat. When would be best to call you?"
9. **Phone Number** - "Great. What's your best number?"

## Data Collected

By end of conversation:
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

## Design

### Brand Colors
- Primary: Green (#16a34a)
- Accent: Light green
- Background: Soft green gradient

### Mobile-First
- Large touch targets
- Easy one-handed use
- Minimal navigation
- Focus on conversation

## Deployment

### Build for Production
```bash
npm run build
```

Output will be in the `dist/` directory.

### Hosting Options
- Netlify (recommended)
- Vercel
- AWS S3 + CloudFront
- Traditional web hosting

See DEPLOYMENT.md for detailed instructions.

## Project Structure

```
src/
├── pages/
│   ├── Expert.tsx        # Main energy expert chat page
│   ├── Home.tsx          # Landing page (if needed)
│   └── Booking.tsx       # Booking page (if needed)
├── components/
│   ├── Navigation.tsx
│   ├── Chatbot.tsx
│   └── Footer.tsx
├── App.tsx               # Main app component
└── index.css            # Tailwind imports

server.js                 # Express API for chat
```

## Customization

### Update Questions
Edit the `conversationFlow` object in `src/pages/Expert.tsx`

### Change Colors
Edit `tailwind.config.js` primary color palette

### Adjust Typing Speed
Modify `calculateTypingDelay()` in `Expert.tsx`

## Integration

### CRM Integration
Send collected data to your CRM:
- POST to backend API after phone collection
- Integrate with HubSpot, Salesforce, etc.
- Trigger notifications to sales team

### Analytics
Track:
- Conversation completion rate
- Drop-off points
- Average time to qualification
- ABN vs non-ABN split

## License

Proprietary - Bill Cutters SOHO

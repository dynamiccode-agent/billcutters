# Bill Cutters SOHO - Deployment Information

## ✅ Deployment Complete

**Date:** February 17, 2026  
**Status:** Live and Production-Ready

---

## 🌐 Production URLs

### Primary Domain
**https://bill-cutters-soho.vercel.app**

### Expert Chat Page
**https://bill-cutters-soho.vercel.app/expert**

---

## 📦 GitHub Repository

**Repository:** https://github.com/dynamiccode-agent/billcutters

### Branches
- `main` - Production branch (auto-deploys to Vercel)

### Recent Commits
- Initial commit - Bill Cutters SOHO energy comparison chat
- Fix TypeScript errors and add Vercel config

---

## 🚀 Vercel Project

**Project Name:** bill-cutters-soho  
**Organization:** dynamic-code-agents-projects

### Deployment Settings
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Auto-Deploy
✅ Enabled - Pushes to `main` branch trigger automatic deployments

---

## 🔧 Environment Variables

### Required (Currently Using Fallbacks)
- `OPENAI_API_KEY` - Optional, chatbot uses intelligent fallback responses without it

### To Add OpenAI API Key
```bash
# Via Vercel CLI
cd /Users/dynamiccode/clawd/bill-cutters-soho
vercel env add OPENAI_API_KEY production
# Paste your API key when prompted

# Or via Vercel Dashboard
# 1. Go to https://vercel.com/dynamic-code-agents-projects/bill-cutters-soho/settings/environment-variables
# 2. Add OPENAI_API_KEY
# 3. Redeploy
```

### Get OpenAI API Key
https://platform.openai.com/api-keys

---

## 📊 What's Deployed

### Pages
- `/` - Home page (if needed)
- `/expert` - **Main conversion page** (Tim's energy expert chat)
- `/booking` - Booking page (if used)

### Features
- ✅ Conversational energy expert (Tim)
- ✅ Mobile-first responsive design
- ✅ Qualification flow (ABN, bill, provider, postcode)
- ✅ Phone call transition
- ✅ Energy provider logos footer
- ✅ Dark green header with Bill Cutters logo
- ✅ Realistic typing delays
- ✅ Quick reply buttons

### Assets
- Tim's photo
- Bill Cutters logo
- Energy provider logos (1st Energy, Shell, Energy Locals, AGL, Origin, Superloop)

---

## 🔄 Making Updates

### Update Content
1. Edit files locally in `/Users/dynamiccode/clawd/bill-cutters-soho`
2. Test locally: `npm run dev`
3. Commit changes: `git add . && git commit -m "Your message"`
4. Push to GitHub: `git push`
5. Vercel auto-deploys within 1-2 minutes

### Manual Deploy
```bash
cd /Users/dynamiccode/clawd/bill-cutters-soho
vercel --prod
```

### Rollback
Via Vercel Dashboard → Deployments → Select previous deployment → Promote to Production

---

## 📱 Testing

### Production Test
1. Open https://bill-cutters-soho.vercel.app/expert
2. Test on mobile (works best)
3. Complete full conversation flow
4. Verify data collection points

### Test Checklist
- [ ] "Connecting" animation shows (2 seconds)
- [ ] Tim appears with greeting
- [ ] Quick reply buttons work (ABN question)
- [ ] All questions flow correctly
- [ ] Phone call transition smooth
- [ ] Footer logos display
- [ ] Dark green header visible
- [ ] Mobile responsive
- [ ] Desktop works too

---

## 🎯 Marketing Use

### Direct Response Campaigns
Point traffic to: **https://bill-cutters-soho.vercel.app/expert**

### Platforms
- Facebook/Instagram Ads
- Google Ads
- SMS campaigns
- Email campaigns
- QR codes on print materials

### Tracking
Add UTM parameters:
```
https://bill-cutters-soho.vercel.app/expert?utm_source=facebook&utm_campaign=energy-soho
```

---

## 🔐 Access & Credentials

### Vercel Account
- Organization: dynamic-code-agents-projects
- Access via: GitHub authentication

### GitHub Repository
- Owner: dynamiccode-agent
- Repository: billcutters
- Public repository

---

## 📈 Next Steps (Optional Enhancements)

### Immediate
1. Add OpenAI API key for enhanced chat responses
2. Set up analytics (Google Analytics, Plausible, etc.)
3. Configure custom domain (if desired)

### Short-term
1. Backend API for lead capture
2. CRM integration (HubSpot, Salesforce)
3. SMS confirmation system
4. Email notifications

### Medium-term
1. A/B testing different question flows
2. Lead scoring algorithm
3. Automated follow-up sequences
4. Calendar integration

---

## 🐛 Troubleshooting

### Site Not Loading
- Check Vercel status: https://www.vercel-status.com
- View deployment logs in Vercel dashboard
- Check recent commits for errors

### Chatbot Not Working
- Fallback responses should always work
- If OpenAI integration needed, add API key
- Check browser console for errors

### Build Failures
- Ensure no TypeScript errors locally
- Run `npm run build` locally first
- Check Vercel build logs

---

## 📞 Support

### Vercel Support
- Dashboard: https://vercel.com/support
- Docs: https://vercel.com/docs

### Project Location
- Local: `/Users/dynamiccode/clawd/bill-cutters-soho`
- GitHub: https://github.com/dynamiccode-agent/billcutters
- Production: https://bill-cutters-soho.vercel.app

---

**Status:** ✅ Live and ready for traffic  
**Last Updated:** February 17, 2026  
**Deployed By:** Atlas (Dynamic Code AI Agent)

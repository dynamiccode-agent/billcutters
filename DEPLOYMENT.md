# Deployment Guide - Australian Bill Cutters Website

## Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify Drop:**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist/` folder onto the page
   - Done! You'll get a live URL instantly

3. **Or connect Git repo:**
   - Push code to GitHub/GitLab
   - Connect repo in Netlify
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Auto-deploys on push

4. **Custom domain:**
   - In Netlify: Domain settings → Add custom domain
   - Point `avantepartners.com.au` DNS to Netlify

---

### Option 2: Vercel

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel` in project directory
   - Follow prompts

3. **Or use Vercel Dashboard:**
   - Import Git repository
   - Auto-detects Vite settings
   - Deploy automatically

---

### Option 3: Traditional Web Hosting (cPanel, etc.)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload:**
   - Connect via FTP/SFTP or File Manager
   - Upload all contents of `dist/` folder to `public_html/` or web root
   - Ensure `.htaccess` rules for SPA routing:
   
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

### Option 4: AWS S3 + CloudFront

1. **Build:**
   ```bash
   npm run build
   ```

2. **S3 Setup:**
   - Create S3 bucket
   - Enable static website hosting
   - Upload `dist/` contents
   - Set bucket policy for public read

3. **CloudFront:**
   - Create CloudFront distribution
   - Origin: Your S3 bucket
   - Default root object: `index.html`
   - Error pages: 404 → `/index.html` (for SPA routing)

4. **DNS:**
   - Point domain to CloudFront distribution

---

## Post-Deployment Checklist

### Essential
- [ ] Test all pages and sections load correctly
- [ ] Verify mobile responsiveness
- [ ] Test contact form (if backend connected)
- [ ] Check all CTAs and navigation links work
- [ ] Verify smooth scroll navigation functions
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)

### Recommended
- [ ] Add Google Analytics or analytics platform
- [ ] Set up Google Search Console
- [ ] Submit sitemap (once generated)
- [ ] Test page load speed (PageSpeed Insights)
- [ ] Add SSL certificate (auto with Netlify/Vercel)
- [ ] Set up custom domain
- [ ] Configure DNS properly
- [ ] Test email routing for contact form

### SEO Setup
- [ ] Add meta descriptions to index.html
- [ ] Add Open Graph tags for social sharing
- [ ] Generate and submit XML sitemap
- [ ] Set up robots.txt
- [ ] Verify structured data markup
- [ ] Set up Google Business Profile link

---

## Contact Form Backend Options

The contact form currently uses a simple alert. Choose one of these backends:

### Option 1: Formspree (Easiest)
```tsx
// In Contact.tsx, update form tag:
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  {/* Add name attributes to inputs */}
</form>
```

### Option 2: Netlify Forms (If using Netlify)
```tsx
// Add to form tag:
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  {/* rest of form */}
</form>
```

### Option 3: Custom Backend
- Create API endpoint (Node.js, Python, PHP)
- Update `handleSubmit` in Contact.tsx to POST to your API
- Handle email sending server-side

### Option 4: EmailJS (No backend needed)
```bash
npm install @emailjs/browser
```

Update Contact.tsx to use EmailJS SDK.

---

## Environment Variables (If Needed)

Create `.env` file for any API keys:

```env
VITE_ANALYTICS_ID=UA-XXXXXXXXX-X
VITE_FORM_BACKEND_URL=https://your-api.com
```

Access in code: `import.meta.env.VITE_ANALYTICS_ID`

**Important:** Never commit `.env` to Git. Add to `.gitignore`.

---

## Domain & DNS Configuration

### DNS Records to Set:

**For Netlify:**
```
A Record: @ → 75.2.60.5
CNAME: www → your-site.netlify.app
```

**For Vercel:**
```
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com
```

**For CloudFront:**
```
A Record: @ → CloudFront IP
CNAME: www → d111111abcdef8.cloudfront.net
```

### Email Setup
If using contact@avantepartners.com.au:
- Set up email with domain provider
- Add MX records for email service
- Test email delivery

---

## Performance Optimization (Optional)

Already optimized with Vite, but for further improvements:

1. **Image Optimization:**
   - Convert images to WebP format
   - Use responsive images with `srcset`
   - Lazy load images below fold

2. **Code Splitting:**
   - Vite already does this
   - Consider dynamic imports for large components

3. **CDN:**
   - Netlify/Vercel include CDN
   - For custom hosting, consider Cloudflare

4. **Caching:**
   - Set proper cache headers
   - Netlify/Vercel handle automatically

---

## Monitoring & Maintenance

### Analytics Setup
```html
<!-- Add to index.html <head> -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking
Consider adding:
- Sentry for error monitoring
- LogRocket for session replay
- Hotjar for user behavior analytics

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- Netlify/Vercel include basic monitoring

---

## Support & Updates

### Making Content Changes
1. Edit component files in `src/components/`
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Deploy updated `dist/` folder

### Adding New Sections
1. Create new component in `src/components/`
2. Import in `App.tsx`
3. Add to navigation if needed
4. Test and deploy

### Troubleshooting
- **404 on refresh:** Check SPA routing rules (see Option 3 above)
- **Styles not loading:** Clear browser cache, check build output
- **Form not working:** Verify backend connection/configuration
- **Slow loading:** Check image sizes, enable CDN

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clean build (if needed)
rm -rf dist node_modules
npm install
npm run build
```

---

## Go Live Checklist

Before announcing the new site:

- [ ] All content reviewed and approved
- [ ] Contact form tested and working
- [ ] Analytics installed and tracking
- [ ] Custom domain configured and working
- [ ] SSL certificate active (HTTPS)
- [ ] All links tested
- [ ] Mobile experience verified
- [ ] Cross-browser tested
- [ ] Load speed optimized
- [ ] SEO basics in place
- [ ] Social sharing tested (OG tags)
- [ ] Old site redirect configured (if replacing existing)
- [ ] Team trained on how to make updates

---

**Need help?** Reference the main README.md and PROJECT_SUMMARY.md files.

**Ready to deploy:** Pick Option 1 (Netlify) for fastest deployment.

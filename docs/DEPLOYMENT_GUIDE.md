# Deployment Guide for Cursor AI

## Overview

Complete deployment strategy for All That Magazine covering WordPress backend (Hostinger), Next.js frontend (Vercel), DNS configuration, environment variables, and launch procedures.

---

## Architecture Overview

```
User Request
    ↓
DNS (allthatmagazine.com)
    ↓
Vercel CDN (Global Edge Network)
    ↓
Next.js App (SSG/ISR Pages)
    ↓
GraphQL API (wp.allthatmagazine.com/graphql)
    ↓
WordPress (Hostinger)
    ↓
MySQL Database
```

---

## Phase 1: WordPress Backend Deployment

### Already Complete (via Hostinger Setup)

```
✅ WordPress installed at wp.allthatmagazine.com
✅ SSL certificate active (HTTPS)
✅ DNS configured
✅ Basic security (Hostinger default)
```

### Additional Configuration Required

#### 1. WordPress Performance Optimization

**Install W3 Total Cache:**
```
Plugins → Add New → Search "W3 Total Cache"
→ Install → Activate

Settings:
- Page Cache: Enable (Disk: Enhanced)
- Minify: Enable (Auto mode)
- Database Cache: Enable
- Object Cache: Enable (if Redis available)
- Browser Cache: Enable
- CDN: Skip for now (Vercel handles this)
```

**Image Optimization:**
```
Plugin: Smush (free)
Settings:
- Compress images: On
- Auto-compress on upload: On
- WebP conversion: On (if server supports)
- Lazy load: Off (Next.js handles this)
```

#### 2. Security Hardening

**Wordfence Configuration:**
```
Wordfence → Scan → Start New Scan

Settings to Enable:
- Firewall: Extended Protection
- Login Security: Enable 2FA for admin
- Rate Limiting: Block after 5 failed logins
- Email Alerts: On for admin login, plugin updates
```

**wp-config.php Security:**
```php
// Add to wp-config.php

// Disable file editing
define('DISALLOW_FILE_EDIT', true);

// Force SSL for admin
define('FORCE_SSL_ADMIN', true);

// Security keys (already set by Hostinger)
// Don't modify these

// Disable XML-RPC if not needed
add_filter('xmlrpc_enabled', '__return_false');
```

**Change Database Prefix:**
```
Current: wp_
Recommended: wp_atm_ or random prefix

Use plugin: "Change DB Prefix" or manual via phpMyAdmin
```

#### 3. CORS Headers for GraphQL

**Add to .htaccess (if needed):**
```apache
# Enable CORS for GraphQL endpoint
<IfModule mod_headers.c>
    SetEnvIf Origin "^https://allthatmagazine\.com$" ORIGIN_DOMAIN=$0
    Header set Access-Control-Allow-Origin "%{ORIGIN_DOMAIN}e" env=ORIGIN_DOMAIN
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

**Or via WordPress (recommended):**
```php
// functions.php or custom plugin

add_action('graphql_init', function() {
    // Allow requests from your Next.js domain
    $allowed_origins = [
        'https://allthatmagazine.com',
        'https://www.allthatmagazine.com',
        'http://localhost:3000', // Development
    ];
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");
    }
});
```

#### 4. Backup Configuration

**UpdraftPlus (Recommended Free Plugin):**
```
Settings:
- Schedule: Daily (retain 7 days)
- Include: Files + Database
- Remote Storage: Google Drive or Dropbox
- Email notifications: On
```

**Manual Backup via Hostinger:**
```
Hostinger hPanel → Backups
- Create backup before any major changes
- Download to local computer
- Keep at least 3 backup versions
```

---

## Phase 2: Next.js Deployment to Vercel

### Prerequisites

```
□ GitHub account created
□ Next.js project in GitHub repository
□ Vercel account created (free tier)
□ WordPress GraphQL endpoint accessible
```

### Step 1: Prepare Next.js for Production

**Environment Variables (.env.production):**
```bash
# GraphQL Endpoint
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql

# Site URL
NEXT_PUBLIC_SITE_URL=https://allthatmagazine.com

# Revalidation Secret (generate random string)
REVALIDATE_SECRET=your-very-long-random-secret-key-here

# Analytics (if applicable)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Generate Revalidation Secret:**
```bash
# On Mac/Linux
openssl rand -hex 32

# Or use online generator
# https://www.random.org/strings/
```

**next.config.mjs Production Settings:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.allthatmagazine.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Optimize CSS
  experimental: {
    optimizeCss: true,
  },
  
  // Production source maps (optional, for debugging)
  productionBrowserSourceMaps: false,
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Step 2: Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit - All That Magazine"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/all-that-magazine.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

**Via Vercel Dashboard:**
```
1. Go to vercel.com
2. Click "Add New Project"
3. Import Git Repository → Select your GitHub repo
4. Configure:
   
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   
5. Environment Variables:
   Add all variables from .env.production
   
6. Click "Deploy"
```

**Deployment completes in 2-5 minutes**

**Vercel URL:** `https://all-that-magazine-frontend.vercel.app`

### Step 4: Test Deployment

```
□ Visit Vercel URL
□ Check homepage loads
□ Click through to articles
□ Verify images load from WordPress
□ Check mobile responsiveness
□ Test navigation
□ Verify GraphQL connection working
```

---

## Phase 3: Domain Configuration

### DNS Setup for allthatmagazine.com

**Current State:**
```
Domain registered: Yes
DNS pointed to: Hostinger (WordPress subdomain)
```

**Target State:**
```
allthatmagazine.com → Vercel (Next.js frontend)
www.allthatmagazine.com → Vercel (redirect to apex)
wp.allthatmagazine.com → Hostinger (WordPress backend)
```

### Step 1: Add Domain to Vercel

```
Vercel Dashboard → Your Project → Settings → Domains

Add Domain:
1. allthatmagazine.com (primary)
2. www.allthatmagazine.com (redirect to apex)

Vercel will provide DNS records to add:
- A record: 76.76.21.21
- CNAME record: cname.vercel-dns.com
```

### Step 2: Update DNS Records

**At Domain Registrar (or Hostinger DNS):**

```
DNS Records to Add/Update:

Type  | Name  | Value                  | TTL
------|-------|------------------------|------
A     | @     | 76.76.21.21           | 3600
CNAME | www   | cname.vercel-dns.com  | 3600
CNAME | wp    | (keep existing)        | 3600

Remove or Update:
- Any A records pointing to Hostinger IP (except wp subdomain)
- Any CNAME for @ (root) if exists
```

**Verification:**
```bash
# Wait 5-60 minutes for DNS propagation
# Then test:

dig allthatmagazine.com
dig www.allthatmagazine.com
dig wp.allthatmagazine.com

# All should resolve correctly
```

### Step 3: SSL Certificate (Automatic)

```
Vercel automatically provisions SSL certificates
Wait 15-30 minutes after DNS propagation

Verify:
- https://allthatmagazine.com (should work)
- https://www.allthatmagazine.com (should redirect to apex)
- https://wp.allthatmagazine.com (should show WordPress admin)
```

---

## Phase 4: Production Optimization

### Next.js Performance

**Verify Core Web Vitals:**
```
PageSpeed Insights: https://pagespeed.web.dev/
Test URL: https://allthatmagazine.com

Target Scores:
- Mobile: 85+
- Desktop: 95+

Key Metrics:
- LCP (Largest Contentful Paint): < 2.5s
- FID/INP (Interaction): < 200ms
- CLS (Cumulative Layout Shift): < 0.1
```

**If scores are low:**
```
1. Check image optimization:
   - All images using next/image?
   - WebP format?
   - Proper sizes attribute?

2. Check font loading:
   - next/font/google configured?
   - display: swap set?

3. Check JavaScript bundle:
   - Run: npm run build
   - Check .next/analyze/
   - Remove unused dependencies
```

### Caching Strategy

**Vercel Edge Caching:**
```javascript
// app/page.tsx (example)
export const revalidate = 60; // ISR: 60 seconds

// For static pages that rarely change:
export const revalidate = 3600; // 1 hour

// For frequently updated content:
export const revalidate = 30; // 30 seconds
```

**WordPress Object Caching (if traffic grows):**
```
1. Install Redis Object Cache plugin
2. Configure in wp-config.php:
   define('WP_CACHE', true);
   define('WP_REDIS_HOST', 'localhost');
3. Enable in plugin settings
```

### CDN Configuration

```
Vercel automatically provides:
✅ Global CDN (edge locations worldwide)
✅ Automatic image optimization
✅ Compression (Brotli + Gzip)
✅ HTTP/2 + HTTP/3

No additional configuration needed!
```

---

## Phase 5: Monitoring & Analytics

### Vercel Analytics

**Enable Built-in Analytics:**
```
Vercel Dashboard → Project → Analytics

Provides:
- Page views
- Unique visitors
- Top pages
- Referrers
- Devices
- Countries
- Core Web Vitals (Real User Monitoring)

Cost: Included in Hobby plan (10k page views/month)
```

### Google Analytics 4

**Add to Next.js:**

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Environment Variable:**
```bash
# .env.production
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Add to Vercel:**
```
Project Settings → Environment Variables
→ Add NEXT_PUBLIC_GA_ID
```

### Uptime Monitoring

**UptimeRobot (Free):**
```
https://uptimerobot.com

Add 3 monitors:
1. https://allthatmagazine.com (Next.js frontend)
2. https://wp.allthatmagazine.com (WordPress backend)
3. https://wp.allthatmagazine.com/graphql (GraphQL API)

Alert via email when down > 5 minutes
```

### Error Tracking (Optional)

**Sentry (Free tier: 5k errors/month):**
```bash
npm install @sentry/nextjs

npx @sentry/wizard@latest -i nextjs
```

---

## Phase 6: Launch Checklist

### Pre-Launch Testing

```
□ Homepage loads without errors
□ All 3 verticals display articles
□ Single article pages render correctly
□ Images load from WordPress
□ Mobile responsive (test on real devices)
□ Navigation works
□ Links don't 404
□ SEO meta tags present
□ Open Graph images display
□ Favicon shows
□ SSL certificate valid (no warnings)
□ Form submissions work (if applicable)
□ Search functionality works (if implemented)
□ Loading states display
□ Error pages (404, 500) look good
```

### SEO Configuration

**WordPress (Rank Math):**
```
□ Site title and description set
□ Default Open Graph image
□ XML sitemap generated: wp.allthatmagazine.com/sitemap.xml
□ Robots.txt configured
□ Remove "discourage search engines" (Settings → Reading)
```

**Next.js (Metadata):**
```
□ Root metadata in app/layout.tsx
□ Dynamic metadata in article pages
□ Sitemap generated: allthatmagazine.com/sitemap.xml
□ Robots.txt: allthatmagazine.com/robots.txt
```

**Sitemap Generation (Next.js):**
```typescript
// app/sitemap.ts
import { fetchGraphQL } from '@/lib/wordpress';
import { GET_ARTICLE_SLUGS } from '@/lib/queries';

export default async function sitemap() {
  const data = await fetchGraphQL(GET_ARTICLE_SLUGS);
  
  const articles = data.articles.edges.map(({ node }) => ({
    url: `https://allthatmagazine.com/${node.verticals.nodes[0].slug}/${node.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: 'https://allthatmagazine.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://allthatmagazine.com/wellness',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // ... other pages
  ];

  return [...staticPages, ...articles];
}
```

### Google Search Console

```
1. Add property: allthatmagazine.com
2. Verify ownership (DNS TXT record or HTML file)
3. Submit sitemap: https://allthatmagazine.com/sitemap.xml
4. Request indexing for key pages
5. Monitor for errors
```

### Performance Verification

```
□ PageSpeed Insights: 85+ mobile, 95+ desktop
□ WebPageTest: All A's
□ Core Web Vitals passing
□ Images under 200KB each
□ Total page size under 2MB
□ First Contentful Paint under 1.5s
□ Time to Interactive under 3s
```

### Security Check

```
□ SSL certificate valid (A+ rating on ssllabs.com)
□ Security headers present (securityheaders.com)
□ No mixed content warnings
□ WordPress login protected (2FA, rate limiting)
□ Database prefix changed
□ File editing disabled
□ Regular backups scheduled
□ Wordfence firewall active
```

---

## Phase 7: Maintenance Procedures

### Daily Tasks

```
□ Check Vercel deployment status
□ Monitor error rates (if Sentry installed)
□ Review analytics for anomalies
```

### Weekly Tasks

```
□ Review WordPress plugin updates (test on staging first)
□ Check WordPress security scan (Wordfence)
□ Review top pages and traffic sources
□ Check Core Web Vitals in Search Console
□ Verify backup completed successfully
```

### Monthly Tasks

```
□ Update WordPress core and plugins
□ Review and optimize slow queries
□ Clean up unused media files
□ Review and respond to user feedback
□ Analyze conversion funnel
□ Check for broken links
□ Review and update content strategy
```

### Quarterly Tasks

```
□ Full security audit
□ Performance optimization review
□ SEO analysis and keyword strategy
□ Competitor analysis
□ User experience testing
□ Database optimization
□ Review hosting plan (upgrade if needed)
```

---

## Troubleshooting Common Issues

### Issue 1: Images Not Loading

**Symptoms:** Broken images on Next.js site

**Solutions:**
```
1. Check next.config.mjs remotePatterns
   - Hostname correct? (wp.allthatmagazine.com)
   - Pathname correct? (/wp-content/uploads/**)
   
2. Check CORS headers in WordPress
   - Access-Control-Allow-Origin set?
   
3. Test image URL directly in browser
   - https://wp.allthatmagazine.com/wp-content/uploads/...
   - Does it load?

4. Check Vercel logs
   - Dashboard → Project → Logs
   - Look for 403/404 errors
```

### Issue 2: GraphQL Errors

**Symptoms:** "Failed to fetch" or empty data

**Solutions:**
```
1. Test GraphQL directly
   - wp.allthatmagazine.com/graphql
   - Should return "GraphQL Request must include query"
   
2. Check CORS
   - Browser console for CORS errors
   - Add allowed origin in WordPress
   
3. Verify WPGraphQL plugin active
   - WordPress → Plugins → WPGraphQL
   
4. Test query in GraphiQL IDE
   - wp.allthatmagazine.com/wp-admin/admin.php?page=graphiql-ide
```

### Issue 3: Slow Page Loads

**Symptoms:** PageSpeed score below 80

**Solutions:**
```
1. Check image sizes
   - Should be under 200KB each
   - Use WebP format
   - Proper lazy loading
   
2. Check JavaScript bundle
   - npm run build
   - Review .next/analyze/
   - Remove unused dependencies
   
3. Verify ISR working
   - export const revalidate = 60
   - Check Vercel logs for regeneration
   
4. Enable caching in WordPress
   - W3 Total Cache or similar
   - Object caching if available
```

### Issue 4: 404 Errors

**Symptoms:** Article pages return 404

**Solutions:**
```
1. Check WordPress permalinks
   - Settings → Permalinks → Save Changes
   
2. Verify article published
   - Status = "Publish" not "Draft"
   
3. Check slug matches URL
   - Article slug = URL slug
   - Case sensitive!
   
4. Regenerate static paths
   - Trigger redeploy on Vercel
   - Or use ISR revalidation
```

### Issue 5: Deployment Fails

**Symptoms:** Vercel build fails

**Solutions:**
```
1. Check build logs
   - Vercel Dashboard → Deployment → Logs
   - Look for specific error
   
2. Common issues:
   - Environment variables missing
   - TypeScript errors
   - GraphQL endpoint unreachable
   - Dependency conflicts
   
3. Test locally
   - npm run build
   - Fix errors before pushing
   
4. Check Node version
   - Vercel uses Node 18 by default
   - Match in package.json: "engines": {"node": ">=18"}
```

---

## Emergency Procedures

### WordPress Site Down

```
1. Check Hostinger status
   - hpanel.hostinger.com
   - Look for maintenance notices
   
2. Contact Hostinger support
   - 24/7 live chat available
   - Have account details ready
   
3. Enable maintenance mode
   - Plugin: WP Maintenance Mode
   - Show "Back soon" message
   
4. Restore from backup if needed
   - Hostinger → Backups → Restore
   - Or UpdraftPlus → Restore
```

### Next.js Site Down

```
1. Check Vercel status
   - status.vercel.com
   
2. Check recent deployments
   - Vercel Dashboard → Deployments
   - Rollback to last working version if needed
   
3. Check logs
   - Look for errors in latest deployment
   
4. Redeploy
   - Trigger new deployment
   - Or rollback to previous
```

### Database Corruption

```
1. Attempt repair via phpMyAdmin
   - Hostinger → phpMyAdmin
   - Select database → Check tables
   - Repair if needed
   
2. Restore from backup
   - Most recent working backup
   - Test on staging first if possible
   
3. Contact support
   - Hostinger support can assist
```

---

## Scaling Strategy

### When to Upgrade

**Hostinger Plan:**
```
Current: Premium ($3/month)
Upgrade to Business ($4/month) when:
- Traffic exceeds 50,000/month
- Need daily backups
- Want object caching
- Response times slow
```

**Vercel Plan:**
```
Current: Hobby (Free)
Upgrade to Pro ($20/month) when:
- Traffic exceeds 100GB bandwidth/month
- Need team collaboration
- Want advanced analytics
- Need faster builds
```

### Future Enhancements

**Short-term (3-6 months):**
```
- Comment system
- Search functionality
- Newsletter integration
- Member dashboard
- Bookmark/save articles
```

**Medium-term (6-12 months):**
```
- Mobile app (React Native)
- Podcast integration
- Video content
- Community forum
- Advanced personalization
```

**Long-term (12+ months):**
```
- Multiple languages
- Regional editions
- Live events platform
- API for partners
- White-label solution
```

---

## Final Launch Day Checklist

### T-24 Hours

```
□ Final backup of WordPress
□ Final backup of database
□ Test all critical paths one more time
□ Notify team of launch time
□ Prepare social media announcements
□ Set up monitoring alerts
□ Confirm DNS propagation complete
```

### T-1 Hour

```
□ Disable "discourage search engines" in WordPress
□ Deploy final Next.js build to Vercel
□ Verify SSL certificates
□ Test from multiple devices/locations
□ Clear all caches
□ Enable analytics
```

### Launch (T-0)

```
□ Announce on social media
□ Send email to mailing list
□ Submit to search engines
□ Monitor analytics for first hour
□ Watch for errors in logs
□ Be ready to respond to issues
```

### T+24 Hours

```
□ Review analytics data
□ Check for any errors
□ Verify SEO indexing started
□ Respond to user feedback
□ Celebrate! 🎉
```

---

**End of Deployment Guide**

Cursor AI: This completes all 7 documents. You now have everything needed to build and deploy All That Magazine from start to finish.

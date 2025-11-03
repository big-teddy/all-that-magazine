# Vercel Deployment Guide

Complete guide for deploying All That Magazine frontend to Vercel using GitHub Integration.

## ✅ Prerequisites

- GitHub repository: https://github.com/big-teddy/all-that-magazine
- Vercel account (free tier works)
- WordPress backend with GraphQL endpoint

## 🚀 Quick Setup

### 1. Connect GitHub to Vercel (Already Done)

Since you already have Vercel-GitHub integration:
- Vercel automatically detects pushes to `main` branch
- Creates preview deployments for Pull Requests
- No GitHub Actions needed!

### 2. Configure Project Settings

In Vercel Dashboard:

#### Root Directory
```
frontend
```

#### Framework Preset
```
Next.js
```

#### Build Command (auto-detected)
```
npm run build
```

#### Output Directory (auto-detected)
```
.next
```

### 3. Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# WordPress Backend
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql

# Site URL (will be auto-set by Vercel)
NEXT_PUBLIC_SITE_URL=https://allthatmagazine.vercel.app

# ISR Revalidation Secret (generate random string)
REVALIDATE_SECRET=your-random-secret-key-here
```

**Generate random secret:**
```bash
openssl rand -base64 32
```

## 📁 Vercel Configuration

`vercel.json` is already configured:
- Builds from `frontend` directory
- Environment variables linked
- Security headers enabled
- Optimized for Next.js

## 🔄 Deployment Workflow

### Automatic Deployments

**Production (main branch)**
```bash
git push origin main
# → Vercel automatically deploys to production
# → URL: https://allthatmagazine.com (after domain setup)
```

**Preview (feature branches)**
```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
# → Vercel creates preview URL
# → URL: https://allthatmagazine-git-feature-new-feature.vercel.app
```

**Preview (Pull Requests)**
```bash
# Create PR on GitHub
# → Vercel comments with preview URL
# → Updates on every commit
```

### Manual Deployments

```bash
cd frontend
npx vercel          # Deploy to preview
npx vercel --prod   # Deploy to production
```

## 🌐 Custom Domain Setup

### Add Domain in Vercel

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add domain: `allthatmagazine.com`
3. Add www subdomain: `www.allthatmagazine.com`

### Configure DNS

Point your domain to Vercel:

**Option A: Use Vercel Nameservers (Recommended)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: CNAME Record**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**WWW Subdomain**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### SSL Certificate

- Automatically provisioned by Vercel
- Let's Encrypt certificate
- Auto-renewal
- HTTPS forced by default

## 📊 Monitoring

### Vercel Dashboard

Monitor deployments at:
```
https://vercel.com/dashboard
```

Features:
- Real-time build logs
- Deployment history
- Performance analytics
- Error tracking

### Build Notifications

Vercel notifies on:
- Successful deployments
- Failed builds
- Comments on PRs with preview URLs

## 🎯 Best Practices

### Branch Strategy

```
main → production (allthatmagazine.com)
develop → preview (allthatmagazine-develop.vercel.app)
feature/* → preview (unique URL per branch)
```

### Environment-Specific Variables

Set different values per environment:

**Production**
```
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql
```

**Preview**
```
WORDPRESS_GRAPHQL_ENDPOINT=https://staging.allthatmagazine.com/graphql
```

### Build Optimization

Vercel automatically:
- ✅ Caches dependencies
- ✅ Optimizes images
- ✅ Minifies code
- ✅ Enables compression
- ✅ Serves via global CDN

## 🔧 Troubleshooting

### Build Fails

**Error: GraphQL endpoint not accessible**
```
Solution: Check WORDPRESS_GRAPHQL_ENDPOINT is correct
Verify WordPress site is accessible
Test endpoint: curl https://wp.allthatmagazine.com/graphql
```

**Error: Module not found**
```
Solution: Clear cache and redeploy
Vercel Dashboard → Deployments → ... → Redeploy
```

### Environment Variables Not Working

```
Solution:
1. Check variable names match .env.local.example
2. Redeploy after adding variables
3. Check variable is set for correct environment
```

### Preview Deployment Not Created

```
Solution:
1. Check GitHub integration is connected
2. Verify repository permissions
3. Check Vercel project settings
```

## 🚀 Advanced Features

### ISR (Incremental Static Regeneration)

Already configured with 60-second revalidation:
```typescript
export const revalidate = 60;
```

### On-Demand Revalidation

Trigger page rebuild without redeployment:

```bash
curl -X POST 'https://allthatmagazine.com/api/revalidate?secret=YOUR_SECRET&path=/'
```

### Edge Functions

Vercel automatically deploys Next.js middleware and API routes as Edge Functions for maximum performance.

### Analytics

Enable Vercel Analytics:
1. Go to Vercel Dashboard → Analytics
2. Enable for free
3. View real-time metrics

### Web Vitals

Monitor Core Web Vitals:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

## 📱 Mobile Performance

Vercel optimizations:
- Automatic image optimization
- Lazy loading
- Font optimization
- Code splitting
- Progressive Web App (PWA) support

## 🔐 Security

### Automatic HTTPS

- SSL certificate auto-provisioned
- HTTP → HTTPS redirect
- HSTS headers
- Secure cookies

### Security Headers

Configured in `vercel.json`:
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "X-Content-Type-Options",
        "value": "nosniff"
      },
      {
        "key": "X-Frame-Options",
        "value": "DENY"
      },
      {
        "key": "X-XSS-Protection",
        "value": "1; mode=block"
      }
    ]
  }
]
```

## 📈 Performance Optimization

### Vercel Edge Network

- Global CDN (70+ locations)
- Smart routing
- Automatic failover
- DDoS protection

### Build Performance

Typical build times:
- First build: 2-3 minutes
- Cached builds: 30-60 seconds

### Runtime Performance

Target metrics:
- TTFB (Time to First Byte): < 200ms
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## 🔄 Rollback

### Via Vercel Dashboard

1. Go to Deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Via CLI

```bash
cd frontend
npx vercel rollback
```

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
- **Deployment Guide**: https://vercel.com/docs/deployments/overview

## 💡 Tips

### 1. Use Preview Deployments

Test every change before production:
```bash
git checkout -b test-feature
# Make changes
git push
# → Get preview URL
# → Test thoroughly
# → Merge to main if good
```

### 2. Monitor Build Times

If builds are slow:
- Check for large dependencies
- Review bundle size
- Consider lazy loading

### 3. Environment Variables

Keep production and preview separate:
- Production: Real data
- Preview: Test/staging data

### 4. Automatic Previews

Every PR gets a preview URL:
- Share with team
- Test before merge
- Verify visually

---

**All That Magazine** - Deployed with Vercel

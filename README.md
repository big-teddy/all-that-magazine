# All That Magazine

Premium headless WordPress + Next.js magazine featuring Wellness, Lifestyle, and Tech content.

## Project Structure

```
all-that-magazine/
├── wordpress-plugin/           # WordPress backend setup plugin
│   └── all-that-magazine-setup/
└── frontend/                   # Next.js frontend (to be created)
```

## Tech Stack

### Backend
- **WordPress 6.4+** - Headless CMS
- **WPGraphQL** - GraphQL API
- **Advanced Custom Fields** - Content structure
- **Hostinger Premium** - Hosting (₩50k/year)

### Frontend
- **Next.js 14** - App Router
- **TypeScript** - Strict mode
- **Tailwind CSS** - Bold Minimalism design
- **Vercel** - Deployment

### Payments
- Kakao Pay
- Naver Pay
- NHN KCP

## Features

### Content Verticals
- 🧘 **Wellness** - Mental health, fitness, nutrition
- 🎨 **Lifestyle** - Culture, travel, trends
- 💻 **Tech** - Wearables, apps, AI

### Membership Tiers
- **Free** - 5 articles/month
- **Plus** - ₩9,900/month - Unlimited access
- **Premium** - ₩24,900/month - Early access + exclusive content

## Setup Instructions

### 1. WordPress Backend

1. Navigate to `wordpress-plugin/all-that-magazine-setup/`
2. Zip the folder
3. Upload to WordPress (Plugins → Add New → Upload)
4. Activate plugin
5. Install required plugins:
   - Advanced Custom Fields
   - WPGraphQL
   - WPGraphQL for ACF
6. Go to Settings → All That Setup
7. Click "Run Complete Setup"

### 2. Next.js Frontend (Coming Next)

Instructions will be added after frontend initialization.

## Timeline

- **Week 1**: Setup ✅
- **Week 2-3**: WordPress Backend
- **Week 4-7**: Next.js Frontend
- **Week 8-9**: Membership & Payments
- **Week 10-11**: Content & Testing
- **Week 12**: Launch

## Design System

### Typography
- **Headlines**: Playfair Display (900)
- **Body**: Inter (400)
- **Scale**: Perfect Fourth (1.333 ratio)

### Colors
- **Wellness**: #4CAF50 (Green)
- **Lifestyle**: #9C27B0 (Purple)
- **Tech**: #2196F3 (Blue)

### Layout
- 60% white space
- 30% content
- 10% accent colors

## Documentation

All detailed documentation is available in:
- `PRD.md` - Product requirements
- `NEXTJS_ARCHITECTURE.md` - Frontend architecture
- `WORDPRESS_SETUP.md` - Backend setup
- `DESIGN_SYSTEM.md` - Design specifications
- `GRAPHQL_SCHEMA.md` - API documentation
- `DEPLOYMENT_GUIDE.md` - Deployment process

## GraphQL Endpoint

After WordPress setup, your GraphQL endpoint will be:
```
https://wp.allthatmagazine.com/graphql
```

## Development

```bash
# Clone repository
git clone https://github.com/your-username/all-that-magazine.git
cd all-that-magazine

# Setup WordPress plugin (upload to WordPress)
cd wordpress-plugin/all-that-magazine-setup

# Setup Next.js frontend (coming next)
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `.env.local` in frontend directory:
```bash
WORDPRESS_GRAPHQL_ENDPOINT=https://wp.allthatmagazine.com/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=your-secret-key
```

## License

GPL v2 or later

## Status

🚧 **In Development** - WordPress backend setup complete, Next.js frontend in progress

---

**All That Magazine** - Premium Wellness Lifestyle Tech

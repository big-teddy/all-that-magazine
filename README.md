# ALL THAT Magazine

<div align="center">
  <h1>ALL<br>THAT</h1>
  <p><em>Premium Wellness • Lifestyle • Tech</em></p>
</div>

## 📖 About

ALL THAT is a premium digital magazine platform featuring curated content across three verticals: Wellness, Lifestyle, and Technology. Built with a headless WordPress backend and a blazing-fast Next.js frontend, the platform delivers a sophisticated reading experience with elegant typography and immersive visuals.

## 🎨 Design System

Our brand identity follows the comprehensive **Figma Design System** ([view here](docs/ALL_THAT_Figma_Design_System.html)):

- **Typography**: Playfair Display (Display/Headers), Lora (Body Copy), Inter (UI/Captions)
- **Color Palette**:
  - Core: Deep Navy (#1A292F), Warm White (#FAF9F6), Soft Beige (#E6E2D3)
  - Verticals: Sage Green (Wellness), Electric Blue (Tech), Coral (Lifestyle)
- **Grid**: 12-column modular grid with 8px base unit
- **Philosophy**: Bold minimalism with 60% white space minimum

## 🏗️ Architecture

### Tech Stack

**Frontend** (Next.js 14)
- Framework: Next.js 14 with App Router
- Language: TypeScript
- Styling: Tailwind CSS with custom design tokens
- Fonts: Google Fonts (Playfair Display, Lora, Inter)
- Image Optimization: Next.js Image component
- Rendering: ISR (Incremental Static Regeneration) with 60s revalidation

**Backend** (WordPress)
- CMS: WordPress 6.0+
- API Layer: WPGraphQL for efficient data fetching
- Custom Plugin: All That Magazine Setup (auto-configuration)
- Content Structure: Custom post types, taxonomies, ACF fields
- Authentication: WordPress Application Passwords

**Deployment**
- Frontend: Vercel (automatic deployment via GitHub)
- Backend: Hostinger (WordPress hosting)
- CDN: Vercel Edge Network

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- WordPress 6.0+ installation
- FTP access to WordPress server

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/big-teddy/all-that-magazine.git
   cd all-that-magazine/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env.local`:
   ```env
   WORDPRESS_GRAPHQL_ENDPOINT=https://allthatmagazine.com/graphql
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   REVALIDATE_SECRET=your-secret-key
   NEXT_PUBLIC_WP_API_URL=https://allthatmagazine.com/wp-json
   NEXT_PUBLIC_WP_USERNAME=your-username
   NEXT_PUBLIC_WP_APP_PASSWORD=your-app-password
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

### WordPress Setup

1. Upload the plugin via FTP
2. Activate plugins: ACF, WPGraphQL, WPGraphQL for ACF, All That Magazine Setup
3. Create Application Password at `https://your-site.com/create-app-password.php`

See detailed guides:
- [WordPress Setup Guide](docs/WORDPRESS_SETUP.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)

## 📝 Content Management

### Creating Articles

**Frontend Interface**: Navigate to `/admin/create-article`

Each article includes:
- Title, Content (rich text)
- Vertical (Wellness, Lifestyle, Tech)
- Custom Excerpt, Read Time
- Featured Image (1600x900px recommended)
- Author Bio, Premium flag

## 🎯 Key Features

- Hero Sections: Full-screen immersive images
- Featured Stories: Curated 3-column grid
- Vertical Pages: Dedicated category landing pages
- Search: Real-time article search
- Newsletter: Email subscription
- Mobile-First: Fully responsive
- Premium Content: Paywall support
- Social Sharing: Twitter, Facebook, LinkedIn
- SEO Optimized: Meta tags, Open Graph
- Performance: ISR, optimized images

## 📚 Documentation

- [Product Requirements (PRD)](docs/PRD.md)
- [Next.js Architecture](docs/NEXTJS_ARCHITECTURE.md)
- [WordPress Setup](docs/WORDPRESS_SETUP.md)
- [GraphQL Schema](docs/GRAPHQL_SCHEMA.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [Figma Design System](docs/ALL_THAT_Figma_Design_System.html)

## 🔗 Links

- **Production**: [https://allthatmagazine.com](https://allthatmagazine.com)
- **GitHub**: [https://github.com/big-teddy/all-that-magazine](https://github.com/big-teddy/all-that-magazine)

## 📄 License

All rights reserved © 2025 All That Magazine

---

<div align="center">
  <p><strong>Built with</strong></p>
  <p>Next.js 14 • WordPress • GraphQL • TypeScript • Tailwind CSS</p>
</div>

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Colors (from Figma Design System)
        brand: {
          navy: '#1A292F',        // Deep Navy - Primary
          'warm-white': '#FAF9F6', // Warm White - Background
          beige: '#E6E2D3',        // Soft Beige - Neutral
          black: '#1A292F',        // Alias for navy
          white: '#FAF9F6',        // Alias for warm white
        },
        // Vertical Colors (from Figma Design System)
        wellness: {
          DEFAULT: '#88A896',  // Sage Green (WELL)
          sage: '#88A896',
        },
        tech: {
          DEFAULT: '#6B9BD1',  // Electric Blue (TECH)
          blue: '#6B9BD1',
        },
        lifestyle: {
          DEFAULT: '#E8907E',  // Coral (LIFE)
          coral: '#E8907E',
        },
        beauty: {
          DEFAULT: '#D4A5A5',  // Dusty Rose (BEAUTY)
          rose: '#D4A5A5',
        },
        space: {
          DEFAULT: '#5A5A5A',  // Charcoal (SPACE)
          charcoal: '#5A5A5A',
        },
        table: {
          DEFAULT: '#D4A574',  // Amber (TABLE)
          amber: '#D4A574',
        },
      },
      fontFamily: {
        // Korean-optimized typography
        serif: ['var(--font-serif)', 'Noto Serif KR', 'serif'],
        sans: ['var(--font-sans)', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        body: ['var(--font-sans)', 'Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Typography Scale from Figma Design System (Perfect Fourth - 1.333 ratio)
        'display': ['76px', { lineHeight: '1.1', fontWeight: '900' }],  // H1 Hero Display
        'section': ['43px', { lineHeight: '1.2', fontWeight: '700' }],  // H2 Section
        'subheading': ['28px', { lineHeight: '1.3', fontWeight: '600' }], // H3 Subheading
        'body': ['18px', { lineHeight: '1.7', fontWeight: '400' }],     // Body Copy (Desktop preferred)
        'caption': ['13px', { lineHeight: '1.5', fontWeight: '400' }],  // Captions/Metadata
        // Standard scale
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.5rem',      // 24px
        '2xl': '2rem',       // 32px
        '3xl': '2.667rem',   // 43px
        '4xl': '3.556rem',   // 57px
        '5xl': '4.741rem',   // 76px
      },
      spacing: {
        // 8px base unit from Figma Grid System
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      maxWidth: {
        '8xl': '1440px',
      },
      gridTemplateColumns: {
        // 12-column grid from Figma Design System
        '12': 'repeat(12, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      borderRadius: {
        // From Figma component design
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '20px',
        '2xl': '24px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

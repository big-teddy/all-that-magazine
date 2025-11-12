import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'All That Magazine - 프리미엄 웰니스·라이프스타일·테크 매거진';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A292F', // brand-navy
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo/Brand Name */}
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: '#FAF9F6', // brand-warm-white
            letterSpacing: '-0.02em',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          ALL THAT
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: '#E6E2D3', // brand-beige
            letterSpacing: '0.15em',
            marginBottom: 48,
            textAlign: 'center',
          }}
        >
          MAGAZINE
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: '#E6E2D3',
            textAlign: 'center',
            opacity: 0.9,
            lineHeight: 1.4,
          }}
        >
          프리미엄 웰니스·라이프스타일·테크 매거진
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: '#E6E2D3',
            marginTop: 48,
            opacity: 0.6,
          }}
        />

        {/* Verticals */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            marginTop: 48,
            fontSize: 20,
            color: '#FAF9F6',
            opacity: 0.7,
          }}
        >
          <div>WELLNESS</div>
          <div>•</div>
          <div>LIFESTYLE</div>
          <div>•</div>
          <div>TECH</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

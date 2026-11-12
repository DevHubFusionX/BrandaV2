import { ImageResponse } from 'next/og';

export const alt = 'Branda V2 Product Showcase';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: '28px',
            color: '#a1a1aa',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px',
          }}
        >
          Branda V2 • Digital by Branda
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          Premium Branding & Print Ecosystem
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#d4d4d8',
          }}
        >
          Fast Nationwide Delivery across Lagos, Abuja & 36 States
        </div>
      </div>
    ),
    { ...size }
  );
}

import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return Response.json(
        { error: '유효한 이메일 주소를 입력해주세요' },
        { status: 400 }
      );
    }

    // Here you would integrate with your email service provider
    // Examples: Mailchimp, ConvertKit, Resend, SendGrid, etc.

    // Option 1: Mailchimp
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID) {
      const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
      const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
      const MAILCHIMP_DC = MAILCHIMP_API_KEY.split('-')[1];

      const response = await fetch(
        `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            tags: ['All That Magazine'],
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        if (error.title === 'Member Exists') {
          return Response.json(
            { error: '이미 구독 중인 이메일입니다' },
            { status: 400 }
          );
        }
        throw new Error('Mailchimp API error');
      }

      return Response.json({
        success: true,
        message: '구독이 완료되었습니다!'
      });
    }

    // Option 2: ConvertKit
    if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: process.env.CONVERTKIT_API_KEY,
            email: email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('ConvertKit API error');
      }

      return Response.json({
        success: true,
        message: '구독이 완료되었습니다!'
      });
    }

    // Option 3: Resend (simple transactional email)
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'newsletter@allthatmagazine.com',
          to: process.env.ADMIN_EMAIL || 'admin@allthatmagazine.com',
          subject: '새로운 뉴스레터 구독',
          html: `<p>새로운 구독자: <strong>${email}</strong></p>`,
        }),
      });

      if (!response.ok) {
        throw new Error('Resend API error');
      }

      return Response.json({
        success: true,
        message: '구독이 완료되었습니다!'
      });
    }

    // Fallback: Log to console (development only)
    console.log('Newsletter subscription:', email);
    console.warn('⚠️ No email service configured. Please set up Mailchimp, ConvertKit, or Resend.');

    // In development, simulate success
    if (process.env.NODE_ENV === 'development') {
      return Response.json({
        success: true,
        message: '구독이 완료되었습니다! (개발 모드)'
      });
    }

    // In production, return error if no service is configured
    return Response.json(
      { error: '이메일 서비스가 설정되지 않았습니다. 관리자에게 문의하세요.' },
      { status: 503 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return Response.json(
      { error: '구독 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

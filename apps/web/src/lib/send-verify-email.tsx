import { render } from '@react-email/components';
import { VerifyEmailCode } from '@/components/emails/verify-email';

export async function sendVerificationRequest({
  identifier: to,
  code,
  provider,
}: {
  identifier: string;
  code: string;
  provider: {
    apiKey: string;
    from: string;
  };
}) {
  const html = await render(<VerifyEmailCode code={code} />);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: '아이큐 이메일 인증 코드',
      html,
      text: `아래 코드를 입력하여 인증을 완료해주세요.\n\n[인증 코드] ${code}`,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend error: ${await res.text()}`);
  }
}

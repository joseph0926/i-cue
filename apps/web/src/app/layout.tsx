import './globals.css';
import { cn } from '@icue/ui/src/lib/utils';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/providers/theme.provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://icue-streaming.com'),
  title: 'ICue Web - 방송 아이디어 매칭 플랫폼',
  description:
    '시청자가 직접 방송 아이디어를 제안하고, 스트리머가 채택하여 새롭고 재미있는 콘텐츠를 만드는 “방송 아이디어 매칭 플랫폼”입니다.',
  authors: [{ name: '김영훈', url: 'https://github.com/joseph0926' }],
  creator: '김영훈 (joseph0926)',
  publisher: 'ICue org',
  keywords: [
    'ICue',
    '방송 아이디어',
    '스트리머',
    '시청자 참여',
    '콘텐츠 기획',
    '크라우드소싱',
    '플랫폼',
  ],
  openGraph: {
    title: 'ICue Web - 방송 아이디어 매칭 플랫폼',
    description:
      '시청자가 제안한 아이디어를 스트리머가 채택하여, 더 새롭고 재미있는 방송을 만드는 ICue 플랫폼입니다.',
    url: 'https://icue-streaming.com',
    siteName: 'ICue Web',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://icue-streaming.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ICue - 방송 아이디어 매칭 플랫폼 Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICue Web - 방송 아이디어 매칭 플랫폼',
    description:
      '시청자가 직접 방송 컨셉을 제안하고, 채택 시 보상을 받을 수 있는 크라우드소싱 기반 아이디어 플랫폼.',
    creator: '@김영훈',
  },
  category: 'entertainment',
  icons: {
    icon: '/logo.svg',
  },
};

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={cn(notoSansKr.variable)} suppressHydrationWarning>
      <body className={cn('antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors position="top-right" closeButton />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

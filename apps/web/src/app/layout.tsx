import './globals.css';
import { cn } from '@icue/ui/src/lib/utils';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/providers/theme.provider';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://icue-streaming.com'),

  title: 'ICue Web - 병원 스마트 대기열 관리',
  description:
    'ICue 병원 대기열 관리 웹 시스템. 병원 대기 시간을 효율적으로 관리하고, 환자에게 편리한 서비스를 제공합니다.',

  authors: [{ name: '김영훈', url: 'https://github.com/joseph0926' }],
  creator: '김영훈 (joseph0926)',
  publisher: 'ICue org',

  keywords: ['ICue', '병원 대기열', '의료', 'Queue Management', 'Healthcare'],

  openGraph: {
    title: 'ICue Web',
    description: '병원 대기열 관리의 효율을 높이고, 환자 만족도를 극대화하는 스마트 솔루션.',
    url: 'https://icue-streaming.com',
    siteName: 'ICue Web',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://icue-streaming.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ICue Preview',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ICue Web',
    description: '병원 대기열 관리의 효율을 높이고, 환자 만족도를 극대화하는 스마트 솔루션.',
    creator: '@김영훈',
  },

  category: 'technology',

  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(pretendard.className, 'antialiased')}>
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

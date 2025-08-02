import './globals.scss';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const delius = localFont({
  src: '../../public/fonts/DeliusSwashCaps-Regular.ttf',
  variable: '--font-delius',
  display: 'swap',
  preload: true,
});

const patrick = localFont({
  src: '../../public/fonts/PatrickHandSC-Regular.ttf',
  variable: '--font-patrick',
  display: 'swap',
  preload: true,
});

const shadows = localFont({
  src: '../../public/fonts/ShadowsIntoLight-Regular.ttf', // see note #2
  variable: '--font-shadows',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = { title: 'Personal Manager' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${delius.variable} ${patrick.variable} ${shadows.variable}`}
    >
      {/* make Patrick the default text font */}
      <body className={patrick.className}>{children}</body>
    </html>
  );
}

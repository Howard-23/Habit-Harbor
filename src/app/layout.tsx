import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'HabitHarbor - Track Your Daily Habits',
  description: 'A delightful habit tracker with smooth micro-interactions',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <footer
          style={{
            textAlign: 'center',
            padding: 'var(--spacing-6)',
            borderTop: '1px solid var(--color-neutral-200)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-sm)',
            marginTop: 'var(--spacing-12)',
          }}
        >
          <p>Made with ⛅ by HabitHarbor • 2026</p>
        </footer>
      </body>
    </html>
  );
}

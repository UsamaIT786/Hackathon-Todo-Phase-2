import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Todo Manager - Smart Task Management',
    template: '%s | Todo Manager',
  },
  description:
    'A clean, professional task management application with a beautiful light green theme.',
  keywords: ['todo', 'tasks', 'productivity', 'task management', 'todo manager'],
  authors: [{ name: 'Todo Manager Team' }],
  creator: 'Todo Manager',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#22C55E',
};

import { SplashScreen } from '@/components/ui/SplashScreen';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable + " " + poppins.variable + " dark"} suppressHydrationWarning>
      <body className='min-h-screen antialiased transition-colors duration-300'>
        <SplashScreen />
        <a href='#main-content' className='skip-to-main'>
          Skip to main content
        </a>
        <Providers>
          <div className='flex flex-col min-h-screen'>
            <main id='main-content' className='flex-1'>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

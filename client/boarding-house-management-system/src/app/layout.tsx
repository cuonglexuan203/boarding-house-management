import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import StoreProvider from '@/components/StoreProvider';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Boarding House Management System',
  description: 'Manage your boarding house system with an easiest way',
};
config.autoAddCss = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <StoreProvider>{children}</StoreProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pickzy E‑Commerce',
  description: 'Make your shopping easy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
            <footer className="border-t py-8 text-center text-sm text-muted-foreground">
              Built with ♥ By Pritesh
            </footer>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

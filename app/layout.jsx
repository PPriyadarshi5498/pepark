import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { AppContextProvider } from '@/context/AppContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'pepark - Ppriyadarshi',
  description: 'Full Stack Project',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <body className={`${inter.variable} antialiased`}>
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}


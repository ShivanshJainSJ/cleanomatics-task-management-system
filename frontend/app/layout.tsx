import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cleanomatics | Task Management System',
  description: 'Cleanomatics internal engineering Task Management System.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text antialiased">
        {children}
      </body>
    </html>
  );
}

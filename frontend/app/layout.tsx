import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Task Management System | Cleanomatics',
  description: 'A realistic, full-featured Task Management System built with FastAPI and Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}

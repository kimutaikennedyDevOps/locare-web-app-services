import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LoCare App - Find Care Services in Kenya',
  description: 'Locate day care, disability care, adult care, pet care, and specialized hospitals across Kenya',
  keywords: 'healthcare, daycare, disability care, adult care, pet care, hospitals, Kenya',
  authors: [{ name: 'LoCare Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
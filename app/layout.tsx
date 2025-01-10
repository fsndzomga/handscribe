import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HandScribe - Digitize Your Handwritten Notes',
  description: 'Encourage handwriting and easily digitize your notes with AI',
}

function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="ml-2 text-xl font-semibold text-gray-900">HandScribe</span>
        </Link>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header />
        {children}
      <div className="fixed bottom-4 right-4">
        <Button asChild>
          <Link href="https://nebius.com/services/studio-inference-service?utm_source=handscribe_fsndzomga" target="_blank" rel="noopener noreferrer">
            Built with Nebius AI
          </Link>
        </Button>
      </div>
      <Analytics />
      </body>
    </html>
  )
}

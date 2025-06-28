import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Squares from '@/components/Squares'
import { ThemeProvider } from '@/components/theme-provider'
import { AudioProvider } from "@/contexts/AudioContext"
import GlobalBackground from '@/components/GlobalBackground'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Voice IT - Official RJ Club of VIT Chennai',
  description: 'The official RJ Club of VIT Chennai, bringing you the best in campus radio and entertainment.',
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/voice.png', type: 'image/png' },
    ],
    shortcut: '/voice.png',
    apple: '/voice.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/voice.png" />
        <link rel="apple-touch-icon" href="/voice.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AudioProvider>
            <GlobalBackground />
            <Squares
              speed={0.5}
              squareSize={40}
              direction='diagonal' // up, down, left, right, diagonal
              borderColor='#FFA500'
              hoverFillColor='#222'
            />
            <div className="squares-overlay" />
            {children}
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

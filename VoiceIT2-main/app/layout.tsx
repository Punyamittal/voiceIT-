import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Squares from '@/components/Squares'
import { ThemeProvider } from '@/components/theme-provider'
import { AudioProvider } from "@/contexts/AudioContext"
import GlobalBackground from '@/components/GlobalBackground'
import PerformanceMonitor from "@/components/PerformanceMonitor"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
  preload: true,
})

export const metadata: Metadata = {
  title: 'Voice IT - VIT Chennai\'s Premier Radio Club',
  description: 'Join VIT Chennai\'s premier radio community. Discover your voice through radio shows, podcasts, and live performances.',
  keywords: 'Voice IT, VIT Chennai, Radio Club, RJ, Podcasts, Campus Radio',
  authors: [{ name: 'Voice IT Team' }],
  creator: 'Voice IT',
  publisher: 'VIT Chennai',
  generator: 'Next.js',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://voiceit-vitchennai.vercel.app'),
  icons: {
    icon: [
      { url: '/voice.png', type: 'image/png' },
    ],
    shortcut: '/voice.png',
    apple: '/voice.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Voice IT - VIT Chennai\'s Premier Radio Club',
    description: 'Join VIT Chennai\'s premier radio community. Discover your voice through radio shows, podcasts, and live performances.',
    url: 'https://voiceit-vitchennai.vercel.app',
    siteName: 'Voice IT',
    images: [
      {
        url: '/voice.png',
        width: 1200,
        height: 630,
        alt: 'Voice IT - VIT Chennai Radio Club',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voice IT - VIT Chennai\'s Premier Radio Club',
    description: 'Join VIT Chennai\'s premier radio community. Discover your voice through radio shows, podcasts, and live performances.',
    images: ['/voice.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/radiom.mp3" as="audio" type="audio/mpeg" />
        <link rel="preload" href="/voice.png" as="image" type="image/png" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Performance meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* PWA meta tags */}
        <meta name="theme-color" content="#FF6B00" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Voice IT" />
        
        {/* Performance optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
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
            <PerformanceMonitor />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

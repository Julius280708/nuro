// app/layout.tsx

import './globals.css'
import '../../styles/snipcart.css'

import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'

// Fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Metadata
export const metadata: Metadata = {
  title: 'Clerk + Snipcart Shop',
  description: 'Next.js app with Clerk authentication and Snipcart shopping cart',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
  rel="stylesheet"
  href="https://cdn.snipcart.com/themes/v3.6.0/default/snipcart.css"
/>
        </head>
        <body className="antialiased bg-black text-white">
          <header className="flex justify-between items-center p-4 border-b border-white/10">
            <div className="text-lg font-bold">🛒 Nuro Store</div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              {/* Snipcart shopping cart icon */}
              <button className="snipcart-checkout bg-white text-black rounded-full px-4 py-2 font-medium">
                Cart
              </button>
            </div>
          </header>

          <main>{children}</main>

          {/* ✅ Snipcart Settings */}
          <Script id="snipcart-settings" strategy="beforeInteractive">
            {`
              window.SnipcartSettings = {
                publicApiKey: 'MmIyNTA3YjYtZDI5YS00MDM2LTlhZDMtMzFkZjg5M2E0YzU1NjM4ODM1MjY1MDU2NTYzMDAw',
                loadStrategy: 'on-user-interaction'
              };
            `}
          </Script>

          {/* ✅ Snipcart JS */}
          <Script
            src="https://cdn.snipcart.com/themes/v3.3.0/default/snipcart.js"
            strategy="afterInteractive"
          />

          {/* ✅ Snipcart container */}
          <div
            hidden
            id="snipcart"
            data-api-key="MmIyNTA3YjYtZDI5YS00MDM2LTlhZDMtMzFkZjg5M2E0YzU1NjM4ODM1MjY1MDU2NTYzMDAw"
          />
        </body>
      </html>
    </ClerkProvider>
  )
}

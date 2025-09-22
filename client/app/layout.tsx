import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/admin/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"

export const metadata: Metadata = {
  title: "Primex Logistics - Transit International",
  description: "Système de gestion pour entreprise de transit international",
  generator: "v0.app",
}

import { LanguageProvider } from "@/contexts/LanguageContext"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
         <AuthProvider>
        <Suspense fallback={null}>
          <LanguageProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </Suspense>
        <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}


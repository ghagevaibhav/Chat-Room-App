
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import NextAuthProvider from '@/components/NextAuthProvider'
import { Toaster } from "@/components/ui/toaster"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CanvasFlow',
  description: 'Create beautiful canvas art with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
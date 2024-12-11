import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ReactQueryProvider } from '@/lib/react-query-provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Integrate Supabase with Next.js',
	description: 'Learn how to integrate Supabase with Next.js',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex items-center flex-col px-6 py-4`}
			>
				<Analytics />
				<SpeedInsights />
				<Toaster />
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	)
}

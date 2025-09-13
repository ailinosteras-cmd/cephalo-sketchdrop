
import './globals.css'
import Header from '@/src/components/header'
export const metadata = { title: 'Cephalo // SketchDrop' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-surface text-ink">
        <Header />
        <div className="container py-6">{children}</div>
      </body>
    </html>
  )
}

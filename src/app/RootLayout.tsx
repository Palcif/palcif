import { Suspense } from 'react'
import { Outlet } from 'react-router'

import Footer from '@/features/newsletter/Footer'
import Header from '@/shared/components/Header'

export default function RootLayout() {
  return (
    <div className="page">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

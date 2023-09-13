'use client'

import {Footer} from '@/app/_components/footer'
import {Header} from '@/app/_components/header'

type LandingLayoutProps = {
  children: React.ReactNode
}

export default function LandingLayout({children}: LandingLayoutProps) {
  return (
    <>
      <main className="max-w-screen-xl w-4/5 mx-auto">
        <div className="mb-[2rem]">
          <Header />
        </div>
        {children}
      </main>
      <Footer />
    </>
  )
}

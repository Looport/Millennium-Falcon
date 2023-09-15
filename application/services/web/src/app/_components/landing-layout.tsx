'use client'

import {Footer} from '@/app/_components/footer'
import {Header} from '@/app/_components/header'
import {classname} from '@/common/utils/classname'

type LandingLayoutProps = {
  children: React.ReactNode
}

export default function LandingLayout({children}: LandingLayoutProps) {
  return (
    <>
      <main className={classname(['max-w-screen-xl w-4/5 mx-auto'])}>
        <div className={classname(['mb-[2rem]'])}>
          <Header />
        </div>
        {children}
      </main>
      <Footer />
    </>
  )
}

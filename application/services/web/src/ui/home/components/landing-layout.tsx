import React from 'react'

import {classname} from '@/ui/common/utils/classname'
import {Footer} from '@/ui/home/components/footer'
import {Header} from '@/ui/home/components/header'

type LandingLayoutProps = {
  children: React.ReactNode
}

export const LandingLayout = ({children}: LandingLayoutProps) => (
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

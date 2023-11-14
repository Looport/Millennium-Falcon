import React from 'react'

import {Footer} from '@/common/home/components/footer'
import {Header} from '@/common/home/components/header'
import {classname} from '@/common/utils/classname'

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

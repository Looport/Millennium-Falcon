import {classname} from '@/ui/common/utils/classname'
import {Footer} from '@/ui/home/components/footer'
import {Header} from '@/ui/home/components/header'
import React from "react";

type LandingLayoutProps = {
  children: React.ReactNode
}

export const LandingLayout = ({children}: LandingLayoutProps) => {
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

import React from 'react'

import {JoinContainer} from '@/auth/components/join-form/join-container'
import {LandingLayout} from '@/common/home/components/landing-layout'

export default function Page() {
  return (
    <LandingLayout>
      <div className="w-2/3 mx-auto">
        <JoinContainer />
      </div>
    </LandingLayout>
  )
}

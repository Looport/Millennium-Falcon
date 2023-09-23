import React from 'react'

import {JoinContainer} from '@/ui/auth/containers/join-container'
import {LandingLayout} from '@/ui/home/components/landing-layout'

export default function Page() {
  return (
    <LandingLayout>
      <div className="w-2/3 mx-auto">
        <JoinContainer />
      </div>
    </LandingLayout>
  )
}

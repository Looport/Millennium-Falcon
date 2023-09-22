import React from 'react'

import {RegisterContainer} from '@/ui/auth/containers/register-container'
import {LandingLayout} from '@/ui/home/components/landing-layout'

export default function Page() {
  return (
    <LandingLayout>
      <div className="w-2/3 mx-auto">
        <RegisterContainer />
      </div>
    </LandingLayout>
  )
}

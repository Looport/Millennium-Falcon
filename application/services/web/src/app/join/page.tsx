'use client'
import React from 'react'

import LandingLayout from '@/app/_components/landing-layout'
import {JoinForm} from '@/app/join/join-form'

export default function Page() {
  return (
    <LandingLayout>
      <div className="w-2/3 mx-auto">
        <JoinForm />
      </div>
    </LandingLayout>
  )
}

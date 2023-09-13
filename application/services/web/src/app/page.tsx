'use client'

import {Bullerin} from '@/app/_components/bulletin'
import {Contribution} from '@/app/_components/contribution'
import {ExploreWorld} from '@/app/_components/explore-world'
import LandingLayout from '@/app/_components/landing-layout'
import {Meetings} from '@/app/_components/meeting'
import {Roadmap} from '@/app/_components/roadmap'

export default function Home() {
  return (
    <LandingLayout>
      <section
        className="
          grid gap-[4rem]
          lg:grid-cols-2 lg:grid-rows-6
          mb-[4rem]
          "
      >
        <div className="lg:row-span-4">
          <ExploreWorld />
        </div>
        <div className="lg:row-span-3 h-[500px]">
          <Meetings />
        </div>
        <div className="lg:row-span-3">
          <Contribution />
        </div>
        <div className="lg:row-span-2 h-[300px]">
          <Bullerin />
        </div>
      </section>
      <section>
        <Roadmap />
      </section>
    </LandingLayout>
  )
}

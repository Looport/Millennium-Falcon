'use client'

import {Bullerin} from '@/app/_components/bulletin'
import {Contribution} from '@/app/_components/contribution'
import {ExploreWorld} from '@/app/_components/explore-world'
import {Footer} from '@/app/_components/footer'
import {Header} from '@/app/_components/header'
import {Meetings} from '@/app/_components/meeting'
import { Roadmap } from '@/app/_components/readmap'

export default function Home() {
  return (
    <>
      <main className="w-4/5 mx-auto">
        <Header />
        <section
          className="
          grid grid-cols-2 grid-rows-home
          mt-[40px] gap-[40px]
          "
        >
          <ExploreWorld />
          <Meetings />
          <Contribution />
          <Bullerin />
          <Roadmap />
        </section>
      </main>
      <Footer />
    </>
  )
}

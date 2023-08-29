'use client'

import {Bullerin} from '@/app/_components/bulletin'
import {Contribution} from '@/app/_components/contribution'
import {ExploreWorld} from '@/app/_components/explore-world'
import {Footer} from '@/app/_components/footer'
import {Header} from '@/app/_components/header'
import {Meetings} from '@/app/_components/meeting'

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
          <article
            className="
            row-span-2 col-span-2
            p-[20px]
            border rounded-[25px] border-slate-50/25 drop-shadow-md
            bg-main/40
            "
          >
            <header>
              <div>Tooltip</div>
            </header>
            <h1>Roadmap</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ut dolor elit. In ornare posuere.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}

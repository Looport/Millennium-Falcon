'use client'

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
          <article
            className="
            row-span-4
            p-[20px]
            border rounded-[25px] border-slate-50/25 drop-shadow-xl
            bg-main/40
            "
          >
            <header>
              <div>Tooltip</div>
            </header>
            <h1>Support Unique Ideas</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ut dolor elit. In ornare posuere.
            </p>
          </article>
          <article
            className="
            row-span-3
            p-[20px]
            border rounded-[25px] border-slate-50/25 drop-shadow-xl
            bg-main/40
            "
          >
            <header>
              <div>Tooltip</div>
            </header>
            <h1>Around The Globe, Just Pick Where</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ut dolor elit. In ornare posuere.
            </p>
          </article>
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

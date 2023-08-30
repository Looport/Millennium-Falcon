"use client";

import { Bullerin } from "@/app/_components/bulletin";
import { Contribution } from "@/app/_components/contribution";
import { ExploreWorld } from "@/app/_components/explore-world";
import { Footer } from "@/app/_components/footer";
import { Header } from "@/app/_components/header";
import { Meetings } from "@/app/_components/meeting";
import { Roadmap } from "@/app/_components/readmap";

export default function Home() {
  return (
    <>
      <main className="max-w-screen-xl w-4/5 mx-auto">
        <Header />
        <section className="
          grid grid-cols-2 grid-rows-home
          mt-[40px] gap-[40px]
          ">
          <div className="row-span-5">
            <ExploreWorld />
          </div>
          <div className="row-span-4">
            <Meetings />
          </div>
          <div className="row-span-4">
            <Contribution />
          </div>
          <div className="row-span-3">
            <Bullerin />
          </div>
          <div className="row-span-2 col-span-2">
            <Roadmap />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

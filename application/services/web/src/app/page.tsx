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
        <div className="mb-[20px]">
          <Header />
        </div>
        <section className="flex gap-[40px] mb-[40px]">
          <div className="flex flex-col gap-[40px] basis-1/2">
            <div className="h-[715px]">
              <ExploreWorld />
            </div>
            <div className="h-[255px]">
              <Bullerin />
            </div>
          </div>
          <div className="flex flex-col gap-[40px] basis-1/2">
            <div className="h-[485px]">
              <Meetings />
            </div>
            <div className="h-[485px]">
              <Contribution />
            </div>
          </div>
        </section>
        <div className="basis-2/2">
          <Roadmap />
        </div>
      </main>
      <Footer />
    </>
  );
}

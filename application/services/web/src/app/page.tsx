"use client";

import { Bullerin } from "@/app/_components/bulletin";
import { Contribution } from "@/app/_components/contribution";
import { ExploreWorld } from "@/app/_components/explore-world";
import { Footer } from "@/app/_components/footer";
import { Header } from "@/app/_components/header";
import { Meetings } from "@/app/_components/meeting";
import { Roadmap } from "@/app/_components/roadmap";

export default function Home() {
  return (
    <>
      <main className="max-w-screen-xl w-4/5 mx-auto">
        <div className="mb-[2rem]">
          <Header />
        </div>
        <section className="grid grid-cols-2 grid-rows-6 gap-[4rem] mb-[4rem]">
          <div className="row-span-4">
            <ExploreWorld />
          </div>
          <div className="row-span-3">
            <Meetings />
          </div>
          <div className="row-span-3">
            <Contribution />
          </div>
          <div className="row-span-2">
            <Bullerin />
          </div>
        </section>
        <section >
          <Roadmap />
        </section>
      </main>
      <Footer />
    </>
  );
}

// export default function Home() {
//   return (
//     <>
//       <main className="max-w-screen-xl w-4/5 mx-auto">
//         <div className="mb-[2rem]">
//           <Header />
//         </div>
//         <section className="flex gap-[4rem] mb-[4rem]">
//           <div className="flex flex-col gap-[4rem] basis-1/2">
//             <div className="h-[71.5rem]">
//               <ExploreWorld />
//             </div>
//             <div className="h-[28.5rem]">
//               <Bullerin />
//             </div>
//           </div>
//           <div className="flex flex-col gap-[4rem] basis-1/2">
//             <div className="h-[50rem]">
//               <Meetings />
//             </div>
//             <div className="h-[50rem]">
//               <Contribution />
//             </div>
//           </div>
//         </section>
//         <div className="basis-2/2">
//           <Roadmap />
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

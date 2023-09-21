import {classname} from '@/ui/common/utils/classname'
import {Bullerin} from '@/ui/home/components/bulletin'
import {Contribution} from '@/ui/home/components/contribution'
import {ExploreWorld} from '@/ui/home/components/explore-world'
import LandingLayout from '@/ui/home/components/landing-layout'
import {Meetings} from '@/ui/home/components/meeting'
import {Roadmap} from '@/ui/home/components/roadmap'

export default function Home() {
  return (
    <LandingLayout>
      <section
        className={classname([
          'grid gap-[4rem]',
          'lg:grid-cols-2 lg:grid-rows-6',
          'mb-[4rem]',
        ])}
      >
        <div className={classname(['lg:row-span-4'])}>
          <ExploreWorld />
        </div>
        <div className={classname(['lg:row-span-3 h-[500px]'])}>
          <Meetings />
        </div>
        <div className={classname(['lg:row-span-3'])}>
          <Contribution />
        </div>
        <div className={classname(['lg:row-span-2 h-[300px]'])}>
          <Bullerin />
        </div>
      </section>
      <section>
        <Roadmap />
      </section>
    </LandingLayout>
  )
}

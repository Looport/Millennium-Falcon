import {Bullerin} from '@/common/home/components/bulletin'
import {Contribution} from '@/common/home/components/contribution'
import {ExploreWorld} from '@/common/home/components/explore-world'
import {LandingLayout} from '@/common/home/components/landing-layout'
import {Meetings} from '@/common/home/components/meeting'
import {Roadmap} from '@/common/home/components/roadmap'
import {classname} from '@/common/utils/classname'

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

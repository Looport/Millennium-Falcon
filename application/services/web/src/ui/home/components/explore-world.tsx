import Image from 'next/image'

import {Button} from '@/ui/common/components/button'
import {Card} from '@/ui/common/components/card'
import {BiMapAlt, BsStars, TbUsersPlus} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'

export const ExploreWorld = () => (
  <Card
    className={classname([
      'h-full p-[0!important] relative',
      'before:absolute before:top-[25rem] before:right-[-3.5rem]',
      "before:content-[' '] before:w-[8rem] before:h-[8rem]",
      "before:bg-[url('/Elips-Orange.png')] before:bg-no-repeat",
      'before:bg-[length:cover] before:rounded-[2.5rem]',
      'before:z-[-1]',
      'after:absolute after:bottom-[21rem] after:left-[-3rem]',
      "after:content-[' '] after:w-[9rem] after:h-[9rem]",
      "after:bg-[url('/Elips-Orange.png')] after:bg-no-repeat",
      'after:bg-[length:cover] after:rounded-[2.5rem]',
      'after:rotate-[70deg]',
    ])}
  >
    <header className={classname(['p-[2rem] pb-[0]'])}>
      <div className={classname(['mb-[3.5rem]'])}>
        <Card.Tooltip
          text={'Try New Feature'}
          icon={
            <div
              className={classname(['bg-red-600 rounded-[10rem] p-[0.7rem]'])}
            >
              <BsStars />
            </div>
          }
        />
      </div>
      <div className={classname(['xl:mx-[3.5rem] mx-[2rem] text-center'])}>
        <Card.Title
          className={classname([
            'bg-gradient-to-r from-[#FF343F] to-[#FFE853]',
          ])}
        >
          Around The Globe, Just Pick Where
        </Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut
          dolor elit. In ornare posuere.
        </Card.Text>
      </div>
    </header>
    <div>
      <Image
        className={classname(['mx-auto object-cover'])}
        width={530}
        height={296}
        src="/Explore-Map.png"
        alt="Explore Map"
      />
    </div>
    <div
      className={classname([
        'p-[2rem] mb-[20px] mt-[-2.5rem]',
        'flex flex-col gap-[0.5rem] justify-center items-center',
      ])}
    >
      <Button
        type="primary"
        icon={<BiMapAlt />}
      >
        Explore The World
      </Button>
      <span>or</span>
      <Button
        type="link"
        icon={<TbUsersPlus />}
      >
        Bring Friends With You
      </Button>
    </div>
  </Card>
)

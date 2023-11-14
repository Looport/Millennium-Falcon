import {Button} from '@/common/components/button'
import {Card} from '@/common/components/card'
import {
  IconProvider,
  AiFillHeart,
  AiOutlineStar,
  FiThumbsUp,
  LiaAwardSolid,
  LiaHandHoldingHeartSolid,
} from '@/common/components/icons'
import {classname} from '@/common/utils/classname'

export const Contribution = () => (
  <Card className={classname(['h-full'])}>
    <header className={classname(['mb-[1.5rem]'])}>
      <div className={classname(['mb-[1rem]'])}>
        <Card.Tooltip
          text="Featured"
          icon={
            <div
              className={classname(['bg-red-600 rounded-[10rem] p-[0.7rem]'])}
            >
              <AiFillHeart />
            </div>
          }
        />
      </div>
      <Card.Title
        className={classname([
          'bg-gradient-to-r from-[#FFE853] to-[#FF343F]',
          'pl-[1.5rem]',
        ])}
      >
        Support Unique Ideas
      </Card.Title>
    </header>
    <div className={classname(['mb-[3rem]'])}>
      <ul
        className={classname([
          'font-extrabold flex flex-col gap-[1rem] mb-[1rem]',
        ])}
      >
        <li
          className={classname([
            'flex justify-between items-center',
            'rounded-lg bg-white/5 px-[1.5rem] py-[0.8rem]',
          ])}
        >
          <div className={classname(['flex items-center gap-[0.6rem]'])}>
            <span>
              <IconProvider value={{color: '#FFE753', size: '2rem'}}>
                <LiaAwardSolid />
              </IconProvider>
            </span>
            Add More Profile Settings
          </div>
          <span>
            <IconProvider value={{size: '2rem'}}>
              <FiThumbsUp />
            </IconProvider>
          </span>
        </li>
        <li
          className={classname([
            'flex justify-between items-center',
            'rounded-lg bg-white/5 px-[1.5rem] py-[0.8rem]',
          ])}
        >
          <div className={classname(['flex items-center gap-[0.6rem]'])}>
            <span>
              <IconProvider value={{color: '#A4A4A7', size: '2rem'}}>
                <LiaAwardSolid />
              </IconProvider>
            </span>
            Add Dark Theme and More Accessibility
          </div>
          <span>
            <IconProvider value={{size: '2rem'}}>
              <FiThumbsUp />
            </IconProvider>
          </span>
        </li>
        <li
          className={classname([
            'flex justify-between items-center',
            'rounded-lg bg-white/5 px-[1.5rem] py-[0.8rem]',
          ])}
        >
          <div className={classname(['flex items-center gap-[0.6rem]'])}>
            <span>
              <IconProvider value={{color: '#FF7B47', size: '2rem'}}>
                <LiaAwardSolid />
              </IconProvider>
            </span>
            Add Animated Emojis in Chat
          </div>
          <span>
            <IconProvider value={{size: '2rem'}}>
              <FiThumbsUp />
            </IconProvider>
          </span>
        </li>
      </ul>
      <div className={classname(['text-right'])}>
        <span className={classname(['underline'])}>See all features</span>
      </div>
    </div>
    <div className={classname(['mb-[2rem]'])}>
      <div className={classname(['mb-[2rem]'])}>
        <div
          className={classname([
            'h-[0.3rem] rounded-xl',
            'bg-gradient-to-r',
            'from-indigo-500 from-0%',
            'via-pink-500 via-20%',
            'via-rose-600 via-50%',
            'via-white via-60%',
            'to-white to-100%',
          ])}
        />
      </div>
      <div className={classname(['flex sm:flex-row flex-col justify-between'])}>
        <div className={classname(['flex flex-col'])}>
          <span className={classname(['font-extrabold text-[2rem]'])}>
            $500k+
          </span>
          <span>Raised</span>
        </div>
        <div className={classname(['flex flex-col'])}>
          <span className={classname(['font-extrabold text-[2rem]'])}>
            20k+
          </span>
          <span>Sponsors</span>
        </div>
        <div className={classname(['flex flex-col'])}>
          <span className={classname(['font-extrabold text-[2rem]'])}>50+</span>
          <span>Inspiration</span>
        </div>
        <div className={classname(['flex flex-col'])}>
          <span className={classname(['font-extrabold text-[2rem]'])}>
            $100k+
          </span>
          <span className={classname(['text-right'])}>Goal</span>
        </div>
      </div>
    </div>
    <div
      className={classname([
        'flex sm:flex-row flex-col justify-center gap-[2rem]',
      ])}
    >
      <Button
        type="primary"
        icon={<AiOutlineStar />}
      >
        Suggest Feature
      </Button>
      <Button icon={<LiaHandHoldingHeartSolid />}>Support Ideas</Button>
    </div>
  </Card>
)

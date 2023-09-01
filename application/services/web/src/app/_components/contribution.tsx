import {IconContext} from 'react-icons'
import {AiFillHeart, AiOutlineStar} from 'react-icons/ai'
import {FiThumbsUp} from 'react-icons/fi'
import {LiaAwardSolid, LiaHandHoldingHeartSolid} from 'react-icons/lia'

import {Button} from '@/components/button'

import {HomeCard} from './home-card'

export const Contribution = () => (
  <HomeCard className="h-full">
    <header className="mb-[1.5rem]">
      <div className="mb-[1rem]">
        <HomeCard.Tooltip
          text="Featured"
          icon={
            <div className="bg-red-600 rounded-[10rem] p-[0.7rem]">
              <AiFillHeart />
            </div>
          }
        />
      </div>
      <HomeCard.Title
        className="
        bg-gradient-to-r from-[#FFE853] to-[#FF343F]
        pl-[1.5rem]
        "
      >
        Support Unique Ideas
      </HomeCard.Title>
    </header>
    <div className="mb-[3rem]">
      <ul className="font-extrabold flex flex-col gap-[1rem] mb-[1rem]">
        <li
          className="
          flex justify-between items-center
          rounded-lg bg-white/5 px-[1.5rem] py-[0.8rem]
          "
        >
          <div className="flex items-center gap-[0.6rem]">
            <span>
              <IconContext.Provider value={{color: '#FFE753', size: '2rem'}}>
                <LiaAwardSolid />
              </IconContext.Provider>
            </span>
            Add More Profile Settings
          </div>
          <span>
            <IconContext.Provider value={{size: '2rem'}}>
              <FiThumbsUp />
            </IconContext.Provider>
          </span>
        </li>
        <li
          className="
          flex justify-between items-center
          rounded-lg bg-white/5 px-[1.5rem] py-[0.8rem]
          "
        >
          <div className="flex items-center gap-[0.6rem]">
            <span>
              <IconContext.Provider value={{color: '#A4A4A7', size: '2rem'}}>
                <LiaAwardSolid />
              </IconContext.Provider>
            </span>
            Add Dark Theme and More Accessibility
          </div>
          <span>
            <IconContext.Provider value={{size: '2rem'}}>
              <FiThumbsUp />
            </IconContext.Provider>
          </span>
        </li>
        <li
          className="
          flex justify-between items-center
          rounded-lg bg-white/5 px-[1.5rem] py-[0.8rem]
          "
        >
          <div className="flex items-center gap-[0.6rem]">
            <span>
              <IconContext.Provider value={{color: '#FF7B47', size: '2rem'}}>
                <LiaAwardSolid />
              </IconContext.Provider>
            </span>
            Add Animated Emojis in Chat
          </div>
          <span>
            <IconContext.Provider value={{size: '2rem'}}>
              <FiThumbsUp />
            </IconContext.Provider>
          </span>
        </li>
      </ul>
      <div className="text-right">
        <span className="underline">See all features</span>
      </div>
    </div>
    <div className="mb-[2rem]">
      <div className="mb-[2rem]">
        <div
          className="
          h-[0.3rem] rounded-xl
          bg-gradient-to-r 
          from-indigo-500 from-0% 
          via-pink-500 via-20% 
          via-rose-600 via-50% 
          via-white via-60%
          to-white to-100%
          "
        />
      </div>
      <div className="flex sm:flex-row flex-col justify-between">
        <div className="flex flex-col">
          <span className="font-extrabold text-[2rem]">$500k+</span>
          <span>Raised</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-[2rem]">20k+</span>
          <span>Sponsors</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-[2rem]">50+</span>
          <span>Inspiration</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-[2rem]">$100k+</span>
          <span className="text-right">Goal</span>
        </div>
      </div>
    </div>
    <div className="flex sm:flex-row flex-col justify-center gap-[2rem]">
      <Button
        type="primary"
        icon={<AiOutlineStar />}
      >
        Suggest Feature
      </Button>
      <Button icon={<LiaHandHoldingHeartSolid />}>Support Ideas</Button>
    </div>
  </HomeCard>
)

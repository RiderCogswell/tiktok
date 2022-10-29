import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from '../utils/constants'


const Discover = () => {
  const router = useRouter();
  const { query } = router; // not destructuring for sake of using topic as an iteratble already

  const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#FE2C55] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#FE2C55]';
  const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'> 
        Popular Topics
      </p> 
      <div className='flex gap-3 flex-wrap'>
        {topics.map((topic) => (
          <Link href={`/?topic=${topic.name}`} key={topic.name}>
            <div className={ query.topic === topic.name ? activeTopicStyle : topicStyle}>
              <span className='font-bold text-2xl xl:text-md'>
                {topic.icon}
              </span>
              <span className='hidden xl:block capitalize font-medium text-md '>
                {topic.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover
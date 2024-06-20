import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from '../utils/constants'


const Discover = () => {
  const router = useRouter();
  const { query } = router; // not destructuring for sake of using topic as an iteratble already

  const activeTopicStyle = 'flex gap-3 hover:bg-primary hover:bg-opacity-50 active:bg-opacity-100 p-3 cursor-pointer font-semibold rounded text-[#FE2C55]';
  const topicStyle = 'flex gap-3 hover:bg-primary hover:bg-opacity-50 active:bg-opacity-100 p-3 cursor-pointer font-semibold rounded';

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='gap-3'>
        {topics.map((topic) => (
          <Link href={`/?topic=${topic.name}`} key={topic.name}>
            <a className={ query.topic === topic.name ? activeTopicStyle : topicStyle}>
              <span className='font-bold text-3xl'>
                {topic.icon}
              </span>
              <span className='hidden xl:block capitalize text-md font-bold'>
                {topic.name}
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from '../utils/constants'


const Discover = () => {
  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div>
        {topics.map((items) => (
          <Link href={`/?topics/${}`}>

          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover
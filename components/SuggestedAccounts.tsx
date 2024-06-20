import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import { User } from '../types'

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore()

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])
  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Suggested Accounts</p>

      <div>
        {allUsers.slice(0, 5).map((user: User) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <a className='flex gap-3 hover:bg-primary hover:bg-opacity-50 active:bg-opacity-100 p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  src={user.image}
                  width={34}
                  height={34}
                  className='rounded-full'
                  layout='responsive'
                  alt='user profile'
                />
              </div>
              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {user.userName.replaceAll(' ', '')}
                  <GoVerified className='text-blue-400'/>
                </p>
                <p className='text-gray-400 capitalize text-xs'>{user.userName}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts

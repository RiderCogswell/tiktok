import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import { NoResults } from './NoResults'

const Comments = () => {
  const { userProfile } = useAuthStore()
  const comments = [];
  const isPosting = false;
  
  return (
    <div className='border-r-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments.length ? (
          <div>videos</div>
        ) : (
          <NoResults text='Be the first to comment!' />
        )}

        {userProfile && (
          <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
            <form onSubmit={() => {}} className='flex gap-4'>
              <input 
                className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg' 
                onChange={() => {}}
                placeholder='Add a comment...'
              />
              <button className='text-md text-gray-400' onClick={() => {}}>
                {isPosting ? 'Commenting...' : 'Comment'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments
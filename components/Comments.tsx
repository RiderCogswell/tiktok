import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import { NoResults } from './NoResults'
import { User } from '../types'

interface IProps {
  isPosting: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: any;
  comments: any;
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string }
}

const Comments = ({comment, setComment, addComment, isPosting, comments }: IProps) => {
  const { userProfile, allUsers } = useAuthStore()

  return (
    <div className='border-r-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length ? (
          comments.map((comment: { postedBy: { _id: any; _ref: any }; comment: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }, idx: React.Key | null | undefined) => (
            <>
              {allUsers.map((user: User) => (
                user._id === (comment.postedBy._id || comment.postedBy._ref) && (
                  <div className='p-2 items-center' key={idx}>
                    <Link href={`/profile/${user._id}`}>
                      <a className='flex items-start gap-3'>
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
                    <div>
                      {comment.comment}
                    </div>
                  </div>
                )
              ))}
            </>
          ))
        ) : (
          <NoResults text='Be the first to comment!' />
        )}
      </div>
      {userProfile && <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
        <form onSubmit={addComment} className='flex gap-4'>
          <input
            value={comment}
            className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment...'
          />
          <button className='text-md text-gray-400' onClick={addComment}>
            {isPosting ? 'Commenting...' : 'Comment'}
          </button>
        </form>
      </div>}
    </div>
  )
}

export default Comments

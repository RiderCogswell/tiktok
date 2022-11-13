import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'

import useAuthStore from '../store/authStore'

interface IProps {
  handleLike: () => void
  handleDislike: () => void 
  likes: any[]
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
  const [liked, setLiked] = useState(false)
  const { userProfile }: any = useAuthStore()
  const filterLikes = likes?.filter((like) => like._ref === userProfile?._id)

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [filterLikes, likes])

  return (
    <div className='gap-6'>
      <div className='flex flex-col justify-center items-center mt-4 cursor-pointer'>
        {liked ? (
          <div className='bg-primary rounded-full p-2 md:p-4 text-[#FE2C55]' onClick={handleDislike}> 
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4' onClick={handleLike}> 
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold'>{likes?.length | 0}</p>
      </div>
    </div>
  )
}

export default LikeButton
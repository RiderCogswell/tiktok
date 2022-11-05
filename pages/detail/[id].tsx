import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import { Video } from '../../types'

interface IProps {
  postDetails: Video
}

const Detail = ({ postDetails } : IProps) => {
  const [post, setPost] = useState(postDetails)
  const [isPlaying, setIsPlaying] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  if (!post) return null;

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p>
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video 
              ref={videoRef}
              loop
              onClick={() => {}}
              src={post.video.asset.url}
              className='cursor-pointer h-full'
            >

            </video>
          </div>
          <div>
            {!isPlaying && (
              <button>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id }
} : { params: { id: string} // type
}) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/post/${id}`
  )

  return {
    props: { postDetails: data },
  }
}

export default Detail
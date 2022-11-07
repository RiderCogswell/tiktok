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
  const [isMuted, setIsMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter();

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  if (!post) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [post, isMuted])
  

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}> 
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video 
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className='cursor-pointer h-full'
            >

            </video>
          </div>
          <div>
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer' />
              </button>
            )}
          </div>
        </div>

        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isMuted ? (
            <button onClick={
              () => {setIsMuted(false)}
            }>
              <HiVolumeOff className='text-white text-2xl lg:text-4xl'/>
            </button>
          ) : (
            <button onClick={
              () => {setIsMuted(true)}
            }>
              <HiVolumeUp className='text-white text-2xl lg:text-4xl'/>
            </button>
          )}
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
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
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
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
          <div className=' absolute top-[45%] left-[45%] cursor-pointer'>
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
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

      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='mt-10 lg:mt-20'>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='md:w-20 md:h-20 w-16 h-16 ml-4'>
              <Link href='/'>
                <>
                  <Image 
                    width={62}
                    height={62}
                    className='rounded-full'
                    src={post.postedBy.image}
                    alt='profile photo'
                    layout='responsive'
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href='/'>
                <div className='flex flex-col mt-3 gap-2'>
                  <p className='flex items-center gap-2 md:text-md font-bold text-primary'>
                    {post.postedBy.userName} {`
                    `}
                    <GoVerified 
                    className='text-blue-400 text-md'/>
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
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
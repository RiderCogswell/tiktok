import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

import { topics } from '../utils/constants';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setvideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name)
  const [savingPost, setSavingPost] = useState(false)

  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets.upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      .then((data) => {
        setvideoAsset(data);
        setIsLoading(false);
      })
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
    }

    const document = {
      _type: 'post',
      caption,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset?._id,
        }
      },
      userId: userProfile?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id,
      },
      topic: category,
    }

    await axios.post('http://localhost:3000/api/post', document)

    router.push('/');
  }

  return (
    <div className='flex h-full w-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
      <div className='bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-[#fe2c55bf] hover:bg-gray-100'>
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video 
                      src={videoAsset.url}
                      loop 
                      controls
                      className='rounded-xl h-[450px] w-[400px] bg-black'
                    >

                    </video>
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-6xl text-gray-300' />
                        </p>
                        <p className='text-xl font-semibold'>Upload video</p>
                      </div>
                      <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                        MP4 / WebM / ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className='bg-[#FE2C55] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select file
                      </p>
                    </div>
                    <input 
                      type="file" 
                      name='upload-video'
                      onChange={uploadVideo}
                      className='w-0 h-0'
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className='text-center text-xl text-red-400 font-semibold w-[250px]'>
                Please select another video
              </p>
            )}
          </div>

        </div>
          <div className='flex flex-col gap-3 pb-10'>
            <label className='text-md font-medium'>
              Caption
            </label>
            <input 
              type="text" 
              value={caption}
              onChange={(e) => setCaption(e.target.value)} 
              className='border-2 border-gray-200 rounded p-2 outline-none text-md'
              placeholder='Add a caption...'
            />
            <label className='text-md font-medium'>Choose a Category</label>
            <select 
              onChange={(e) => setCategory(e.target.value)}
              className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
              placeholder='Choose a category'
            >
              {topics.map((topic) => (
                <option 
                  key={topic.name} 
                  className='text-md outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                  value={topic.name}
                >
                  {topic.name}
                </option>
              ))}
            </select>
            <div className='flex gap-6 mt-10'>
              <button 
                onClick={() => {}}
                type='button'
                className='border-gray-200 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:bg-primary hover:bg-opacity-25 active:bg-opacity-100'
              >
                Discard
              </button>
              <button 
                onClick={handlePost}
                type='button'
                className='bg-[#FE2C55] active:bg-[#fe2c56d4] border-2 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
              >
                Post
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Upload;
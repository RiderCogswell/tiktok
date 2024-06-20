import axios from 'axios'
import {NoResults} from '../components/NoResults';
import {VideoCard} from '../components/VideoCard';
import Head from 'next/head';

import {Video} from '../types';
import {BASE_URL} from '../utils';

interface IProps {
  videos: Video[]
}

const Home = ({videos}: IProps) => {
  return (
    <>
      <Head>
        <title>TikTok</title>
      </Head>
      <div className='flex flex-col gap-10 videos h-full'>
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post={video} key={video._id}/>
          ))
        ) : (
          <NoResults text={'No videos'}/>
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const {data} = await axios.get(`${BASE_URL}/api/post`) // destructure data out and pass it through as video

  return {
    props: {
      videos: data
    }
  }
}

export default Home

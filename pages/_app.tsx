import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'

import { Navbar } from '../components/Navbar'

import { Sidebar } from '../components/Sidebar'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR , setIsSSR] = useState(true); 

  useEffect(() => { // if we come across this code, it means that we are using react, which is Client Side Rendered, so we set isSSR to false
    setIsSSR(false);
  }, []) // only run at the start so leave dependency array empty

  if (isSSR) return null;// we create this base case so that if we are server side rendering, we do not want to show our components

  return (
    <div>
      <Navbar />      
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar />
        </div>
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 '>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

export default MyApp

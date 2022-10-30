import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import Link from 'next/link'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import { Footer } from './Footer'


export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;

  const normalLink = 'flex items-center gap-3 hover:bg-primary hover:bg-opacity-75 active:bg-opacity-100 p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#FE2C55] rounded'
  
  return (
    <div>
      <div 
        className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div> 
      {showSidebar && ( // shortcircuit
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='text-xl hidden xl:block'>
                  For You
                </span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-2'>
                Log in to like and comment on videos
              </p>
              <div className='pr-4'>
                <GoogleLogin 
                  clientId=''
                  render={(renderProps) => (
                    <button 
                      className='cursor-pointer bg-white text-lg text-[#FE2C55] border-[1px] border-[#FE2C55] font-semibold px-6 py-3 w-full rounded-md mt-3 hover:bg-[#FE2C550f] active:bg-[#FE2C5529]'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log in
                    </button>
                  )}
                  onSuccess={() => {}}
                  cookiePolicy='single_host_origin'
                />
              </div>
            </div>
          )}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}

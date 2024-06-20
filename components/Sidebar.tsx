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

  const normalLink = 'flex items-center gap-3 hover:bg-primary hover:bg-opacity-50 active:bg-opacity-100 p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#FE2C55] rounded'

  return (
    <div>
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-0 border-gray-200 '>
            <Link href='/'>
              <a className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='text-xl hidden xl:block'>
                  For You
                </span>
              </a>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
    </div>
  )
}

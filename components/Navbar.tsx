import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { Logout, Search } from 'tabler-icons-react'
import { IoMdAdd } from 'react-icons/io';
import { User } from '../types';

import Logo from '../utils/tiktok.png'
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';

export const Navbar = () => {
  const [user, setUser] = useState<User | null>();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const { userProfile, addUser, removeUser }: any = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className='w-full flex justify-between items-center border-b border-gray-200 py-2 px-4'>
      <Link href='/'>
        <a className='w-[100px] md:w-[130px]'>
          <Image
            className='cursor-pointer'
            src={Logo}
            alt='Tiktok'
          />
        </a>
      </Link>

      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
            placeholder='Search accounts and videos'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <Search />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border px-2 py-1 md:px-4 text-md font-semibold flex items-center gap-2 hover:bg-primary hover:bg-opacity-25 active:bg-opacity-100'>
                <IoMdAdd className='text-xl' /> {` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile?.image && (
              <Link href='/'>
                <a>
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full'
                    src={userProfile?.image}
                    alt='profile photo'
                  />
                </a>
              </Link>
            )}
            <button type='button' className='px-2' onClick={() => {
              googleLogout();
              removeUser();
            }}>
              <Logout color='#FE2C55' fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('error')}
          />
        )}
      </div>
    </div>
  )
}

import React from 'react'

import { footerList1, footerList2, footerList3 } from '../utils/constants'

export const List = ({ items } : { items: string[] }) => ( 
  <div className='flex flex-wrap gap-2 mt-5'>
    {items.map((item) => (
      <p key={item} className="text-gray-400 text-sm hover:underline cursor-pointer">
        {item}
      </p>
    ))}
  </div>
)

export const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} />
      <List items={footerList2} />
      <List items={footerList3} />
      <p className='text-gray-200 text-sm mt-5'>&copy;2022 Rider&apos;s TikTok</p>
    </div>
  )
}

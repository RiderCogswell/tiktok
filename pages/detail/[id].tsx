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
  return (
    <div>

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
"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, {useEffect} from 'react'

function Header() {

    const path = usePathname()
    useEffect(()=>{
        console.log(path)
    }, [])

  return (
    <div className="flex p-4 items-center justify-between bg-transparent shadow-sm">
      <h1 className='text-2xl font-bold text-blue-900'>CareAI</h1>
      <ul className="hidden md:flex gap-8">
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/'&&'text-primary font-bold'}`}>Home</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/home'&&'text-primary font-bold'}`}>Features</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/whyus'&&'text-primary font-bold'}`}>Why Us</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/pricing'&&'text-primary font-bold'}`}>Pricing</li>
      </ul>
    </div>
  )
}

export default Header

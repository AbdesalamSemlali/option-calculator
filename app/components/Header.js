"use client";
import React from 'react'
import { useState} from 'react';
import BurgerMenu from './BurgerMenu';
import Link from 'next/link';
const Header = () => {
    const [open, setOpen]= useState(false)
  return (
    <header className='md:px-10 md:py-4 px-4 py-2 border border-neutral-300 flex justify-between items-center '>
        <div className='text-neutral-800 text-2xl md:text-[28px] font-bold'>
            <Link href={"/"}>FinanceTK</Link>
        </div>

        <div className='flex space-x-10 items-center justify-center'>
            <div className={`flex space-x-2 items-center ${!open ? "-translate-y-28" : ""} transition-all duration-200 ease-in`}>
                <div className='relative w-6 h-6'>
                    <img src="/calculator.png" alt="calc" />
                </div>
                <Link className='text-neutral-800 text-base font-light leading-snug' href={"/"}>Option pricing calculator</Link>
            </div>
            <div className={`flex space-x-2 items-center ${!open ? "-translate-y-28" : ""} transition-all duration-200 ease-in`}>
                <div className='relative w-6 h-6'>
                    <img src="/percentage.png" alt="%" />
                </div>
                <Link className='text-neutral-800 text-base font-light leading-snug' href={"/yields"}>Yield curve</Link>
            </div>

            <div className='z-20' onClick={()=>setOpen(!open)}><BurgerMenu open={open}/></div>
        </div>
        
        
    </header>
  )
}

export default Header
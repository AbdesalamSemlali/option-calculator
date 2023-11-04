import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-10 bg-gray-200 flex justify-center items-center text-black text-sm font-light leading-none sticky bottom-0 z-10'>
        Made By 
        <a className='font-bold px-1' href="https://www.linkedin.com/in/abdessalam-semlali-5a6589238/" target='_blank'> 
            Abdesalam Semlali
        </a> & 
        <a className='font-bold px-1' href="https://www.linkedin.com/in/el-farouk-touhafi-1689851bb/" target='_blank' > 
        El Farouk Touhafi
        </a>
        Designed By <a className='font-bold px-1' href="https://www.linkedin.com/in/said-bari/" target='_blank' > Said Bari </a>
    </div>
  )
}

export default Footer
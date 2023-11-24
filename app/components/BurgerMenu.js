import React from 'react'

const BurgerMenu = ({open}) => {
  if(open){
      return (
        <div  
          className='h-8 flex flex-col cursor-pointer space-y-2 justify-center items-end z-20'>
              <div className='h-[3px] bg-black w-8 rotate-45 transition-all duration-150 ease-out'></div>
              <div className='h-[3px] bg-black w-8 -translate-y-[10px] -rotate-45 transition-all duration-150 ease-out'></div>
        </div>
      )
    }
   else{
    return (
      <div  
        className='h-8 flex flex-col cursor-pointer space-y-2 justify-center items-end z-20'>
              <div className='h-[3px] bg-black w-8 transition-all duration-150 ease-out'></div>
              <div className='h-[3px] bg-black w-8 transition-all duration-150 ease-out'></div>
      </div>
    )
   }
 
}

export default BurgerMenu
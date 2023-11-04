import React from 'react'
import { useState } from 'react'
import ReactLoading from 'react-loading';

const InputCard = ({title,text,placeholder,cardState,setCardState,help,scroll,inputType,options,grey,onClick,fetching,error}) => {
    const [dropDown,setDropDown] = useState(false)
  return (
    <div className='flex flex-col space-y-4'>
        {/*Title */}
        <div className='flex justify-between items-center'>
            <h3 className={`${grey == true ? "text-stone-300" : "text-black"} text-2xl  font-bold leading-relaxed`}>{title}</h3>
            {help==1 ? <div className='w-5 cursor-pointer h-5 relative'><img src='help.png' alt='help'/></div> : null} 
        </div>

         {/* Text */} 
        <div className={`${grey == true ? "text-stone-300" : "text-neutral-800"} text-base font-light leading-5`}>{text}</div>

        {/* Input */} 
        <div>
            {
              error ? 
                <div className="flex space-x-4 mb-4">
                  <div className="w-6 h-6 relative"><img src="alert.png" alt="thumb" /></div>
                  <div className="text-red-600 text-sm font-light leading-tight">Make sure to enter a valid Ticker !!</div>
                </div>
                : null
            }
            <div className='flex justify-between items-center relative'>
                <input  type={inputType} value={cardState}  placeholder={placeholder} className={`px-4 py-5 h-10 grow  ${grey == true ? "placeholder:text-stone-300" : "placeholder:text-zinc-400"}  rounded-lg border border-stone-300 justify-start number-input items-center`}
                    
                    onChange={(e)=>{
                    setCardState(e.target.value)
                    onClick ? onClick() : null
                    }}
                    readOnly={(scroll == 1 || grey==true)? true : false}/>
                {fetching ? <ReactLoading className='absolute right-8' type={"spin"} color={"neutral-600"} height={25} width={25} /> : null}
                {scroll==1 ? 

                    <div className={`absolute w-5 h-5 cursor-pointer right-4 ${dropDown ? "rotate-180" : ""} `} onClick={()=> { setDropDown(!dropDown)}}>
                        <img src="down.png" alt="down" />
                    </div> 
                    
                    : null 
                }
            </div>
            { (dropDown && options) ? 
                <div className='flex flex-col border max-h-36 overflow-y-scroll'>
                    {options.map((option)=> {
                        return (
                        <div 
                            key={option}
                            className='px-4 py-3.5 text-zinc-800 text-base font-light leading-[17.52px] cursor-pointer hover:bg-zinc-100' 
                            onClick={(e)=>{
                            setCardState(e.target.innerText)
                            setDropDown(false)
                            }}>
                            {option}
                        </div>
                        )
                    })}
                </div> 
            : null }
        </div>
        
          
    </div>
  )
}

export default InputCard



                
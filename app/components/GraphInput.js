import React, { useState } from 'react'

const GraphInput = ({type, inputValue, setInputValue,inputs,setInput,setYvalue,xInput,setXInput,setYInput,yInput,yValue,zValue}) => {
    const [dropDown,setDropDown] = useState(false)
  return (
    <div className='w-full'>
            
            <div className='flex items-center relative  px-4 py-5 h-10 rounded-lg border border-stone-300'>
                <div  className=" text-zinc-500">
                    {type +" "+ inputValue}
                </div>

                <div className={`absolute w-5 h-5 cursor-pointer right-1  ${dropDown ? "rotate-180" : ""} `} onClick={()=> { setDropDown(!dropDown)}}>
                    <img src="down.png" alt="down" />
                </div> 
            </div>       
                    
                
            
            { (dropDown) ? 
                <div className='flex flex-col border max-h-36 overflow-y-scroll'>
                    {inputs.map((input)=> {
                        return (
                        <div 
                            key={input}
                            className='px-4 py-3.5 text-zinc-800 text-base font-light leading-[17.52px] cursor-pointer hover:bg-zinc-100' 
                            onClick={(e)=>{
                            setDropDown(false)
                            if(type=="Z :" && inputValue=="None"){
                                setYInput(yInput.push(yValue))
                                setYvalue(xInput[0])
                                const temp = xInput
                                temp.shift()
                                setXInput(temp)
                            }
                            setInput(inputs.push(inputValue))
                            setInputValue(input)
                            const temp=inputs
                            temp.splice(temp.indexOf(input),1)
                            setInput(temp)
                            
                            }}>
                            {input}
                        </div>
                        )
                    })}
                </div> 
            : null }
        </div>
  )
}

export default GraphInput
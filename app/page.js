"use client";
import { useState, useEffect } from "react";

export default  function Home() {

  const [price, setPrice] = useState(null);
  const  [model,setModel] = useState("Binomial")
  const [option,setOption] = useState("Call")
  const [underlying, setUnderlying] = useState("")
  const [strike, setStrike] = useState("")
  const [interest, setInterest] = useState("")
  const [volatility, setVolatility] = useState("")
  const [period, setPeriod] = useState("")
  const [maturity, setMaturity] = useState(new Date().toISOString().slice(0, 10))
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://options-back-end.onrender.com/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          option,
          underlying,
          strike,
          interest,
          volatility,
          maturity,
          period,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data.");
      }

      const data = await response.json();
      setPrice(data.price); // Handle the response data as needed
    } catch (error) {
      console.error(error);
    }
  };
    
    
    

  
  
  return (

    <main className='px-28 py-14 flex gap-52'>

      <div className='flex flex-col w-[40%]'>
        <h1 className="w-[415.31px] text-black text-5xl font-bold text-left leading-[52.56px] mb-14">Option Calculator</h1>

        <div className='flex flex-col space-y-4 mb-6'>
          <h3 className='font-bold text-2xl text-black leading-relaxed'>Model</h3>
          <div className="text-neutral-800 text-base font-light leading-[17.52px]">Choose the model used to calculate the option</div>
          <div className='flex'>
            <div className={`w-1/3 h-[58px] px-[38px] py-5 ${model === "Binomial" ? "bg-zinc-800 rounded-lg  shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"}   flex justify-center items-center gap-2 text-base  leading-[17.52px] cursor-pointer`}
            onClick={(e)=>{
                setModel(e.target.innerText)
            }}
            >
              Binomial
            </div>
            <div className={`w-1/3 h-[58px] px-[38px] py-5 border ${model === "Trinomial" ? "bg-zinc-800 rounded-lg  shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"} flex justify-center items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
            onClick={(e)=>{
                setModel(e.target.innerText)
            }}
            >
              Trinomial
            </div>
            <div className={`w-1/3 h-[58px] px-[38px] py-5 ${model === "Black&Scholes" ? "bg-zinc-800 rounded-lg  shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"} flex justify-center items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
            onClick={(e)=>{
                setModel(e.target.innerText)
            }}
            >
              Black&Scholes
            </div>
          </div>
          <div className="border-b-2 w-full  bg-[#E4E4E7] "></div>
        </div>

        <div className='flex flex-col space-y-4 mb-6'>
          <h3 className='font-bold text-2xl text-black leading-relaxed'>Option Type</h3>
          <div className="text-neutral-800 text-base font-light leading-[17.52px]">Choose the model used to calculate the option</div>
          <div className='flex'>
            <div className={`w-1/2 h-[58px] px-[38px] py-5 ${option === "Call" ? "bg-zinc-800 rounded-lg  shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"} flex justify-center items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
            onClick={(e)=>{
                setOption(e.target.innerText)
            }}
            >
              Call
            </div>
            <div className={`w-1/2 h-[58px] px-[38px] py-5 ${option === "Put" ? "bg-zinc-800 rounded-lg  shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"}  flex justify-center items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
            onClick={(e)=>{
                setOption(e.target.innerText)
            }}
            >
              Put
            </div>
          </div>
          <div className="border-b-2 w-full  bg-[#E4E4E7] "></div>
        </div>

        <div className='flex flex-col space-y-4 mb-6'>
          <h3 className='font-bold text-2xl text-black leading-relaxed'>Prix du sous jacent</h3>
          <div className="text-neutral-800 text-base font-light leading-[17.52px]">Choose the model used to calculate the option</div>
          <input type="number" value={underlying}  placeholder="$ 145.00" className="px-4 py-5 h-[58px] placeholder:text-zinc-500  rounded-lg border border-stone-300 justify-start number-input items-center" 
            onChange={(e)=>{
              setUnderlying(e.target.value)
            }}
          />
          <div className="border-b-2 w-full  bg-[#E4E4E7] "></div>
        </div>

        <div className='flex flex-col space-y-4 mb-6'>
          <h3 className='font-bold text-2xl text-black leading-relaxed'>Strike</h3>
          <div className="text-neutral-800 text-base font-light leading-[17.52px]">Choose the model used to calculate the option</div>
          <input type="number" value={strike} placeholder="$ 10.00" className="px-4 py-5 h-[58px] placeholder:text-zinc-500  rounded-lg border border-stone-300 justify-start number-input items-center" 
            onChange={(e)=>{
              setStrike(e.target.value)
            }}
          />
        </div>
        
      </div>

      <div className="flex flex-col w-[40%]">
        <div className='flex flex-col space-y-4 mb-6'>
          <h3 className='font-bold text-2xl text-black leading-relaxed'>Taux d'intérêt</h3>
          <div className="text-neutral-800 text-base font-light leading-[17.52px]">Choose the model used to calculate the option</div>
          <input type="number" value={interest} placeholder="% 5.00" className="px-4 py-5 h-[58px] placeholder:text-zinc-500  rounded-lg border border-stone-300 justify-start number-input items-center" 
            onChange={(e)=>{
              setInterest(e.target.value)
            }}
          />
          <div className="border-b-2 w-full  bg-[#E4E4E7] "></div>
        </div>

        <div className='flex flex-col space-y-4 mb-6'>
          <h3 className='font-bold text-2xl text-black leading-relaxed'>Volatilité</h3>
          <div className="text-neutral-800 text-base font-light leading-[17.52px]">Choose the model used to calculate the option</div>
          <input type="number" value={volatility} placeholder="% 3.00" className="px-4 py-5 h-[58px] placeholder:text-zinc-500 rounded-lg border border-stone-300 justify-start number-input items-center" 
            onChange={(e)=>{
              setVolatility(e.target.value)
            }}
          />
          <div className="border-b-2 w-full  bg-[#E4E4E7] "></div>
        </div>

        <div className='flex flex-col space-y-4 mb-6'>
          <h3 className='font-bold text-2xl text-black leading-relaxed'>Maturité</h3>
          <div className="text-neutral-800 text-base font-light leading-[17.52px]">Choose the model used to calculate the option</div>
          <input type="date" value={maturity} className="px-4 py-5 h-[58px] rounded-lg text-zinc-500 border border-stone-300 justify-start number-input items-center" 
            onChange={(e)=>{
              setMaturity(e.target.value)
            }}
          />
        </div>

        {
          (model === "Binomial" || model === "Trinomial") ? (
            <div className='flex flex-col space-y-4 mb-6'>
              <h3 className='font-bold text-2xl text-black leading-relaxed'>Nombre de Période</h3>
              <div className="text-neutral-800 text-base font-light leading-[17.52px]">Choose the model used to calculate the option</div>
              <input
                type="number"
                placeholder="10"
                value={period}
                className="px-4 py-5 h-[58px] rounded-lg text-zinc-500 border border-stone-300 justify-start number-input items-center"
                onChange={(e) => {
                  setPeriod(e.target.value);
                }}
              />
            </div>
          ) : null
        }
        

        <div className=" flex space-x-6 justify-center items-end grow-[0.90]  "> 
          <button className="text-zinc-800 text-base py-5 font-bold  underline leading-[17.52px]"
          onClick={()=>{
            setMaturity(new Date().toISOString().slice(0, 10))
            setVolatility("")
            setInterest("")
            setStrike("")
            setUnderlying("")
            setPeriod("")
            setPrice(null)
          }}
          >Clear All</button>
          <button className="grow basis-0 shrink h-[58px] flex px-4 py-5 bg-black text-white rounded-lg justify-center items-center"
          onClick={handleSubmit}
          >Calculate</button>
        </div>
        <div className="items-center justify-center">{price}</div>
      </div>
      
    </main>
  )
}

















"use client" ; 
import React, { useEffect, useState, useMemo } from 'react'
import YieldGraph from '../components/YieldGraph'
import InputCard from '../components/InputCard';
import ReactLoading from 'react-loading';
import countryList from 'react-select-country-list'

const page = () => {
  
  const [type,setType] = useState("Interpolation")
  const [model,setModel] = useState("Nelson-Siegel")
  const [country,setCountry] = useState("Morocco")
  const countries = useMemo(() => countryList().getLabels(), [])
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")
  const [pathType,setPathType] = useState("Mean")
  const [simulations,setSimulations] = useState("")
  const [loading,setLoading] = useState(false)
  const [x_est,setX_est] = useState(null)
  const [y_est,setY_est] = useState(null)
  const [x,setX] = useState(null)
  const [y,setY] = useState(null)

  const graphData = {
    x_est,
    y_est,
    x,
    y,
    type,
    masterGraph: {
      title: type == "Interpolation" ? model : "Vasicek Garch",
      xAxis: "Maturity Per Day",
      yAxis: "Interest Rate",
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      const response = await fetch("https://options-back-end.onrender.com/yieldPlot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          startDate,
          endDate,
          pathType,
          simulations,
          type,
          country
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data.");
      }

      const data = await response.json();
      setX_est(data.x_est)
      setY_est(data.y_est)
      setX(data.x)
      setY(data.y)
      setLoading(false)
      
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <main className='flex'>
      <div className='flex flex-col py-20 px-10 w-[35%] space-y-8 h-screen overflow-y-scroll sticky top-0'>
        
      <InputCard cardState={country} setCardState={setCountry} title={"Country"} text={"Choose the Country to import your Zero-Coupon data from"} placeholder={"Morocco"} inputType={"Text"} scroll={1} options={countries}/>



        <div className='flex flex-col space-y-4'>
          <h3 className='font-bold text-2xl text-black leading-relaxed'>Method</h3>
          <div className="text-neutral-800 text-base font-light leading-[17.52px]">Do you want to Interpolate or Model ? </div>
          <div className='flex h-10'>
                  <div className={`w-1/2 rounded-l-lg px-6 py-2 ${type === "Interpolation" ? "bg-zinc-800 shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"} flex justify-start items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
                  onClick={(e)=>{
                      setType("Interpolation")
                  }}
                  >
                    Interpolation
                  </div>
                  <div className={`w-1/2 rounded-r-lg px-6 py-2 ${type === "Modeling" ? "bg-zinc-800 shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"}  flex justify-start items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
                  onClick={(e)=>{
                      setType("Modeling")
                  }}
                  >
                    Modeling
                  </div>
            </div>
        </div>

        <InputCard cardState={startDate} setCardState={setStartDate} title={"Start Date"} text={"Choose your data's starting Date"} placeholder={"dd-mm-yyyy"} inputType={"Text"}/>
        
        
        {
          type == "Modeling" ? 
           
          <>
          <InputCard cardState={endDate} setCardState={setEndDate} title={"End Date"} text={"Choose your data's ending Date"} placeholder={"dd-mm-yyyy"} inputType={"Text"}/>
          <InputCard cardState={pathType} setCardState={setPathType} title={"Path Type"} text={"Choose Your Path Type"} placeholder={"Mean"} inputType={"Text"} scroll={1} options={["Mean","Median","Simulations"]}/>
          <InputCard cardState={simulations} setCardState={setSimulations} title={"Simulations Number"} text={"Choose Simulation Number"} placeholder={"100"} inputType={"Text"}/>
          </>
          : 
          <InputCard cardState={model} setCardState={setModel} title={"Interpolation Method"} text={"Choose the method"} placeholder={"Nelson-Siegel"} inputType={"Text"} scroll={1} options={["Bootsrapping","Linear-Interpolation","Cubic-Interpolation","Cubic Spline","Nelson-Siegel","Nelson-Siegel-Svenson"]}/>
          
        }
        
      </div>

      <div className="flex flex-col w-[65%]">
        <div className="w-full px-24 py-20 flex-1">
            <div className="flex items-center justify-between mb-12">
                    <h1 className="text-black text-[40px] font-bold leading-[43.80px]">Yield Curve Zero Coupons</h1>
                    <div className="relative w-6 h-6 cursor-pointer">
                      <img src="download.png" alt="download" />
                    </div>
            </div>

            <div className="flex space-x-4 mb-8">
                <div className="w-6 h-6 relative"><img src="thumb.png" alt="thumb" /></div>
                <p className="text-neutral-600 text-base font-light leading-snug">Use the menu on the left to input your parameters and your model of choice.</p>
            </div>
            <div className=" flex space-x-10 justify-center  mb-14 items-center"> {/*button container*/}
            
                <button className="text-neutral-600  text-base py-5 font-bold space-x-2  leading-[17.52px]"
                onClick={()=>{
                  setEndDate("")
                  setStartDate("")
                  setSimulations("")
                  setX(null)
                  setX_est(null)
                  setY(null)
                  setY_est(null)
                  setLoading(false)
                }}
                >    <span>X</span> <span className="underline">Clear All</span> 
                </button>

                <button className=" grow basis-0 shrink h-[58px] flex px-4 py-5 bg-black text-white rounded-lg justify-center items-center border border-black hover:scale-95 transition-all duration-100 ease-in-out"
                onClick={handleSubmit}
                > Plot
                </button>
                {loading ? <ReactLoading className='' type={"spin"} color={"neutral-600"} height={25} width={25} /> : null}

              </div>
            <YieldGraph graphData={graphData} pathType ={pathType} type={type}/>
        </div>
        
      </div>
      
    </main>
  )
}

export default page
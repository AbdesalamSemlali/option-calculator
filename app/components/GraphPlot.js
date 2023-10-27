import React from 'react'
import Graph2d from './Graph2d'
import Graph3d from './Graph3d'
import GraphInput from './GraphInput'
import { useState } from 'react'
const GraphPlot = ({receit}) => {
    const [xValue,setXvalue] = useState("Stock Price")
    const [yValue,setYvalue] = useState("BS")
    const [zValue,setZvalue] = useState("None")
    const [xInput,setXInput] = useState(["Interest rate","Volatility","Strike","Maturity","Dividend"])
    const [yInput,setYInput] = useState(["delta","gamma","vega","rho","theta"])
    const [zInput,setZInput] = useState(["BS","delta","gamma","vega","rho","theta"])
    const [x,setX] = useState(null)
    const [y,setY] = useState(null)
    const [z,setZ] = useState(null)
    const [xmin,setXmin] = useState("")
    const [xmax,setXmax] = useState("")


    const fecthPlot = async() => {
        const response = await fetch("https://options-back-end.onrender.com/getPlot" , {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          x : xValue,
          y : yValue,
          z : zValue,
          ot : receit[1],
          strike : receit[3],
          ticker : receit[8],
          exp : receit[6],
          r : receit[4]/100,
          d : receit[11]/100,
          s : receit[5]/100,
          xmin : xmin ? xmin : 0,
          xmax : xmax ? xmax : 100,
        })
      })
      const data = await response.json();
      setX(data.x)
      setY(data.y)
      setZ(data.z)
    }
    const graphData = {
        x: x,
        y: y,
        z: z,
        masterGraph: {
          title: `${yValue} variation in terms of ${xValue}`,
          xAxis: xValue,
          yAxis: yValue,
          zAxis : zValue
        }
      };
  return (
    <div className="flex items-start justify-center flex-col space-y-6 my-10">
        <h2 className="text-black text-2xl font-bold  leading-relaxed">Black&Scholes plot</h2>
        {
            zValue=="None" ? <p className="text-neutral-800 text-base font-light  leading-snug">The plot represents the impact of <span className='font-bold'>{xValue}</span> on <span className='font-bold'>{yValue}</span></p> 
            : 
            <p className="text-neutral-800 text-base font-light  leading-snug">The plot represents the impact of <span className='font-bold'>{xValue}</span> And <span className='font-bold'>{yValue}</span> on <span className='font-bold'>{zValue}</span></p>
        }
        
        <div className='flex flex-col space-y-2 w-full'>
            <div className='flex space-x-4 w-full'>
                <GraphInput type={"X :"} setInputValue={setXvalue} inputValue={xValue} inputs={xInput} setInput={setXInput}/>
                <GraphInput type={"Y :"} inputValue={yValue} setInputValue={setYvalue} inputs={(zValue=="None")? yInput : xInput } setInput={(zValue=="None")? setYInput : setXInput}/>
                <GraphInput type={"Z :"} inputValue={zValue} setInputValue={setZvalue} inputs={zInput} setInput={setZInput} yValue={yValue} setYvalue={setYvalue} xInput={xInput} setXInput={setXInput} yInput={yInput} setYInput={setYInput} zValue={zValue}/>
                <button className=" h-10 flex px-4 py-5 bg-black text-white rounded-lg justify-center items-center border border-black hover:scale-95 transition-all duration-100 ease-in-out"
                onClick={fecthPlot}
                > Plot
                </button> 
            </div>
            
            <div className='flex space-x-8 w-full'>
                <input  value={xmin}  placeholder={"xmin"} className="px-4 py-5 h-10 w-1/4 placeholder:text-zinc-500  rounded-lg border border-stone-300 justify-start number-input items-center"
                    onChange={(e)=> {
                        setXmin(e.target.value)
                    }}
                /> 
                <input  value={xmax}  placeholder={"xmax"} className="px-4 py-5 h-10 w-1/4 placeholder:text-zinc-500  rounded-lg border border-stone-300 justify-start number-input items-center"
                    onChange={(e)=> {
                        setXmax(e.target.value)
                    }}
                /> 
            </div>
            
        </div>
        
        { (zValue=="None") ? <Graph2d graphData={graphData}/> : <Graph3d graphData={graphData} />}
    </div>
  )
}

export default GraphPlot
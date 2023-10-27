"use client";
import { useState} from "react";
import InputCard from "./components/InputCard";
import ReactLoading from 'react-loading';
import GraphPlot from "./components/GraphPlot";

export default  function Home() {


 

  const [price, setPrice] = useState(null);
  const [image,setImage] = useState(null)
  const [model,setModel] = useState("Binomial")
  const [option,setOption] = useState("Call")
  const [optionType,setOptionType] = useState("European")
  const [dividend, setDividend] = useState("")
  const [strike, setStrike] = useState("")
  const [interest, setInterest] = useState("")
  const [volatility, setVolatility] = useState("")
  const [ticker, setTicker] = useState("")
  const [period, setPeriod] = useState("")
  const [maturity, setMaturity] = useState("") // useState(new Date().toISOString().slice(0, 10))
  const [receit, setReceit] = useState(Array(17).fill(""))
  const [expiries,setExpiries] = useState(null)
  const [tickers, setTickers] =useState(null)
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [tickerError,setTickerError] = useState(null)
  const [fetching, setFetching] = useState(false)


  const TICKERS = {
    "AAPL" : "Apple",
    "AMZN" : "Amazon",
    "TSLA" : "TESLA",
    "Ntfl" : "Netflix",
    "hdfh" :"Google",
    "msft" :" Microsoft",
    "Ko" : "Coca"
  }
  const models =["Binomial","Trinomial","Black & Scholes"]



  const fetchExpiries = async (e) => {
    try {
      setFetching(true)
      const response = await fetch("https://options-back-end.onrender.com/getDates" , {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          ticker
        })
      })

      if (!response.ok) {
        setFetching(false)
        setTickerError(true)
        throw new Error("Failed to send data.");
      }
      const data = await response.json();
      if( data.expiries == "Error. No options for this symbol!"){
        setFetching(false)
        setTickerError(true)
      }
      else {
        setFetching(false)
        setTickerError(false)
        setExpiries(data.expiries)
      }
      
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      console.log(loading)
      const response = await fetch("https://options-back-end.onrender.com/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          option,
          optionType,
          dividend,
          strike,
          interest,
          ticker,
          maturity,
          period,
          volatility
        }),
      });

      if (!response.ok) {
        setLoading(false)
        setError(true)
        throw new Error("Failed to send data.");
      }

      const data = await response.json();
      setLoading(false)
      setError(false)
      setPrice(data.price);
      setReceit([optionType, option, data.st,strike,interest,data.volatility,maturity,model,ticker,data.impliedVolatility,data.realPrice,data.dividendYield,data.delta,data.gamma,data.vega,data.rho,data.theta])
      setImage(data.image)
      
    } catch (error) {
      console.error(error);
    }
  };
    
    
    

  
  
  return (

    <main className='flex'>

      <div className='flex flex-col py-20 px-10 w-[35%] space-y-8 h-screen overflow-y-scroll sticky top-0'>

        <div className='flex flex-col space-y-4'>
          <h3 className='font-bold text-2xl text-black leading-relaxed'>Option Type</h3>
          <div className="text-neutral-800 text-base font-light leading-[17.52px]">Is your option American or European ? </div>
          <div className='flex h-10'>
            <div className={`w-1/2 rounded-l-lg px-6 py-2 ${optionType === "European" ? "bg-zinc-800 shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"} flex justify-start items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
            onClick={(e)=>{
                setOptionType(e.target.innerText)
            }}
            >
              <img src="/eu.png" alt="euro" />
              European
            </div>
            <div className={`w-1/2 rounded-r-lg px-6 py-2 ${optionType === "American" ? "bg-zinc-800 shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"}  flex justify-start items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
            onClick={(e)=>{
                setOptionType(e.target.innerText)
                setModel("Binomial")
            }}
            >
              <img src="/us.png" alt="american" />
              American
            </div>
          </div>
          <div className='flex h-10 '>
            <div className={`w-1/2 rounded-l-lg px-6 py-2 ${option === "Call" ? "bg-zinc-800  shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"} flex justify-start items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
            onClick={(e)=>{
                setOption(e.target.innerText)
            }}
            > 
              <img  className="rotate-180" src="/put.png" alt="call" />
              Call
            </div>
            <div className={`w-1/2 rounded-r-lg px-6 py-2 ${option === "Put" ? "bg-zinc-800  shadow-inner font-medium text-white" : "border border-stone-300 font-light text-black"}  flex justify-start items-center gap-2  text-base  leading-[17.52px] cursor-pointer`}
            onClick={(e)=>{
                setOption(e.target.innerText)
            }}
            >
              <img src="put.png"  alt="put" />
              Put
            </div>
          </div>
        </div>

        <InputCard  cardState={ticker} setCardState={setTicker} title={"Ticker"} text={"Type the stock name to get the Maturity dates and Implied Volatility, example : AAPL"} placeholder={"AAPL"} help={1} fetching={fetching} onClick={fetchExpiries} error={tickerError}/>

        <InputCard cardState={dividend} setCardState={setDividend} title={"Dividend"} text={"Choose the stock's dividend rate, if you want it to be calculated based on your stock's choice put it equals to 0"} placeholder={"% 0.25"} />

        <InputCard cardState={volatility} setCardState={setVolatility} title={"Volatility"} text={"Choose the stock's Volatility, but if its 0 we use historical volatility"} placeholder={"% 25"} />

        <InputCard cardState={strike} setCardState={setStrike} title={"Strike"} text={"Choose the option strike "} placeholder={"$ 135"} />

        <InputCard cardState={maturity} setCardState={setMaturity} title={"Maturity"} text={"choose from the dates given by your stock choice."} placeholder={"DD/MM/YY"} help={1} scroll={1} options={expiries}/>
        
        <InputCard cardState={interest} setCardState={setInterest} title={"Interest Rate"} text={"Type the interest rate in %"} placeholder={"% 5"} />

        <InputCard cardState={model} setCardState={setModel} title={"Model"} text={"Choose the model used to calculate the option"} placeholder={"Binomial"} inputType={"Text"} scroll={1} options={(optionType=="American") ? models.slice(0,2) : models}/>

        <InputCard cardState={period} setCardState={setPeriod} title={"Period"} text={"Choose the desired period number"} placeholder={"100"} grey={(model == "Black & Scholes" ? true : false)}/>
        

        
        
      </div>

      <div className="flex flex-col w-[65%]">

          <div className="w-full px-24 py-20"> {/*Container*/}

            <div className="flex items-center justify-between mb-12">
                <h1 className="text-black text-[40px] font-bold leading-[43.80px]">Option price calculator</h1>
                <div className="relative w-6 h-6 cursor-pointer">
                  <img src="download.png" alt="download" />
                </div>
            </div>

            <div className="flex space-x-4 mb-8">
                <div className="w-6 h-6 relative"><img src="thumb.png" alt="thumb" /></div>
                <p className="text-neutral-600 text-base font-light leading-snug">Use the menu on the left to input your option parameters and your model of choice.</p>
            </div>
            {
              error ? 
                <div className="flex space-x-4 mb-8">
                  <div className="w-6 h-6 relative"><img src="alert.png" alt="thumb" /></div>
                  <div className="text-red-600 text-sm font-light leading-tight">Make sure to fill all the input fields on the left menu before clicking calculate!!</div>
                </div>
                : null
            }
          
            <div className=" flex space-x-10 justify-center items-end mb-14"> {/*button container*/}
            
                <button className="text-neutral-600  text-base py-5 font-bold space-x-2  leading-[17.52px]"
                onClick={()=>{
                  setMaturity("")
                  setVolatility("")
                  setInterest("")
                  setDividend("")
                  setStrike("")
                  setPeriod("")
                  setTicker("")
                  setReceit(Array(17).fill(""))
                  setExpiries(null)
                  setPrice(null)
                  setImage(null)
                  setLoading(false)
                  setError(false)
                }}
                >    <span>X</span> <span className="underline">Clear All</span> 
                </button>

                <button className=" grow basis-0 shrink h-[58px] flex px-4 py-5 bg-black text-white rounded-lg justify-center items-center border border-black hover:scale-95 transition-all duration-100 ease-in-out"
                onClick={handleSubmit}
                > Calculate
                </button>

              </div>
    

              <div className="border-b-2 w-full  bg-neutral-300 "></div>

              { loading ?
              <div className="flex items-center justify-center my-4">
                <ReactLoading type={"spin"} color={"neutral-600"} height={125} width={64} />
              </div>
              
            
             : null
          }
            {price ? 
                <div className="flex my-10 justify-between gap-2">
                  <div className="flex flex-col space-y-2">
                      <div className="flex space-x-4 items-center">
                        <p className="text-black text-2xl font-bold grow  leading-relaxed ">Estimated price :</p>
                        <p className="text-neutral-500 text-3xl font-bold leading-[43.80px]">$ {price}</p>
                      </div>
                    
                    {receit[10] =="0" ? null : 
                          <div className="flex space-x-4 items-center">
                              <p className="text-black text-2xl font-bold grow  leading-relaxed">Real price :</p>
                              <p className="text-neutral-500 text-3xl font-bold leading-[43.80px]">$ {(receit[10]).toFixed(3)}</p> 
                          </div>
                    }
                    { receit[7] == "Black & Scholes" ?
                      <>
                      <div className="flex space-x-4 items-center">
                              <p className="text-black text-xl font-bold grow  leading-relaxed">Delta :</p>
                              <p className="text-neutral-500 text-xl font-bold leading-[43.80px]"> {receit[12]}</p>
                      </div>

                      <div className="flex space-x-4 items-center">
                              <p className="text-black text-xl font-bold grow  leading-relaxed">Gamma :</p>
                              <p className="text-neutral-500 text-xl font-bold leading-[43.80px]"> {receit[13]}</p>
                      </div>

                      <div className="flex space-x-4 items-center">
                              <p className="text-black text-xl font-bold grow  leading-relaxed">Vega :</p>
                              <p className="text-neutral-500 text-xl font-bold leading-[43.80px]"> {receit[14]}</p>
                      </div>

                      <div className="flex space-x-4 items-center">
                              <p className="text-black text-xl font-bold grow  leading-relaxed">Rho :</p>
                              <p className="text-neutral-500 text-xl font-bold leading-[43.80px]"> {receit[15]}</p>
                      </div>

                      <div className="flex space-x-4 items-center">
                              <p className="text-black text-xl font-bold grow  leading-relaxed">Theta :</p>
                              <p className="text-neutral-500 text-xl font-bold leading-[43.80px]"> {receit[16]}</p>
                      </div>
                      </>
                      : null
                    }
                  </div>
                  <div className="flex  space-x-16">
                      <div className="flex flex-col space-y-4">
                        <p className="text-black text-base font-medium leading-[17.52px]">Ticker</p>
                        <p className="text-black text-base font-medium leading-[17.52px]">Option Type</p>
                        <p className="text-black text-base font-medium leading-[17.52px]">Stock Price</p>
                        <p className="text-black text-base font-medium leading-[17.52px]">Strike</p>
                        <p className="text-black text-base font-medium leading-[17.52px]">Interest Rate</p>
                        <p className="text-black text-base font-medium leading-[17.52px]">Volatility</p>
                        <p className="text-black text-base font-medium leading-[17.52px]">Maturity</p>
                        <p className="text-black text-base font-medium leading-[17.52px]">Model</p>
                        {receit[9]=="0" ? null :  <p className="text-black text-base font-medium leading-[17.52px]">Implied Volatility</p>}
                        <p className="text-black text-base font-medium leading-[17.52px]">Dividend Yield</p>
                      </div>
                      <div className="flex flex-col space-y-4">
                        <p className="self-start text-neutral-600 text-base font-light leading-[17.52px]"> {receit[8]}</p>
                        <p className="self-start text-neutral-600 text-base font-light leading-[17.52px]"> {receit[0]+" "+receit[1]}</p>
                        <p className="self-start text-neutral-600 text-base font-light leading-[17.52px]">$ {receit[2]}</p>
                        <p className="self-start text-neutral-600 text-base font-light leading-[17.52px]">$ {receit[3]}</p>
                        <p className="self-start text-neutral-600 text-base font-light leading-[17.52px]">% {receit[4]}</p>
                        <p className="self-start text-neutral-600 text-base font-light leading-[17.52px]">% {receit[5]}</p>
                        <p className="self-start text-neutral-600 text-base font-light leading-[17.52px]">{receit[6]}</p>
                        <p className="self-start text-neutral-600 text-base font-light leading-[17.52px]">{receit[7]}</p>
                        {receit[9]=="0" ? null :<p className="self-start text-neutral-600 text-base font-light leading-[17.52px]">% {(receit[9]*100).toFixed(3)}</p>}
                        <p className="self-start text-neutral-600 text-base font-light leading-[17.52px]">% {receit[11]}</p>
                      </div>
                </div>
              </div> 
              : null
            }

            <div className="border-b-2 w-full  bg-neutral-300 "></div>
            { image ?
            <div className="flex flex-col space-y-2 my-8 items-center justify-center">
                <div className="text-black text-3xl font-bold  leading-relaxed">{receit[7]} Tree Plot</div>
                <div className="w-fit h-fit relative">
                        <img className="h-full w-full" src={`data:image/png;base64,${image}`} alt="Generated Image" />
                </div>
            </div>
            : null}


            { receit[7]=="Black & Scholes" ? <GraphPlot receit={receit}/> : null }
    
          </div>


          
      </div>
        
        
    </main>
  )
}

















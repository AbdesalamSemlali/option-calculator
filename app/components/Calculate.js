import React from 'react'

export default async function Calculate ({setPrice}){
    const apiUrl = 'http://127.0.0.1:5000/calculate';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_value: 2 }),
      })
        .then(response => response.json())
        .then(data => setPrice(data.price))
        .catch(error => console.error('Error calculating price:', error));
  return (
    <button className="grow basis-0 shrink h-[58px] flex px-4 py-5 bg-black text-white rounded-lg justify-center items-center"
          onClick={()=>{
            
            console.log(price)
            
          }}
          >Calculate</button>
  )
}

import React from 'react'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false
})

const Graph2d = ({graphData,type,pathType}) => {
  let simulationTraces = []

  if ( type=="Modeling" && pathType == "Simulations" && graphData.y_est) {
    simulationTraces = graphData.y_est.map((simulation, index) => ({
      type: 'scatter',
      mode: 'lines',
      x: graphData.x_est,
      y: simulation,
      marker: {color : 'rgba(0, 0, 255,0.1)'},
      name : `Simulation ${index}`
    }))
  }

  return (
    <Plot
        data={[
          ...(type=="Modeling" ) && graphData.y_est && pathType == "Simulations" ? simulationTraces : [{
            type: "scatter",
            mode : "lines",
            x: graphData.x_est,
            y: graphData.y_est,
            name: 'Estimated',
          }]
          ,
          {
            type: 'scatter',
            mode: graphData.type=="Modeling"  ? "lines" : 'markers',
            x: graphData.x,
            y: graphData.y ,
            marker: { color: 'red' },
            name: 'Real Data',
          }
        ]}
        layout={{
          width: 670,
          height: 400,
          margin: {
            l: 50,
            r: 50,
            b: 80,
            t: 90,
            pad: 4
          },
          title: graphData.masterGraph.title,
          scene: {
            xaxis: {
              title: graphData.masterGraph.xAxis,
            },
            yaxis: {
              title: graphData.masterGraph.yAxis,
            }
          }
        }}
      />
  )
}

export default Graph2d








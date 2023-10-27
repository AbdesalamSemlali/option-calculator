import React from 'react'
import Plot from "react-plotly.js"



const Graph2d = ({graphData}) => {
  return (
    <Plot
        data={[
          {
            type: "scatter",
            mode : "lines",
            x: graphData.x,
            y: graphData.y,
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








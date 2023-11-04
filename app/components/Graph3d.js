import React from 'react'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false
})

  
  const Graph3d = ({graphData}) => {
    
      return (
        <Plot
          data={[
            {
              type: "surface",
              x: graphData.z ? graphData.x : [1, 2, 3, 4, 5, 6],             
              y: graphData.z ? graphData.y : [78, 3, 8, 3, 8, 3],
              z: graphData.z ? graphData.z : [5, 5, 5, 3, 3, 3]
            }
          ]}
          layout={{
            width : 600,
            height : 600 ,
            title: graphData.masterGraph.title,
            scene: {
              xaxis: {
                title: graphData.masterGraph.xAxis,
                titlefont: {
                  family: "Courier New, monospace",
                  size: 12,
                  color: "#444444"
                }
              },
              yaxis: {
                title: graphData.masterGraph.yAxis,
                titlefont: {
                  family: "Courier New, monospace",
                  size: 12,
                  color: "#444444"
                }
              },
              zaxis: {
                title: graphData.masterGraph.zAxis,
                titlefont: {
                  family: "Courier New, monospace",
                  size: 12,
                  color: "#444444"
                }
              }
            }
          }}
        />
      );
    }
  
  export default Graph3d;
  
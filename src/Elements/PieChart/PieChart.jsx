// import { blue, blueGrey, green, red, yellow } from '@mui/material/colors';
import React from 'react'
import { Chart } from "react-google-charts";

export const data = [
  ["Languages", "Learn"],
  ["MongoDB", 3.5],
  ["Express JS", 5],
  ["React JS", 6.7],
  ["Next JS", 4],
];

export var title = {
  title: "Team Competency",
  colors: ["#199555", '#F1C617',  "#0082FF", "#93C747"]
};

const PieChart = () => {
  return (
    <>
        <div className="shadow-slate-700 drop-shadow-2xl">
          <Chart
              chartType="PieChart"
              data={data}
              options={title}
              width={"100%"}
              height={"400px"}  
          />
        </div>
    </>
  )
}

export default PieChart
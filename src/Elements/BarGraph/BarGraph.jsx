import React from 'react';
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Languages"],
  ["2014", 800],
  ["2015", 370],
  ["2016", 660],
  ["2017", 400],
];

export const options = {
  chart: {
    title: "Languages",
    subtitle: " ",
  },
};

const BarGraph = () => {
  const containerStyles = {
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Equivalent to Tailwind's drop-shadow-2xl
  };

  return (
    <div style={containerStyles}>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default BarGraph;





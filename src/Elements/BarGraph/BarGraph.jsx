import React from "react";
import { Chart } from "react-google-charts";
import "./BarGraph.css"

export const data = [
  ["Year", "Skills"],
  ["A1", 3],
  ["A3", 1],
  ["C1", 4],
  ["C3", 2],
];

export const options = {
  title: "Languages",
  titleTextStyle: {
    fontSize: 24, // Increase title font size
    bold: true,
  },
  legend: {
    position: 'bottom', // Position legend at the bottom
    textStyle: {
      fontSize: 18, // Increase legend font size
    },
  },
  bar: {
    groupWidth: "80%", // Adjust the width of bars
  },
  chartArea: {
    left: '5%', // Reduce left padding
    top: '20%',
    width: '90%', // Increase chart area width
    height: '60%',
  },
};

export function BarGraph() {
  return (
    <div className="bar-graph-container">
      <Chart
        chartType="ColumnChart" // Use ColumnChart for vertical bars
        width="100%"  // Set to 100% to fill the container
        height="350px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default BarGraph;

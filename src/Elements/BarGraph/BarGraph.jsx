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
    groupWidth: "60%", // Adjust the width of bars
  },
  chartArea: {
    left: '15%', // Add left padding
    top: '20%',  // Add top padding
    width: '70%', // Adjust chart area width
    height: '60%', // Adjust chart area height
  },
};

export function BarGraph() {
  return (
    <div className="bar-graph-container drop-shadow-xl">
      <Chart
        chartType="ColumnChart" // Use ColumnChart for vertical bars
        width="130%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

export default BarGraph;

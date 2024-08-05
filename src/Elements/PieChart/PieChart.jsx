import React from 'react';
import { Chart } from 'react-google-charts';
import './PieChart.css'; // Import the CSS file here

export const data = [
  ["Languages", "Learn"],
  ["MongoDB", 3.5],
  ["Express JS", 5],
  ["React JS", 6.7],
  ["Next JS", 4],
];

export const options = {
  title: "Team Competency",
  colors: ["#199555", '#F1C617', "#0082FF", "#93C747"],
  titleTextStyle: {
    fontSize: 20, // Increase title font size
    bold: true,
  },
  legend: {
    // position: 'bottom',
    textStyle: {
      fontSize: 16, // Increase legend font size 
    },
  },
  pieSliceTextStyle: {
    fontSize: 18, // Increase pie slice text font size
  },
  chartArea: {
    left: 80, // Add left padding
    top: 100, // Add top padding
    right: 50,  
    width: '100%', // Adjust chart area width
    height: '65%', // Adjust chart area height
  },
};

const PieChart = () => {
  return (
    <div className="pie-chart-container drop-shadow-xl">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width="130%"
        height="400px"
      />
    </div>
  );
}

export default PieChart;

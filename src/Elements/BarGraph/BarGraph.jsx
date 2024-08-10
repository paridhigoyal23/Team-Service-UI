// import React from "react";
// import { Chart } from "react-google-charts";
// import "./BarGraph.css"

// export const data = [
//   ["Year", "Skills"],
//   ["A1", 3],
//   ["A3", 1],
//   ["C1", 4],
//   ["C3", 2],
// ];

// export const options = {
//   title: "Languages",
//   titleTextStyle: {
//     fontSize: 24, // Increase title font size
//     bold: true,
//   },
//   legend: {
//     position: 'bottom', // Position legend at the bottom
//     textStyle: {
//       fontSize: 18, // Increase legend font size
//     },
//   },
//   bar: {
//     groupWidth: "60%", // Adjust the width of bars
//   },
//   chartArea: {
//     left: '10%', // Add left padding
//     top: '20%',  // Add top padding
//     width: '80%', // Adjust chart area width
//     height: '60%', // Adjust chart area height
//   },
// };

// export function BarGraph() {
//   return (
//     <div className="bar-graph-container">
//       <Chart
//         chartType="ColumnChart" // Use ColumnChart for vertical bars
//         width="130%"
//         height="350px"
//         data={data}
//         options={options}
//       />
//     </div>
//   );
// }

// export default BarGraph;


import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import "./BarGraph.css"

const BarGraph = () => {
  const [data, setData] = useState([["Grade", "Count"]]);

  useEffect(() => {
    // Fetch employee data from the API
    axios.get("http://localhost:8000/employeesData")
      .then((response) => {
        const employees = response.data;
        calculateGradeDistribution(employees);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const calculateGradeDistribution = (employees) => {
    const gradeCountMap = new Map();

    employees.forEach((employee) => {
      const grade = employee.Grade;
      const currentCount = gradeCountMap.get(grade) || 0;
      gradeCountMap.set(grade, currentCount + 1);
    });

    const chartData = [["Grade", "Count"]];
    gradeCountMap.forEach((count, grade) => {
      chartData.push([grade, count]);
    });

    setData(chartData);
  };

  const options = {
    title: "Team Members by Grade",
    titleTextStyle: {
      fontSize: 24,
      bold: true,
    },
    legend: { position: "none" }, // Hide legend as we have only one series
    hAxis: {
      title: "Grade",
    },
    vAxis: {
      title: "Count",
      minValue: 0,
      gridlines: { count: 5 },
    },
    bar: { groupWidth: "75%" },
    chartArea: { width: "70%", height: "70%" },
  };

  return (
    <div className="dashboard-barchart-container">
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default BarGraph;




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
      fontSize: 20,
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
    <div className="bar-graph-container" style={{ boxShadow: "5px 5px 22px 8px rgba(0, 0, 0, 0.1)" }}>
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
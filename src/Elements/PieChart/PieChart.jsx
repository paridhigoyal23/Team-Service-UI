
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import './PieChart.css'; 

const PieChart = () => {
  const [data, setData] = useState([["Skill", "Count"]]);

  useEffect(() => {
    // Fetch employee data from the API
    axios.get("http://localhost:8000/employeesData")
      .then((response) => {
        const employees = response.data;
        calculateSkillDistribution(employees);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const calculateSkillDistribution = (employees) => {
    const skillCountMap = new Map();

    employees.forEach((employee) => {
      // Assuming Skills is a comma-separated string
      const skillsArray = employee.Skills ? employee.Skills.split(",") : [];
      
      skillsArray.forEach((skill) => {
        const trimmedSkill = skill.trim();
        
        if (trimmedSkill !== "") {
          const currentCount = skillCountMap.get(trimmedSkill) || 0;
          skillCountMap.set(trimmedSkill, currentCount + 1);
        }
      });
    });

    const chartData = [["Skill", "Count"]];
    skillCountMap.forEach((count, skill) => {
      chartData.push([skill, count]);
    });

    setData(chartData);
  };

  const options = {
    title: "Team Competency",
    colors: ["#199555", '#F1C617', "#0082FF", "#93C747"], // Customize colors as needed
    titleTextStyle: {
      fontSize: 20, // Increase title font size
      bold: true,
    },
    legend: {
      position: "left",
      textStyle: {
        fontSize: 16, // Increase legend font size
      },
    },
    pieSliceTextStyle: {
      fontSize: 18, // Increase pie slice text font size
    },
    chartArea: {
      left: 50,
      top: 50,
      right: 20,
      width: '100%',
      height: '95%',
    },
  };

  return (
    <div className="pie-chart-container">
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width="130%"
        height="350px"
      />
    </div>
  );
};

export default PieChart;


import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { useMediaQuery } from "@mui/material";

const Cards = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const isLargeScreen = useMediaQuery("(max-width: 2000px)")
  
  const [employeesData, setEmployeesData] = useState([]);
  const [teamMemberCount, setTeamMemberCount] = useState(0)
  const [uniqueProjectCount, setUniqueProjectCount] = useState(0);

  useEffect(() => {
    fetchEmployeesData();
  }, []);
    
    const fetchEmployeesData = () => {
      axios
      .get('http://localhost:8000/employeesData')
      .then((response) => {
        setEmployeesData(response.data);
        setTeamMemberCount(response.data.length);
        calculateUniqueProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  };


  const calculateUniqueProjects = (data) => {
    // Use a Set to store unique project names
    const uniqueProjects = new Set(data.map((employee) => employee.Project));
    setUniqueProjectCount(uniqueProjects.size);
  };


  const getCardStyle = () => {

    if (isSmallScreen) {
      return {
        width: "80%",
        height: "15vh",
      };
    } else if (isMediumScreen) {
      return {
        width: "45%",
        height: "19vh",
      };
    } else if (isLargeScreen) {
      return {
        width: "20vw",
        height: "200px",
      };
    }
  };

  const getTextStyle = () => {
    if (isSmallScreen) {
      return {
        titleFontSize: "2rem",
        contentFontSize: "1.5rem",
      };
    } else if (isMediumScreen) {
      return {
        titleFontSize: "2.2rem",
        contentFontSize: "1.5rem",
      };
    } else if (isLargeScreen) {
      return {
        titleFontSize: "2.5rem",
        contentFontSize: "1.8rem",
      };
    }
  };

  const cardStyle = getCardStyle();
  const textStyle = getTextStyle();

  return (
    <div className="px-4 py-4 mx-6 my-10 flex justify-center">
      <div className="flex flex-wrap gap-10 text-3xl justify-center">
        <Card sx={{ ...cardStyle, backgroundColor: "#3DB5A4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>{teamMemberCount}</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>Employee</div>
          </div>
        </Card>
        <Card sx={{ ...cardStyle, backgroundColor: "#3297E4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>{uniqueProjectCount}</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>Projects</div>
          </div>
        </Card>
        <Card sx={{ ...cardStyle, backgroundColor: "#A04EDE", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: textStyle.titleFontSize }}>Today</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>0 / 0 / 0</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>WFO/WFH/Leave</div>
          </div>
        </Card>
        <Card sx={{ ...cardStyle, backgroundColor: "#E58953", borderRadius: "20px", boxShadow: "1px 1px 10px 0.1px gray", color: "white" }}>
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: textStyle.titleFontSize }}>Training</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>0 / 0</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>Today/Week</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cards;
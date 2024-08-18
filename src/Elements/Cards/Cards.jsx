
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { useMediaQuery } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const Cards = () => {
  const { userRole, userName, UserEmpId } = useAuth(); // Retrieve user role from AuthContext
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const isLargeScreen = useMediaQuery("(max-width:2000px)");

  const [employeesData, setEmployeesData] = useState([]);
  const [teamMemberCount, setTeamMemberCount] = useState(0);
  const [uniqueProjectCount, setUniqueProjectCount] = useState(0);
  const [trainingsToday, setTrainingsToday] = useState(0);
  const [trainingsThisWeek, setTrainingsThisWeek] = useState(0);
  const [viewerTrainingsToday, setViewerTrainingsToday] = useState(0);
  const [viewerTrainingsThisWeek, setViewerTrainingsThisWeek] = useState(0);
  console.log("userName:", userName);
  console.log("UserEmpId:", UserEmpId);

  useEffect(() => {
    fetchEmployeesData();
    fetchTrainingData();
  }, []);

  const fetchEmployeesData = () => {
    axios
      .get("http://localhost:8000/employeesData")
      .then((response) => {
        setEmployeesData(response.data);
        setTeamMemberCount(response.data.length);
        calculateUniqueProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const calculateUniqueProjects = (data) => {
    const uniqueProjects = new Set(data.map((employee) => employee.Project));
    setUniqueProjectCount(uniqueProjects.size);
  };

  const fetchTrainingData = () => {
    axios
      .get("http://localhost:8000/trainingData")
      .then((response) => {
        calculateTrainingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching training data: ", error);
      });
  };

  const calculateTrainingData = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    endOfWeek.setHours(23, 59, 59, 999); // Set end of the week to last millisecond

    let totalTrainingsTodayCount = 0;
    let totalTrainingsThisWeekCount = 0;
    let viewerTrainingsTodayCount = 0;
    let viewerTrainingsThisWeekCount = 0;

    data.forEach((training) => {
      const plannedDate = new Date(training.PlannedDate);
      const startDate = new Date(training.StartDate);
      const endDate = new Date(training.EndDate);
      const title = training.TrainingTitle;

      // Extract the name part from training.Name
      const namePart = training.Name.split("(")[0].trim();
      const isUserTraining = namePart === userName.trim();

      console.log("Name Part:", namePart);
      console.log("Is User Training:", isUserTraining);
      // Check if the training is scheduled to start or end today
      if (
        (startDate <= today && today <= endDate) ||
        plannedDate.toDateString() === today.toDateString()
      ) {
        if (userRole === "viewer" && isUserTraining) {
          viewerTrainingsTodayCount += title.includes(",")
            ? title.split(",").length
            : 1;
        } else if (userRole !== "viewer") {
          totalTrainingsTodayCount += title.includes(",")
            ? title.split(",").length
            : 1;
        }
      }

      // Check if the training falls within this week
      if (
        (startDate >= startOfWeek && startDate <= endOfWeek) ||
        (plannedDate >= startOfWeek && plannedDate <= endOfWeek)
      ) {
        if (userRole === "viewer" && isUserTraining) {
          viewerTrainingsThisWeekCount += title.includes(",")
            ? title.split(",").length
            : 1;
        } else if (userRole !== "viewer") {
          totalTrainingsThisWeekCount += title.includes(",")
            ? title.split(",").length
            : 1;
        }
      }
    });

    console.log(
      "Trainings Today:",
      totalTrainingsTodayCount,
      "Trainings This Week:",
      totalTrainingsThisWeekCount
    );
    console.log(
      "Viewer Trainings Today:",
      viewerTrainingsTodayCount,
      "Viewer Trainings This Week:",
      viewerTrainingsThisWeekCount
    );

    setTrainingsToday(totalTrainingsTodayCount);
    setTrainingsThisWeek(totalTrainingsThisWeekCount);
    setViewerTrainingsToday(viewerTrainingsTodayCount);
    setViewerTrainingsThisWeek(viewerTrainingsThisWeekCount);
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
      <div className="flex flex-wrap gap-4 text-3xl justify-center">
        <Card
          sx={{
            ...cardStyle,
            backgroundColor: "#3DB5A4",
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 0.00001px gray",
            color: "white",
          }}
        >
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: "25px" }}>Team</div>
            <div style={{ fontSize: "22px" }}>{teamMemberCount}</div>
            <div style={{ fontSize: "25px" }}>Employee</div>
          </div>
        </Card>
        <Card
          sx={{
            ...cardStyle,
            backgroundColor: "#3297E4",
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 0.00001px gray",
            color: "white",
          }}
        >
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: "25px" }}>Team</div>
            <div style={{ fontSize: "22px" }}>{uniqueProjectCount}</div>
            <div style={{ fontSize: "25px" }}>Projects</div>
          </div>
        </Card>
        <Card
          sx={{
            ...cardStyle,
            backgroundColor: "#A04EDE",
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 0.00001px gray",
            color: "white",
          }}
        >
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: "25px" }}>Today</div>
            <div style={{ fontSize: "22px" }}>0 / 0 / 0</div>
            <div style={{ fontSize: "25px" }}>WFO/WFH/Leave</div>
          </div>
        </Card>
        <Card
          sx={{
            ...cardStyle,
            backgroundColor: "#E58953",
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 0.1px gray",
            color: "white",
          }}
        >
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: "25px" }}>Training</div>
            <div style={{ fontSize: "22px" }}>
              {userRole === "viewer"
                ? `${viewerTrainingsToday}/${viewerTrainingsThisWeek}`
                : `${trainingsToday} / ${trainingsThisWeek}`}
            </div>
            <div style={{ fontSize: "25px" }}>Today/Week</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cards;
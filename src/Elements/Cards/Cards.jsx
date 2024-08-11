// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "@mui/material/Card";
// import { useMediaQuery } from "@mui/material";

// const Cards = () => {
//   const isSmallScreen = useMediaQuery("(max-width:600px)");
//   const isMediumScreen = useMediaQuery("(max-width:960px)");
//   const isLargeScreen = useMediaQuery("(max-width: 2000px)")
  
//   const [employeesData, setEmployeesData] = useState([]);
//   const [teamMemberCount, setTeamMemberCount] = useState(0)
//   const [uniqueProjectCount, setUniqueProjectCount] = useState(0);

//   useEffect(() => {
//     fetchEmployeesData();
//   }, []);
    
//     const fetchEmployeesData = () => {
//       axios
//       .get('http://localhost:8000/employeesData')
//       .then((response) => {
//         setEmployeesData(response.data);
//         setTeamMemberCount(response.data.length);
//         calculateUniqueProjects(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data: ', error);
//       });
//   };


//   const calculateUniqueProjects = (data) => {
//     // Use a Set to store unique project names
//     const uniqueProjects = new Set(data.map((employee) => employee.Project));
//     setUniqueProjectCount(uniqueProjects.size);
//   };


//   const getCardStyle = () => {

//     if (isSmallScreen) {
//       return {
//         width: "80%",
//         height: "15vh",
//       };
//     } else if (isMediumScreen) {
//       return {
//         width: "45%",
//         height: "19vh",
//       };
//     } else if (isLargeScreen) {
//       return {
//         width: "22vw",
//         height: "200px",
//       };
//     }
//   };

//   const getTextStyle = () => {
//     if (isSmallScreen) {
//       return {
//         titleFontSize: "2rem",
//         contentFontSize: "1.5rem",
//       };
//     } else if (isMediumScreen) {
//       return {
//         titleFontSize: "2.2rem",
//         contentFontSize: "1.5rem",
//       };
//     } else if (isLargeScreen) {
//       return {
//         titleFontSize: "2rem",
//         contentFontSize: "1.5rem",
//       };
//     }
//   };

//   const cardStyle = getCardStyle();
//   const textStyle = getTextStyle();

//   return (
//     <div className="px-4 py-4 mx-6 my-10 flex justify-center">
//       <div className="flex flex-wrap gap-4 text-3xl justify-center">
//         <Card sx={{ ...cardStyle, backgroundColor: "#3DB5A4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
//           <div className="flex flex-col gap-3 items-center justify-center h-full">
//             <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>{teamMemberCount}</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>Employee</div>
//           </div>
//         </Card>
//         <Card sx={{ ...cardStyle, backgroundColor: "#3297E4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
//           <div className="flex flex-col gap-3 items-center justify-center h-full">
//             <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>{uniqueProjectCount}</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>Projects</div>
//           </div>
//         </Card>
//         <Card sx={{ ...cardStyle, backgroundColor: "#A04EDE", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
//           <div className="flex flex-col gap-3 items-center justify-center h-full">
//             <div style={{ fontSize: textStyle.titleFontSize }}>Today</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>0 / 0 / 0</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>WFO/WFH/Leave</div>
//           </div>
//         </Card>
//         <Card sx={{ ...cardStyle, backgroundColor: "#E58953", borderRadius: "20px", boxShadow: "1px 1px 10px 0.1px gray", color: "white" }}>
//           <div className="flex flex-col gap-3 items-center justify-center h-full">
//             <div style={{ fontSize: textStyle.titleFontSize }}>Training</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>0 / 0</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>Today/Week</div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Cards;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { useMediaQuery } from "@mui/material";

const Cards = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const isLargeScreen = useMediaQuery("(max-width: 2000px)");

  const [employeesData, setEmployeesData] = useState([]);
  const [teamMemberCount, setTeamMemberCount] = useState(0);
  const [uniqueProjectCount, setUniqueProjectCount] = useState(0);
  const [trainingsToday, setTrainingsToday] = useState(0);
  const [trainingsThisWeek, setTrainingsThisWeek] = useState(0);

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
      .get("http://localhost:8000/trainingData") // Adjust the endpoint if necessary
      .then((response) => {
        calculateTrainingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching training data: ", error);
      });
  };

  const calculateTrainingData = (data) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);

    const trainingsTodayCount = data.filter((training) => {
      const startDate = new Date(training.StartDate);
      const endDate = new Date(training.EndDate);
      return startDate <= today && today <= endDate;
    }).length;

    const trainingsThisWeekCount = data.filter((training) => {
      const startDate = new Date(training.StartDate);
      return startDate >= startOfWeek && startDate <= endOfWeek;
    }).length;

    setTrainingsToday(trainingsTodayCount);
    setTrainingsThisWeek(trainingsThisWeekCount);
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
            <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>
              {teamMemberCount}
            </div>
            <div style={{ fontSize: textStyle.contentFontSize }}>Employee</div>
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
            <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>
              {uniqueProjectCount}
            </div>
            <div style={{ fontSize: textStyle.contentFontSize }}>Projects</div>
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
            <div style={{ fontSize: textStyle.titleFontSize }}>Today</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>
              0 / 0 / 0
            </div>
            <div style={{ fontSize: textStyle.contentFontSize }}>
              WFO/WFH/Leave
            </div>
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
            <div style={{ fontSize: textStyle.titleFontSize }}>Training</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>
              {trainingsToday} / {trainingsThisWeek}
            </div>
            <div style={{ fontSize: textStyle.contentFontSize }}>
              Today/Week
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cards;
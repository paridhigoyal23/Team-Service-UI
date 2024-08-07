import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";

const Cards = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [teamMemberCount, setTeamMemberCount] = useState(0);
  const [uniqueProjectCount, setUniqueProjectCount] = useState(0);

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  const fetchEmployeesData = () => {
    axios
      .get('http://localhost:8000/employeesData')
      .then((response) => {
        setTeamMemberCount(response.data.length);
        setEmployeesData(response.data);
        calculateUniqueProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  };

  const calculateUniqueProjects = (data) => {
    const uniqueProjects = new Set(data.map((employee) => employee.Project));
    setUniqueProjectCount(uniqueProjects.size);
  };

  const containerStyle = {
    padding: "16px",
    margin: "40px 24px",
    display: "flex",
    justifyContent: "center",
    overflowX: "hidden"
  };

  const innerContainerStyle = {
    display: "flex",
    gap: "16px",
    fontSize: "1.875rem",
    justifyContent: "center",
    flexWrap: "wrap" // Add flexWrap to handle overflow
  };

  const cardStyle = {
    flex: "1 1 200px", // Allow the cards to shrink and grow
    minWidth: "200px", // Set a minimum width to prevent cards from getting too small
    maxWidth: "22vw", // Set a maximum width to maintain responsiveness
    height: "200px"
  };

  const textStyle = {
    titleFontSize: "2rem",
    contentFontSize: "1.5rem"
  };

  const flexColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <Card sx={{ ...cardStyle, backgroundColor: "#3DB5A4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
          <div style={flexColumnStyle}>
            <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>{teamMemberCount}</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>Employee</div>
          </div>
        </Card>
        <Card sx={{ ...cardStyle, backgroundColor: "#3297E4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
          <div style={flexColumnStyle}>
            <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>{uniqueProjectCount}</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>Projects</div>
          </div>
        </Card>
        <Card sx={{ ...cardStyle, backgroundColor: "#A04EDE", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
          <div style={flexColumnStyle}>
            <div style={{ fontSize: textStyle.titleFontSize }}>Today</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>0 / 0 / 0</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>WFO/WFH/Leave</div>
          </div>
        </Card>
        <Card sx={{ ...cardStyle, backgroundColor: "#E58953", borderRadius: "20px", boxShadow: "1px 1px 10px 0.1px gray", color: "white" }}>
          <div style={flexColumnStyle}>
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


// import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "@mui/material/Card";
// import { useMediaQuery } from "@mui/material";

// const Cards = () => {
//   const isSmallScreen = useMediaQuery("(max-width:600px)");
//   const isMediumScreen = useMediaQuery("(max-width:960px)");
//   const isLargeScreen = useMediaQuery("(max-width: 2000px)");
  
//   const [employeesData, setEmployeesData] = useState([]);
//   const [teamMemberCount, setTeamMemberCount] = useState(0);
//   const [uniqueProjectCount, setUniqueProjectCount] = useState(0);

//   useEffect(() => {
//     fetchEmployeesData();
//   }, []);
    
//   const fetchEmployeesData = () => {
//     axios
//       .get('http://localhost:8000/employeesData')
//       .then((response) => {
//         setTeamMemberCount(response.data.length);
//         setEmployeesData(response.data);
//         calculateUniqueProjects(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data: ', error);
//       });
//   };

//   const calculateUniqueProjects = (data) => {
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

//   const containerStyle = {
//     padding: "16px",
//     margin: "40px 24px",
//     display: "flex",
//     justifyContent: "center"
//   };

//   const innerContainerStyle = {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "16px",
//     fontSize: "1.875rem",
//     justifyContent: "center"
//   };

//   const cardStyle = getCardStyle();
//   const textStyle = getTextStyle();

//   const flexColumnStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100%"
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={innerContainerStyle}>
//         <Card sx={{ ...cardStyle, backgroundColor: "#3DB5A4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
//           <div style={flexColumnStyle}>
//             <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>{teamMemberCount}</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>Employee</div>
//           </div>
//         </Card>
//         <Card sx={{ ...cardStyle, backgroundColor: "#3297E4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
//           <div style={flexColumnStyle}>
//             <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>{uniqueProjectCount}</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>Projects</div>
//           </div>
//         </Card>
//         <Card sx={{ ...cardStyle, backgroundColor: "#A04EDE", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
//           <div style={flexColumnStyle}>
//             <div style={{ fontSize: textStyle.titleFontSize }}>Today</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>0 / 0 / 0</div>
//             <div style={{ fontSize: textStyle.contentFontSize }}>WFO/WFH/Leave</div>
//           </div>
//         </Card>
//         <Card sx={{ ...cardStyle, backgroundColor: "#E58953", borderRadius: "20px", boxShadow: "1px 1px 10px 0.1px gray", color: "white" }}>
//           <div style={flexColumnStyle}>
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

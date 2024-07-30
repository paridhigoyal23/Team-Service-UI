// import React from "react";
// import Card from "@mui/material/Card";

// let Cards = () => {
//   return (
//     <div className="px-4 py-4 mx-6 my-10 flex justify-center">
//       <div>
//         <div className="flex flex-wrap gap-4 text-3xl">
//           <div item xs={12} sm={6} md={3}>
//             <Card sx={{display:"flex", justifyContent:"center", alignItems:"center", width: 400, height: 200, backgroundColor: "#3DB5A4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
//               <div className="flex flex-col gap-3">
//                 <div>
//                   Team
//                 </div>
//                 <div>
//                   7
//                 </div>
//                 <div variant="h6" color="white">
//                   Employee
//                 </div>
//               </div>
//             </Card>
//           </div>
//           <div item xs={12} sm={6} md={3}>
//             <Card sx={{display:"flex", justifyContent:"center", alignItems:"center", width: 400, height: 200, backgroundColor: "#3297E4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
//               <div className="flex flex-col gap-3">
//                 <div>
//                   Team
//                 </div>
//                 <div>
//                   2
//                 </div>
//                 <div variant="h6" color="white">
//                   Projects
//                 </div>
//               </div>
//             </Card>
//           </div>
//           <div item xs={12} sm={6} md={3}>
//             <Card sx={{display:"flex", justifyContent:"center", alignItems:"center", width: 400, height: 200, backgroundColor: "#A04EDE", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
//               <div className="flex flex-col gap-3">
//                 <div>
//                   Today
//                 </div>
//                 <div>
//                   0 / 0 / 0
//                 </div>
//                 <div variant="h6" color="white">
//                   WFO/WFH/Leave
//                 </div>
//               </div>
//             </Card>
//           </div>
//           <div item xs={12} sm={6} md={3}>
//             <Card sx={{display:"flex", justifyContent:"center", alignItems:"center", width: 400, height: 200, backgroundColor: "#E58953", borderRadius: "20px", boxShadow: "1px 1px 10px 0.1px gray", color: "white" }}>
//               <div className="flex flex-col gap-3">
//                 <div>
//                   Training
//                 </div>
//                 <div>
//                   0 / 0
//                 </div>
//                 <div>
//                   Today/Week
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cards;

import React from "react";
import Card from "@mui/material/Card";
import { useMediaQuery } from "@mui/material";

const Cards = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const isLargeScreen = useMediaQuery("(max-width: 2000px)")

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
        width: "22vw",
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
        titleFontSize: "2rem",
        contentFontSize: "1.5rem",
      };
    }
  };

  const cardStyle = getCardStyle();
  const textStyle = getTextStyle();

  return (
    <div className="px-4 py-4 mx-6 my-10 flex justify-center">
      <div className="flex flex-wrap gap-4 text-3xl justify-center">
        <Card sx={{ ...cardStyle, backgroundColor: "#3DB5A4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>7</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>Employee</div>
          </div>
        </Card>
        <Card sx={{ ...cardStyle, backgroundColor: "#3297E4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
          <div className="flex flex-col gap-3 items-center justify-center h-full">
            <div style={{ fontSize: textStyle.titleFontSize }}>Team</div>
            <div style={{ fontSize: textStyle.contentFontSize }}>2</div>
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
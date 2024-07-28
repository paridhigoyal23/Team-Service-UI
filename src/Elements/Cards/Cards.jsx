import React from "react";
import Card from "@mui/material/Card";

let Cards = () => {
  return (
    <div className="px-4 py-4 mx-6 my-10 flex justify-center">
      <div>
        <div className="flex flex-wrap gap-4 text-3xl">
          <div item xs={12} sm={6} md={3}>
            <Card sx={{display:"flex", justifyContent:"center", alignItems:"center", width: 400, height: 200, backgroundColor: "#3DB5A4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
              <div className="flex flex-col gap-3">
                <div>
                  Team
                </div>
                <div>
                  7
                </div>
                <div variant="h6" color="white">
                  Employee
                </div>
              </div>
            </Card>
          </div>
          <div item xs={12} sm={6} md={3}>
            <Card sx={{display:"flex", justifyContent:"center", alignItems:"center", width: 400, height: 200, backgroundColor: "#3297E4", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
              <div className="flex flex-col gap-3">
                <div>
                  Team
                </div>
                <div>
                  2
                </div>
                <div variant="h6" color="white">
                  Projects
                </div>
              </div>
            </Card>
          </div>
          <div item xs={12} sm={6} md={3}>
            <Card sx={{display:"flex", justifyContent:"center", alignItems:"center", width: 400, height: 200, backgroundColor: "#A04EDE", borderRadius: "20px", boxShadow: "1px 1px 10px 0.00001px gray", color: "white" }}>
              <div className="flex flex-col gap-3">
                <div>
                  Today
                </div>
                <div>
                  0 / 0 / 0
                </div>
                <div variant="h6" color="white">
                  WFO/WFH/Leave
                </div>
              </div>
            </Card>
          </div>
          <div item xs={12} sm={6} md={3}>
            <Card sx={{display:"flex", justifyContent:"center", alignItems:"center", width: 400, height: 200, backgroundColor: "#E58953", borderRadius: "20px", boxShadow: "1px 1px 10px 0.1px gray", color: "white" }}>
              <div className="flex flex-col gap-3">
                <div>
                  Training
                </div>
                <div>
                  0 / 0
                </div>
                <div>
                  Today/Week
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
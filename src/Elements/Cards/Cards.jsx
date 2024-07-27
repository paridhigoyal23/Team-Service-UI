import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';

let Cards = () => {
  return (
    <div className="px-4 py-4 mx-6 my-10 flex justify-center">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} justifyContent="flex-start">
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ Width: 400, backgroundColor: "#3DB5A4", borderRadius:"20px", boxShadow:"1px 1px 10px .00001px gray" , color:"white" }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Team
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  7
                </Typography>
                <Typography variant="h6" color="twhitendary">
                  Employee
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ Width: 400, backgroundColor: "#3297E4", borderRadius:"20px", boxShadow:"1px 1px 10px .00001px gray", color:"white" }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Team
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  2
                </Typography>
                <Typography variant="h6" color="white">
                  Projects
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ Width: 400, backgroundColor: "#A04EDE", borderRadius:"20px", boxShadow:"1px 1px 10px .00001px gray", color:"white" }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Today
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  0/0/0
                </Typography>
                <Typography variant="h6" color="white">
                  WFO/WFH/Leave
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ Width: 400, backgroundColor: "#E58953", borderRadius:"20px", boxShadow:"1px 1px 10px .00001px gray", color:"white" }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Training
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  0/0
                </Typography>
                <Typography variant="h6" color="white">
                  Today/Week
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Cards;
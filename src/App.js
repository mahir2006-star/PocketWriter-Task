import React from "react";
import { Grid, Box } from "@mui/material";
import Sidebar from "./comp/header";
import CaughtUpMessage from "./comp/caughtup";
import RightSidebar from "./comp/rightsidebar";
import BottomBar from "./comp/bottombar";
const App = () => {
  // Override localStorage.setItem
  var originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
  // Create and dispatch a custom event
  const event = new Event("itemInserted");
  document.dispatchEvent(event);
  // Call the original localStorage.setItem
  originalSetItem.apply(this, arguments);
  };
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Sidebar */}
      <Grid 
        item 
        xs={12} md={3} lg={3} 
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Sidebar />
      </Grid>
      <BottomBar />
      {/* Centered CaughtUpMessage */}
      <Grid 
        item 
        xs={12} md={9} lg={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}
      >
        <center style={{width:"80%"}}>
        <Box>
          <CaughtUpMessage />
        </Box>
        </center>
      </Grid>
      
      {/* Right Sidebar */}
      <Grid 
        item 
        xs={12} md={3} lg={3} 
        sx={{ display: { xs: "none", lg: "block" } }}
      >
        <RightSidebar />
      </Grid>
    </Grid>
  );
};

export default App;

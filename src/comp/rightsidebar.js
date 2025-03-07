import React from "react";
import { Paper, Avatar, Typography, Button, List, ListItem, ListItemAvatar, ListItemText, Divider, Box, Link } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const suggestedUsers = [
  { name: "Instagram", username: "instagram", avatar: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg" },
  { name: "Aditi Raj", username: "aditi_raj2103", avatar: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg" },
  { name: "Tkhagwal", username: "tkhagwal", avatar: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg" },
  { name: "Joel B", username: "joelb_2412", avatar: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg" },
  { name: "The Vicharaka", username: "the_vicharaka", avatar: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg" },
];

const userProfile = {
  name: "Mahir Jain",
  username: "mahirj39",
  avatar: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg", // Replace with actual image URL
};

const footerLinks = [
  "About",
  "Help",
  "Press",
  "API",
  "Jobs",
  "Privacy",
  "Terms",
  "Locations",
  "Language",
];

const RightSidebar = () => {
  const isLargeScreen = useMediaQuery("(min-width:1024px)");

  if (!isLargeScreen) return null; // Hide on smaller screens

  return (
    <Paper
      component="div"
      sx={{
        width: 300,
        height: "100vh",
        padding: 2,
        position: "fixed",
        right: 0,
        top: 0,
        boxShadow: "none", // Remove elevation
        borderLeft: "1px solid #ddd", // Optional border for separation
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* User Profile Section */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={userProfile.avatar} alt={userProfile.name} sx={{ width: 50, height: 50, marginRight: 1 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {userProfile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{userProfile.username}
            </Typography>
          </Box>
        </Box>
        <Button variant="text" size="small" sx={{ textTransform: "none", fontWeight: "bold" }}>
          Switch
        </Button>
      </Box>

      <Divider sx={{ marginBottom: 2 }} />

      {/* Suggested Users Section */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Suggested for you
      </Typography>
      <List>
        {suggestedUsers.map((user, index) => (
          <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
            <ListItemAvatar>
              <Avatar src={user.avatar} alt={user.name} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={`@${user.username}`} />
            <Button variant="contained" size="small" sx={{ textTransform: "none" }}>
              Follow
            </Button>
          </ListItem>
        ))}
      </List>

      {/* Footer Section - Now right after suggested users */}
      <Box sx={{ marginTop: 2, paddingTop: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
          {footerLinks.map((link, index) => (
            <React.Fragment key={index}>
              <Link href="#" color="inherit" underline="none" sx={{ marginX: 0.5 }}>
                {link}
              </Link>
              {index < footerLinks.length - 1 && " · "}
            </React.Fragment>
          ))}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", marginTop: 1 }}>
          © PocketWriter from India
        </Typography>
      </Box>
    </Paper>
  );
};

export default RightSidebar;

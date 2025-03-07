import React from "react";
import { Box, Typography, Avatar, Grid, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

const SuggestedPosts = ({ posts }) => {
  return (
    <center>
    <Box sx={{ width: "100%"}}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Suggested Posts
      </Typography>
      {posts.map((post, index) => (
        <Box
          key={index}
          sx={{ mb: 4, p: 2, borderRadius: 2, boxShadow: 1, width: "90%" }}
        >
          {/* User Info */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              src={post.userAvatar}
              sx={{ width: 40, height: 40, mr: 1 }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {post.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post.timeAgo}
              </Typography>
            </Box>
          </Box>

          {/* Image Collage */}
          <Grid container spacing={1} sx={{ width: "100%" }}>
            {post.images.map((img, i) => (
              <Grid
                item
                xs={post.images.length === 1 ? 12 : 6}
                key={i}
                sx={{ height: post.images.length === 1 ? 300 : 150 }}
              >
                <img
                  src={img}
                  alt="Post"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Grid>
            ))}
          </Grid>

          {/* Caption (Displayed below the images) */}
          {post.caption && (
            <Typography
              variant="body1"
              sx={{ mt: 2, textAlign: "left", fontWeight: "bold" }}
            >
              {post.caption}
            </Typography>
          )}

          {/* Post Text (Displayed below the caption) */}
          {post.text && (
            <Typography variant="body1" sx={{ mt: 1, textAlign: "left" }}>
              {post.text}
            </Typography>
          )}

          {/* Like, Comment, Share */}
          <Box sx={{ display: "flex", mt: 2 }}>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
    </center>
  );
};

export default SuggestedPosts;
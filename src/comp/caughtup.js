import React, { useState,useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import SuggestedPosts from "./suggestedposts.js";
const CaughtUpMessage = () => {
  const postser = [
    {
      username: "guitarave",
      userAvatar: "https://via.placeholder.com/40",
      timeAgo: "3d",
      images: [
        "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
        "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
        "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
      ],
      text: "Freebird does in fact go hard at the local tavern.",
    },
    {
      username: "musiclover",
      userAvatar: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
      timeAgo: "1w",
      images: ["https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"],
      text: "Jamming with my new guitar!",
    },
  ];
  const [posts,setPosts]=useState(postser);
  // window.addEventListener('storage', () => {
  //   alert("Changed");
  //   // ...
  // })
  useEffect(() => {
    const handleItemInserted = () => {
      const savedPosts = localStorage.getItem("posts");
      if (savedPosts) {
        try {
          const parsedPosts = JSON.parse(savedPosts);
          // Transform the data to match the expected structure
          let transformedPosts = parsedPosts.map((post) => ({
            userAvatar: post.userAvatar || "https://example.com/default-avatar.jpg", // Fallback avatar
            username: post.username || "Anonymous",
            timeAgo: post.timestamp ? `${new Date(post.timestamp).toLocaleString()}` : "Just now",
            images: post.imageUrl ? [post.imageUrl] : [], // Ensure images is an array
            text: post.content || "",
            caption: post.caption
          }));
          transformedPosts=transformedPosts.concat(postser);
          setPosts(transformedPosts);
        } catch (error) {
          console.error("Error parsing posts from localStorage:", error);
        }
      }
    };

    document.addEventListener("itemInserted", handleItemInserted);

    return () => {
      document.removeEventListener("itemInserted", handleItemInserted);
    };
  }, []);
  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        // Transform the data to match the expected structure
        let transformedPosts = parsedPosts.map((post) => ({
          userAvatar: post.userAvatar || "https://example.com/default-avatar.jpg", // Fallback avatar
          username: post.username || "Anonymous",
          timeAgo: post.timestamp ? `${new Date(post.timestamp).toLocaleString()}` : "Just now",
          images: post.imageUrl ? [post.imageUrl] : [], // Ensure images is an array
          text: post.content || "",
          caption: post.caption
        }));
        transformedPosts=transformedPosts.concat(postser);
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error parsing posts from localStorage:", error);
      }
    }
  }, []);
  return (
    <>
    <Box className="flex flex-col items-center justify-center h-full w-full space-y-8">
      {/* Caught Up Message Section */}
      <Box className="flex flex-col items-center text-center space-y-4">
        <Box
          sx={{
            width: 72,
            height: 72,
            border: "2px solid #ccc",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            width={36}
            height={36}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </Box>
        <Typography variant="h5" fontWeight={700}>
          You're all caught up
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You've seen all new posts from the past 3 days.
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", maxWidth: 600 }} />
    </Box>
    <SuggestedPosts posts={posts} />
    </>
  );
};

export default CaughtUpMessage;

import React, { useState,useEffect,useCallback } from "react";
import { BottomNavigation, BottomNavigationAction, Paper,Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from 'react-easy-crop';
import getCroppedImg  from './utils/cropImage'; // Import the utility function
import { 
  Drawer, List, Typography, ListItem, ListItemIcon, 
  ListItemText,Modal,TextField,Button,IconButton,Stack,Snackbar,Alert,
  Slider,Grid,Divider
} from "@mui/material";
import { 
  Home, Search, AddBox, Person, FavoriteBorder, Close,
  ArrowBack,Crop,Check
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
const BottomBar = ({ onCreateClick }) => {
  const [posts, setPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCreatePost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setShowCreateModal(false);
  };
    // Load posts from localStorage on component mount
  useEffect(() => {
      const savedPosts = localStorage.getItem('pocketWriterPosts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
  }, []);
  
  // Save posts to localStorage whenever posts state changes
  useEffect(() => {
      localStorage.setItem('pocketWriterPosts', JSON.stringify(posts));
  }, [posts]);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, display: { md: "none", xs: "block" } }}
      elevation={3}
    >
      <BottomNavigation
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction
          label="Create"
          icon={<AddBoxIcon />}
          onClick={() => {
            setShowCreateModal(true); // Call the passed function
          }}
        />
        <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
        <PostCreationModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
        />
    </Paper>
  );
};
const PostCreationModal = ({ open, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [content, setContent] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setStep(1);
      setImage(null);
      setImageUrl('');
      setCaption('');
      setContent('');
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setCroppedImage(null);
      setError('');
    }
  }, [open]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        setImage(reader.result); // reader.result is the Base64-encoded string
        setStep(2);
      });

      reader.readAsDataURL(file); // Convert the file to a Base64 string
    }
  };

  const handleUrlSubmit = async () => {
    if (!imageUrl.trim()) {
      setError("Please enter an image URL");
      return;
    }
  
    try {
      // Try loading the image to verify it's valid
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (!response.ok) {
        throw new Error("Invalid image URL");
      }
      // Create a new Image object and verify it loads successfully
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setImage(imageUrl); // Set as main image
        setStep(2);
        setError('');
      };
      img.onerror = (err) => {
        console.log(err);
        setError("Invalid image URL. Please enter a valid one.");
      };
    } catch (error) {
      console.log(error);
      setError("Invalid image URL. Please enter a valid one.");
    }
  };
  

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels
      );
      setCroppedImage(croppedImage); // This is the Base64-encoded string
      setStep(3); // Move to the next step to add caption and content
    } catch (e) {
      console.error(e);
      setSnackbar({
        open: true,
        message: 'Failed to crop the image.',
        severity: 'error'
      });
    }
  }, [image, croppedAreaPixels]);

  const handleSubmit = async () => {
    if (!croppedImage) {
      setSnackbar({
        open: true,
        message: 'Please crop the image before submitting.',
        severity: 'error'
      });
      return;
    }

    const newPost = {
      id: Date.now(),
      imageUrl: croppedImage, // This is the Base64-encoded string
      caption,
      content,
      username:'Mahir Jain',
      userAvatar:'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',
      timestamp: new Date().toISOString()
    };

    // Save the new post to localStorage
    let savedPosts = [];
    try {
      savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    } catch (error) {
      console.error('Error parsing posts from localStorage:', error);
    }

    const updatedPosts = [newPost, ...savedPosts];
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Store the Base64 string

    onSubmit(updatedPosts); // Pass the updated posts to the parent component
    
    setSnackbar({
      open: true,
      message: 'Post created successfully!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="create-post-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            {step > 1 && (
              <IconButton onClick={() => setStep(step - 1)} aria-label="Back">
                <ArrowBack />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
              {step === 1 ? 'Add Photo' : step === 2 ? 'Crop Image' : 'Add Caption and Content'}
            </Typography>
            <IconButton onClick={onClose} aria-label="Close">
              <Close />
            </IconButton>
          </Box>

          {/* Step 1: Upload or Add URL */}
          {step === 1 && (
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-image"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="upload-image">
                  <Button 
                    component="span" 
                    variant="contained" 
                    sx={{ mb: 2 }}
                    fullWidth
                  >
                    Upload from Device
                  </Button>
                </label>
                
                <Typography variant="body2" sx={{ my: 2 }}>
                  Or paste an image URL
                </Typography>
                
                <TextField
                  fullWidth
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setError('');
                  }}
                  error={!!error}
                  helperText={error}
                  sx={{ mb: 2 }}
                />
                
                <Button 
                  variant="outlined" 
                  onClick={handleUrlSubmit}
                  disabled={!imageUrl}
                  fullWidth
                >
                  Use Image URL
                </Button>
              </Box>
            </Stack>
          )}

          {/* Step 2: Crop Image */}
          {step === 2 && image && (
            <Stack spacing={3}>
              <Box sx={{ 
                position: 'relative',
                width: '100%',
                height: '400px', // Fixed height for the cropping container
                overflow: 'hidden',
                borderRadius: 2,
                backgroundColor: '#f5f5f5'
              }}>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} // Enforce a 1:1 aspect ratio
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </Box>

              <Box sx={{ width: '100%', mt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e, newValue) => setZoom(newValue)}
                />
              </Box>
                
              <Button 
                variant="contained" 
                onClick={showCroppedImage}
                startIcon={<Check />}
                sx={{ mt: 2 }}
                fullWidth
              >
                Apply Crop
              </Button>
            </Stack>
          )}

          {/* Step 3: Add Caption and Content */}
          {step === 3 && (
            <Stack spacing={3}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Preview
              </Typography>
              
              <Box sx={{ 
                width: '100%',
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                {croppedImage && (
                  <img 
                    src={croppedImage} 
                    alt="Cropped Preview" 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                  />
                )}
              </Box>
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Add a caption (optional)
              </Typography>
              
              <TextField
                fullWidth
                placeholder="Write a short caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Add content (optional)
              </Typography>
              
              <TextField
                fullWidth
                placeholder="Write something about this image..."
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              <Button 
                variant="contained" 
                onClick={handleSubmit}
                fullWidth
                sx={{ mt: 2 }}
              >
                Share Post
              </Button>
            </Stack>
          )}
        </Box>
      </Modal>

      {/* Success/Error Notification */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default BottomBar;

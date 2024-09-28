import React, { useState } from 'react';
import { Typography, AppBar, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom'; // Using Link for older react-router-dom
import VideoPlayer from './VideoPlayer';
import Options from './Options';
import Notifications from './Notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'; // Import specific icon

// Custom styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: 15,
  margin: '30px 100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '600px',
  padding: theme.spacing(1),
  border: '2px solid black',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    margin: '30px auto', // Center on smaller screens
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2), // Consistent padding
  background: '#3C4652', // Groovy green gradient
  minHeight: '100vh', // Ensure full height
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
}));

const MeetingHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2), // Space between the icon and text
}));

const MeetingGrid = () => {
  const [open, setOpen] = useState(false); // State to manage modal visibility

  const handleClickOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  return (
    <Wrapper>
      <StyledAppBar position="static" color="default">
        <MeetingHeader>
          <IconButton onClick={handleClickOpen} color="inherit">
            <FontAwesomeIcon icon={faArrowLeftLong} size="lg" /> {/* Use FontAwesome Icon */}
          </IconButton>
          <Typography variant="h4" align="center">
            Meeting
          </Typography>
        </MeetingHeader>
      </StyledAppBar>
      <Box sx={{ mt: 2, width: '100%' }}> {/* Adjust spacing and width */}
        <VideoPlayer />
      </Box>
      <CenteredBox sx={{ mt: 2 }}>
        <Options>
          <Notifications />
        </Options>
      </CenteredBox>

      {/* Modal for confirmation */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to quit?"}
        </DialogTitle>
        <DialogContent>
          {/* You can add more content here if needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}> {/* Use Link for navigation */}
            <Button color="primary" autoFocus>
              Yes
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default MeetingGrid;

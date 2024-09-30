import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../constants/SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, stream, userVideo } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  // State for recording
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURL] = useState(null);

  // Start recording
 // Start recording
 const startRecording = () => {
  // Access the local stream (your own video stream) from state
  const localStream = stream;
  
  // Access the remote stream (the other user's video stream) from the userVideo ref
  const remoteStream = userVideo.current ? userVideo.current.srcObject : null;

  // Validate local and remote streams
  if (!localStream || !localStream.getTracks().length) {
    console.error('Local stream is not available or has no tracks.');
    return;
  }
  if (!remoteStream || !remoteStream.getTracks().length) {
    console.error('Remote stream is not available or has no tracks.');
    return;
  }

  // Combine local and remote tracks into a single MediaStream
  const mixedStream = new MediaStream();
  localStream.getTracks().forEach((track) => mixedStream.addTrack(track));
  remoteStream.getTracks().forEach((track) => mixedStream.addTrack(track));

  // Set up the MediaRecorder to record the combined stream
  const recorder = new MediaRecorder(mixedStream);
  recorder.ondataavailable = handleDataAvailable;
  recorder.onstop = handleStop;
  recorder.start();

  // Update the state to indicate recording has started
  setMediaRecorder(recorder);
  setRecording(true);
};


  // Stop recording
  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };




  // Collect the video data
  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };

  // Create a video URL when recording stops
  const handleStop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setVideoURL(url);
  };

  // Download the recorded video
  const downloadRecording = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'call-recording.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };



  const uploadRecording = async (blob) => {
    if (!user || !user._id) {
      console.error('User ID is not available for recording');
      return;
    }
  
    const formData = new FormData();
    formData.append('recording', blob, 'call-recording.webm');
  
    try {
      // Step 1: Upload recording to the server
      const uploadResponse = await fetch('https://zencall.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });
  
      const uploadData = await uploadResponse.json();
      const recordingUrl = uploadData.url; // Assuming your backend returns the recording URL after upload
  
      if (!recordingUrl) {
        console.error('Failed to get recording URL');
        return;
      }
  
      // Step 2: Save recording URL with the user ID
      const saveResponse = await fetch('https://zencall.onrender.com/saveRecording', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id, // Pass the logged-in user's ID
          recordingUrl,     // Pass the recording URL
        }),
      });
  
      const saveData = await saveResponse.json();
  
      if (saveResponse.ok) {
        console.log('Recording saved successfully:', saveData);
      } else {
        console.error('Failed to save recording:', saveData.message);
      }
    } catch (error) {
      console.error('Error uploading and saving recording:', error);
    }
  };

  
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              {console.log(me)}
              <CopyToClipboard text={me} className={classes.margin}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>

          {/* Recording Controls */}
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={6}>
              {recording ? (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={stopRecording}
                >
                  Stop Recording
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={startRecording}
                  disabled={!callAccepted || callEnded}
                >
                  Start Recording
                </Button>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={downloadRecording}
                disabled={!videoURL}
              >
                Download Recording
              </Button>
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>

      {videoURL && (
        <div style={{ marginTop: '20px' }}>
          <video src={videoURL} controls width="100%" />
        </div>
      )}
    </Container>
  );
};

export default Options;

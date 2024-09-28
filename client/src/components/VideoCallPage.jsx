import React from 'react';
import VideoPlayer from './VideoPlayer';
import { makeStyles } from '@material-ui/core/styles';
import Options from './Options';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  },
}));

const VideoCallPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <VideoPlayer />
      <Options>
        <Notification />
      </Options>
      hello
    </div>
  );
};

export default VideoCallPage;

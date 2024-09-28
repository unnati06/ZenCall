import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home2 from './pages/Home2';
import Dashboard from './pages/Dashboard';
import VideoCallPage from './components/VideoCallPage';
import './App.css';
import MeetingGrid from './components/MeetingGrid';
import ScheduledMeetings from './components/ScheduledMeetings';
import PreviousMeetings from './components/PreviousMeetings';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home2} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/video-call" component={VideoCallPage} />
        <Route path="/meeting" component={MeetingGrid} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/scheduled" component={ScheduledMeetings} />
        <Route path="/previous" component={PreviousMeetings} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;

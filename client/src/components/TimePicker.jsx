// {getGreeting()}

import React, { useEffect, useState } from "react";
import '../styles/TimePicker.css';

function TimePicker() {
    const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        
        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const getGreeting = () => {
        const hours = time.getHours();
        if (hours < 12) {
            return "Good morning";
        } else if (hours < 17) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };

    return (
        <div className="time-picker">
            <p className="greeting">{getGreeting()}</p>
            <p className="time">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </p>
        </div>
    );
}

export default TimePicker;

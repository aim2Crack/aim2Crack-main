import React, { useState, useEffect } from 'react';
import './Notification.css'; // Create a CSS file for styling

const Notification = ({ message, onClose }) => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Automatically hide the notification after a few seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000); // Change the duration (in milliseconds) as per your preference

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowNotification(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    showNotification && (
      <div className="notification">
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    )
  );
};

export default Notification;

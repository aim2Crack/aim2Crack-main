import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProfileChecker = ({ children }) => {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://127.0.0.1:7000/api/users/signup`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsStudent(data.user.profileType == 'student');
        } else {
          console.error('Failed to fetch user details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  if (isStudent) {
    // Redirect to the error page if the user is a student
    navigate('/error-page?message=You are not authorized to access this page.');
    return null;
  }

  // If the user is not a student, continue rendering the children components
  return children;
};

export default StudentProfileChecker;

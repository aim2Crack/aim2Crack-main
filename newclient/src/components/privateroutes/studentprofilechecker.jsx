import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProfileChecker = () => {
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:7000/users`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);        
          // Assuming the 'role' field is available in the data received
        //   setIsStudent(data.role === 'student');
          if (data.profileType === 'student') {
            // Redirect to the error page if the user is a student
            console.log(data.profileType);
            navigate('/error-page'); // Adjust the route to your error page
          }
        } else {
          console.error('Failed to fetch user details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

//   if (isStudent) {
//     // Render components or logic for student profile
//     return <div>Welcome, Student!</div>;
//   } else {
//     // Render components or logic for non-student profile (not needed in this component)
//     return null;
//   }
};

export default StudentProfileChecker;

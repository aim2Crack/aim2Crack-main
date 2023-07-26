import React, { useState, useEffect } from 'react';
import LeftNavigationPanel from './LeftNavigationPanel'
import RightPanelRoot from "./rightPanel/RightPanelRoot";
import '../styles/summary.css'
import {useParams} from "react-router-dom";





const Summary = ()=> {
    useEffect(() => {
        const fetchQuiz = async () => {
          try {
            const token = localStorage.getItem('token');
            // const code = window.location.pathname.split('/')[2];
    
            const response = await fetch(`http://localhost:7000/quizzes`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              console.log(data);
            } else {
              console.error('Failed to fetch quiz details:', response.status);
            }
          } catch (error) {
            console.error('Error fetching quiz details:', error);
          }
        };
    
        fetchQuiz();
      }, []);



    
    const {summaryLink} = useParams()
    return(
        <div className="panel-container h-93 w-100">
            <LeftNavigationPanel/>
            <RightPanelRoot summaryLink={summaryLink}/>
        </div>
    )
}
export default Summary
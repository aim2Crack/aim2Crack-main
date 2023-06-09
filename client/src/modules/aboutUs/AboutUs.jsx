import React from 'react';
import image1 from './assets/image1.png';
import image2 from'./assets/image2.jpg';
import image3 from './assets/image3.jpg';
import image4 from './assets/image4.jpg';

function AboutUs() {
  return (
    <div class="body">

    <div class="page-head">
      <h1>OUR SERVICES</h1>
    </div>

     <div class="service-text">
        <div class="s-item service-img-1">
            <img src={image1} alt=""/> 
        </div>
        <div class="s-item service-1">
            <h2>
                Quizzing Module
            </h2>
            <p>
               A cheat proof system to conduct quizzes! A never before experience for students. Well balanced features to prevent any malpractice. Opening to all educators, private tutors and training institutions.
            </p>
        </div>
        <div class="s-item service-2">
            <h2>
                Quants and Coding Preparation
            </h2>
            <p>
                Preparing for competitive exams requires consistency and practice. Aim2Crack will help you to understand
                where you are lagging and will provide you in depth analysis. Manage all your quizzes at one place.
            </p>
        </div>
        <div class="s-item service-img-1 compo1">
        <img src={image2} alt=""/> 
        </div>
        <div class="s-item service-img-1 compo1">
        <img src={image3} alt=""/> 
        </div>
        <div class="s-item service-1">
            <h2>
                Interview Preparation
            </h2>
            <p>
                Make placement training and preparation more effective and interesting for the students with Aim2Crack.
                It's a great way to train students for placement rounds and prepare them for the final battle. Our
                modules are inline with the recent methodologies and are constantly updated based on the student
                feedback.
            </p>
        </div>
        <div class="s-item service-2">
            <h2>
                Intern Alerts &amp; Off Campus Drive
            </h2>
            <p>
                Get updated with latest news alerts about internships and placement offers just at Aim2Crack and be part
                of mock placement drives which makes you familiar with the process and prepares you for any challenge
                under the guidance of Experts.
            </p>
        </div>
        <div class="s-item service-img-1">
        <img src={image4} alt=""/> 
        </div>
    </div> 
    </div>
  )
}

export default AboutUs
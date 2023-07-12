import React,{useState} from 'react'
import './verification.css';
import imageSrc4 from '../../assets/images/user/images_verification.png'
import imageSrc5 from '../../assets/images/user/verification_sign.png';
const Verification =()=>{
     return(
       <div id="verification">
            <div id="check1">
            <  img src={imageSrc4} alt="error" id="image" />  
            </div>
            <div id="check2">
              <h1>Verification</h1>
              <img src={imageSrc5} alt="error" id="verification_sign" />
            </div>
            {/* <div id="check3">
               
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga debitis incidunt quo, cupiditate quis delectus labore. Obcaecati laudantium voluptatum dignissimos amet possimus dolorum voluptates dolor veniam atque, quibusdam, eos officiis!</p>
            </div>
             */}
       </div>     
      
    )
}
export default Verification;

                    

                  
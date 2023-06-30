import React,{useState} from 'react'
import './Profile.css';
// style={{ width: '78.5833px', height: '44pxx' }}🖊
const Profile=()=>{

      
     return(
        
      <div id="profile">
         
        
            <div id= "block">
            
            </div>
            
    
        
            <div class="user">  
                <h1>cheatan</h1>
            
        </div>
        
        
            
            
       
       <div id="email">{
            <p class="email1">chetan@teacher.gmail.com</p>
        }
        </div>
        <form class="details">
            <fieldset class="forms">
                <div class="first_name">   
                   <span class="label"  >First Name : </span>
                    <input type="text" id="f_name" placeholder='FIRST NAME'></input>
                </div>
                <div class="last_name">
                   <span class="label" >Last Name : </span>
                    <input type="text" id="l_name" placeholder='LAST NAME'></input>
                </div>
                <div class="roll_no">
                   <span class="label" >Roll number/Employee Id : </span>
                    <input type="text" id="r_name" value="I am Teacher"></input>
                </div>
                <div class="roll_no">
                   <span class="label" >Institute :</span>
                    <input type="text" id="id" value="NITJ"></input>
                </div>
                <div class="roll_no">
                   <span class="label" >Profile :</span>
                    <input type="text" id="id" value="Teacher"></input>
                </div>
            </fieldset> 
            
            <div class="change_password">
                <a class="password" href="">Change Password</a>
            </div>
            
            <div id="button">
                <button class="submit" type="submit">Save</button>
            </div>
            {/* <div>
        <button class="modal"></button>
        <button class="edit" type="submit">Edit</button>
            </div> */}
        </form>

      </div>

    
    
    )
}
export default Profile;
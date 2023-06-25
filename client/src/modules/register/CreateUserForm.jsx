
// import React, { useState } from 'react';

// const CreateUserForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     password: '',
//     profileType: '',
//     rollNo: null,
//     institute: '',
//     brandName: 'none',
//     brandLogo: '',
//     brandLink: ''
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch('http://127.0.0.1:7000/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     })
//       .then(response => {
//         if (response.ok) {
//           // Request was successful
//           console.log('User created successfully!');
//         } else {
//           // Request failed
//           throw new Error('User creation failed.');
//         }
//       })
//       .catch(error => {
//         // Handle error
//         console.error(error);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           value={formData.username}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="phone">Phone:</label>
//         <input
//           type="text"
//           id="phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="profileType">Profile Type:</label>
//         <select
//           id="profileType"
//           name="profileType"
//           value={formData.profileType}
//           onChange={handleInputChange}
//         >
//           <option value="">Select profile type</option>
//           <option value="student">Student</option>
//           <option value="faculty">Faculty</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="rollNo">Roll No:</label>
//         <input
//           type="text"
//           id="rollNo"
//           name="rollNo"
//           value={formData.rollNo}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="institute">Institute:</label>
//         <input
//           type="text"
//           id="institute"
//           name="institute"
//           value={formData.institute}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="brandLogo">Brand Logo:</label>
//         <input
//           type="text"
//           id="brandLogo"
//           name="brandLogo"
//           value={formData.brandLogo}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="brandLink">Brand Link:</label>
//         <input
//           type="text"
//           id="brandLink"
//           name="brandLink"
//           value={formData.brandLink}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button type="submit">Create User</button>
//     </form>
//   );
// };

// export default CreateUserForm;
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const CreateUserForm = () => {
  const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_Password:'',
    profileType: '',
    rollNo: '',
    institute: '',
    brandName: 'none',
    brandLogo: '',
    brandLink: ''
  };

  const handleSubmit = (values) => {
    fetch('http://127.0.0.1:7000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => {
        if (response.ok) {
          console.log('User created successfully!');
        } else {
          throw new Error('User creation failed.');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
        <div className="register_container">

<div className="register_box">
<div className="left_panel">
  <h2>Register Yourself on Aim2Crack!!</h2>
<Form  className="form_method">
<fieldset className="form-group bottom_error">   
<div id="div_id_username" className="input">
  
  <label htmlFor="username"  className="form__label">Username:</label>
  <Field type="text" id="username" name="username"  className="textinput textInput form-control"/>
  
 </div>


 <div class="rules_u">
 <ErrorMessage name="username" component="div" />
              </div>

              
 



<div id="div_id_email" className="input">
  <label htmlFor="email" className="form__label"  >Email:</label>
  <Field type="email" id="email" name="email" className="emailinput form-control" />
  
</div>



<div class="rules_e">
<ErrorMessage name="email" component="div" />
              </div>





<div className="input">

  <label htmlFor="phone" className="form__label">Phone:</label>
  <Field type="text" id="phone" name="phone" className="textinput textInput form-control" />
  
</div>


<div class="rules_ph">
<ErrorMessage name="phone" component="div" />
              </div>



<div className="input " id="div_id_password1"  >
  <label htmlFor="password"  className="form__label" id="password_label" >Password:</label>
  <Field type="password" id="password" name="password" className="textinput textInput form-control  id_password1" 
                 placeholder=" " autoComplete="new-password"
                 />



</div>

<div class="rules_pass">
<ErrorMessage name="password" component="div" />
              </div>


<div  id="div_id_password2" className="input">
  <label htmlFor=""  className="form__label" id="password_label2">Confirm Password:</label>
  <Field type="password" id="password" 
                 className="textinput textInput form-control id_password2" 
                  placeholder=" " name="Confirm_Password" />
  




</div>


<div class="rules_CP">
<ErrorMessage name="Confirm_Password" component="div" />


              </div>








<div className="input" id="roll">
  <label htmlFor="rollNo" className="form__label">Roll No:</label>
  <Field type="text" id="rollNo" name="rollNo" placeholder=" " className="form-control" />
  
</div>
<ErrorMessage name="rollNo" component="div" />



<div  id="institute" className="input">
  <label htmlFor="institute" className="form__label">Institute:</label>
  <Field type="text" id="institute" name="institute" placeholder=" " className="form-control"/>
 
</div>
<ErrorMessage name="institute" component="div" />



<div id="profile_name" className="input-box">
  <label htmlFor="profile_type">Profile Type:</label>
  <Field as="select" id="profile_type" name="profile_type">
    <option id="S" value="">Select profile type</option>
    <option id="S" value="student">Student</option>
    <option id="S" value="faculty">Faculty</option>
  </Field>
 
</div>



<div class="rules_profile">
<ErrorMessage name="profile_type" component="div" />

              </div>






<div className="sign">
<button className="btn btn-outline-info" type="submit"  >Sign Up</button>
         </div>



</fieldset>
</Form>

</div>

<div className="right_panel">

<img src="/static/users/undraw_maker_launch_crhe.svg" alt=""/>

      <div className="border-top pt-3">
            <small className="text-muted">
           <h3> Already have an account ?</h3>
            <div className="sign_in">

  <a className="ml-2" >Sign In</a>
</div>
</small>
</div>
</div>




    </div>

</div>



    </Formik>
  );
};

export default CreateUserForm;

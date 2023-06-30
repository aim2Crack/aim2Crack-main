
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

const UserRegister = () => {
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
    fetch('http://127.0.0.1:7000/signup', {
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
    <Form>
    <div>
      <label htmlFor="username">Username:</label>
      <Field type="text" id="username" name="username" />
      <ErrorMessage name="username" component="div" />
    </div>

    <div>
      <label htmlFor="email">Email:</label>
      <Field type="email" id="email" name="email" />
      <ErrorMessage name="email" component="div" />
    </div>

    <div>
      <label htmlFor="phone">Phone:</label>
      <Field type="text" id="phone" name="phone" />
      <ErrorMessage name="phone" component="div" />
    </div>

    <div>
      <label htmlFor="password">Password:</label>
      <Field type="password" id="password" name="password" />
      <ErrorMessage name="password" component="div" />
    </div>

    <div>
      <label htmlFor="profileType">Profile Type:</label>
      <Field as="select" id="profileType" name="profileType">
        <option value="">Select profile type</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
      </Field>
      <ErrorMessage name="profileType" component="div" />
    </div>

    <div>
      <label htmlFor="rollNo">Roll No:</label>
      <Field type="text" id="rollNo" name="rollNo" />
      <ErrorMessage name="rollNo" component="div" />
    </div>

    <div>
      <label htmlFor="institute">Institute:</label>
      <Field type="text" id="institute" name="institute" />
      <ErrorMessage name="institute" component="div" />
    </div>

    <button type="submit">Create User</button>
  </Form>
  </Formik>
  );
};
export default UserRegister;

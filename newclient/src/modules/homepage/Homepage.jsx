import React from 'react'
import { getUserDetails,logout } from '../../services/jwtService'
import { Link } from 'react-router-dom';

const Homepage = (props) => {
  const { userDetails } = props;
  return (
    <>
      <div>Homepage</div>
      {userDetails ? <p> {userDetails?.username}</p> : <p>User not logged in</p>}
      <button onClick={logout}>Logout</button>
      <Link to ='/login'>Login</Link>
    </>
  )
}

export default Homepage
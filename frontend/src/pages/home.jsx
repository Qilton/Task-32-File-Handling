import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../util';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [LoggedInUser, setLoggedInUser] = useState('');
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const HandleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const getUsers = async () => {
    try {
      const url = "https://task-32-file-handling-server.vercel.app/product/get";
      const options = {
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem('token'),
        },
      };
      
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();

      if (Array.isArray(result)) {
        setUsers(result); 
      } else if (result && result.users) {
        setUsers(result.users);  
      } else {
        throw new Error('Invalid user data format');
      }

    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div>
      <div>{LoggedInUser}</div>
      <button onClick={HandleLogout}>Logout</button>
      <button onClick={getUsers}>Get Users</button>
      
      <div>
        {Users && Users.length > 0 ? (
       
          Users.map((user) => (
            <ul key={user._id}>
              <li> {user.name}</li>
              <li> {user.email}</li>
             <br />
             </ul>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Home;

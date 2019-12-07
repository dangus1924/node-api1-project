import React, {useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [user, setUser] = useState({
    name: '',
    bio: ''
  })

axios
  .get('127.0.0.1:8080/api/users')
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    })
  }

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post('127.0.0.1:8080/api/users')
      .then(res => {
        console.log(res)      
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="App">
     <form value={submitHandler}>
       <input  
        type='text' 
        placeholder='name' 
        name='name'
        value={user.name}
        onChange={handleChange}
        />
      <input 
        type='text' 
        placeholder='Bio' 
        name='bio'
        value={user.bio}
        onChange={handleChange}
        />
      <button type='submit'>Add User</button>
     </form>
    </div>
  );
}

export default App;

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserPage from './userPage';
import AdminPage from './adminPage';
import FuncPage from './funcPage';


function App() {

  const [backendData, setBackendData] = useState([{}]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
      }
    )
  }, [])


  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", { username, password });
      const userType = response.data.userType;

      if (userType === 'user') {
        navigate('/user');
      } else if (userType === 'admin') {
        navigate('/admin');
      } else if (userType === 'tec') {
        navigate('/tec');
      }

    } catch (error) {
      console.error('Login failed:', error.response);
    }
  };

  return (
    <div className="App">
    <h1>Login</h1>
    <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
    />
    <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>Login</button>
    </div>
  );
}


export default App;
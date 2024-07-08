import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserPage from './userPage';
import AdminPage from './adminPage';
import FuncPage from './funcPage';
import App from './App';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/user" element={<UserPage/>} />
                <Route path="/admin" element={<AdminPage/>} />
                <Route path="/tec" element={<FuncPage/>} />
            </Routes>
        </Router>
    );
  }

  export default AppRoutes;
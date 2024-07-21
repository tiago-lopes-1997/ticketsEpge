import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UserPage from './userPage';
import AdminPage from './adminPage';
import FuncPage from './funcPage';
import App from './App';
import AdminAddSite from './adminViews/adminAddSite';
import AdminManageUsers from './adminViews/adminManageUsers';
import AdminManageTickets from './adminViews/adminManageTickets';

function AppRoutes() {
    return (
        <Router>
            <Routes>
            //Normal routes
                <Route path="/" element={<App/>} />
                <Route path="/user" element={<UserPage/>} />
                <Route path="/admin" element={<AdminPage/>} />
                <Route path="/tec" element={<FuncPage/>} />
            
            // Admin routes
                <Route path="/admin/addSite" element={<AdminAddSite/>}/>
                <Route path="/admin/manageUsers" element={<AdminManageUsers/>}/>
                <Route path="/admin/manageTickets" element={<AdminManageTickets/>}/>
            </Routes>
        </Router>
    );
  }

  export default AppRoutes;
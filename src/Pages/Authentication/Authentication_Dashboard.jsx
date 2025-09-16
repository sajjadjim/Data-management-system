import React from 'react';
import Login from './Login/Login';
import { Outlet } from 'react-router-dom';

const Authentication_Dashboard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Authentication_Dashboard;
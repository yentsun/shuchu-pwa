import React from 'react';
import { Outlet } from 'react-router-dom';
import './main.css';


export default function Main() {

    return (
        <div id="main">
            <Outlet />
        </div>
    );
}

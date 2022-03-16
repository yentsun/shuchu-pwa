import React from 'react';
import { Outlet } from 'react-router-dom';
import SidePanel from '../SidePanel/SidePanel';
import './layout.css';


export default function Layout() {

    return <div id="layout">

        <SidePanel />

        <Outlet />

    </div>;
}

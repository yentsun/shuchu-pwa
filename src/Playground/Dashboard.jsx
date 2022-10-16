import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../TopBar/TopBar';
import './playground.css';
import SidePanel from '../SidePanel/SidePanel';
import BottomBar from '../BottomBar/BottomBar';


export default function Dashboard() {

    return <div id="playground">

        <TopBar />

        <SidePanel />

        <Outlet />

        <BottomBar />

    </div>;
}

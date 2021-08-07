import React from 'react';
import { NavLink } from 'react-router-dom';
import { phrases } from '../dictionary';
import './sidepanel.css';


export default function SidePanel() {

    return (<div id="side-panel">

        <ul>
            <li><NavLink to="/create-card">{ phrases.createCard }</NavLink></li>
        </ul>

    </div>);
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import {phrases, routes, words} from '../dictionary';
import './sidepanel.css';


export default function SidePanel() {

    return (<div id="side-panel">

        <ul>
            <li><NavLink to={ routes.createCard }>{ phrases.createCard }</NavLink></li>
            <li><NavLink to={ routes.inventory }>{ words.inventory }</NavLink></li>
        </ul>

    </div>);
}

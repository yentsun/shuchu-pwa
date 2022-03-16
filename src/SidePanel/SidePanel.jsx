import React from 'react';
import { NavLink } from 'react-router-dom';
import {phrases, paths, words} from '../dictionary';
import './sidepanel.css';


export default function SidePanel() {

    return (<div id="side-panel">

        <ul>
            <li><NavLink to={ paths.createCard }>{ phrases.createCard }</NavLink></li>
            <li><NavLink to={ paths.inventory }>{ words.inventory }</NavLink></li>
        </ul>

    </div>);
}

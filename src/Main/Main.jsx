import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../dictionary';
import CreateCard from '../CreateCard/CreateCard';
import Inventory from '../Inventory/Inventory';
import './main.css';


export default function Main() {

    return (<div id="main">
        <Switch>
            <Route path={ routes.createCard } component={ CreateCard } />
            <Route path={ routes.inventory } component={ Inventory } />
        </Switch>
    </div>);
}

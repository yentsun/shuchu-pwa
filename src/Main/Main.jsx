import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../dictionary';
import CreateCard from '../CreateCard/CreateCard';
import './main.css';


export default function Main() {

    return (<div id="main">
        <Switch>
            <Route path={ routes.createCard } component={ CreateCard } />
        </Switch>
    </div>);
}

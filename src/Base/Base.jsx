import React, { useReducer } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { paths } from '../dictionary';
import { BaseContext, initialState, reducer } from './reducer';
import Inventory from '../Inventory/Inventory';
import CreateCard from '../ManageCard/CreateCard';
import './base.css';


export default function Base() {

    const [ state, dispatch ] = useReducer(reducer, initialState);

    return (
        <BaseContext.Provider value={{ state, dispatch }}>

            <BrowserRouter><Routes>

                <Route path="/" element={ <Layout /> }>
                    <Route path={ paths.inventory } element={ <Inventory /> } />
                    <Route path={ paths.createCard } element={ <CreateCard /> } />
                </Route>

            </Routes></BrowserRouter>

        </BaseContext.Provider>
    );
}

import React, { useReducer, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import RequireAuth from '../RequireAuth';
import Dashboard from '../Playground/Dashboard';
import {
    actionTypes as a,
    keys,
    routes,
    routes as r,
    words as w,
} from '../dictionary';
import { BaseContext, initialState, reducer } from './reducer';
import { viki } from '../index';
import './base.css';
import CreateCard from '../ManageCard/CreateCard';
import Inventory from '../Inventory/Inventory';


export default function Base() {

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { self } = state;

    // load player data if player is logged in
    useEffect(() => {

        console.debug('👤 self:', self);

        if (self) return;

        async function loadPlayerdata() {
            const atlas = viki.currentUser.mongoClient(keys.atlasService);

            console.debug(`👤📡 fetching projection data for ${w.player}`, viki.currentUser.customData.id);
            const playerDataProjection = await atlas.db(keys.sourceDB).collection(keys.playerCollection).findOne(
                { id: viki.currentUser.customData.id },
                { projection: { _id: false } });

            console.debug(`merging fetched ${w.player} data`);
            dispatch({ type: a.SELF_DATA_RECEIVED, playerData: {
                    ...viki.currentUser.customData,
                    ...viki.currentUser._profile.data,
                    ...playerDataProjection }});
        }

        if (viki.currentUser)
            loadPlayerdata();

    }, [ self ]);

    return (
        <BaseContext.Provider value={{ state, dispatch }}>
            <BrowserRouter><Routes>

                {/* Public */}
                <Route path={ r.login } element={ <Login /> } />
                <Route path={ r.register } element={ <Register /> } />

                {/* Private */}
                <Route path={ r.dashboard } element={ <RequireAuth><Dashboard /></RequireAuth> } >
                    <Route path={ routes.createCard } element={ <CreateCard /> } />
                    <Route path={ routes.inventory } element={ <Inventory /> } />
                </Route>

            </Routes></BrowserRouter>
        </BaseContext.Provider>
    );
}

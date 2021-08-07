import React, { useContext, useEffect } from 'react';
import './topbar.css';
import { actionTypes, keys } from '../dictionary';
import { viki } from '../index';
import { BaseContext } from '../Base/reducer';
import useDB from '../hooks/useDB';
import useLogout from '../hooks/useLogout';


const formatter = new Intl.NumberFormat({
    style: 'decimal'
});

export default function TopBar() {

    const { dispatch, state: { self }} = useContext(BaseContext);
    const logOut = useLogout();

    // if we have no `self` object, get our projection from DB
    const [ getSelfProjection, selfProjection ] = useDB({
        collection: keys.playerCollection,
        query: { id: viki.currentUser.customData.id }});

    if (! self) getSelfProjection();

    useEffect(() => {

        if (selfProjection) {
            // and update the context state with it
            dispatch({ type: actionTypes.SELF_DATA_RECEIVED, playerData: selfProjection });
        }

    }, [ selfProjection, dispatch ]);

    return (<div id="top-bar">

        <div id="resources">stats</div>

        <div id="balance">{ self ? formatter.format(self.balance) : 'loading...' }</div>

        <div id="player-menu" onClick={ () => logOut() }>{ self.email }</div>

    </div>);
}

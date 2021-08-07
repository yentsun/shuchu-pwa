import React from 'react';
import { actionTypes as a, words as w } from '../dictionary';


/*****************!! WARNING !!**********************
 *                                                  *
 *        AS FEW ACTIONS AS POSSIBLE HERE           *
 *                                                  *
*****************************************************/

export const initialState = {
    self: null
};

export const reducer = (state, action) => {
    switch (action.type) {

        case a.NEW_PLAYER_REGISTERED:
        case a.PLAYER_LOGGED_IN:
        case a.SELF_DATA_RECEIVED:

            return {...state,
                self:  action.playerData,
                statusMessage: `${w.player} data ${w.received}`
            };

        case a.PLAYER_LOGGED_OUT:
            return initialState;

        default:
            throw new Error('unknown action type');
    }

}

export const BaseContext = React.createContext();

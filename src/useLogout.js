import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { viki } from './index';
import { BaseContext } from './Base/reducer';
import { actionTypes, routes as r, words as w } from './dictionary';


export default function useLogout() {

    const navigate = useNavigate();
    const { dispatch } = useContext(BaseContext);
    const [ isWaiting, setIsWaiting ] = useState(true);

    useEffect(() => {

        async function doLogOut() {
            console.debug('clearing user data from storage...');
            await viki.currentUser.logOut();
            dispatch({ type: actionTypes.PLAYER_LOGGED_OUT });

            console.debug(`redirecting to ${w.login} screen`);
            navigate(r.login);
        }

        if (! isWaiting)
            doLogOut();

    }, [ isWaiting, dispatch, navigate ]);

    return setIsWaiting;
}

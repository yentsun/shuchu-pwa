import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from './dictionary';
import { BaseContext } from './Base/reducer';


export default function RequireAuth({ children }) {

    const { state: { self }} = useContext(BaseContext);
    const navigate = useNavigate();

    useEffect(() => {

        if (! self) {
            console.debug('👤❌ no self data, login required');
            navigate(routes.login);
        }

    }, [ self, navigate ]);

    return self ? children : <></>;
};

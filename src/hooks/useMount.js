// credit: https://stackoverflow.com/a/45323523/216042
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';


export default function useMount(isInitiallyMounted, isDisabled, routeOnClosure) {

    const [ isMounted, setIsMounted ] = useState(isInitiallyMounted);
    const history = useHistory();
    const ref = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (ref.current && ! ref.current.contains(event.target)) {
                setIsMounted(false);

                if (routeOnClosure)
                    history.push(routeOnClosure);
            }
        };

        if (! isDisabled)
            document.addEventListener('mousedown', handleClickOutside, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [ isDisabled, history, routeOnClosure ]);

    return [ ref, isMounted, setIsMounted, isDisabled ];
}

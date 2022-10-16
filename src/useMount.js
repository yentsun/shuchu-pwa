// credit: https://stackoverflow.com/a/45323523/216042
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


export default function useMount(isInitiallyMounted, isDisabled, routeOnClosure) {

    const [ isMounted, setIsMounted ] = useState(isInitiallyMounted);
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (ref.current && ! ref.current.contains(event.target)) {
                setIsMounted(false);

                if (routeOnClosure)
                    navigate(routeOnClosure);
            }
        };

        if (! isDisabled)
            document.addEventListener('mousedown', handleClickOutside, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [ isDisabled, navigate, routeOnClosure ]);

    return [ ref, isMounted, setIsMounted, isDisabled ];
}

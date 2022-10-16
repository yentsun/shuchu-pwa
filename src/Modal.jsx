import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useMount from './useMount';


export default function Modal({ children, setMounted, ...props }) {

    const [ _ref, isMounted ] = useMount(true);

    useEffect(() => {

        if (! isMounted)
            setMounted(false)

    }, [ isMounted, setMounted ]);

    const Element = (

        <div ref={ _ref } id="modal" {...props } >
            { children }
        </div>);

    return ReactDOM.createPortal(Element, document.body);
};

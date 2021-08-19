import React from 'react';
import ReactDOM from 'react-dom';


export default function Modal({ children, setMounted }) {

    const Element = (

        <div id="modal" >
            { children }

            <button onClick={ () => setMounted(false) } >close</button>
        </div>);

    return ReactDOM.createPortal(Element, document.body);
};

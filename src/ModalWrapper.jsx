import React from 'react';
import ReactDOM from 'react-dom';


export default function Modal({ children }) {

    const Element = (

        <div className="modal" >
            { children }
        </div>);

    return ReactDOM.createPortal(Element, document.body);
};

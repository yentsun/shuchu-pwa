import React from 'react';
import './card.css';
import photo from './31_19 06 21.jpg';


export default function Card({ image }) {
    return (<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
                 width="228" height="332">

        <defs>
            <clipPath id="base">
                <path d="M10,0 h208 a10,10 0 0 1 10,10 v312 a10,10 0 0 1 -10,10 h-208 a10,10 0 0 1 -10,-10 v-312 a10,10 0 0 1 10,-10 z" />
            </clipPath>
        </defs>

        <image {...image } clipPath="url(#base)" />
    </svg>);
}

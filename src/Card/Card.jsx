import React from 'react';
import './card.css';


const WIDTH = 228;
const HEIGHT = 332;

export default function Card({ image, color }) {
    return (<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
                 width={ WIDTH } height={ HEIGHT }>

        <defs>
            <clipPath id="base">
                <rect width={ WIDTH } height={ HEIGHT } rx="10" />
            </clipPath>

            <radialGradient id={ color } cx="50%" cy="50%" r="50%" >
                <stop offset="30%" style={{ 'stop-color': color,'stop-opacity':1.00}} />
                <stop offset="100%" style={{ 'stop-color': color, 'stop-opacity':0.00 }} />
            </radialGradient>
        </defs>

        <g clipPath="url(#base)">
            <image {...image }  />
            <rect x={ 0 } y={ HEIGHT - HEIGHT / 3 } width={ WIDTH } height={ HEIGHT / 3 } fill={ `url(#${color})` } />
        </g>


    </svg>);
}

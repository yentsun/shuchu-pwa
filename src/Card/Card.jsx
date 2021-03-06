import React from 'react';
import './card.css';


const WIDTH = 228;
const HEIGHT = 332;

export default function Card({ image, flatColor=false, color, title, flavor, clean=false }) {

    const titleStyle =  {
        font: `30px serif`,
        fill: flatColor ? 'black' : 'white'
    }

    const flavorStyle = {
        font: `italic 15px serif`,
        color: flatColor ? 'black' : 'white',
        lineHeight: `1em`
    }

    return (<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
                 width={ WIDTH } height={ HEIGHT }>

        <defs>
            <clipPath id="base">
                <rect width={ WIDTH } height={ HEIGHT } rx="0" />
            </clipPath>

            <radialGradient id={ color } cx="50%" cy="50%" r="50%" >
                <stop offset="30%" style={{ stopColor: color,stopOpacity: 1.00 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.00 }} />
            </radialGradient>
        </defs>

        <g clipPath="url(#base)" width={ WIDTH } >

            {/* background for transparent images */}
            { flatColor &&
            <rect x="-20" y="-20" width="800" height="800" fill="white"/> }

            <image {...image }  />

            { (! clean || flatColor) &&
            <>
                { ! flatColor &&
                <rect x={ 0 } y={ HEIGHT - HEIGHT / 3 } width="100%" height={ HEIGHT / 3 } fill={ `url(#${color})` } />}

                <text textAnchor="middle" x="50%" y={ HEIGHT - HEIGHT / 5.2 } style={ titleStyle } fillOpacity="0.9">{ title }</text>
                <path strokeWidth={ 0.4 } opacity={ 0.8 } stroke={ flatColor ? 'black' : 'white' } d={ `m 10,280 h 208 z` } />
                <foreignObject x="30" y="270" width="180" height="50" opacity="0.8">
                    <p xmlns="http://www.w3.org/1999/xhtml" style={ flavorStyle }>
                        { flavor }
                    </p>
                </foreignObject>
            </> }
        </g>

    </svg>);
}

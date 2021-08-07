import React, { useContext } from 'react';
import './bottom-bar.css';
import { BaseContext } from '../Base/reducer';


export default function BottomBar() {

    const { state: { statusMessage }} = useContext(BaseContext);

    return (<div id="bottom-bar">&gt;&nbsp;{ statusMessage }</div>);
}

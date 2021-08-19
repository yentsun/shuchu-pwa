import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { words as w } from '../dictionary';
import Card from '../Card/Card';
import Modal from '../Modal';
import useGetCards from './useGetCards';
import './inventory.css';


export default function Inventory() {

    // TODO implement this for centered zoom: http://jsfiddle.net/ZqpGL/263/

    const [ selectedCardId, setSelectedCardId ] = useState(null);
    const [ cardMap ] = useGetCards({ returnMap: true });

    return (<div id="inventory">

        { selectedCardId &&
        <Modal setMounted={ setSelectedCardId }>

            <div id={ selectedCardId } className="card-detail" style={{
                backgroundImage: `url(data:image/svg+xml;base64,${btoa(ReactDOMServer.renderToStaticMarkup(
                    <Card {...cardMap[selectedCardId] } />))})` }}>

            </div>

        </Modal> }

        <h1>{ w.inventory }</h1>

        <div id="cards">

            { cardMap && Object.values(cardMap).map(({ image, id, ...cardProps }) =>
                <div key={ id } id={ id } className="card" onClick={ () => setSelectedCardId(id) }
                     style={{ backgroundImage: `url(data:image/svg+xml;base64,${btoa(ReactDOMServer.renderToStaticMarkup(
                         <Card {...cardProps } image={ image } />))})` }} />) }

        </div>

    </div>);
}

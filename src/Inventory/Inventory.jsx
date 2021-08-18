import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { words as w } from '../dictionary';
import Card from '../Card/Card';
import Modal from '../ModalWrapper';
import './inventory.css';
import useGetCards from './useGetCards';


export default function Inventory() {

    // TODO implement this: http://jsfiddle.net/ZqpGL/263/

    const [ selectedCardId, setSelectedCardId ] = useState(null);
    const [ cards ] = useGetCards();

    console.debug({ selectedCardId });

    return (<div id="inventory">

        { selectedCardId &&
        <Modal>

        </Modal> }

        <h1>{ w.inventory }</h1>

        <div id="cards">

            { cards && cards.map(({ image, id, ...cardProps }) =>
                <div key={ id } id={ id } className="card" onClick={ () => setSelectedCardId(id) }
                     style={{ backgroundImage: `url(data:image/svg+xml;base64,${btoa(ReactDOMServer.renderToStaticMarkup(
                         <Card {...cardProps } image={ image } />))})` }} />) }

        </div>

    </div>);
}

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
    const selectedCard = selectedCardId ? cardMap[selectedCardId] : null

    return (<div id="inventory">

        { selectedCard &&
        <Modal setMounted={ setSelectedCardId } className="card-detail">

            <div id={ selectedCardId } className="card-large" style={{
                backgroundImage: `url(data:image/svg+xml;base64,${btoa(ReactDOMServer.renderToStaticMarkup(
                    <Card {...selectedCard } clean={ true } />))})` }}>
            </div>

            <table className="props">
                <tbody>

                <tr>
                    <td>ID</td>
                    <td>{ selectedCard.id }</td>
                </tr>

                <tr>
                    <td>title</td>
                    <td>{ selectedCard.title }</td>
                </tr>

                <tr>
                    <td>flavor text</td>
                    <td>{ selectedCard.flavor }</td>
                </tr>

                <tr>
                    <td>color</td>
                    <td>{ selectedCard.color }</td>
                </tr>

                <tr>
                    <td>Owner ID</td>
                    <td>{ selectedCard.ownerId }</td>
                </tr>

                </tbody>
            </table>

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

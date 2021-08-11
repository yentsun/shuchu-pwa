import React, {useContext, useEffect, useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import useDBCall from '../hooks/useDB';
import { keys, words as w } from '../dictionary';
import { BaseContext } from '../Base/reducer';
import Card from '../Card/Card';
import './inventory.css';


export default function Inventory() {

    // TODO implement this: http://jsfiddle.net/ZqpGL/263/

    const { state: { self }} = useContext(BaseContext);
    const [ renderedCards, setRenderedCards ] = useState([]);
    const [ getCards, cards ] = useDBCall({ db: keys.projectionDB, cmd: keys.find, collection: keys.cardsCollection });

    // fetch cards data
    useEffect(() => {

        if (! self) return;

        console.debug('fetching player cards');
        getCards({ authorId: self.id });

    }, [ self, getCards ])

    // render cards
    useEffect(() => {

        if (! cards) return;

        console.debug('rendering cards:', cards.length);
        const rendered = cards.map(({ image, ...cardProps }) => ReactDOMServer.renderToStaticMarkup(<Card {...cardProps } image={ image } />));
        setRenderedCards(rendered);

    }, [ cards ])

    return (<div id="inventory">

        <h1>{ w.inventory }</h1>

        <div id="cards">

            { renderedCards.map((renderedCard, index) =>
                <div key={ index }
                     className="card" style={{ backgroundImage: `url(data:image/svg+xml;base64,${btoa(renderedCard)})` }} />) }

        </div>

    </div>);
}

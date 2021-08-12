import loadImage from 'blueimp-load-image';
import React, { useContext, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { keys, words as w } from '../dictionary';
import { BaseContext } from '../Base/reducer';
import useDBCall from '../hooks/useDB';
import Card from '../Card/Card';
import './manage-card.css';
import '../Card/card.css';


export default function UpdateCard() {

    const { state: { self }} = useContext(BaseContext);
    const [ applyClicked, setApplyClicked ] = useState(false);
    const [ renderedCard, setRenderedCard ] = useState(null);
    const [ , fetchedCard ] = useDBCall({
        db: keys.projectionDB, cmd: keys.insertOne, collection: keys.cardsCollection });

    // normalize image to blob
    useEffect(() => {

        if (! file) return;

        loadImage(file, (canvas) => {
            setImage(image => ({...image, xlinkHref: canvas.toDataURL() }))
        }, {
            maxWidth: 820,
            maxHeight: 820,
            canvas: true,
            orientation: true });

    }, [ file ]);

    useEffect(() => {

        if (! applyClicked) return;

        setRenderedCard(ReactDOMServer.renderToStaticMarkup(<Card {...cardProps } image={ image } />));
        setApplyClicked(false);

    }, [ applyClicked, cardProps, image ]);


    return (<div id="create-card">

        <h1>{ w.create } { w.card }</h1>

        <div id="preview">

            { renderedCard &&
            <div className="card" style={{ backgroundImage: `url(data:image/svg+xml;base64,${btoa(renderedCard)})` }} /> }

        </div>

        <div id="controls">

            <input type="file"
                   onChange={ (e) => setFile(Array.from(e.target.files)[0]) }
                   name="files[]" id="file"
                   multiple />

            <input onChange={ (e) => setImage({...image, x: Number(e.target.value) }) }
                   type="text" defaultValue={ image.x } />
            <input onChange={ (e) => setImage({...image, y: Number(e.target.value) }) }
                   type="text" defaultValue={ image.y } />
            <input onChange={ (e) => setImage({...image, width: Number(e.target.value) }) }
                   type="text" defaultValue={ image.width } />
            <input onChange={ (e) => setCardProps({...cardProps, color: e.target.value}) }
                   type="text" defaultValue={ cardProps.color } />
            <input onChange={ (e) => setCardProps({...cardProps, title: e.target.value}) }
                   type="text" defaultValue={ cardProps.title } />
            <input onChange={ (e) => setCardProps({...cardProps, flavor: e.target.value}) }
                   type="text" defaultValue={ cardProps.flavor } />

            <button onClick={ () => setApplyClicked(true) } >{ w.apply }</button>
            <button onClick={ () => createCard({
                ...cardProps,
                image,
                authorId: self.id,
                id: `CRD-${customAlphabet(nolookalikesSafe, 10)()}` }) } >
                { w.create }
            </button>
        </div>

    </div>);
}

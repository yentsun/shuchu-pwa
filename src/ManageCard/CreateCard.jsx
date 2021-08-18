import loadImage from 'blueimp-load-image';
import { customAlphabet } from 'nanoid';
import { nolookalikesSafe } from 'nanoid-dictionary';
import React, { useContext, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { words as w } from '../dictionary';
import { BaseContext } from '../Base/reducer';
import Card from '../Card/Card';
import { aziza } from '../index';
import './manage-card.css';
import '../Card/card.css';


export default function CreateCard() {

    const { state: { self }} = useContext(BaseContext);
    const [ cardProps, setCardProps ] = useState({
        id: null,
        color: 'grey',
        title: 'title',
        flatColor: false,
        flavor: 'some flavor text'
    });
    const [ image, setImage ] = useState( { x: -15, y: -30, width: 260, xlinkHref: null });
    const [ file, setFile ] = useState(null);
    const [ applyClicked, setApplyClicked ] = useState(false);
    const [ renderedCard, setRenderedCard ] = useState(null);

    // normalize image
    useEffect(() => {

        if (! file) return;

        if (file.type === 'image/svg+xml') {
            setCardProps(props => ({...props, flatColor: true }))
        }

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

            <label htmlFor="file">
                file:
                <input type="file"
                       onChange={ (e) => setFile(Array.from(e.target.files)[0]) }
                       name="files[]" id="file" />
            </label>

            <label htmlFor="xOffset">
                x offset:
                <input onChange={ (e) => setImage({...image, x: Number(e.target.value) }) }
                       type="text" defaultValue={ image.x } id="xOffset" />
            </label>

            <label htmlFor="yOffset">
                y offset:
                <input onChange={ (e) => setImage({...image, y: Number(e.target.value) }) }
                       type="text" id="yOffset" defaultValue={ image.y } />
            </label>

            <label htmlFor="width">
                width:
                <input onChange={ (e) => setImage({...image, width: Number(e.target.value) }) }
                       type="text" id="width" defaultValue={ image.width } />
            </label>

            <label htmlFor="color">
                color:
                <input onChange={ (e) => setCardProps({...cardProps, color: e.target.value}) }
                       type="text" id="color" defaultValue={ cardProps.color } />
            </label>

            <label htmlFor="title">
                title:
                <input onChange={ (e) => setCardProps({...cardProps, title: e.target.value}) }
                       type="text" id="title" defaultValue={ cardProps.title } />
            </label>

            <label htmlFor="flavor">
                flavor text:
                <input onChange={ (e) => setCardProps({...cardProps, flavor: e.target.value}) }
                       type="text" id="flavor" defaultValue={ cardProps.flavor } />
            </label>

            <label htmlFor="flatColor">
                flat color:
                <input id="flatColor" onChange={ (e) => setCardProps({...cardProps, flatColor: e.target.checked}) }
                       type="checkbox" defaultChecked={ cardProps.flatColor } />
            </label>

            <button onClick={ () => setApplyClicked(true) } >{ w.apply }</button>

            <button onClick={ () => aziza.cards.add({
                ...cardProps,
                image,
                authorId: self.id,
                ownerId: self.id,
                id: `CRD-${customAlphabet(nolookalikesSafe, 10)()}`
            })} >
                { w.create }
            </button>
        </div>

    </div>);
}

import Dexie from 'dexie';
import * as Realm from 'realm-web';
import React from 'react';
import ReactDOM from 'react-dom';
import Base from './Base/Base';
import reportWebVitals from './reportWebVitals';
import { keys } from './dictionary';


// initialize Realm app
const viki = new Realm.App({ id: process.env.REACT_APP_REALM_ID });

// local DB
const aziza = new Dexie('aziza');
aziza.version(1).stores({ cards: 'id' });

// TODO move to a separate file
aziza.cards.hook('creating', async (primKey, newCard) => {

    if (newCard._id) return;

    const atlas = viki.currentUser.mongoClient(keys.atlasService);
    const result = await atlas.db(keys.sourceDB).collection(keys.eventsCollection).insertOne({
        type: keys.cardCreated,
        payload: newCard });
    console.debug('new card created event sent:', result);
});

export { viki, aziza };

ReactDOM.render(
    <React.StrictMode>

        <Base />

    </React.StrictMode>,

    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

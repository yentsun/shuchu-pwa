import Dexie from 'dexie';
import * as Realm from 'realm-web';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Base/Base';
import reportWebVitals from './reportWebVitals';
import { register } from  './serviceWorkerRegistration';
import { keys } from './dictionary';


// initialize Realm app
let source;
let viki;
const realmAppId = process.env.REACT_APP_REALM_ID;

try {
    console.debug('⚙ using realm app', realmAppId);
    viki = new Realm.App({ id: realmAppId });
    source = viki.currentUser.mongoClient(keys.atlasService).db(keys.sourceDB);
    console.debug('🌎✅ source initialized');
} catch (error) {
    console.error('🌎❌ source initialization failed:', error.message);
}

// local DB
const aziza = new Dexie('aziza');
aziza.version(1).stores({ cards: 'id' });

// TODO move to a separate file
aziza.cards.hook('creating', async (primKey, newCard) => {

    if (newCard._id) return;

    const result = await source.collection(keys.cardsCollection).insertOne(newCard);
    console.debug('new card sent:', result);
});

export { viki, aziza };

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Base />
    </React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// register service worker
register();

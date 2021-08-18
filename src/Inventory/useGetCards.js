import { useContext, useEffect, useState } from 'react';
import { aziza, viki } from '../index';
import { keys } from '../dictionary';
import { BaseContext } from '../Base/reducer';


export default function useGetCards() {

    const [ cards, setCards ] = useState(null);
    const { state: { self }} = useContext(BaseContext);

    useEffect(() => {

        async function fetchCards() {

            const localCardsCount = await aziza.cards.count();

            // if there is nothing @ local, fetch from remote
            if (localCardsCount === 0) {
                console.debug('fetching cards from remoted DB...');
                const client = viki.currentUser.mongoClient(keys.atlasService);
                const cardsFromRemote = await client.db(keys.projectionDB).collection(keys.cardsCollection).find({ ownerId: self.id });
                console.debug('got cards from remote:', cardsFromRemote.length, ', writing to local DB...');
                const lastKey = await aziza.cards.bulkAdd(cardsFromRemote);
                console.debug('done:', lastKey);
            }

            setCards(await aziza.cards.toArray());
        }

        if (! cards)
            fetchCards();

    }, [ cards, self.id ]);

    return [ cards ];

}

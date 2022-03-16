import { useEffect, useState } from 'react';
import { aziza } from '../index';


export default function useGetCards({ returnMap=false }) {

    const [ cards, setCards ] = useState(null);

    useEffect(() => {

        async function fetchCards() {

            const result = await aziza.cards.toArray();
            setCards(returnMap ?  result.reduce((acc, curr) => { acc[curr.id] = curr; return acc }, {}) : result);
        }

        if (! cards)
            fetchCards();

    }, [ cards, returnMap ]);

    return [ cards ];

}

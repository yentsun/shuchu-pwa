import { useEffect, useState } from 'react';
import { aziza } from '../index';


export default function useGetCard({ id }) {

    const [ card, setCard ] = useState(null);

    useEffect(() => {

        setCard(null);
        console.debug('getting card from local storage:', id);

        async function fetchCard() {

            setCard(await aziza.cards.get(id));
        }

        if (id)
            fetchCard();

    }, [ id ]);

    return [ card ];
}

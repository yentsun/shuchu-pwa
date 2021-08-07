import { useEffect, useState } from 'react';
import { viki } from '../index';
import { keys } from '../dictionary';


export default function useDB({ db=keys.projectionDB, collection, query, cmd='findOne' }) {

    const mongodb = viki.currentUser.mongoClient(keys.atlasService);
    const [ response, setResponse ] = useState(null);
    const [ inProgress, setInProgress ] = useState(false);
    const [ isWaiting, setIsWaiting ] = useState(true);


    useEffect(() => {

        async function performCall() {

            try {
                setInProgress(true);
                const projection = await mongodb.db(db).collection(collection)[cmd](query);
                setResponse(projection);

            } catch (error) {
                console.error(error);
            } finally {
                setIsWaiting(true);
                setInProgress(false);
            }
        }

        if (! isWaiting && ! inProgress)
            performCall();

    }, [ collection, query, isWaiting, inProgress, mongodb, cmd, db ]);

    return [ setIsWaiting, response ];
}

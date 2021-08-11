import { useEffect, useState } from 'react';
import { viki } from '../index';
import { keys } from '../dictionary';


export default function useDB({ db=keys.projectionDB, collection, cmd='findOne' }) {

    const mongodb = viki.currentUser.mongoClient(keys.atlasService);
    const [ response, setResponse ] = useState(null);
    const [ inProgress, setInProgress ] = useState(false);
    const [ query, setQuery ] = useState(null);

    useEffect(() => {

        async function performCall() {

            try {
                setInProgress(true);
                console.debug('performing call:', db, collection, cmd);
                const projection = await mongodb.db(db).collection(collection)[cmd](query);
                setResponse(projection);

            } catch (error) {
                console.error(error);
            } finally {
                console.debug('OK');
                setQuery(null);
                setInProgress(false);
            }
        }

        if (query && ! inProgress)
            performCall();

    }, [ collection, query, inProgress, mongodb, cmd, db ]);

    return [ setQuery, response ];
}

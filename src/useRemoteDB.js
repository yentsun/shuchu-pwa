import { useEffect, useState } from 'react';
import { viki } from './index';
import { keys } from './dictionary';


export default function useRemoteDB({ service=keys.atlasService, db=keys.projectionDB, collection, cmd=keys.findOne }) {

    const client = viki.currentUser.mongoClient(service);
    const [ response, setResponse ] = useState(null);
    const [ inProgress, setInProgress ] = useState(false);
    const [ query, setQuery ] = useState(null);

    useEffect(() => {

        async function performCall() {

            try {
                setInProgress(true);
                console.debug('performing call:', service, db, collection, cmd);
                const projection = await client.db(db).collection(collection)[cmd](query);
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

    }, [ collection, query, inProgress, client, cmd, db, service ]);

    return [ setQuery, response ];
}

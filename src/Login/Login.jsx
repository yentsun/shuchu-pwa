import qs from 'qs';
import * as Realm from 'realm-web';
import React, { useState } from 'react';
import { Link, generatePath, useHistory, useLocation } from 'react-router-dom';
import { words as w, routes as r } from '../dictionary';
import './login.css';
import { viki } from '../index';


export default function Login() {

    const history = useHistory();
    const location = useLocation();
    const { redirectTo=r.dashboard } = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const credentials = Realm.Credentials.emailPassword(email, password);
        console.debug('authenticating with email and password:', email, '...');
        const account = await viki.logIn(credentials);
        await account.refreshCustomData();
        console.debug(account, 'done, redirecting to:', redirectTo);
        history.push(redirectTo);
    }

    return (
        <div className="center">

            <form id="login" onSubmit={ handleSubmit }>
                <h1>Login</h1>

                <label htmlFor={ w.email }>{ w.email }</label>
                <input id={ w.email } type="text" value={ email }
                       onChange={ (e) => setEmail(e.target.value) }/>

                <label htmlFor={ w.password }>{ w.password }</label>
                <input id={ w.password } type="password" value={ password }
                       onChange={ (e) => setPassword(e.target.value) }/>

                <button className="primary" type="submit">{ w.submit }</button>
                <Link to={ generatePath(r.register) }>{ w.register }</Link>

            </form>
        </div>
    );
}

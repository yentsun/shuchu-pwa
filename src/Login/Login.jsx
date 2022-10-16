import * as Realm from 'realm-web';
import React, { useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { words as w, routes as r } from '../dictionary';
import './login.css';
import { viki } from '../index';
import useQuery from '../useQuery';


export default function Login() {

    const navigate = useNavigate();
    const query = useQuery();
    const redirectTo = query.get('redirectTo');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const credentials = Realm.Credentials.emailPassword(email, password);
        console.debug('authenticating with email and password:', email, '...');
        const account = await viki.logIn(credentials);
        await account.refreshCustomData();
        console.debug(account.id, 'done, redirecting to:', redirectTo);
        navigate(redirectTo);
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

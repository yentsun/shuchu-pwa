import React, { useState, useContext } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { words as w, routes as r, actionTypes } from '../dictionary';
import './register.css';
import { viki } from '../index';
import { BaseContext } from '../Base/reducer';


export default function Register() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { dispatch } = useContext(BaseContext);

    async function handleSubmit(e) {

        e.preventDefault();
        const player = await viki.emailPasswordAuth.registerUser(email, password);
        dispatch({ type: actionTypes.NEW_PLAYER_REGISTERED, player })
    }

    return (
        <div className="center">

            <form id="register" onSubmit={ handleSubmit }>
                <h1>{ w.register }</h1>

                <label htmlFor={ w.email }>{ w.email }</label>
                <input id={ w.email } type="text" value={ email }
                       onChange={ (e) => setEmail(e.target.value) }/>

                <label htmlFor={ w.password }>{ w.password }</label>
                <input id={ w.password } type="password" value={ password }
                       onChange={ (e) => setPassword(e.target.value) }/>

                <button className="primary" type="submit">{ w.submit }</button>
                <Link to={ generatePath(r.login) }>{ w.login }</Link>

            </form>

        </div>
    );
}

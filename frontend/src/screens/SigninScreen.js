import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';


function SigninScreen (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();

    useEffect(() => {
        
        if (userInfo && userInfo.length != 0) {
            props.history.push("/")
        }
        
        return () => {
            //
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (email.length < 5) {
            setErrorMessage("Ingrese una mail válido")
            return
        }

        if (password.length < 3) {
            setErrorMessage("Ingrese una contraseña válida")
            return
        }

        dispatch(signin(email, password))
        .then((resultado) => {
            if (resultado == true) {
                props.history.push("/")
                window.location.reload();
            } 
        })
    }

    return <div className="form form-signin">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>Usuario y/o contraseña inválida</div>}
                    {!error && errorMessage ? (<div>{errorMessage}</div>) : (<div></div>)}
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Sign In</button>
                </li>
                <li>
                    <Link to="/register" className="button secondary text-center">Create your account</Link>
                </li>
            </ul>
        </form>
    </div>
}
export default SigninScreen;
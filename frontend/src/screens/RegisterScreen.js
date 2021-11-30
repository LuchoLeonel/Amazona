import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { logout, register } from '../actions/userActions';


function RegisterScreen (props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loadingSignin, userInfo, errorSignin } = userSignin;
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ successMessage, setSuccessMessage ] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfoRegister, error } = userRegister;

    const dispatch = useDispatch();

    useEffect(() => {

        if (userInfo && userInfo.length != 0) {
            props.history.push("/")
        }

        
        return () => {
            //
        };
    }, [])


    const submitHandler = (e) => {
    
        e.preventDefault();

        if (userInfo && userInfo.length != 0) {
            dispatch(logout());
        }

        if (email.length < 5) {
            setErrorMessage("Ingrese una mail válido")
            return
        }

        if (password !== rePassword) {
            setErrorMessage("Los passwords deben coincidir")
            return
        }
        if (password.length < 3) {
            setErrorMessage("La contraseña debe tener al menos 3 caracteres")
            return
        }
        
        dispatch(register(name, email, password))
        .then((resultado) => {
            if (resultado == true) {
                setSuccessMessage("Account created");
                props.history.push("/")
                window.location.reload();
            } 
        })
        }

    return <div className="form form-register">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    
                    {successMessage && (<div>{successMessage}</div>)}
                    {!successMessage && error ? (<div>{error}</div>) : (<div></div>)}
                    {!successMessage && !error && errorMessage ? (<div>{errorMessage}</div>) : (<div></div>)}

                </li>
                <li>
                    <label htmlFor="name">Name</label>
                    <input type="name" name="name" id="name" autoComplete="off"
                        onChange={(e) => setName(e.target.value)}></input>
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
                    <label htmlFor="rePassword">Re-Enter Password</label>
                    <input type="password" name="rePassword" id="rePassword" autoComplete="off"
                        onChange={(e) => setRePassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    Already have an account? <Link to="/signin">Sign-in</Link>
                </li>
            </ul>
        </form>
    </div>
}
export default RegisterScreen;
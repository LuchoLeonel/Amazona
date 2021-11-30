import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../actions/userActions';

import Cookie from 'js-cookie';

function LogoutComponent (props) {
    
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logout());
        props.history.push("/")
        window.location.reload();
      }

    return (<button className="logout" onClick={handleLogout}>Log out</button>)

}
export default LogoutComponent;
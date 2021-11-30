import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../actions/userActions';


function BarraComponent (props) {
    
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const categoryURL = props.location.search.split('=')[1];


    const closeMenu = () => {
        document.querySelector('.sidebar').classList.remove('open');
    }

    const goCategory = (categoria) => {
        props.history.push('/product/categoria?=' + categoria);
        if (categoryURL === "shirts" || categoryURL === "pants") {
            window.location.reload();
        }
    }

    return (
        <aside className="sidebar">
            {userInfo && userInfo.length != 0 && (
            <h5 className="siderbar-logged">Logged as {userInfo.email}</h5>)}
            <h3 className="sidebar-title">Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>X</button>
            <ul className="sidebar-option">
                <li>
                    <p onClick={() => goCategory("pants")}> Pants</p>
                </li>
                <li>
                    <p onClick={() => goCategory("shirts")}> Shirts</p>
                </li>
            </ul>
        </aside>
    )

}
export default BarraComponent;




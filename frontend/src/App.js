import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import CreateProductsComponent from './screens/CreateProductsComponent';
import LogoutComponent from './screens/LogoutComponent';
import CategoriaScreen from './screens/CategoriaScreen';
import BarraComponent from './screens/BarraComponent';

function App() {

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  }

  return (
    <BrowserRouter>
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                   <Link className="amazona"to="/">Amazona</Link>
                </div>
                <div className="header-links">
                    <Link to="/cart"> Cart</Link>
                    {userInfo && userInfo.length != 0 ? (
                        <Route path="/" component={LogoutComponent} />
                        ) : (
                        <Link to="/signin">Sign In</Link>
                    )}
                </div>
            </header>

            <Route path="/" component={BarraComponent} />

            <main className="main">
                <div className="content">
                    <Route path="/products" component={CreateProductsComponent} />
                    <Route path="/product/categoria" component={CategoriaScreen} />
                    <Route path="/products/:id" component={ProductScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />

                    <Route path="/" exact={true} component={HomeScreen} />
                    
                </div>
            </main>
            <footer className="footer">
                All rights reserved.
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;

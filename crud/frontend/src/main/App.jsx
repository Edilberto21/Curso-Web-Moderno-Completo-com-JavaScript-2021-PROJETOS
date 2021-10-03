import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import Routes from './Routes'
import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
// import Home from '../components/Home/Home'
import Footer from '../components/template/Footer'
// eslint-disable-next-line import/no-anonymous-default-export
export default props => 
    <HashRouter>
        <div className="app">
            <Logo />
            <Nav />
            {/* Local que vai colocar o componente é no lugar do home. */}
            <Routes />
            <Footer />
        </div>
    </HashRouter>
    
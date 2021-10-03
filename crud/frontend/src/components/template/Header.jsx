import './Header.css'
import React from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => 
    /*Dispositivos celulares o header não vai aparecer, 
    se o componente for do tipo sm ele vai utilizar o display flex
    pequenos, médios, grandes, extre-grandes.
    flex usa a coluna. */
    <header className="header d-none d-sm-flex flex-column">
        <h1 className="mt-3">
            {/* fa-home {props.icon} é o valor que foi passado no 
            componente App.jsx passou o icon para ser home. */}
            <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>
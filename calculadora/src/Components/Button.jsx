import React from "react";
import './Button.css'
/* Componente sem estados, recebe 
parâmetros de entrada e apartir 
desses parâmetro você renderiza 
de uma forma muito mais facil 
porque não tem estado para 
gerenciar. */ 
// eslint-disable-next-line import/no-anonymous-default-export
export default props => {
    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''
    classes += props.quadruple ? 'quadruple' : ''
    return (
        <button 
            onClick={e => props.click && props.click(props.label)}
            className={classes}>
            {props.label}
        </button>
    )
}
    
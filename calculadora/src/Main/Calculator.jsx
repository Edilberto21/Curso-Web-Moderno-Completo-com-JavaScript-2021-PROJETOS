import React, { Component } from "react";
import './Calculator.css'

import Button from '../Components/Button'
import Display from '../Components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        //For igual a 0.
        if(this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation 

            const values = [...this.state.values]
            try {
            // eslint-disable-next-line no-eval
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            if (isNaN(values[0]) || !isFinite(values[0])) {
                this.clearMemory()
            return
            }
            } catch(e){
                values[0] = this.state.values[0]
            }
            values[1] = 0
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals, 
                values
            })
        }
    }

    addDigit(n) {
        //Função pra não ter dois pontos.
        if(n === '.' && this.state.displayValue.includes('.')) {
            return 
        }

        /* Se conter o 0 vai limpar o 0 e substituir por outro valor
        ou vai limpar quando a variável display estiver com outro valor.
        eslint-disable-next-line no-unused-vars */
        const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay

        /* Se o display for limpo o valor corrente vai ser vazio,
        se não for limpo vai ser defato o valor que está . */
        const currentValue = clearDisplay ? '' : this.state.displayValue
        // eslint-disable-next-line no-unused-vars
        // Novo valor + o digito n.
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        //Se for diferente de .
        if(n !== '.') {
            //Índice dentro do array
            const i = this.state.current
            const newValeu = parseFloat(displayValue)
            //Clonou para um novo array.
            const values = [...this.state.values]
            //Valor 1 recebe um novo valor
            values[i] = newValeu
            //Substitui os valores.
            this.setState({ values })
            //O que está sendo exibido no array.
            console.log(values)
        }
    }

    render() {

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="=" click={this.setOperation} operation/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="9" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="." click={this.addDigit} />
                <Button label="7" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="4" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="1" click={this.addDigit}/>
                <Button label="0" click={this.addDigit}/>
                <Button label="AC" click={this.clearMemory} quadruple/>
            </div>
        )
    }
}
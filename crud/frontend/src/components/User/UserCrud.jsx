import React, { Component } from "react";
import './UserCrud.css';
import Main from '../template/Main'
import axios from 'axios'
const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuáros: Incluir, Listar, Alterar e Excluir'
}
const baseUrl = 'http://localhost:3001/users'
//Estado inicial. 
const initialState = {
    user: { name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {
    state = { ...initialState }
    //Quando o componente for exibido na tela vai executar essa função.
    componentWillMount() {
        //Get em cima da url que traz todos usuários.
        axios(baseUrl).then(resp => {
            //Aquilo que receber como resposta, salva dentro da lista.
            this.setState({list: resp.data})
        })
    }

    //Limpar formulário no caso o user.
    clear() {
        this.setState ({ user: initialState.user })
    }
    //Incluir um novo usuário, ou alterar.
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                /* Atualizar a lista local no array
                resp.data é o usuário que foi obtido no webservice. 
                Ao ser alterado ira ser retornado */
                const list = this.getUpdatedList(resp.data)
                /* Alterar tanto o user e atualizar a lista. */
                this.setState({user: initialState.user, list})
            })
    }
    /* Se o parâmetro add for passado como verdadeiro, ele adiciona o
    na lista. */
    getUpdatedList(user, add = true) {
        //Removendo o usuário da lista e add na primeira posição
        const list = this.state.list.filter(u => u.id !== user.id)
        // Coloca na primeira posição do arry.
        // Se o usuário estar setado ai add, se não remove o usuário atual.
        if(add) list.unshift(user)
        return list
    }
    //Função atualiza campos
    updateField(event) {
        //Clonar o usuário e armazenando na constante usuário.
        const user = { ...this.state.user }
        //Usar o nome do input pra procurar a propriedade dentro do estado. 
        user[event.target.name] = event.target.value
        //Setar o estado.
        this.setState({ user })
    }
    //Renderiza o formulário.
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    {/* Quando for dispositivo celular ele ocupa 12 colunas
                    quando for dispositivo médio/grande/extra-grande ele vai 
                    ocupar 6 colunas.  */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            {/* name é o atributo name do usuário,
                            this.state.user.name é o nome do usuário que
                            está no estado. */}
                            <input type="text" className="form-control"
                            name="name" value={this.state.user.name}
                            onChange={ e => this.updateField(e)} 
                            placeholder="Digite o nome..."/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            {/* email é o atributo email do usuário,
                            this.state.user.email é o email do usuário que
                            está no estado. */}
                            <input type="text" className="form-control"
                            name="email" value={this.state.user.email}
                            onChange={ e => this.updateField(e)} 
                            placeholder="Digite o email..."/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                        onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secundary ml-2"
                        onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        //Atualiza o estado da aplicação 
        this.setState({user})
    }
    //Função delete.
    remove(user) {
        //Quando chamar a função then, significa que excluiu.
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            /* Precisa atualizar a lista para remover.
            false pra não adicionar elemento na lista. 
            */
            const list = this.getUpdatedList(user, false)
            this.setState({list})
        })
    }

    //Renderizar a tabela.
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Função que renderiza as linhas. */}
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return(
                /* Sempre que retorna um array tem que ter o atributo
                key. */
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        {/* Vai chamar as funções load e remove. */}
                        <button className="btn btn-warning"
                        onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
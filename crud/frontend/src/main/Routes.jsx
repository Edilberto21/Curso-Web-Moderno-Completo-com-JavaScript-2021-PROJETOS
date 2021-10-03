import React from "react";
/* Switch(escolha) as rotas.
Route que é a rota.
Redirect pra caso que a url não tem nada haver com os componentes
ele vai redirecionar para a home. */
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/Home/Home'
import UserCrud from "../components/User/UserCrud";

// eslint-disable-next-line import/no-anonymous-default-export
export default props => 
    <Switch>
        {/* Quando navegar pro / vai renderizar para o home, teve que 
        colocar exact pra ser exato a / mesmo, porque o users também usa 
        / */}
        <Route exact path='/' component={Home} />
        {/* Quando navegar pro /users vai renderizar para o users */}
        <Route path='/users' component={UserCrud} />
        {/* Caso não caiu em nenhuma das urls, vai se renderizar para 
        o home. */}
        <Redirect from='*' to='/'></Redirect>
    </Switch>
import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import ListAlumini from "./components/ListAlumini";



const routes = () => {
    return (
        <Switch>
            <Route path="/alumini/list" component={ListAlumini} exact/>


            <Redirect from='/alumini' to='/alumini/list' exact/>
        </Switch>
    )
}

export default routes

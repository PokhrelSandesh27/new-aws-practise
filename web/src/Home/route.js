import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import HomePage from './components/homePage'

const routes = () => {
    return (
        <Switch>
            <Route path="/home/homepage" component={HomePage} exact/>

            <Redirect from='/home' to='/home/homepage' exact/>
        </Switch>
    )
}

export default routes

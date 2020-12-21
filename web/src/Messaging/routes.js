import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Received from './components/Received'
import Sent from './components/Sent'
import History from './components/History'

const routes = () => {
    return (
        <Switch>

            {/*<Route path="/messaging/compose/" component={Compose}/>*/}
            <Route path="/messaging/msg/:id" component={History}/>
            <Route path="/messaging/sent" component={Sent}/>
            <Route path="/messaging/inbox" component={Received}/>
            <Redirect from="/messaging" to="/messaging/inbox"/>

        </Switch>
    )
}

export default routes

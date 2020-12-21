import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import CreateSlot from './components/CreateSlot'
import ListSlots from './components/ListSlots'


const routes = () => {
    return (
        <Switch>
            <Route path="/slot/create" component={CreateSlot} exact/>
            <Route path="/slot/list" component={ListSlots} exact/>
            <Redirect from='/Slot' to='/slot/list' exact/>
        </Switch>
    )
}

export default routes

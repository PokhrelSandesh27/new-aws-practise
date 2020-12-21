import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import CreateMeetings from './components/CreateMeetings'
import ListMeetings from './components/ListMeetings'
import DetailsMeeting from './components/DetailsMeeting'


const routes = () => {
    return (
        <Switch>
            <Route path="/meeting/create" component={CreateMeetings} exact/>
            <Route path="/meeting/list" component={ListMeetings} exact/>
           <Route path ="/meeting/detail/:id" component={DetailsMeeting} exact/>

            <Redirect from='/meeting' to='/meeting/list' exact/>
        </Switch>
    )
}

export default routes

import React  from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import CreateClassrooms from './components/CreateClassroom'
import ListClassrooms from './components/ListClassroom'

import classroomDetails from "./components/classroomDetails";
import tab from "./components/Tab"

const routes = () => {
    return (
        <Switch>
            <Route path="/class-room/create" component={CreateClassrooms} exact/>
            <Route path="/class-room/list" component={ListClassrooms} exact/>
            <Route path="/class-room/Details" component={classroomDetails} exact/>

            <Route path="/class-room/tab" component={tab} exact/>
            <Redirect from='/class-room' to='/class-room/Details' exact/>
        </Switch>
    )
}

export default routes

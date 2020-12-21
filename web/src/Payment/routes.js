import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CreatePayment from './components/CreatePayment'
import ListAllPayments from './components/ListAllPayments'
import ListAllClassroom from './components/ListAllClassroom'
import CreateClassroom from './components/CreateClassroom'
import ListAllPaymentsForStudent from './components/ListAllPaymentsForStudent'
import LibraryPayment from "./components/LibraryPayment";

const routes = () => {
    return (
        <Switch>
            <Route path="/payments/create" component={CreateClassroom}  exact/>
            <Route path="/payments/create/classroom/:classroom" component={CreatePayment}  exact/>
            <Route path="/payments/Library" component={LibraryPayment}  exact/>


            <Route path="/payments/student/list" component={ListAllPaymentsForStudent}  exact/>

            <Route path="/payments/list" component={ListAllClassroom}  exact/>
            <Route path="/payments/list/classroom/:classroom" component={ListAllPayments}  exact/>
            <Redirect from='/payments' to='payments/list' exact/>
        </Switch>
    )
}

export default routes

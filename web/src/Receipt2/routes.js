import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ListAllClassroom from './components/ListAllClassroom'
import GenerateReceipt from './components/GenerateReceipt'
import ListAllStudents from './components/ListAllStudents'
import ListAllReceipts from './components/ListAllReceipts'
import ListAllReceiptsForStudent from './components/ListAllReceiptsForStudent'
import ListAllReceiptsForStudentByPayment from './components/ListAllReceiptsForStudentByPayment'

const routes = () => {
    return (
        <Switch>
            <Route path="/receipts/create" component={ListAllClassroom} exact/>
            <Route path="/receipts/create/classroom/:classroom" component={ListAllStudents} exact/>


            {/*<Route path="/receipts/create/classroom/:classroom" component={CreatePayment}  exact/>*/}
            <Route path="/receipts/generate" component={GenerateReceipt} exact/>
            <Route path="/receipts/student/list" component={ListAllReceiptsForStudent} exact/>
            <Route path="/receipts/student/list/:payment" component={ListAllReceiptsForStudentByPayment} exact/>
            <Route path="/receipts/list" component={ListAllClassroom} exact/>
            <Route path="/receipts/lists/classroom/:classroom" component={ListAllStudents} exact/>
            <Route path="/receipts/lists/classroom/:classroom/student/:student" component={ListAllReceipts} exact/>
            <Redirect from='/receipts' to='receipts/list' exact/>
        </Switch>
    )
}

export default routes

import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ListAllClassroom from './components/ListAllClassroom'
import GenerateReceipt from './components/GenerateReceipt'
import ListAllStudents from './components/ListAllStudents'
import ListAllReceipts from './components/ListAllReceipts'
import ViewPaymentForStudents from './components/ViewPaymentForStudents'
import ListAllReceiptsForStudent from './components/ListAllReceiptsForStudent'
import ListAllReceiptsForStudentByPayment from './components/ListAllReceiptsForStudentByPayment'
import ListReceiptStudents from './components/ListReceiptStudents'
import ViewBill from './components/ViewBill'
const routes = () => {
    return (
        <Switch>
            <Route path="/receipts/generate" component={GenerateReceipt} exact/>
            <Route path="/view/pay" component={ViewPaymentForStudents} exact/>
            <Route path="/view/bill/:payment" component={ViewBill} exact/>
            {/*<Route path="/receipts/create/classroom/:classroom" component={CreatePayment}  exact/>*/}

            <Route path="/receipts/student" component={ListReceiptStudents} exact/>
            {/*<Route path="/receipts/student/list" component={ListAllReceiptsForStudent} exact/>*/}
            {/*<Route path="/receipts/student/list/:payment" component={ListAllReceiptsForStudentByPayment} exact/>*/}
            <Route path="/receipts/list" component={ListAllClassroom} exact/>
            <Route path="/receipts/list/classroom/:classroom" component={ListAllStudents} exact/>
            <Route path="/receipts/list/classroom/:classroom/student/:student" component={ListAllReceipts} exact/>
            <Redirect from='/receipts' to='receipts/list' exact/>
        </Switch>
    )
}

export default routes

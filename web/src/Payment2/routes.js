import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CreatePayment from './components/CreatePayment'
import ListAllPayments from './components/ListAllPayments'
import ListAllClassroom from './components/ListAllClassroom'
import CreateClassroom from './components/CreateClassroom'
import ListAllPaymentsForStudent from './components/ListAllPaymentsForStudent'
import CreateDiscount from "./components/Management/CreateDiscount";
import ListDiscount from "./components/Management/ListDiscount";
import categoriesTab from "./components/Management/categoriesTab";
import Payment from './components/Accountant/Payment'
import StudentPaymentView from './components/Student/StudentPaymentView'
import MCQ from './components/MCQ'
import AnswerSubmit from './components/AnswerSubmit'
import Timer from './components/Timer'
import MCQFirstPage from './components/MCQFirstPage'


const routes = () => {
    return (
        <Switch>
            <Route path="/payment/student" component={StudentPaymentView}  exact/>
            <Route path="/payment/create" component={CreateClassroom}  exact/>
            <Route path="/payment/create/classroom/:classroom" component={CreatePayment}  exact/>



            <Route path="/payment/student/list" component={ListAllPaymentsForStudent}  exact/>

            <Route path="/payment/list" component={ListAllClassroom}  exact/>
            <Route path="/payment/list/classroom/:classroom" component={ListAllPayments}  exact/>


            <Route path="/Discount/create" component={CreateDiscount}  exact/>
            <Route path="/Discount/list" component={ListDiscount}  exact/>

            <Route path="/payment/category" component={categoriesTab}  exact/>


            <Route path="/payments/accountant" component={Payment}  exact/>

            <Route path="/test/mcq" component={MCQ}  exact/>
            <Route path="/test/answer" component={AnswerSubmit}  exact/>
            <Route path="/test/timer" component={Timer}  exact/>
            <Route path="/MCQ/Start" component={MCQFirstPage}  exact/>


            <Redirect from='/payment' to='payment/list' exact/>
        </Switch>
    )
}

export default routes

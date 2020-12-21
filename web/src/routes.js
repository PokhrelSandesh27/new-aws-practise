import React, { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAccessToken, getUser, ProtectedComponents } from './utils'

import { setUser } from './Login/actions'

import AssignmentRoutes from './Assignment/routes'
import AssignmentSubmissionRoutes from './AssignmentSubmission/routes'
import HomeRoutes from './Home/route'
import ClassroomRoutes from './Classroom/routes'
import ExamRoutes from './Exam/Exam/routes'
import ExamDetailsRoutes from './Exam/ExamDetails/routes'
import ExamReportRoutes from './Exam/ExamReport/routes'
import MarkSheetRoutes from './Exam/MarkSheet/routes'
import MeetingRoutes from './Meeting/routes'
import StudentRoutes from './Student/routes'
import SubjectRoutes from './Subject/routes'
import SlotRoutes from './Slot/routes'
import TimeTableRoutes from './TimeTable/routes'
import AttendanceRoutes from './Attendance/routes'
import Login from './Login/components/Logins'
import contentRoute from '../src/ContentRoute/routes'
import PresentationRoutes from './Presentation/routes'
import LibraryRoutes from './Library/routes'
import PaymentRoutes from './Payment/routes'
import PaymentRoutes2 from './Payment2/routes'
import ReceiptRouter from './Receipt/routes'
import ReceiptRouter2 from './Receipt2/routes'
import UserRoutes from './User/routes'
import MessageRoutes from './Messaging/routes'
import AluminiRoutes from './Alumini/routes'
import McqRoutes from './MCQ/routes'




import VideoCall from './Meeting/components/VideoCall'

import MainMenu from './NavBar/components/MainMenu'
import AppBar from './NavBar/components/AppBar'
import SubMenu from './NavBar/components/SubMenu'
import Footer from './NavBar/components/Footer'
import CssBaseline from '@material-ui/core/CssBaseline'





const Routes = ({ dispatch }) => {
    useEffect(() => {
        if (getAccessToken()) {
            const user = getUser()
            dispatch(setUser(user))
        }
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/login"/>
                <Route path="/login" component={Login} exact/>

                <ProtectedComponents>
                    <CssBaseline />
                    <MainMenu/>
                    <AppBar/>


                    {/*<SubMenu/>*/}
                    {/*<dashbordRoutes/>*/}
                    <AssignmentRoutes/>
                    <AssignmentSubmissionRoutes/>
                    <HomeRoutes/>
                    <AttendanceRoutes/>
                    <AluminiRoutes/>
                    <ClassroomRoutes/>
                    <ExamRoutes/>
                    <ExamDetailsRoutes/>
                    <ExamReportRoutes/>
                    <MarkSheetRoutes/>
                    <MeetingRoutes/>
                    <MessageRoutes/>
                    <StudentRoutes/>
                    <SubjectRoutes/>
                    <SlotRoutes/>
                    <TimeTableRoutes/>
                    <PresentationRoutes/>
                    <LibraryRoutes/>
                    <PaymentRoutes/>
                    <PaymentRoutes2/>
                    <ReceiptRouter/>
                    <ReceiptRouter2/>
                    <UserRoutes/>
                    <McqRoutes/>

                </ProtectedComponents>
            </Switch>
        </BrowserRouter>
    )
}

export default connect(() => ({}))(Routes)

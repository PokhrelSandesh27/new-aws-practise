import React, { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAccessToken, getUser, ProtectedComponents } from '../utils'

import { setUser } from '../Login/actions'

import AssignmentRoutes from '../Assignment/routes'
import AssignmentSubmissionRoutes from '../AssignmentSubmission/routes'
import HomeRoutes from '../Home/route'
import ClassroomRoutes from '../Classroom/routes'
import ExamRoutes from '../Exam/Exam/routes'
import ExamDetailsRoutes from '../Exam/ExamDetails/routes'
import ExamReportRoutes from '../Exam/ExamReport/routes'
import MarkSheetRoutes from '../Exam/MarkSheet/routes'
import MeetingRoutes from '../Meeting/routes'
import StudentRoutes from '../Student/routes'
import SubjectRoutes from '../Subject/routes'
import SlotRoutes from '../Slot/routes'
import TimeTableRoutes from '../TimeTable/routes'
import Login from '../Login/components/Login'
import PresentationRoutes from '../Presentation/routes'
import LibraryRoutes from '../Library/routes'
import PaymentRoutes from '../Payment/routes'
import ReceiptRouter from '../Receipt/routes'
import UserRoutes from '../User/routes'
import MessageRoutes from '../Messaging/routes'
import AluminiRoutes from '../Alumini/routes'
import AttendanceRoutes from '../Attendance/routes'

import SubMenu from './components/SubMenu'
// import MainMenu from './components/MainMenu'

import VideoCall from '../Meeting/components/VideoCall'
import Footer from './components/Footer'
import ResponsiveDrawer from "./components/ResponsiveDrawer";
// import MainMenu from './components/MainMenu'


const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>

                <ProtectedComponents>


                    <AssignmentRoutes/>
                    <AssignmentSubmissionRoutes/>
                    <HomeRoutes/>
                    <ClassroomRoutes/>
                    <ExamRoutes/>
                    <AttendanceRoutes/>
                    <ExamDetailsRoutes/>
                    <ExamReportRoutes/>
                    <MarkSheetRoutes/>
                    <MessageRoutes/>
                    <AluminiRoutes/>
                    {/*<MeetingRoutes/>*/}
                    <StudentRoutes/>
                    <SubjectRoutes/>
                    <SlotRoutes/>
                    <TimeTableRoutes/>
                    <PresentationRoutes/>
                    <LibraryRoutes/>
                    <PaymentRoutes/>
                    <ReceiptRouter/>
                    <UserRoutes/>


                    <Route path="/video" component={VideoCall} exact/>


                    {/*<Footer/>*/}
                </ProtectedComponents>
            </Switch>
        </BrowserRouter>
    )
}

export default connect(() => ({}))(Routes)

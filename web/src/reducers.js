import { combineReducers } from 'redux'

import loginReducer from './Login/reducer'
import bookReducer from './Books/reducer'
import studentReducer from './Student/reducer'
import classroomReducer from './Classroom/reducer'
import subjectReducer from './Subject/reducer'
import assignmentReducer from './Assignment/reducer'
import assignmentSubmissionReducer from './AssignmentSubmission/reducer'
import presentationReducer from './Presentation/reducer'
import examReducer from './Exam/Exam/reducer'
import examDetailsReducer from './Exam/ExamDetails/reducer'
import examReportReducer from './Exam/ExamReport/reducer'
import markSheetReducer from './Exam/MarkSheet/reducer'
import libraryReducer from './Library/reducer'
import paymentReducer from './Payment/reducer'
import receiptReducer from './Receipt/reducer'
import messagingReducer from './Messaging/reducer'
import releaseReportReducer from './Exam/ReleaseReport/reducer'
import informationReducer from './Information/reducer'
import eventReducer from './Event/reducer'
import attendanceReducer from './Attendance/reducer'
import mcqReducer from './MCQ/reducer'
import aliuminiReducer from './Alumini/reducer'
// import meetingReducer from './Meeting/reducer'
import slotReducer from './Slot/reducer'
import timetableReducer from './TimeTable/reducer'
import userReducer from './User/reducer'

export default combineReducers({
    loginReducer,
    bookReducer,
    studentReducer,
    classroomReducer,
    subjectReducer,
    assignmentReducer,
    assignmentSubmissionReducer,
    examReducer,
    examDetailsReducer,
    examReportReducer,
    markSheetReducer,
    releaseReportReducer,
    informationReducer,
    eventReducer,
    attendanceReducer,
    mcqReducer,
    // meetingReducer,
    slotReducer,
    timetableReducer,
    userReducer,
    presentationReducer,
    libraryReducer,
    paymentReducer,
    receiptReducer,
    messagingReducer,
    aliuminiReducer

})

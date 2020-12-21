import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { get, orderBy } from 'lodash'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { getAllClassroom, getClassroomById } from '../../../Classroom/actions'
import { addPaymentCategory } from '../../../Payment2/actions'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import MyTextField from '../../../components/TextField'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '../../../TablePagination'
import { getAllAttendance, searchAttendance } from '../../action'
import attendanceReducer from '../../reducer'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'
import PaymentConfigGroup from '../../../Payment2/components/Management/PaymentConfigGroup'
import AttendanceGroup from './AttendanceGroup'
import { getGroups, getUser } from '../../../utils'
import { searchStudent } from '../../../Student/actions'
import IconButton from '@material-ui/core/IconButton'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import StudentGroup from './studentGroup'
import StudentGroupTest from './StudentGroupTest'
import StudentAttendanceEntry from './StudentAttendanceEntry'

toast.configure()

class ViewAttendace extends Component {

    state = {
        redirect: false,
        isDisabled: false,
        value: 0,
        open: false,
        localStore: {}
    }
    handleChange = (event, value) => {
        this.setState({ value })
    }

    componentDidMount () {
        const d = getGroups()
        const user = getUser()
        console.log(user.classroom, 'query')
        if (d.includes('TEACHER')) {
            const id = user.classroom
            this.props.dispatch(getClassroomById(id))
            this.props.dispatch(searchStudent({ classroom: id }))
            this.props.dispatch(searchAttendance({ user: id }))
        }
    }

    // }
    // filterAttendance = students => {
    //     //     let pa = []
    //     //     let i = 0
    //     //     for (let attendee of attendances) {
    //     //         let user = attendee.user
    //     //         let index = pa.findIndex(item => item._id === user._id)
    //     //         if (index > -1)
    //     //             pa[index].attendances.push({ i, attendee })
    //     //         else
    //     //             pa.push({ _id: user._id, user, fullName: attendee.user.fullName, attendances: [{i, attendee }] })
    //     //         i++;
    //     //     }
    //     //     pa = orderBy(pa, 'fullName', 'asc')
    //     //     console.log(pa)
    //     //     // return []
    //     //     return pa
    //     // }
    changeOpenState = () => {
        this.setState({ open: !this.state.open })
    }

    render () {

        const { createState } = this.props.paymentReducer
        const { classes } = this.props
        const { students } = this.props.studentReducer


        let msg

        if (createState === 1)
            msg = 'Creating Discount'
        else
            msg = 'Create Discount'
        // msg = `Payment '${payment.category}' created for classroom : Grade ${classroom.grade} Section ${classroom.section}`

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/discount/list',
                    msg: msg
                }}/>
            )
        }

        return (
            <Paper>
                <h2>Attendance Table</h2>


                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" padding={'checkbox'}><b></b></TableCell>
                                <TableCell align="center"><b>S.N </b></TableCell>
                                <TableCell align="center"><b>Name </b></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                students.map((stu, i) => {
                                    return (
                                        <StudentGroupTest
                                            key={`${stu._id}`}
                                            stu={stu} SN={++i} />
                                    )
                                })
                            }


                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        )
    }
}

export default connect(state => ({
    paymentReducer: state.paymentReducer,
    studentReducer: state.studentReducer,
    classroomReducer: state.classroomReducer,
    attendanceReducer: state.attendanceReducer
}))(withStyles(useStyles)(ViewAttendace))



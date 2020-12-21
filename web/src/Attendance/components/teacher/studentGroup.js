import React, { useState, Fragment } from 'react'
import { render } from 'react-dom'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { searchAttendance, searchAttendances } from '../../action'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import AttendanceRow from './AttendanceRow'
import moment from 'moment'

const StudentGroup = (props) => {
    const [open, setOpen] = useState(false)
    const [attendnace, setAttendance] = useState([])

    const StudentSearch = () => {
        setOpen(!open)
        console.log(props.stu.student.username, 'prop')
        if (open) {
            const id = props.stu.student._id
            props.dispatch(searchAttendances({ user: id }))
            const { attendances } = props.attendanceReducer
            console.log('dataaaa', attendances)

        }

    }

    // function(x, y) { // pure functions
    //     return x+ y
    // }

    return <div>I am here</div>

    return (
        <Fragment key={props.SN}>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={StudentSearch}>
                        {open? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                        {/*{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}*/}
                    </IconButton>
                </TableCell>
                <TableCell align="center" padding={'checkbox'}>
                    {props.SN}
                </TableCell>
                <TableCell
                    align="center">{props.stu.fullName}
                </TableCell>


            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                {/*All present for {attendances.user.fullName}*/}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" padding={'checkbox'}><b>S.N.</b></TableCell>
                                        <TableCell align="left"><b>&nbsp; Date</b></TableCell>
                                        <TableCell align="left"><b>&nbsp; Attendance</b></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        attendnace.map((attend, i) => {
                                            return (
                                                <TableRow>
                                                    <TableCell align="center" padding={'checkbox'}>
                                                        {i+1}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {moment(attend.date).format("MMMM DD")}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {attend.isPresent?'Present': 'Absent'}
                                                    </TableCell>
                                                </TableRow>
                                                )

                                        })
                                    }

                                    {/*<AttendanceRow key={`${attendee._id}`}*/}
                                    {/*               attendee={attendee}*/}
                                    {/*               id={i += 1} />*/}


                                    {/*<TableContainer component={Paper}>*/}
                                    {/*    <Table className={classes.table} size="small" aria-label="a dense table">*/}
                                    {/*        <TableHead>*/}
                                    {/*            <TableRow>*/}
                                    {/*                <TableCell align="center"  padding={'checkbox'}><b></b></TableCell>*/}
                                    {/*                <TableCell align="center"><b>S.N </b></TableCell>*/}
                                    {/*                <TableCell align="center"><b>Date </b></TableCell>*/}
                                    {/*                <TableCell align="center"><b>attendance</b></TableCell>*/}
                                    {/*            </TableRow>*/}
                                    {/*        </TableHead>*/}
                                    {/*        <TableBody>*/}

                                    {/*            {*/}

                                    {/*                fillterday &&*/}
                                    {/*                fillterday.map((attendee, i) => {*/}

                                    {/*                    return (*/}
                                    {/*                        <AttendanceFilter key={`${attendee._id}`}*/}
                                    {/*                                         attendances={attendee}*/}
                                    {/*                                         id={i += 1}/>*/}
                                    {/*                    )*/}
                                    {/*                })*/}
                                    {/*            }*/}


                                    {/*            /!*{*!/*/}
                                    {/*            /!*    attendances.map((attendee, i) => {*!/*/}
                                    {/*            /!*    return (*!/*/}
                                    {/*            /!*        <TableRow>*!/*/}
                                    {/*            /!*            <TableCell align="center" >*!/*/}
                                    {/*            /!*                {i+1}*!/*/}
                                    {/*            /!*            </TableCell>*!/*/}
                                    {/*            /!*            <TableCell align="center" >*!/*/}
                                    {/*            /!*                {get(attendee, 'user.fullName')}*!/*/}
                                    {/*            /!*            </TableCell>*!/*/}
                                    {/*            /!*            <TableCell align="center" >*!/*/}
                                    {/*            /!*                {attendee.isPresent?'present':'Absent'}*!/*/}
                                    {/*            /!*            </TableCell>*!/*/}
                                    {/*            /!*            <TableCell align="center" >*!/*/}
                                    {/*            /!*                {moment(attendee.createdAt).format('DD')}*!/*/}
                                    {/*            /!*            </TableCell>*!/*/}


                                    {/*            /!*        </TableRow>*!/*/}
                                    {/*            /!*    )*!/*/}
                                    {/*            /!*})*!/*/}
                                    {/*            /!*}*!/*/}


                                    {/*        </TableBody>*/}
                                    {/*    </Table>*/}
                                    {/*</TableContainer>*/}
                                </TableBody>

                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )

}

export default connect(state => ({
    attendanceReducer: state.attendanceReducer
}))(withStyles(useStyles)(StudentGroup))

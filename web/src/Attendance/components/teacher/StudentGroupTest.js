import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import moment from 'moment'
import { searchAttendances } from '../../action'
import Loading from './Loading'
import StudentAttendanceEntry from './StudentAttendanceEntry'
import { getMonth } from '../../../utils'
import { orderBy } from 'lodash'

class StudentGroupTest extends Component {
    state = {
        open: false,
        attendance:[]
    }


    studentSearch = () => {
        this.openArrow()
        console.log(this.props.stu.student._id, 'prop')
        const { open: isOpen } = this.state
        console.log('no data',isOpen)
             const id = this.props.stu.student._id;
            console.log("serial in docs",id);
             this.props.dispatch(searchAttendances({ user: id },id));

    }

    openArrow () {
        this.setState({ open: true })
    }

    collapse =()=> {
        this.setState({ open: false })
    }

    filterAttendance = (atten) => {

        let pa = []
        for (let attendance of atten) {
            let date = `${moment(attendance.dateTime).format("MMMM")}`
            let index = pa.findIndex(item => item.date === date)
            if (index > -1)
                pa[index].attendances.push(attendance)
            else
                pa.push({ date, month: attendance.dateTime, attendances: [attendance] })
        }
        pa = orderBy(pa, 'month', 'desc')
        pa = orderBy(pa, 'year', 'desc')
        return pa
    }




    render () {
        const {classes} = this.props
        const { attendances, serchState } = this.props.attendanceReducer
        let atten = attendances[this.props.stu.student._id]; // respective id and array
        let filtereddateAttendance;
        if(atten==null){
            filtereddateAttendance=[];
        }else{
            filtereddateAttendance = this.filterAttendance(atten)
            console.log(filtereddateAttendance,"Attendance data in filter");
        }
        const { students } = this.props.studentReducer


        const { open: isOpen } = this.state

        return (
            <Fragment key={this.props.key}>
                <TableRow>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small"
                                    onClick={isOpen ? this.collapse: this.studentSearch}>
                            {isOpen ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                            {/*{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}*/}
                        </IconButton>
                    </TableCell>
                    <TableCell align="center" padding={'checkbox'}>
                        {this.props.SN}
                    </TableCell>
                    <TableCell align="center">{this.props.stu.fullName}
                    </TableCell>
                </TableRow>

                {
                    serchState === 1 &&
                    <Loading/>
                }

                {
                    serchState === 2 &&
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={isOpen} timeout={1000} unmountOnExit>
                                <Box margin={1}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        All present for {this.props.stu.fullName}
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                {/*<TableCell align="center" padding={'checkbox'}><b></b></TableCell>*/}
                                                {/*<TableCell align="center" padding={'checkbox'}><b></b></TableCell>*/}
                                                {/*<TableCell align="left"><b>&nbsp;Months</b></TableCell>*/}
                                                {/*<TableCell align="left"><b>&nbsp; </b></TableCell>*/}

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                filtereddateAttendance.map((attend, i) => {
                                                    return (
                                                        <StudentAttendanceEntry
                                                            key={`${attend._id}`}
                                                            attendance={attend}

                                                            index={i}/>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                }

            </Fragment>
        )
    }

}

export default connect(state => ({
    attendanceReducer: state.attendanceReducer,
    studentReducer: state.studentReducer
}))(withStyles(useStyles)(StudentGroupTest))

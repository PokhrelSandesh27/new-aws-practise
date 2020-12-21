import React, { useState } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import PaymentRow from '../../../Payment2/components/Accountant/PaymentRow'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import { TableFooter } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DateAttenRow from './DateAttenRow'
import visi from '../../../img/cal.png'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const StudentAttendanceEntry = ({ attendance, index, key }) => {
    const [open, setOpen] = useState(false)

    const getRows = () => {
        // const { attendances } = attendance
        console.log(attendance,"Attendance data")
        const rows =  <DateAttenRow key="1"
                                   attendance={attendance.attendances}
                                    month={attendance.month}/>

        return { rows }
    }
    const { rows } = getRows()

    return (
        <React.Fragment key={key}>

        <TableRow>

            <TableCell align="center" padding={'checkbox'}>

            </TableCell>
            <TableCell align="center">
                <FontAwesomeIcon
                    icon={faCalendar}
                    style={
                        {
                            width: '100%',
                            color: 'grey'
                        }}

                />
            </TableCell>
            <TableCell align="center" style={{color:"blue", textDecorationColor:"ActiveBorder"}}>
                {(attendance.date).toUpperCase()}
                {/*{moment(attendance.date).format('MMMM DD')}*/}
            </TableCell>
            <TableCell align="left">
                <p aria-label="expand row" size="small" variant={'contained'} color={'default'} onClick={() => setOpen(!open)}>
                    {open ? <Tooltip title="View Results" aria-label="add" arrow>
                        <Fab style={{backgroundColor:"skyblue"}}>
                            <IconButton >
                                <VisibilityIcon/>
                            </IconButton>
                        </Fab>
                    </Tooltip> : <Tooltip title="View Results" aria-label="add" arrow>
                        <Fab style={{backgroundColor:"skyblue"}}>
                            <IconButton >
                                <VisibilityOffIcon/>
                            </IconButton>
                        </Fab>
                    </Tooltip>}

                    {/*{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}*/}
                </p>
            </TableCell>
            {/*<TableCell align="left">*/}
            {/*    <Button variant="contained" color="default" ><NavLink className="navlink" to={`/attendance/view/student`}>*/}
            {/*        <b>Exam</b>*/}
            {/*    </NavLink>*/}
            {/*    </Button>*/}
            {/*</TableCell>*/}
        </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">

                            </Typography>
                            <Table size="small" aria-label="purchases">

                                <TableBody>
                                    {rows}
                                </TableBody>

                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>


    )
}

export default StudentAttendanceEntry

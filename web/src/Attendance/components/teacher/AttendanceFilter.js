import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { get, orderBy } from 'lodash'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'

import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'

import AttendanceRow from './AttendanceRow'
import { getMonth } from '../../../utils'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'

const AttendanceGroup = (props) => {

    const [state, setState] = useState({
            attendances: []
        }
    )
    const [open, setOpen] = useState(false)

    useEffect(function () {
        const { attendances: a } = props

        let attendances = []


        setState({
            attendances
        })

    }, [props.attendances.attendances])

    const getRows = () => {
        const { attendances} = props
        console.log(attendances, 'your ')

        const rows = attendances.attendances.map((attendee, i) => {
                console.log(attendee, 'your attendance')
                return <AttendanceRow key={`${attendee._id}`}
                                      attendee={attendee}
                                      id={i += 1} />

            }
        )
        return { rows}
    }

    console.log("gg");
    const { rows} = getRows();

    const { attendances, id, classes, key } = props

    return (
        <React.Fragment key={key}>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                        {/*{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}*/}
                    </IconButton>
                </TableCell>
                <TableCell align="center"  padding={'checkbox'} >&nbsp; {id}</TableCell>

                <TableCell align="center">&nbsp;  {attendances.user.fullName}</TableCell>
                <TableCell align="center"  >&nbsp; {rows.length}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                All present for {attendances.user.fullName}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" padding={'checkbox'}><b>S.N.</b></TableCell>
                                        <TableCell align="left"><b>&nbsp; day </b></TableCell>
                                        <TableCell align="left"><b>&nbsp; </b></TableCell>

                                    </TableRow>
                                </TableHead>
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

export default connect(state => ({}))(withStyles(useStyles)(AttendanceGroup))

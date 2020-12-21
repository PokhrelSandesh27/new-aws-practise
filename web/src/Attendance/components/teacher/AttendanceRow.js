import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import {get} from 'lodash'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'

const AttendanceRow = (props) => {
    // const [state, setState] = useState({
    //     attendee: []
    //     }
    // )
    // const [open, setOpen] = useState(false)
    //
    // useEffect(function () {
    //     const { attendee: a } = props
    //
    //     let attendee = []
    //
    //
    //     setState({
    //         attendee
    //     })
    //
    // }, [props.attendee.attendee])
    //
    //
    // const getRows = () => {
    //     const { attendee} = props
    //     console.log(attendee, 'your ')
    //
    //     const rows = attendee.attendee.map((atten, i) => {
    //             console.log(attendee, 'your attendance')
    //             return <AttendanceRow key={`${atten._id}`}
    //                                   atten={atten}
    //                                   id={i += 1} />
    //
    //         }
    //     )
    //     return { rows}
    // }
    //
    // const { rows} = getRows();

    const { attendee:attendances, id, key, classes /*, classes */ } = props
    const {attendee, i: index} = attendances
    return (
        <React.Fragment key={key}>
            {/*<TableRow className={classes.root}>*/}
            {/*    <TableCell>*/}
            {/*        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>*/}
            {/*            {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}*/}
            {/*            /!*{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}*!/*/}
            {/*        </IconButton>*/}
            {/*    </TableCell>*/}
            {/*    <TableCell align="center"  padding={'checkbox'} >&nbsp; {id}</TableCell>*/}

            {/*    <TableCell align="center">&nbsp;  {attendances.user.fullName}</TableCell>*/}
            {/*    <TableCell align="center"  >&nbsp; {rows.length}</TableCell>*/}
            {/*</TableRow>*/}
            <TableRow>
                <TableCell align="center" padding={'checkbox'}>
                    {id}
                </TableCell>
                <TableCell align="left">
                    {moment(attendee.date).format("MMMM DD")}
                </TableCell>
                <TableCell align="left">
                    {attendee.isPresent?'Present': 'Absent'}
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default connect(state => ({}))(withStyles(useStyles)(AttendanceRow))

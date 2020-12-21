import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import {get} from 'lodash'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import PaymentRow from '../Accountant/PaymentRow'
import Button from '@material-ui/core/Button'
import { TableFooter } from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import PaymentConfigRow from './PaymentConfigRow'

const PaymentConfigGroup = (props) => {

    const [state, setState] = useState({
            payments: [],
            total: 0,
            enableReceipt: false
        }
    )
    const [open, setOpen] = useState(false)

    useEffect(function () {
        const { payments: a } = props

        let payments = []


        setState({
            payments
        })

    }, [props.payments.payments])

    const generate = () => {
        const { payments } = state
        props.onGenerate(payments)
    }

    // setOpen = open => {
    //     this.setState({ open })
    // }
    const onGenerate = (id, index) => {
        props.onGenerate(id, index)
    }



    const getRows = () => {
        const { payments} = props
        // console.log(payments)

        const rows = payments.payments.map((payment, i) => {
// console.log(payment)
                return <PaymentConfigRow key={`${payment.payment._id}`}
                                   payment={payment} onGenerate={onGenerate}
                                         onShowDetails={props.onShowDetails}
                                   id={i += 1} />

            }
        )
        return { rows}
    }

    const addRemovePayment = (payment, status) => {
        let { payments, total } = state
        const { _id } = payment

        if (!status) {
            const index = payments.findIndex(item => item._id === _id)
            payments.splice(index, 1)
            total -= payment.amount
        } else {
            total += payment.amount
            payments.push(payment)
        }

        setState({
            payments, total, enableReceipt: !!payments.length
        })
    }

    // const { open } = state
    const { rows} = getRows()

    const { payments, id, classes, key } = props
    return (
        <React.Fragment key={key}>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                        {/*{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}*/}
                    </IconButton>
                </TableCell>


                <TableCell align="left" padding={'checkbox'}>&nbsp; {id}</TableCell>

                <TableCell align="left" padding={'checkbox'}>&nbsp;  {payments.grade}</TableCell>
                <TableCell align="left" padding={'checkbox'}>&nbsp;  {payments.section}</TableCell>
                <TableCell align="left"  >&nbsp; {rows.length}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                All PaymentConfig for {payments.grade}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" padding={'checkbox'}><b>S.N.</b></TableCell>
                                        {/*<TableCell padding={'checkbox'}/>*/}
                                        {/*<TableCell align="center"><b>&nbsp; Date</b></TableCell>*/}
                                        <TableCell align="left"><b>&nbsp; Name</b></TableCell>
                                        <TableCell align="right"><b>&nbsp; Amount</b></TableCell>
                                        <TableCell align="right"><b>&nbsp; Generate</b></TableCell>
                                        <TableCell align="right"><b>&nbsp; View</b></TableCell>
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

export default connect(state => ({}))(withStyles(useStyles)(PaymentConfigGroup))

import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import PaymentRow from './SinglePaymentData'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'

const PaymentGroup = (props) => {

    const [state, setState] = useState({
            payments: [],
            total: 0,
        }
    )
    const [open, setOpen] = useState(false)

    useEffect(function () {
        const { payments: a } = props
        let total = 0
        let payments = []

        for (let payment of a.payments) {
            if (!payment.isPaid) {
                total += payment.amount
                payments.push(payment)
            }
        }
        setState({
            payments, total, enableReceipt: !!payments.length
        })

    }, [props.payments.payments])

    const getRows = () => {
        const { payments, user } = props
        let total = 0, toPay = 0, paid = 0
        const rows = payments.payments.map((payment, i) => {
                total += payment.amount
                toPay += !payment.isPaid ? payment.amount : 0
                paid += payment.isPaid ? payment.amount : 0
                return <PaymentRow key={`${payment._id}-${user._id}`}
                                   payment={payment} checked={true}
                                   id={i += 1} onChange={addRemovePayment}/>

            }
        )
        return { rows, total, toPay, paid }
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
            payments, total
        })
    }

    const { rows, total, toPay, paid } = getRows()

    const { payments, id, user, classes, key } = props
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
                <TableCell align="left" padding={'checkbox'}>&nbsp; </TableCell>
                <TableCell align="right">&nbsp; {payments.date}</TableCell>
                <TableCell
                    align="left">&nbsp; {total === toPay ? 'Not Paid' : ((total === paid) ? 'Paid' : 'Partially Paid')}</TableCell>
                <TableCell align="right">&nbsp; {toPay}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                All Payments for {payments.date}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" padding={'checkbox'}><b>S.N.</b></TableCell>
                                        <TableCell align="center"><b>&nbsp; Description</b></TableCell>
                                        <TableCell align="left"><b>&nbsp; Amount</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows}
                                    <TableRow>
                                        <TableCell rowSpan={3}/>
                                        <TableCell align="center" colSpan={5}><b><i>Total amount to be paid this month: {total}</i></b></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default connect(state => ({}))(withStyles(useStyles)(PaymentGroup))

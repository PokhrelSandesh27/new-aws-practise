import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { get } from 'lodash'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

const PaymentCategoryRow = (props) => {

    // const [checked, setChecked] = useState(props.checked)
    //
    // useEffect(() => {
    //     setChecked(props.checked)
    // }, [props.checked])
    //
    // const onCheck = () => {
    //     setChecked(!checked)
    //     props.onChange(props.payment, !checked)
    // }
    //
    // const generate = () => {
    //     props.onGenerateScholar(payment._id, index)
    // }
    // const showDetails = () => {
    //     props.onShowDetails(payment)
    // }

    const { payment: payments, id, key /*, classes */ } = props
    const {payment, i: index} = payments
    // console.log(payment, payments, index,'Why')
    return (
        <React.Fragment key={key}>
            <TableRow>
                <TableCell align="center" padding={'checkbox'}>
                    {id}
                </TableCell>
                <TableCell align="left">
                    {payment.name}
                </TableCell>
                <TableCell align="left">
                    {payment.year}
                </TableCell>

                <TableCell align="right">
                    {payment.amount}/-
                </TableCell>



                {/*<TableCell*/}
                {/*    align="left">{get(payment, 'scholarshipConfiguration.name', get(payment, 'paymentConfiguration.name', 'NA'))}</TableCell>*/}
                {/*<TableCell align="right">{get(payment, 'amount')}</TableCell>*/}
            </TableRow>
        </React.Fragment>
    )
}
// class PaymentRow extends React.Component {
//
//     state = {
//         checked: true
//     }
//
//     checked = (e) => {
//         const checked = e.target.checked // We could have just used the state, but to ensure the current state using the event target checked
//         this.setState({ checked })
//         this.props.onChange(this.props.payment, checked)
//     }
//
//     render () {
//         const { payment, id, key /*, classes */ } = this.props
//         return (
//             <React.Fragment key={key}>
//                 <TableRow>
//                     <TableCell align="center" padding={'checkbox'}>
//                         {id}
//                     </TableCell>
//                     <TableCell align="center" padding={'checkbox'}>
//                         <Checkbox
//                             disabled={payment.isPaid}
//                             checked={payment.isPaid ? true : this.state.checked}
//                             inputProps={{ 'aria-labelledby': `payment-${payment._id}` }}
//                             onChange={this.checked}
//                         />
//                     </TableCell>
//                     <TableCell
//                         align="left">{get(payment, 'scholarshipConfiguration.name', get(payment, 'paymentConfiguration.name', 'NA'))}</TableCell>
//                     <TableCell align="right">{get(payment, 'amount')}</TableCell>
//                 </TableRow>
//             </React.Fragment>
//         )
//     }
// }

export default connect(state => ({}))(withStyles(useStyles)(PaymentCategoryRow))

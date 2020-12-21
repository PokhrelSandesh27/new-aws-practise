import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { get } from 'lodash'
import TableCell from '@material-ui/core/TableCell'
import { getMonth } from '../../../utils'
import TableRow from '@material-ui/core/TableRow'

class Receipt extends React.Component {
    render () {
        const { payment, id /*, classes */ } = this.props
        console.log(payment)
        return (
            <tr className="list-item">
                <td data-label="S.N" style={{ textAlign: 'center' }} className="tableitem">{id}</td>
                <td data-label="Date" style={{ textAlign: 'center' }} className="tableitem">
                    {getMonth(payment.month)}, {payment.year}
                </td>
                <td data-label="Category" style={{ textAlign: 'center' }}
                    className="tableitem">{get(payment, 'paymentCategory.name', 'scholarshipCong.name')}</td>
                <td data-label="Category" style={{ textAlign: 'center' }}
                    className="tableitem">{get(payment, 'amount')}</td>
            </tr>
        )
    }
}

export default connect(state => ({}))(withStyles(useStyles)(Receipt))

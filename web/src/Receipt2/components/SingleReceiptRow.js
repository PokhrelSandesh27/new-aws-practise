import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default class SingleReceiptRow extends Component {

    onSelected = (event) => {
        this.props.onSelected(this.props.receipt._id, event.target.checked, this.props.receipt)
    }

    onPay = (event) => {
        event.preventDefault()
        this.props.onPay(this.props.receipt._id)
    }

    state = {
        isSelected: true
    }

    render () {
        const receipt = this.props.receipt
        return (
            <tr className="invoice-table-data">
                <td className="invoice-table-sl">{this.props.index}</td>
                <th className="invoice-table-sl"><input type='checkbox' disabled={receipt.isPaid} onChange={this.onSelected.bind()}
                style={{width:"20px", height:"20px"}}/></th>
                <td className="nvoice-table-amount">{receipt.payment.category}</td>
                <td className="invoice-table-amount">{receipt.payment.amount}</td>
                {/*<td>{receipt.year}</td>*/}
                {/*<td>{receipt.month}</td>*/}
                <td className="invoice-table-amount">{receipt.isPaid ? 'Paid' : 'Unpaid'}</td>
                <td className="invoice-table-amount">
                    {/*<NavLink*/}
                    {/*    to={{*/}
                    {/*        // pathname: `/receipts/list/classroom/${classroom._id}/student/${student._id}`,*/}
                    {/*    }}>*/}
                    {/*    View*/}
                    {/*</NavLink>*/}
                    &nbsp;
                    &nbsp;
                    {
                        !receipt.isPaid && this.props.enableSinglePay &&
                        <a href="javascript:void(0)"
                           onClick={this.onPay.bind(this)}>Pay</a>
                    }
                </td>
            </tr>
        )
    }
}


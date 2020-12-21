import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Button from "@material-ui/core/Button";

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
                <th className="invoice-table-sl"  >
                    <input type='checkbox'
                         disabled={receipt.isPaid} onChange={this.onSelected.bind()}
                         style={{width:"40px", height:"20px"}}></input>

                </th>
                <td className="nvoice-table-amount">{receipt.payment.category}</td>
                <td className="invoice-table-amount">{receipt.payment.amount}</td>
                <td className="invoice-table-amount" >{receipt.isPaid ? 'Paid' : 'Unpaid'}</td>
                <td className="invoice-table-amount">
                    {
                        !receipt.isPaid && this.props.enableSinglePay &&
                        <NavLink className="navlink" to='a' href="javascript:void(0)"
                            onClick={this.onPay.bind(this)}>Pay</NavLink>
                    }
                </td>
            </tr>
        )
    }
}

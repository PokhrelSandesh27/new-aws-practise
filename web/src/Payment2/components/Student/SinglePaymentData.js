import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { get } from 'lodash'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const SinglePaymentData = (props) => {

    const [checked, setChecked] = useState(props.checked)

    useEffect(() => {
        setChecked(props.checked)
    }, [props.checked])

    const onCheck = () => {
        setChecked(!checked)
        props.onChange(props.payment, !checked)
    }

    const { payment, id, key /*, classes */ } = props
    console.log("props", props)
    return (
        <React.Fragment key={key}>
            <TableRow>
                <TableCell align="center" >
                    {id}
                </TableCell>
                <TableCell
                    align="center">{get(payment, 'paymentCategory.name')}</TableCell>
                <TableCell align="left">{get(payment, 'amount')}</TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default connect(state => ({}))(withStyles(useStyles)(SinglePaymentData))

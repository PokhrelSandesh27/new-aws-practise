import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { get } from 'lodash'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";

const ScholarConfigRow = (props) => {

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
    const generate = () => {
        props.onGenerateScholar(payment._id, index)
    }
    const showDetails = () => {
        props.onShowDetails(payment)
    }
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
                <TableCell align="right">
                    {get(payment,'user.fullName')}
                </TableCell>
                <TableCell align="right">
                    {get(payment,'paymentCategory.amount')}
                </TableCell>
                <TableCell align="right">
                    {payment.discount}%
                </TableCell>
                <TableCell align="left">
                    <Button variant="contained" color="default"

                            disabled={payment.isGenerated}
                            onClick={generate }
                        //  onClick={(this.generate.bind(this, pay))


                    >Generate
                    </Button>

                </TableCell>
                <TableCell align="left">


                        <Tooltip title="Add User" aria-label="add">
                            <VisibilityIcon color={'primary'}  onClick={showDetails} style={{cursor:"pointer"}}/>
                        </Tooltip>

                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}


export default connect(state => ({}))(withStyles(useStyles)(ScholarConfigRow))

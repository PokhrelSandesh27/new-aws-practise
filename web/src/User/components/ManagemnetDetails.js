import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {  getAllUsers } from '../actions'
import "../static/css/style.css"
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'
import TablePagination from '../../TablePagination'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip)

class StudentDetails extends Component {
    state = {}

    componentDidMount () {

        this.props.dispatch(getAllUsers())
    }
    createUserLink(){
        this.props.history.push("../../user/create")
    }
    render () {
        const { classes } = this.props;
        const {users} = this.props.userReducer
        const mgmt = users.filter(user => user.groups.includes('MANAGEMENT'))
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">
                <Breadcrumbs aria-label="breadcrumb"
                             style={{float: 'right'}}>
                    <StyledBreadcrumb onClick={this.props.history.goBack}
                                      component="a"
                                      label="Back"
                                      icon={<ArrowBackIosIcon fontSize="small" />}>

                    </StyledBreadcrumb>

                    <StyledBreadcrumb
                        component="a"
                        label="User"
                        onClick={this.props.history.goBack}
                    />
                    <Typography variant={'inherit'} color={'secondary'}>
                        Teacher
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>
                <div className="row" >

                </div>
                <div className="col-md-6">
                    <div className="panel panel-primary">
                       <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>

                                        <TableRow>
                                            <TableCell align="center"><b>S.N.</b></TableCell>
                                            <TableCell align="center"><b>UserName</b></TableCell>
                                            <TableCell align="center"><b>FullName</b></TableCell>
                                            <TableCell align="center"><b>CurrentAddress</b></TableCell>
                                            <TableCell align="center"><b>Phone</b></TableCell>
                                            <TableCell align="center"><b>Email</b></TableCell>
                                            <TableCell align="center"><b>Status</b></TableCell>

                                            <TableCell align="center"><b>Action</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                       mgmt.map((user, i) => {


                                               return (
                                                <TableRow >
                                                    <TableCell align="center">
                                                        {i+1}
                                                    </TableCell>
                                                    <TableCell align="center">{user.username}</TableCell>
                                                    <TableCell align="center">{user.fullName|| 'NA'}</TableCell>
                                                    <TableCell align="center">{user.currentAddress|| 'NA'}</TableCell>
                                                    <TableCell align="center">{user.phone|| 'NA'}</TableCell>
                                                    <TableCell align="center">{user.email|| 'NA'}</TableCell>


                                                    <TableCell align="center"style={{color:'green'}}><b>{user.status|| 'NA'}</b></TableCell>
                                                    <TableCell align="center"> <NavLink  className="navlink" to={`/user/${user._id}/upload`}>
                                                        <Tooltip title="View Results" aria-label="add" arrow>

                                                            <IconButton >
                                                                <VisibilityIcon color={'primary'}/>
                                                            </IconButton>

                                                        </Tooltip>
                                                </NavLink></TableCell>


                                                </TableRow>
                                            )
                                        })
                                        }
                                    </TableBody>
                                </Table>
                                <TablePagination>

                                </TablePagination>
                            </TableContainer>

                    </div>
                </div>
            </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    userReducer: state.userReducer
}))(withStyles(useStyles)(StudentDetails))

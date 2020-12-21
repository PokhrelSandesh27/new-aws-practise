import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../static/css/style.css"
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
import {searchStudent} from "../../Student/actions";
import {getClassroomById} from "../../Classroom/actions";
import {get} from "lodash";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {getAllUsers} from "../actions";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";

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
    state = {
        classroom: this.props.match.params.classroom,


    }

    componentDidMount() {
       const  classroom = this.props.match.params.classroom
        this.props.dispatch(searchStudent({'classroom': this.state.classroom}))
        this.props.dispatch(getAllUsers())
        this.props.dispatch(getClassroomById(classroom))


    }

    render() {
        const {classes} = this.props;
        const {classroom} = this.props.classroomReducer
        const {students} = this.props.studentReducer
        const {users} = this.props.userReducer
        const stu = users.filter(user => user.groups.includes('STUDENT'))



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
                            <NavLink to={'/user/list'}>
                            <StyledBreadcrumb
                                component="a"
                                label="User"

                            />
                            </NavLink>
                            <StyledBreadcrumb
                                component="a"
                                label="Student"
                                onClick={this.props.history.goBack}
                            />
                            <Typography variant={'inherit'} color={'secondary'}>
                                Grade { classroom.grade} { classroom.section}
                            </Typography>
                        </Breadcrumbs>
                        <br/> <br/>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="panel panel-primary">

                                    <br></br>


                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                    <TableCell align="center"><b>UserName</b></TableCell>
                                                    <TableCell align="center"><b>FullName</b></TableCell>
                                                    <TableCell align="center"><b>Phone no.</b></TableCell>
                                                    <TableCell align="center"><b>Email Address</b></TableCell>

                                                    <TableCell align="center"><b>Actions</b></TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {students && stu &&
                                                students
                                                    .map((item, i) => {


                                                        return (
                                                            <TableRow>
                                                                <TableCell align="center">
                                                                    {i + 1}
                                                                </TableCell>
                                                                <TableCell
                                                                    align="center">{get(item, 'student.username', 'NA')}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {get(item, 'student.fullName', 'NA')}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {get(item, 'student.phone', 'NA')}

                                                                </TableCell>

                                                                <TableCell align="center">
                                                                    { get(item, 'student.email', 'NA')}

                                                                </TableCell>
                                                                <TableCell align="center">

                                                                    <NavLink  className="navlink" to={`/user/${ get(item, 'student._id', 'NA')}/upload`}>
                                                                   <Button variant="contained" color="primary"> Details </Button>
                                                                </NavLink>
                                                                </TableCell>


                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        )
    }
}


export default connect(state => ({
    userReducer: state.userReducer,
    classroomReducer: state.classroomReducer,
    studentReducer:state.studentReducer
}))(withStyles(useStyles)(StudentDetails))

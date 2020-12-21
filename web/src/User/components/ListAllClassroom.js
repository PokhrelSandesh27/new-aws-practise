import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllClassroom } from '../../Home/actions'
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
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
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
class ListAllClassroom extends Component {
    state = {

    }


    componentDidMount () {
        console.log('this will run once')
        this.props.dispatch(getAllClassroom())
    }


    render () {
        const { classes } = this.props;
        const {classrooms} = this.props.classroomReducer

        console.log('log class rooms', classrooms)



        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
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
                               Student
                            </Typography>
                        </Breadcrumbs>
                        <br/> <br/>
                        <div className="row" >
                            <div className="col-md-6">
                                    <NavLink className = "navlink"
                                             to={{

                                                 pathname: `/student/create`,
                                                 data: {
                                                 }
                                             }}>
                                        <Tooltip title="Add Students" aria-label="add">
                                            <Fab color="primary" className={classes.absolute}>
                                                <AddIcon />
                                            </Fab>
                                        </Tooltip>
                                    </NavLink>


                                <div className="panel panel-primary">
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                    <TableCell align="center"><b>Grade</b></TableCell>
                                                    <TableCell align="center"><b>Students</b></TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {classrooms.map((classroom, i) => {

                                                    return (
                                                        <TableRow key={classroom._id}>
                                                            <TableCell align="center">
                                                                {i+1}
                                                            </TableCell>

                                                            <TableCell align="center">{classroom.grade || 'NA'} {classroom.section || 'NA'}</TableCell>
                                                            <TableCell align="center">
                                                                <NavLink
                                                                    className="navlink"
                                                                    to={{
                                                                        pathname: `/user/StudentDetails/classroom/${classroom._id}`,
                                                                    }}>
                                                                    <Tooltip title="View Results" aria-label="add" arrow>
                                                                        <Fab style={{backgroundColor:"lightGreen"}} className={classes.fab}>
                                                                            <IconButton >
                                                                                <VisibilityIcon/>
                                                                            </IconButton>
                                                                        </Fab>
                                                                    </Tooltip>

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
    classroomReducer: state.classroomReducer
}))(withStyles(useStyles)(ListAllClassroom))

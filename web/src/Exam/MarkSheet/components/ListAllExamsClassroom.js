import React, { Component } from 'react'
import { getExam } from '../../Exam/actions'
import { getAllClassroom } from '../../../Home/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import {Link, NavLink} from 'react-router-dom'
import { getUser } from '../../../utils'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Button from '@material-ui/core/Button'
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from '@material-ui/icons/FilterList';
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Fab from "@material-ui/core/Fab";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TablePaginations from '../../../TablePagination'
import CircularProgress from "@material-ui/core/CircularProgress";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";


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

class ListAllExams extends Component {


    state = {
        type: null,
        exam: this.props.match.params.exam,
        anchorEl:null,


    }
    handleMenu = (event) => {
        this.setState({anchorEl:event.currentTarget})

    };
    handleClose = () => {
        this.setState({anchorEl:null})
    };
    opens =()=>{
        Boolean(this.state.anchorEl);
    }


    componentDidMount () {
        this.setState({ type: this.props.type || 'list' })
        const { _id } = getUser()
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getAllClassroom())
    }

    render () {
        const { classes } = this.props;
        const { exam, readState } = this.props.examReducer
        const { classrooms } = this.props.classroomReducer

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
                    <NavLink to={'/home/homepage'}>
                        <StyledBreadcrumb
                            component="a"
                            label="Home"
                            icon={<HomeIcon fontSize="small" />}

                        />
                    </NavLink>


                    <StyledBreadcrumb
                        component="a"
                        label="Results"
                        onClick={this.props.history.goBack}

                    />
                    <Typography variant={'inherit'} color={'secondary'}>
                        {readState === 2 && exam.name}
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>


                <div className="row">

                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-body">

                            </div>
                            {
                                readState===1 &&
                                <div>
                                    <CircularProgress
                                        className={classes.progressCircle}
                                        size={40}
                                        left={-20}
                                        top={10}
                                        status={'loading'}
                                        style={{marginLeft: '50%', marginTop:'20%'}}
                                        disableShrink />
                                </div>
                            }

                            {
                                readState === 2 &&


                                <TableContainer component={Paper}>

                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>

                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={this.state.anchorEl}
                                                style={{top: "42px"}}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',

                                                }}
                                                // open={this.opens}
                                                onClose={this.handleClose}
                                            >
                                                <MenuItem component={Link} to="/user/view" onClick={this.handleClose}>
                                                    <Button

                                                        className={classes.button}
                                                        startIcon={<PersonIcon/>}
                                                    >

                                                    </Button>
                                                    subject
                                                </MenuItem>
                                                <MenuItem component={Link} to="/login">
                                                    <Button

                                                        className={classes.button}
                                                        startIcon={<ExitToAppIcon/>}
                                                    >

                                                    </Button>
                                                    student
                                                </MenuItem>
                                            </Menu>
                                            <TableRow>
                                                <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                <TableCell align="center"><b>ClassRoom</b></TableCell>
                                                <TableCell align="center"><b>Action</b></TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                classrooms &&
                                                classrooms.map((classroom, i) => {
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell align="center">
                                                                {i + 1}
                                                            </TableCell>
                                                            <TableCell
                                                                align="center">{classroom.grade}{classroom.section}</TableCell>
                                                            <TableCell align="center"><NavLink className="navlink"
                                                                                               to={{
                                                                                                   pathname: `/marksheets/create/exam/${this.state.exam}/classroom/${classroom._id}/student`,
                                                                                                   data: {}
                                                                                               }}>
                                                                <Tooltip title="Add Result" aria-label="add" arrow>
                                                                    <Fab color={'primary'} className={classes.fab}>
                                                                        <IconButton>
                                                                            <AddCircleOutlineIcon/>
                                                                        </IconButton>
                                                                    </Fab>
                                                                </Tooltip>

                                                            </NavLink>
                                                                <NavLink
                                                                    className="navlink"
                                                                    to={{
                                                                        pathname: `/marksheets/list/exam/${this.state.exam}/classroom/${classroom._id}/student`,
                                                                        data: {}
                                                                    }}>
                                                                    <Tooltip title="View Results" aria-label="add"
                                                                             arrow>
                                                                        <Fab style={{backgroundColor: "skyblue"}}
                                                                             className={classes.fab}>
                                                                            <IconButton>
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
                                    <TablePaginations/>
                                </TableContainer>
                            }


                            {
                                readState ===3 &&
                                    <p>Please check your connection</p>
                            }

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
    examReducer: state.examReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(ListAllExams))

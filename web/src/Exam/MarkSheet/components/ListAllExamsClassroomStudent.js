import React, { Component } from 'react'
import { getExam } from '../../Exam/actions'
import {  getClassroomById } from '../../../Home/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../../utils'
import { searchStudent } from '../../../Student/actions'
import { getExamDetails } from '../../ExamDetails/actions'
import { get } from 'lodash'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

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
class ListAllExamsClassroomStudent extends Component {

    state = {
        type: null,
        exam: this.props.match.params.exam,
        classroom: this.props.match.params.classroom,
        addBy: this.props.match.params.type
    }

    componentDidMount () {
        this.setState({ type: this.props.type || 'list' })
        const { _id } = getUser()
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getClassroomById(this.state.classroom))
        if (this.state.addBy === 'student')
            this.props.dispatch(searchStudent({ 'classroom': this.state.classroom }))
        else
            this.props.dispatch(getExamDetails())

    }

    render () {
        const { classes } = this.props;
        const { exam, readState } = this.props.examReducer
        const { classroom } = this.props.classroomReducer
        const { students } = this.props.studentReducer
        const { examDetails } = this.props.examDetailsReducer

        const items = (this.state.addBy === 'student') ? students : examDetails;

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
                        onClick={this.props.history.goBack}/>
                    <Typography variant={'inherit'} color={'secondary'}>
                        {this.state.addBy}
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>

                <div className="row">

                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div>
                                <Button variant="contained" style={{width:"100%"}}  color="primary">
                                    {
                                        `Classroom :${classroom.grade} ${classroom.section}`

                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {

                                        `Examination : ${exam.name}`
                                    }

                                </Button>

                            </div>
                            {
                            items &&
                            items.
                            // TODO Remove this filter when search route is available
                            filter(item => (this.state.addBy === 'subject' ?  ((this.state.classroom === item.classroom._id) && (this.state.exam === item.exam._id)) : true))
                            .map((item, i) => {
                                if (this.state.addBy === 'student' && !item.student) return;
                                return (
                                    <div className="ClassList">
                                        <div className="alert">
                                            <span> {i+1}</span>
                                            &nbsp; &nbsp; &nbsp;
                                            <span><b>{(this.state.addBy === 'subject') ? item.subject.name : get(item, 'student.fullName', 'NA')}</b></span>
                                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                                            <span>
                                            <NavLink className ="navlink"
                                                     to={{
                                                         pathname: `/marksheets/${this.state.type}/exam/${this.state.exam}/classroom/${this.state.classroom}/${this.state.addBy}/${(this.state.addBy === 'student') ? item.student._id : item._id}`,
                                                     }}>
                                                {
                                                    this.state.type === 'list' &&
                                                    <Tooltip title="View Result" aria-label="add" arrow >

                                                                <VisibilityIcon style={{display:"initial", float:"right"}}/>
                                                    </Tooltip>
                                                    ||
                                                    this.state.type === 'create' &&
                                                    <><Tooltip title="Add Result" aria-label="add" arrow>
                                                        <AddCircleOutlineIcon style={{display:"initial", float:"right"}}/>
                                                    </Tooltip>
                                                    </>
                                                }
                                            </NavLink>
                                            </span>
                                        </div>

                                    </div>
                                )
                            }
                            )

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
    examDetailsReducer: state.examDetailsReducer,
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(ListAllExamsClassroomStudent))

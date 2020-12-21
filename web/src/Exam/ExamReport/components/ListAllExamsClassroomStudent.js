import React, {Component} from 'react'
import {getExam} from '../../Exam/actions'
import {getExamReport, searchExamReports} from "../actions";
import {getClassroomById} from '../../../Home/actions'
import {connect} from 'react-redux'
import '../static/css/style.css'
import {NavLink} from 'react-router-dom'
import {getUser} from '../../../utils'
import {searchStudent} from '../../../Student/actions'
import {getExamDetails} from '../../ExamDetails/actions'
import {get} from 'lodash'
import Container from '@material-ui/core/Container'
import {withStyles} from '@material-ui/core/styles'
import {useStyles} from '../../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import {addTimeTable} from "../../../TimeTable/action";
import {createReleaseReport, searchReleaseReport} from "../../ReleaseReport/actions";
import releaseReportReducer from "../../ReleaseReport/reducer";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
        localStorage: {
            exam: this.props.match.params.exam,
            classroom: this.props.match.params.classroom,
            isReleased: false
        },
        type: null,
        exam: this.props.match.params.exam,
        classroom: this.props.match.params.classroom,


    }

    componentDidMount() {
        this.setState({type: this.props.type || 'list'})
        const {_id} = getUser()
        this.props.dispatch(getExam(this.state.exam))
        this.props.dispatch(getClassroomById(this.state.classroom))
        this.props.dispatch(searchStudent({'classroom': this.state.classroom}))
        this.props.dispatch(searchExamReports({exam: this.state.exam}))
        this.props.dispatch(searchReleaseReport({'exam': this.state.exam, 'classroom': this.state.classroom}))

    }

    OnRelease = () => {
        const localStore = {...this.state.localStore}
        localStore.exam = this.state.exam
        localStore.classroom = this.state.classroom
        localStore.isReleased = true
        this.setState({localStore})
        this.props.dispatch(createReleaseReport(localStore))
    }

    render() {
        const {classes} = this.props;
        const {exam, readState} = this.props.examReducer
        const {examReports} = this.props.examReportReducer
        const {examReportReleases} = this.props.releaseReportReducer
        const {classroom} = this.props.classroomReducer
        const {students} = this.props.studentReducer
        console.log("exam Report Release data here"+JSON.stringify(examReportReleases))

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>List of {this.state.addBy} for</h2>
                        <div className="row">
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
                                    label="Reports"
                                    onClick={this.props.history.goBack}

                                />


                                <Typography variant={'inherit'} color={'secondary'}>
                                  Grade {readState === 2 && classroom.grade}
                                </Typography>
                            </Breadcrumbs>
                            <br/> <br/>
                            <div className="col-md-6">
                                <div className="panel panel-primary">
                                    <div>
                                        <Button variant="contained" style={{width: "100%"}} color="primary">
                                            {
                                                `Classroom :${classroom.grade}${classroom.section}`

                                            }
                                            &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            {

                                                `Examination : ${exam.name}`
                                            }
                                        </Button>
                                    </div>
                                    <br></br>
                                    <div>
                                        <Button variant="contained" style={{backgroundColor: "lightgreen"}}
                                                onClick={this.OnRelease}>
                                            <h4>
                                                {
                                                    examReportReleases.isReleased?'Published':'Not Released'
                                                }

                                            </h4>
                                        </Button>
                                        {console.log("release data",(examReportReleases.isReleased))}

                                    </div>

                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                    <TableCell align="center"><b>Student</b></TableCell>
                                                    <TableCell align="center"><b>Results</b></TableCell>
                                                    <TableCell align="center"><b>GPA</b></TableCell>
                                                    <TableCell align="center"><b>Actions</b></TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {students && examReports &&
                                                students
                                                    .map((item, i) => {

                                                        const examReport = examReports.find(examReport => examReport.student._id === item.student._id)
                                                        return (
                                                            <TableRow>
                                                                <TableCell align="center">
                                                                    {i + 1}
                                                                </TableCell>
                                                                <TableCell
                                                                    align="center">{get(item, 'student.fullName', 'NA')}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Button variant="outlined" color="primary"
                                                                    > {get(examReport, 'result', 'NA')}</Button>
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {get(examReport, 'gpa', 'NA')}

                                                                </TableCell>

                                                                <TableCell align="center">
                                                                    <NavLink className="navlink"
                                                                             to={{
                                                                                 pathname: `/examreport/${get(examReport, 'gpa') ? 'list' : 'create'}/exam/${this.state.exam}/classroom/${this.state.classroom}/student/${get(item, 'student._id')}`,
                                                                             }}>

                                                                        <b>{get(examReport, 'gpa') ?  <Tooltip title="View Results" aria-label="add" arrow>
                                                                            <Fab style={{backgroundColor:"lightGreen"}} className={classes.fab}>
                                                                                <IconButton >
                                                                                    <VisibilityIcon/>
                                                                                </IconButton>
                                                                            </Fab>
                                                                        </Tooltip> :  <Tooltip title="View Results" aria-label="add" arrow>
                                                                            <Fab style={{backgroundColor:"crimson"}} className={classes.fab}>
                                                                                <IconButton >
                                                                                     <AddCircleOutlineIcon/>
                                                                                </IconButton>
                                                                            </Fab>
                                                                        </Tooltip>} </b>
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
    examReportReducer: state.examReportReducer,
    examReducer: state.examReducer,
    classroomReducer: state.classroomReducer,
    examDetailsReducer: state.examDetailsReducer,
    studentReducer: state.studentReducer,
    releaseReportReducer: state.releaseReportReducer
}))(withStyles(useStyles)(ListAllExamsClassroomStudent))

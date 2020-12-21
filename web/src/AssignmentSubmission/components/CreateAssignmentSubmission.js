import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAssignmentSubmission, uploadAssignmentSubmission } from '../actions'
import MyInput from 'my-input-react'
import { getUser } from '../../utils'
import '../static/css/style.css'
import { getAllClassroom } from '../../Home/actions'
import { getAllSubjects } from '../../Subject/actions'
import {NavLink, Redirect} from 'react-router-dom'
import { getAssignment } from '../../Assignment/actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import logo from "../../img/logo.svg";
import Typography from "@material-ui/core/Typography";
import {get} from 'lodash'
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
class CreateAssignmentSubmission extends Component {

    state = {
        localStore: {},
        redirect: false,
        disabled: false,
        uploadFile: false,

    }

    componentDidMount () {
        if (!this.props.match.params.id) {
            this.setState({ redirect: true })
            return
        }

        const user = getUser()

        const localStore = { ...this.state.localStore, assignment: this.props.match.params.id, student: user._id }

        this.setState({ localStore })

        this.props.dispatch(getAssignment(this.props.match.params.id))

    }

    newFileSelected = event => {
        const file = event.target.files[0]
        const id = event.target.id
        this.setState({ [id]: file, uploadFile: true })
    }

    handler (me, value) {
        const localStore = { ...this.state.localStore }

        localStore[me] = value

        this.setState({ localStore })
    }

    async createAssignmentSubmission (e) {
        e.preventDefault()
        const { localStore } = this.state
        this.setState({ disabled: true })

        const createAssignmentSubmissionRedux = await this.props.dispatch(createAssignmentSubmission(localStore))
        if ((createAssignmentSubmissionRedux.value || undefined) && createAssignmentSubmissionRedux.value.request.status === 200) {
            const assignmentSubmission = createAssignmentSubmissionRedux.value.data

            if (this.state.file) {
                const fileData = new FormData()
                fileData.append('file', this.state.file)
                const uploadAssignmentSubmissionRedux = await this.props.dispatch(uploadAssignmentSubmission(assignmentSubmission._id, fileData))
                if ((uploadAssignmentSubmissionRedux.value || undefined) && uploadAssignmentSubmissionRedux.value.request.status === 200) {
                    this.setState({ redirect: true })
                }
            } else {
                this.setState({ redirect: true })
            }
        }
        this.setState({ disabled: false })
    }

    render () {
        const { classes } = this.props;
        // if (this.state.redirect) return (<Redirect to="/assignment-submission"/>)

        const { localStore } = this.state
        const { classrooms } = this.props.classroomReducer
        const { subjects } = this.props.subjectReducer
        const { createState, uploadState } = this.props.assignmentSubmissionReducer
        const { assignment, readState } = this.props.assignmentReducer

        let msg
        const isDisabled = this.state.disabled

        if (createState === 1 && (!this.state.uploadFile || uploadState === 0) && isDisabled)
            msg = 'Creating Assignment Submission'
        else if (createState === 2 && (!this.state.uploadFile) && isDisabled)
            msg = 'Assignment Submission Created'
        else if (createState === 2 && (uploadState === 1) && isDisabled)
            msg = 'Assignment Submission Created, Attachment Uploading'
        else if (createState === 2 && (uploadState === 2) && isDisabled)
            msg = 'Assignment Submission Created, Attachment Uploaded'
        else {
            msg = 'Create Assignment Submission'

        }

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/assignment-submission/assignments',
                    msg: msg
                }}/>
            )
        }

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
                        <NavLink to={'/assignment-submission/assignments'}>
                            <StyledBreadcrumb
                                component="a"
                                label="E-Learning"


                            />
                        </NavLink>

                            <StyledBreadcrumb
                                component="a"
                                label="Assignment"
                                onClick={this.props.history.goBack}


                            />

                        <Typography variant={"inherit"} color="secondary">Submission</Typography>
                        {/*<StyledBreadcrumb*/}
                        {/*    label=""*/}
                        {/*    deleteIcon={<ExpandMoreIcon />}*/}
                        {/*    onClick={this.handleClick()}*/}
                        {/*    onDelete={this.handleClick()}*/}
                        {/*/>*/}
                    </Breadcrumbs>
                    <br/>
                <br/>
                    <div id="outside">
                            <div className='column'>
                                <Paper>
                                    <h2>Assignments</h2>
                                    <form style={{margin:"2%"}} >
                                        <fieldset>


                                            <div>
                                                <label className="FormLabel">Subject</label>
                                                <input type="text" required  className="forminput"

                                                       placeholder={  readState === 2 && assignment.subject.name}
                                                       readOnly={readState === 2 && assignment.subject.name}/>
                                            </div>
                                            <div>
                                                <label className="FormLabel" htmlFor="address-label">Supervisor Name</label>
                                                <input className="FormLabel" type="text" required className="forminput"

                                                       placeholder={  readState === 2 && assignment.teacher.fullName}
                                                       readOnly={readState === 2 && assignment.teacher.fullName}/>
                                            </div>
                                            <div>
                                                <label  className="FormLabel" id="email-label" htmlFor="Email">Assignment Topic</label>
                                                <input className="FormLabel" type="text" required  className="forminput"

                                                       placeholder={  readState === 2 && assignment.topic}
                                                       readOnly={readState === 2 && assignment.topic}/>
                                            </div>
                                            <label className="FormLabel" style={{color:"#2196F3"}} htmlFor="description">Description</label>
                                            <MyInput

                                                me='description'
                                                handler={this.handler.bind(this)}
                                                placeHolder='Description'
                                                className="forminput"/>


                                            <label className="FormLabel" style={{color:"#2196F3"}} htmlFor="file">Select a file to upload</label>
                                            <input  type="file" id='file' onChange={this.newFileSelected}   className="forminput"/>


                                            <button
                                                className="buttonStyle"
                                                type="submit"
                                                disabled={isDisabled}
                                                onClick={this.createAssignmentSubmission.bind(this)}>SUBMIT</button>

                                        </fieldset>
                                    </form>
                                </Paper>
                            </div>
                        <div className='column3'>
                            <TableContainer component={Paper}>
                                <div >
                                    <div className="effect2">

                                        <div id="invoice-top">
                                            <div className="logo" style={{display:"flex", justifyContent:"center", marginLeft:"35%"}}><img
                                                src={logo}
                                                alt="Logo"></img>
                                                <br/>

                                            </div>
                                            <Typography align={'center'} variant={'h6'}>
                                                University of Northamptom
                                            </Typography>


                                        </div>

                                        <div id="invoice-mid">
                                            <h3 style={{display:"flex", justifyContent:"center", fontFamily:"cursive"}}>
                                                {get(assignment, 'topic')} ({get(assignment, 'subject.name')}) </h3>

                                            <h5 style={{display:"flex", justifyContent:"center"}}>
                                                Submitted To: {get(assignment, 'teacher.fullName')} </h5>


                                            <div id="message">
                                                <p>The Assignment of subject #<span
                                                    id="invoice_num">{get(assignment, 'subject.name')}</span> on topic <span
                                                    id="supplier_name">{get(assignment, 'topic')}</span> which is claim to be your own work</p>
                                            </div>

                                            <div className="clearfix">
                                                <div className="col-left">
                                                    <div className="clientlogo"><img
                                                        src="https://cdn3.iconfinder.com/data/icons/daily-sales/512/Sale-card-address-512.png"
                                                        alt="Sup"/>
                                                    </div>
                                                    <div className="clientinfo">
                                                        <h2 id="supplier">{get(assignment, 'topic')}</h2>
                                                        <p><span id="address">page count:  64</span><br></br><span
                                                            id="city">character count: </span></p>
                                                    </div>

                                            </div>
                                            </div>
                                        </div>
                                        <footer>
                                            <div id="legalcopy" className="clearfix">
                                                <p className="col-right">Our mailing address is:
                                                    <span className="email"><a
                                                        href="everestwalk123@gmail.com">everestwalk123@gmail.com</a></span>
                                                </p>
                                            </div>
                                        </footer>
                                    </div>

                                </div>



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
    classroomReducer: state.classroomReducer,
    subjectReducer: state.subjectReducer,
    assignmentSubmissionReducer: state.assignmentSubmissionReducer,
    assignmentReducer: state.assignmentReducer
}))(withStyles(useStyles)(CreateAssignmentSubmission))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAssignmentSubmission, getAssignmentSubmissionAwait, uploadAssignmentSubmission } from '../actions'
import MyInput from 'my-input-react'
import { getUser, isStudent } from '../../utils'
import '../static/css/style.css'
import { getAllClassroom } from '../../Classroom/actions'
import { getAllSubjects } from '../../Subject/actions'
import { Redirect } from 'react-router-dom'
import { getAssignmentAwait } from '../../Assignment/actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'

class ViewAssignmentSubmission extends Component {

    state = {
        loading: true,
        disabled: false
    }

    isStudent = isStudent()

    async componentDidMount () {
        const submission = this.props.match.params.submission
        if (!submission) {
            this.setState({ redirect: true })
            // TODO DO something
            return
        }

        const assignmentSubmissionAwait = await this.props.dispatch(getAssignmentSubmissionAwait(submission))
        if ((assignmentSubmissionAwait.value || undefined) && assignmentSubmissionAwait.value.request.status === 200) {

            const submission = assignmentSubmissionAwait.value.data
            const assignmentAwait = await this.props.dispatch(getAssignmentAwait(submission.assignment._id))
            if ((assignmentAwait.value || undefined) && assignmentAwait.value.request.status === 200) {
                const assignment = assignmentAwait.value.data
                this.setState({ loading: false })
            }
        }

    }

    async uploadAssignmentSubmission () {
        if (this.state.file) {
            this.setState({ disabled: true })
            const submission = this.props.match.params.submission

            const fileData = new FormData()
            fileData.append('file', this.state.file)
            const uploadAssignmentSubmissionRedux = await this.props.dispatch(uploadAssignmentSubmission(submission, fileData))
            if ((uploadAssignmentSubmissionRedux.value || undefined) && uploadAssignmentSubmissionRedux.value.request.status === 200) {
                this.props.dispatch(getAssignmentSubmission(submission))
            }
            this.setState({ disabled: false })
        }
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

    render () {
        const { classes } = this.props;
        // if (this.state.redirect) return (<Redirect to="/assignment-submission"/>)

        const { submission, readState: submissionReadState, uploadState } = this.props.assignmentSubmissionReducer
        const { assignment, readState: assignmentReadState } = this.props.assignmentReducer

        const isDisabled = this.state.disabled

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                <div className="page-content">
                        <h2>View Submission</h2>
                    <Button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</Button>

                    <div className="form">

                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '70%',

                        }}>
                            {
                                this.state.loading &&
                                'Loading'
                            }
                            {
                                !this.state.loading &&
                                <React.Fragment>

                                        <Button variant="contained" color="primary" style={{width:"100%"}}>
                                            Subject: {assignmentReadState === 2 && assignment.subject.name}
                                            &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                            Assignment:{assignmentReadState === 2 && assignment.topic}
                                            &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                           By:{assignmentReadState === 2 && assignment.teacher.fullName}

                                    </Button>


                                    <br/>
                                    <div className="row">

                                        <div className="column">
                                            <div className="card3">
                                                <div className="">
                                                    {
                                                        !submission.link && this.isStudent &&
                                                        <div>
                                                            <label htmlFor="file">Select a file to upload</label>
                                                            <input type="file" id='file' onChange={this.newFileSelected}
                                                                   className="form-control"/>

                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                type="submit"
                                                                disabled={isDisabled}
                                                                onClick={this.uploadAssignmentSubmission.bind(this)}>Upload
                                                            </Button>

                                                        </div>
                                                    }
                                                    {
                                                        !!submission.link &&
                                                        <iframe src={submission.link} width="350" height="475" style={{ marginLeft: '1%' }}/>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        <div className="column" style={{ width: '60%' }}>
                                            <div className="card2" style={{ marginLeft: '40%' }}>
                                                <h1>Basic Information</h1>
                                                <table className="Data">
                                                    <tr>
                                                    </tr>
                                                    <tr>
                                                        <td>Submitted By:</td>
                                                        <td>{submission.student && submission.student.fullName}</td>

                                                    </tr>
                                                    <tr>
                                                        <td>Description</td>
                                                        <td>{submission.description}</td>

                                                    </tr>
                                                    {/*<tr>*/}
                                                    {/*    <td>Description</td>*/}
                                                    {/*    <td>book.description}</td>*/}

                                                    {/*</tr>*/}
                                                    {
                                                        !!submission.link &&
                                                        <tr>
                                                            <td>Download</td>
                                                            <td>
                                                                <a
                                                                    href={submission.link} download> Download Here </a>
                                                            </td>
                                                        </tr>
                                                    }


                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    assignmentSubmissionReducer: state.assignmentSubmissionReducer,
    assignmentReducer: state.assignmentReducer
}))(withStyles(useStyles)(ViewAssignmentSubmission))

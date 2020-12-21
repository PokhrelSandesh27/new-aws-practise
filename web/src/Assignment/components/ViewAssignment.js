import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser, isTeacher } from '../../utils'
import '../static/css/style.css'
import { getAssignment, getAssignmentAwait, uploadAssignment } from '../actions'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Footer from '../../NavBar/components/Footer'
import Box from '@material-ui/core/Box'

class ViewAssignment extends Component {

    state = {
        loading: true,
        disabled: false
    }

    isTeacher = isTeacher()

    async componentDidMount () {
        const assignment = this.props.match.params.assignment
        if (!assignment) {
            this.setState({ redirect: true })
            // TODO DO something
            return
        }

        console.log(getUser())


        const assignmentAwait = await this.props.dispatch(getAssignmentAwait(assignment))
        if ((assignmentAwait.value || undefined) && assignmentAwait.value.request.status === 200) {
            const assignmentR = assignmentAwait.value.data
            this.setState({ loading: false })
        }

    }

    async uploadAssignment () {
        if (this.state.file) {
            this.setState({ disabled: true })
            const assignment = this.props.match.params.assignment

            const fileData = new FormData()
            fileData.append('file', this.state.file)
            const uploadAssignmentRedux = await this.props.dispatch(uploadAssignment(assignment, fileData))
            if ((uploadAssignmentRedux.value || undefined) && uploadAssignmentRedux.value.request.status === 200) {
                this.props.dispatch(getAssignment(assignment))
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

        const { assignment, readState: assignmentReadState } = this.props.assignmentReducer

        const isDisabled = this.state.disabled

        return (

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                <div className="page-content">
                        <h2>View Assignment</h2>
                    <button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</button>
                    <div className="urpForm">
                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '70%'
                        }}>
                            {
                                this.state.loading &&
                                'Loading'
                            }
                            {
                                !this.state.loading &&
                                <React.Fragment>
                                    <div>
                                        <h2>
                                        <label style={{marginLeft:"30%"}}>Subject: {assignmentReadState === 2 && assignment.subject.name}</label>
                                        <label style={{marginLeft:"30%"}}>Assignment:{assignmentReadState === 2 && assignment.topic}</label>
                                        <label style={{marginLeft:"30%"}}>By:{assignmentReadState === 2 && assignment.teacher.fullName}</label>
                                        </h2>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="column">
                                            <div className="card3">
                                                <div className="">
                                                    {
                                                        !assignment.link && this.isTeacher &&
                                                        <div className="form">
                                                            <label htmlFor="file">Select a file to upload</label>
                                                            <input type="file" id='file' onChange={this.newFileSelected}
                                                                   className="form-control"/>

                                                            <button
                                                                className="btn btn-primary btn-lg btn-block mb-4"
                                                                type="submit"
                                                                disabled={isDisabled}
                                                                onClick={this.uploadAssignment.bind(this)}>Upload
                                                            </button>

                                                        </div>
                                                    }
                                                    {
                                                        !!assignment.link &&
                                                        <iframe src={assignment.link} width="650" height="475"/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column" style={{ width: '40%' }}>
                                            <div className="card2" style={{ marginLeft: '40%' }}>

                                                <h1>Basic Information</h1>

                                                <table className="Data">
                                                    <tr>
                                                    </tr>
                                                    <tr>
                                                        <td>Uploaded By:</td>
                                                        <td>{assignmentReadState && assignment.teacher.fullName}</td>

                                                    </tr>
                                                    <tr>
                                                        <td>Topic</td>
                                                        <td>{assignment.topic}</td>

                                                    </tr>
                                                    <tr>
                                                        <td>Description</td>
                                                        <td>{assignment.description}</td>

                                                    </tr>
                                                    {
                                                        !!assignment.link &&
                                                        <tr>
                                                            <td>Download</td>
                                                            <td>
                                                                <a className="navlink"
                                                                    href={assignment.link} download> Download Here </a>
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
                    <Box pt={4}>
                        <Footer/>
                    </Box>
                </Container>
            </main>

        )
    }

}

export default connect(state => ({
    assignmentReducer: state.assignmentReducer
}))(withStyles(useStyles)(ViewAssignment))

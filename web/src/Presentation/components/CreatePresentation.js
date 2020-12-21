import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPresentation, uploadPresentation } from '../actions'
import MyInput from 'my-input-react'
import { getUser } from '../../utils'
import {getClassroomById } from '../../Home/actions'
import { getAllSubjects } from '../../Subject/actions'
import {NavLink, Redirect} from 'react-router-dom'
import presentationReducer from '../reducer'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MyTextField from "../../components/TextField";
import { toast } from 'react-toastify'
import { uploadAssignment } from '../../Assignment/actions'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

toast.configure();

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
class CreatePresentation extends Component {

    state = {
        localStore: {},
        redirect: false,
        disabled: false
    }

    componentDidMount() {
        this.props.dispatch(getAllSubjects())
        this.props.dispatch(getClassroomById(this.props.match.params.id))
    }

    selectChanged = event => {
        const value = event.target.value
        const id = event.target.name
        this.handler(id, value)
    }

    newFileSelected = event => {
        const file = event.target.files[0]
        const id = event.target.id
        this.setState({[id]: file})
    }

    handler = (me, value) => {

        const localStore = {...this.state.localStore}
        localStore[me] = value
        this.setState({localStore})
    }

    createPresentation = async (e) => {

        e.preventDefault()
        const user = getUser()
        const {localStore} = this.state
        const req = {...localStore, classroom: this.props.match.params.id, teacher: user._id}
        // console.log(req)
        // return;
        this.setState({disabled: true})

        const createPresentationRedux = await this.props.dispatch(createPresentation(req))
        if ((createPresentationRedux.value || undefined) && createPresentationRedux.value.request.status === 200) {
            const presentation = createPresentationRedux.value.data

            if (this.state.file) {
                const fileData = new FormData()
                fileData.append('file', this.state.file)
                fileData.append('classroom', presentation.classroom)
                fileData.append('subject', presentation.subject)
                const uploadPresentationRedux = await this.props.dispatch(uploadPresentation(presentation._id, fileData))
                if (uploadPresentationRedux.value.request.status === 200) {
                    this.setState({redirect: true})

                }

            } else {
                this.setState({redirect: true})
            }

        }
        this.setState({disabled: false})
    }

    render() {
        const {classes} = this.props;
        const {localStore} = this.state
        // const { classrooms } = this.props.classroomReducer
        const {subjects} = this.props.subjectReducer
        const {createState, uploadState} = this.props.presentationReducer
        const {classroom} = this.props.classroomReducer

        let msg
        const isDisabled = this.state.disabled

        if (createState === 1 && (!this.state.uploadFile || uploadState === 0) && isDisabled)
            msg = 'Creating Presentation'
        else if (createState === 2 && (!this.state.uploadFile) && isDisabled) {
            msg = 'Presentation Created'
        } else if (createState === 2 && (uploadState === 1) && isDisabled)
            msg = 'Presentation Created, Attachment Uploading'
        else if (createState === 2 && (uploadState === 2) && isDisabled) {
            msg = 'Presentation Created, Attachment Uploaded'
        } else {
            msg = 'Create Presentation'
        }

        if (this.state.redirect) {
            return (<Redirect to={{
                    pathname: '/assignment/list',
                    msg: msg
                }}/>
            )
        }

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
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
                                <NavLink to={'/assignment/list'}>
                                    <StyledBreadcrumb
                                        component="a"
                                        label="E-Learning"

                                    />
                                </NavLink>

                                <StyledBreadcrumb
                                    component="a"
                                    label="Material"
                                    onClick={this.props.history.goBack}

                                />
                                <Typography variant={'inherit'} color={'secondary'}>
                                    Create
                                </Typography>
                            </Breadcrumbs>
                            <br/> <br/>

                        </div>


                        <form className={classes.root} onSubmit={this.createPresentation.bind(this)}>

                            <div className="col-md-8 order-md-2" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                width: '70%',
                                marginLeft: '7%'
                            }}>

                                <div className="mb-3">
                                    <label className="urpLabel">Info for creating Assignment{
                                        classroom &&
                                        ` Classroom :  ${classroom.grade}  ${classroom.section}`


                                    }
                                    </label>
                                </div>
                                <MyTextField id="outlined"
                                             variant="outlined"
                                             me='topic'
                                             handler={this.handler}
                                             label="Topic"/>

                                <MyTextField
                                    select
                                    name="subject"
                                    id="outlined-select-native"
                                    handler={this.selectChanged}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Please select Subject"
                                    variant="outlined"
                                >
                                    {
                                        subjects.map((subject) => {
                                            return (
                                                <option value={subject._id}> {subject.name}
                                                    {subject.label}
                                                </option>
                                            )
                                        })
                                    }
                                </MyTextField>

                                <MyTextField id="outlined"
                                             variant="outlined"
                                             me='description'
                                             handler={this.handler}
                                             label="Description"
                                            />
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<CloudUploadIcon/>}
                                    style={{width: "30%"}}>
                                    Upload File
                                    <input
                                        type="file"
                                        id='file'
                                        onChange={this.newFileSelected}
                                        style={{display: "none"}}
                                    />
                                </Button>

                                <label htmlFor="file" style={{fontSize: "18px"}}>Select a file to upload</label>


                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isDisabled}>Create
                                </Button>
                            </div>
                        </form>
                    </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    subjectReducer: state.subjectReducer,
    presentationReducer: state.presentationReducer
}))(withStyles(useStyles)(CreatePresentation))

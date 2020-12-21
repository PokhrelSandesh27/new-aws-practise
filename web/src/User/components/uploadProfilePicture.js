import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { uploadProfile, getUserById } from '../actions'
import '../static/css/style.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { searchTimeTable } from '../../TimeTable/action'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from "@material-ui/core/Button";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

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
toast.configure()

class uploadProfilePicture extends Component {

    state = {
        localStore: {},
        redirect: false,
        uploadFile: false,

    }

    componentDidMount () {
        const id = this.props.match.params.id
        const localStore = { ...this.state.localStore }
        this.setState({ localStore })
        this.props.dispatch(getUserById(id))
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
    async uploadProfile () {
        const { localStore, file } = this.state

        const formBody = new FormData()
        formBody.append('file', file)

        const userId = this.props.match.params.id

        if (file) {
            this.props.dispatch(uploadProfile(userId, formBody))

            toast.success('Profile Updated')
            const id = this.props.match.params.id //3. update the time
            this.props.dispatch(getUserById(id))

        } else {
            toast.warning('Select Photo')
        }
    }

    render () {
        const { classes } = this.props;
        const { user } = this.props.userReducer


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

                        <Typography variant={'inherit'} color={'secondary'}>
                            Profile
                        </Typography>
                    </Breadcrumbs>
                    <br/> <br/>
                    <div className="row">


                            <div className="column">
                                <div className="card">
                                    <div className="container">

                                        {

                                            !!user.photo ?<Fragment>

                                                <img src={user.photo} />
                                                </Fragment>:<img src="https://c1.staticflickr.com/5/4023/5154094149_8c1345f634.jpg" />

                                        }
                                        <h2><b>{user.fullName}</b></h2>
                                        <p style={{color:"green"}}><b>{user.status}</b></p>
                                        <p>{user.groups}</p>
                                        <p>{user.email}</p>

                                    </div>
                                </div>
                            </div>

                            <div className="column" style={{width:"48%"}}>
                                <div className="card2">
                                    <h1>Basic Information</h1>

                                    <table className="Data">
                                        <tr>
                                        </tr>
                                        <tr>
                                            <td>Username</td>
                                            <td>{user.username}</td>

                                        </tr>
                                        <tr>
                                            <td>Father Name</td>
                                            <td>{user.fatherName}</td>

                                        </tr>
                                        <tr>
                                            <td>Mother Name</td>
                                            <td>{user.motherName}</td>

                                        </tr>
                                        <tr>
                                            <td>Permanent Address</td>
                                            <td>{user.permanentAddress}</td>

                                        </tr>
                                        <tr>
                                            <td>Current Address</td>
                                            <td>{user.currentAddress}</td>

                                        </tr>
                                        <tr>
                                            <td> Status</td>
                                            <td style={{color:"green"}}>{user.status}</td>

                                        </tr>


                                    </table>
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

    userReducer: state.userReducer
}))(withStyles(useStyles)(uploadProfilePicture))

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { uploadProfile, getUserById } from '../actions'
import '../static/css/style.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUser } from '../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import tab from '../../Classroom/components/Tab'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
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

toast.configure()

class ProfileView extends Component {

    state = {
        localStore: {},
        redirect: false,
        uploadFile: false,
        file: '',
        imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
        name:'',
        status:'',
        active: 'edit'

    }

    componentDidMount () {
        const id = getUser()._id;
        const localStore = { ...this.state.localStore }
        this.setState({ localStore })
        this.props.dispatch(getUserById(id))
    }

    newFileSelected = event => {
        const file = event.target.files[0]
        event.preventDefault();
        const reader = new FileReader();
        const id = event.target.id
        reader.onloadend = () => {this.setState({ [id]: file,
            uploadFile: true,
            imagePreviewUrl: reader.result
        })}
        reader.readAsDataURL(file);
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

        const userId = getUser()._id;

        if (file) {
            this.props.dispatch(uploadProfile(userId, formBody))
            toast.success('Profile Updated')
            // const body = this.props.match.params.id //3. update the time
            // this.props.dispatch(getUserById(id))

        } else {
            toast.warning('Select Photo')
        }
    }

    render () {
        const { classes } = this.props;
        const { user } = this.props.userReducer
        const {imagePreviewUrl} = this.state;

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


                        <Typography variant={'inherit'} color={'secondary'}>
                            My Profile
                        </Typography>
                    </Breadcrumbs>
                    <br/> <br/>
                            <div className="column">
                                <Card className="CardInfo" >

                                    <CardContent className ="card-body">



                                        {
                                            !!user.photo ?<Fragment>

                                                <img src={user.photo} />
                                            </Fragment>:
                                            <div className="form" >
                                            {

                                                <Fragment>
                                                    <label className="custom-file-upload ">
                                                    <div className="img wrap img-upload">
                                                    <img htmlFor="file"  src={imagePreviewUrl} style={{height:'100%'}}/>
                                                        </div>
                                                        <br></br>

                                                    <input type="file" id='file' style={{display:"none"}}
                                                           onChange={this.newFileSelected}
                                                           className="form-control"/>

                                                    </label>
                                                    <br></br>



                                                </Fragment>
                                            }



                                            </div>


                                        }
                                        <h2><b>{user.fullName}</b></h2>
                                        <p style={{color:"green"}}><b>{user.status}</b></p>
                                        <p>{user.groups}</p>
                                        <p >{user.email}</p>
                                        <Button variant="contained"
                                            color="primary"
                                                type="submit"
                                            onClick={this.uploadProfile.bind(this)}> Upload
                                        </Button>

                                    </CardContent>

                                </Card>
                            </div>

                    <div className="column3">
                        <Card className="CardIn" >
                                <div className="card2" >
                                    <CardContent className ="card-body" >
                                    <h1 style={{textAlign:'center'}}>Basic Information</h1>
                                        <TableContainer style={{width:"100%"}} component={Paper}>
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
                                            <td>Phone number</td>
                                            <td>{user.phone}</td>

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
                                            <td>Your Status</td>
                                            <td style={{color:"green"}}>{user.status}</td>

                                        </tr>
                                    </TableContainer>
                                    </CardContent>
                                </div>
                        </Card>
                            </div>

                        </div>
                </Container>
            </main>

        )
    }

}

export default connect(state => ({

    userReducer: state.userReducer
}))(withStyles(useStyles)(ProfileView))

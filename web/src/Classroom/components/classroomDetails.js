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
import MyTextField from "../../components/TextField";
import {addClassroom, getAllClassroom} from "../../Home/actions";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {searchTimeTable} from "../../TimeTable/action";
import {getAllUsers} from "../../User/actions";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {NavLink} from "react-router-dom";
import Radium, {StyleRoot} from "radium";
import {bounceInLeft} from "react-animations";
import TextField from "@material-ui/core/TextField";
const stylesBounce = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounceInLeft, 'bounce')
    }
}

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogTitles = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
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


class ClassroomDetails extends Component {

    state = {
        localStore: {},
        showModalState: false,
        scroll:'paper'
    }
    componentDidMount () {
        this.props.dispatch(getAllUsers())
        this.props.dispatch(getAllClassroom())
    }
    openModal= () =>{
        this.setState({ showModalState: true })
    }

    closeModal= () =>{
        this.setState({ showModalState: false })
    }

    handler = (me, value) => {
        const localStore = {...this.state.localStore}
        localStore[me] = value
        this.setState({localStore})
    }
    selectChanged = event => {
        const value = event.target.value
        const id = event.target.name
        this.handler(id, value)
    }

    createClassroom = async (e)=> {
        e.preventDefault()
        const user = getUser()
        const { localStore } = this.state
        const req = { ...localStore}
        try {
            const resp = await this.props.dispatch(addClassroom(req))
            this.props.dispatch(getAllClassroom())
                .then(() => toast.success('classroom created successfully'))
        }catch (e) {
            toast.success('classroom assigned')
        }
    }
    render () {
        const { classes } = this.props;
        const {classrooms,  addState} = this.props.classroomReducer
        const { users } = this.props.userReducer
        const teachers = users.filter(user => user.groups.includes('TEACHER'))

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

                            <StyledBreadcrumb
                                component="a"
                                label="Classroom"

                            />
                            <Typography variant={'inherit'} color={'secondary'}>
                                Details
                            </Typography>
                        </Breadcrumbs>
                        <br/> <br/>
                        <StyleRoot>
                            <div className="test" style={stylesBounce.bounce}>
                        <Tooltip title="Add User" aria-label="add">

                                <Fab color="primary" className={classes.absolute} onClick={this.openModal}>

                                    <AddIcon />

                                </Fab>

                        </Tooltip>
                            </div>
                        </StyleRoot>

                        <div >
                            <h2 className="urpLabel">List Of Classes</h2>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                            <TableCell align="center"><b>Class Teacher</b></TableCell>
                                            <TableCell align="center"><b>Grade</b></TableCell>
                                            <TableCell align="center"><b>Section</b></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {classrooms.map((classroom, i) => {
                                            return (
                                                <TableRow >
                                                    <TableCell align="center">
                                                        {i+1}
                                                    </TableCell>
                                                    <TableCell align="center">{classroom.teacher ? classroom.teacher.fullName || 'NA' : 'NA'}</TableCell>
                                                    <TableCell align="center">{classroom.grade || 'NA'}</TableCell>
                                                    <TableCell align="center">{classroom.section || 'NA'}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>
                    </div>


                    <Dialog  scroll={'paper'}
                             onClose={this.closeModal}
                             aria-labelledby="customized-dialog-title" open={this.state.showModalState}>
                        <DialogTitles id="customized-dialog-title" onClose={this.closeModal}>Create ClassRoom</DialogTitles>
                        <DialogContent>
                            <DialogContentText>
                                To Create Classroom Please fill the form below with ClassTeacher
                            </DialogContentText>
                            <MyTextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                select
                                name="teacher"
                                required
                                id="outlined-select-native"
                                handler={this.selectChanged}
                                label="Class Teacher"
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Please select teacher"
                                >
                                {
                                    teachers.map((teacher) => {
                                            return (
                                                <option
                                                    value={teacher._id}>Name: {teacher.fullName}
                                                </option>
                                            )
                                        }
                                    )
                                }
                            </MyTextField>
                        <br/>

                            <MyTextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                         me='grade'
                                         required
                                         handler={this.handler}
                                         label="Grade"
                                         />

                            <br/>
                            <MyTextField fullWidth
                                         autoFocus
                                         me='section'
                                         handler={this.handler}
                                         label="Section"
                            />



                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeModal} color="primary">
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit">Create
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Container>
            </main>

        )
    }

}

export default connect(state => ({
    classroomReducer: state.classroomReducer,

    userReducer: state.userReducer
}))(withStyles(useStyles)(ClassroomDetails))

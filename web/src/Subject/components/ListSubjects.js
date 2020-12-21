import React, { Component } from 'react'
import {createSubject, getAllSubjects} from '../actions'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { NavLink } from 'react-router-dom'
import'../static/css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Radium, {StyleRoot} from "radium";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {bounceInLeft} from "react-animations";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MyTextField from "../../components/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import MyInput from "my-input-react";
import CircularProgress from "@material-ui/core/CircularProgress";
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
class ListSubject extends Component {

    state = {
        showModalState: false,
        scroll:'paper',
        body: {}
    }


    handler= (me, value)=> {
        const body = { ...this.state.body }  // reading from the state ( by value )
        body[me] = value

        this.setState({ body }) // write to state
    }

    createSub () {
        const { body } = this.state // reading from the state ( by ref )
        this.props.dispatch(createSubject(body))
        this.props.history.push('/subject/list')
    }

    openModal= () =>{
        this.setState({ showModalState: true })
    }

    closeModal= () =>{
        this.setState({ showModalState: false })
    }


    componentDidMount () {
        this.props.dispatch(getAllSubjects())
    }
    createSubjectLink(){
        this.props.history.push("../../subject/create")
    }


    render () {
        const { classes } = this.props;
        const { subjects, fetchState , createState} = this.props.subjectReducer


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
                        Subjects
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>
                <div className="row" style={{ margin: '0% 0% 0% 5%' }}>
                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            <StyleRoot>
                                <div className="test" style={stylesBounce.bounce}>
                                    <Tooltip title="Add User" aria-label="add">

                                        <Fab color="primary" className={classes.absolute} onClick={this.openModal}>
                                            <AddIcon />
                                        </Fab>

                                    </Tooltip>
                                </div>
                            </StyleRoot>

                            {/*<NavLink*/}
                            {/*    to={'../../subject/create'}>*/}
                            {/*    {*/}

                            {/*        <Button  variant="contained" color="primary"*/}
                            {/*            onClick={this.createSubjectLink.bind(this)} >*/}
                            {/*            Add Subjects*/}
                            {/*        </Button>*/}

                            {/*    }*/}
                            {/*</NavLink>*/}
                            {
                                fetchState === 1 &&
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
                                fetchState === 2 &&
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>
                                                <TableCell align="center"><b>Subject</b></TableCell>


                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            { subjects.map((subject, i) => {

                                                return (
                                                    <TableRow >
                                                        <TableCell align="center">
                                                            {i+1}
                                                        </TableCell>
                                                        <TableCell align="center">{get(subject, 'name')}</TableCell>


                                                    </TableRow>
                                                )
                                            })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            }

                            {
                                fetchState === 3 &&
                                <div>Something went wrong</div>
                            }
                        </div>
                    </div>
                </div>
            </div>


                    <Dialog  scroll={'paper'}
                             onClose={this.closeModal}
                             aria-labelledby="customized-dialog-title" open={this.state.showModalState}>
                        <DialogTitles id="customized-dialog-title" onClose={this.closeModal}>Create Subject</DialogTitles>
                        <DialogContent>
                            <DialogContentText>
                                To Create Subject please write Name of subject you want to add..
                            </DialogContentText>


                            <MyTextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                me='name'
                                required
                                handler={this.handler}
                                label="Subject"
                            />

                            <br/>

                            <br/>




                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeModal} color="primary">
                                Cancel
                            </Button>
                            <Button

                                onClick={this.createSub.bind(this)}

                            >
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    subjectReducer: state.subjectReducer
}))(withStyles(useStyles)(ListSubject))

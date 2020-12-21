import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {  getAllUsers } from '../actions'
import "../static/css/style.css"
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import cover from "../../img/black.svg"
import manager from "../../img/manager.svg"
import lib from "../../img/lib.svg"
import account from  "../../img/acc.svg"
import work from  "../../img/work.svg"
import student from "../../img/student.svg"
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { bounce ,bounceInLeft} from 'react-animations';
import Radium, {StyleRoot} from 'radium';
const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounceInLeft, 'bounce')
    }
}


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
class ListClassroom extends Component {
    state = {}

    componentDidMount () {

        this.props.dispatch(getAllUsers())
    }
    createUserLink(){
        this.props.history.push("../../user/create")
    }
    render () {
        const { classes } = this.props;
        const {users} = this.props.userReducer

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
                            label="User"


                        />


                    <Typography variant={'inherit'} color={'secondary'}>
                        List
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>
                <div className="row" >

                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <StyleRoot>

                            <NavLink className = "navlink"
                                     to={{

                                         pathname: `/user/create`,
                                         data: {
                                         }
                                     }}>

                                <Tooltip title="Add User" aria-label="add">
                                    <div className="test" style={styles.bounce}>
                                    <Fab color="primary" className={classes.absolute}>

                                                <AddIcon />

                                    </Fab>
                                    </div>
                                </Tooltip>

                            </NavLink>

                            </StyleRoot>
                            <div className="contin">
                                <Button variant="outlined" color="primary" className="cardBook ">
                                    <section>
                                        <img src={student} style={{width:"105%"}} ></img>
                                        <div style={{paddingTop:"20%"}}>
                                            <h3 className="user-name">STUDENTS</h3>
                                            <span className="user-role">
                                                {
                                                    <NavLink
                                                        className="navlink"
                                                        to={`/user/classroom`}>Details
                                                    </NavLink>}
                                            </span>
                                        </div>
                                    </section>
                                </Button>
                                <Button variant="outlined" color="primary" className="cardBook " style={{marginLeft:"5%"}}>
                                    <section  >
                                        <img src={cover} className='userimg'></img>
                                        <div>
                                            <h3 className="user-name">TEACHERS</h3>
                                            <span className="user-role">
                                                {<NavLink
                                                    className="navlink"
                                                          to={`/user/TeacherDetails`}>
                                                    Details
                                                </NavLink>}
                                            </span>
                                        </div>
                                    </section>
                                </Button>

                                <Button variant="outlined" color="primary" className="cardBook " style={{marginLeft:"5%"}}>
                                    <section>
                                        <img src={manager} className='userimg'></img>
                                        <h3 className="user-name">ADMIN</h3>
                                        <span className="user-role">
                                            {
                                                <NavLink className="navlink"
                                                         to={`/user/ManagemnetDetails`}>
                                                    Details
                                                </NavLink>}
                                        </span>
                                    </section>
                                </Button>

                                <Button variant="outlined" color="primary" className="cardBook " style={{marginLeft:"5%"}}>
                                    <section>
                                        <img src={lib} className='userimg'></img>
                                        <h3 className="user-name">LIBRARIANS</h3>
                                        <span className="user-role">
                                            {<NavLink
                                                className="navlink"
                                                to={`/user/LibrarianDetails`}>
                                                Details
                                            </NavLink>}
                                        </span>
                                    </section>
                                </Button>

                                <Button variant="outlined" color="primary" className="cardBook " style={{marginLeft:"5%"}}>
                                    <section>
                                        <img src={work} className='userimg'></img>
                                        <h3 className="user-name">STAFFS</h3>
                                        <span className="user-role">
                                            {<NavLink className="navlink"
                                                      to={`/user/StaffsDetails`}
                                            >Details
                                            </NavLink>}
                                        </span>
                                    </section>
                                </Button>

                                <Button variant="outlined" color="primary" className="cardBook " style={{marginLeft:"5%"}}>
                                    <section>
                                        <img src={account}  className='userimg'></img>
                                        <div style={{marginTop:"13%"}}>
                                        <h3 className="user-name">ACCOUNTANT</h3>
                                        <span className="user-role">
                                            {<NavLink className="navlink"
                                                      to={`/user/AccountDetails`}>
                                                Details
                                            </NavLink>}
                                        </span>
                                        </div>

                                    </section>
                                </Button>
                            </div>
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
}))(withStyles(useStyles)(ListClassroom))

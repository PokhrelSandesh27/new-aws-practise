import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { getGroups, getUser } from '../../utils'
import { NavLink } from 'react-router-dom'
import { getSubject } from '../../Subject/actions'
import { searchPresentation } from '../actions'
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
import moment from "moment";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CircularProgress from "@material-ui/core/CircularProgress";

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
class ListPresentationStudents extends Component {

    type = this.props.type || 'presentation'

    async componentDidMount () {
        const subject = this.props.subject || this.props.match.params.id
        const query = {}
        const d = getGroups()
        const user = getUser()
        if (d.includes('STUDENT')) {
            query.classroom = user.classroom._id
        }
        query.subject = subject
        this.props.dispatch(searchPresentation(query))
        this.props.dispatch(getSubject(this.subject))
    }

    render () {
        const { classes } = this.props;
        const { presentations ,searchState} = this.props.presentationReducer
        const { subjects } = this.props.subjectReducer

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
                    <Typography variant={"inherit"} color="secondary">Material</Typography>
                    {/*<StyledBreadcrumb*/}
                    {/*    label=""*/}
                    {/*    deleteIcon={<ExpandMoreIcon />}*/}
                    {/*    onClick={this.handleClick()}*/}
                    {/*    onDelete={this.handleClick()}*/}
                    {/*/>*/}
                </Breadcrumbs>
                <br/>
            <br/>

                {searchState===1 &&
                <div>
                    <CircularProgress
                        className={this.props.classes.progressCircle}
                        size={40}
                        left={-20}
                        top={10}
                        status={'loading'}
                        style={{marginLeft: '50%', marginTop: '20%'}}
                        disableShrink/>
                </div>
                }

                {searchState === 2 &&


                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">


                            <ul className="time">
                                {
                                    presentations
                                        .map((presentation, i) => {
                                            const d = moment(presentation.updatedAt);
                                            d.month(); // 1
                                            const date = d.format('MMM DD YYYY');
                                            return (
                                                <li className="event" data-date={date}>
                                                    <h3>Topic: {presentation.topic}</h3>
                                                    <p> Description:
                                                        {presentation.description}

                                                    </p>
                                                    <p>
                                                        {
                                                            (presentation.link) ?
                                                                <a className="navlink" href={presentation.link}
                                                                   target="_blank"
                                                                   download>Download</a> : 'NA'
                                                        }

                                                    </p>
                                                </li>

                                            )
                                        })
                                }
                            </ul>


                        </div>
                    </div>
                </div>
                }
                {
                    searchState===3&&
                        <p>Please check your internet connection</p>
                }

            </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    presentationReducer: state.presentationReducer,
    subjectReducer: state.subjectReducer
}))(withStyles(useStyles)(ListPresentationStudents))

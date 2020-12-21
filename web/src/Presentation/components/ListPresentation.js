import React, { Component } from 'react'
import { searchPresentation } from '../actions'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllSubjects } from '../../Subject/actions'
import { getUser } from '../../utils'
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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
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
class ListPresentation extends Component {

    state = {
        subject: null,
    }

    selectChanged = event => {
        this.setState({
            subject: event.target.value
        })

    }

    componentDidMount () {
        const { _id } = getUser()
        this.props.dispatch(getAllSubjects())

        const req = {
            classroom: this.props.match.params.id,
            teacher: _id
        }
        // this.props.dispatch(getAllSubjects())
        this.props.dispatch(searchPresentation(req))
    }

    render () {
        const { classes } = this.props;
        const { presentations, searchState } = this.props.presentationReducer
        console.log('presentation', presentations)
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
                                View
                            </Typography>
                        </Breadcrumbs>
                        <br/> <br/>

                        <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-primary">

                            <div className="">
                                <select name="subject" id="subject" style={{width:"50%", marginLeft:"15%"}} className="urpSelect"
                                        onChange={this.selectChanged}>
                                    <option value={null} selected>All Subjects</option>
                                    {
                                        subjects.map((subject) => {
                                            return (
                                                <option value={subject._id}> {subject.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <br/> <br/>


                            {/*<TableContainer component={Paper}>*/}
                            {/*    <Table className={classes.table} size="small" aria-label="a dense table">*/}
                            {/*        <TableHead>*/}
                            {/*            <TableRow>*/}
                            {/*                <TableCell align="center"><b>&nbsp; S.N.</b></TableCell>*/}
                            {/*                <TableCell align="center"><b>Topic</b></TableCell>*/}
                            {/*                <TableCell align="center"><b>Description</b></TableCell>*/}
                            {/*                <TableCell align="center"><b>Attachment</b></TableCell>*/}


                            {/*            </TableRow>*/}
                            {/*        </TableHead>*/}
                            {/*        <TableBody>*/}
                            {/*            { searchState === 2 &&*/}
                            {/*            presentations*/}
                            {/*                .map((presentation, i) => {*/}
                            {/*                return (*/}
                            {/*                    <TableRow >*/}
                            {/*                        <TableCell align="center">*/}
                            {/*                            {i+1}*/}
                            {/*                        </TableCell>*/}
                            {/*                        <TableCell align="center">{presentation.topic}</TableCell>*/}
                            {/*                        <TableCell align="center">{presentation.description}</TableCell>*/}
                            {/*                        <TableCell align="center">{(presentation.link) ?*/}
                            {/*                            <a className="navlink" href={presentation.link} target="_blank"*/}
                            {/*                               download>Download</a> : 'NA'}</TableCell>*/}

                            {/*                    </TableRow>*/}
                            {/*                )*/}
                            {/*            })*/}
                            {/*            }*/}
                            {/*        </TableBody>*/}
                            {/*    </Table>*/}
                            {/*</TableContainer>*/}


                            <ul className="time">
                                    { searchState === 2 &&
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
            </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({
    presentationReducer: state.presentationReducer,
    subjectReducer: state.subjectReducer
}))(withStyles(useStyles)(ListPresentation))

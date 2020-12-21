import React, { Component } from 'react'
import { getExams } from '../../Exam/actions'
import { connect } from 'react-redux'
import '../static/css/style.css'
import { NavLink } from 'react-router-dom'
import { getUser } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Card from '@material-ui/core/Card'
import TableContainer from '@material-ui/core/TableContainer'
import {emphasize, Paper} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
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

class ListAllExams extends Component {

    state = {
        type: null
    }

    componentDidMount () {
        this.setState({ type : this.props.type || 'list'})
        const { _id } = getUser()
        this.props.dispatch(getExams())
    }
    AddMarks(){
        this.props.history.push("../../marksheets/create")
    }
    createReport(){
        this.props.history.push("../../../examreport/list")
    }

    render () {
        const { classes } = this.props;
        const { exams } = this.props.examReducer

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

                    <Typography variant={'inherit'} color={'secondary'}>
                        Exams
                    </Typography>
                </Breadcrumbs>
                <br/> <br/>
                <div className="row">

                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <NavLink className = "navlink"
                                     to={{

                                         pathname: `/exam/create`,
                                         data: {
                                         }
                                     }}>
                            <Tooltip title="Add" aria-label="add">
                                <Fab color="primary" className={classes.absolute}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                            </NavLink>
                            <Grid container spacing={3}>
                            {
                                        exams &&
                                        exams.map((exam, i) => {
                                            return (
                                                <Grid item xs={6}>
                                                    <Card className={classes.root}>
                                                        <CardActionArea>

                                                            <CardContent>
                                                                <Typography gutterBottom color={'secondary'} variant="h5" component="h2">
                                                                    {exam.name|| 'NA'}
                                                                </Typography>
                                                                <Typography variant="body2" color="primary" component="p">
                                                                    {exam.startDate|| 'NA'}&nbsp; - &nbsp;{exam.endDate|| 'NA'}
                                                                    <br/>
                                                                    Exam Type : {exam.type|| 'NA'}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions style={{float:"right"}}>

                                                                <NavLink className="navlink" to={`/marksheets/${this.state.type}/exam/${exam._id}`}>
                                                                    <Button size="small" variant={'contained'} > Results</Button>
                                                                </NavLink>
                                                            <NavLink className="navlink" to={`/examreport/${this.state.type}/exam/${exam._id}`}>
                                                                    <Button size="small" variant={'contained'} > Report</Button>
                                                                </NavLink>
                                                                <NavLink className="navlink" to={`/examdetails/list/exam/${exam._id}`}>
                                                                    <Button size="small" variant={'contained'} >Exam</Button>
                                                            </NavLink>

                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            )
                                        })
                                    }

                            </Grid>


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
    examReducer: state.examReducer,
}))(withStyles(useStyles)(ListAllExams))

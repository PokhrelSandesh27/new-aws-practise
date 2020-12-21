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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

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
                                Results
                            </Typography>
                        </Breadcrumbs>
                        <br/> <br/>
                        <div className="row">

                            <div className="col-md-6">
                                <div className="panel panel-primary">
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
                                                                <Button size="small" variant={'contained'} color="primary">
                                                                    Results
                                                                </Button>
                                                                </NavLink>
                                                                <NavLink className="navlink"  to={`/examreport/${this.state.type}/exam/${exam._id}`}>
                                                                <Button size="small" variant={'contained'}  color="default">
                                                                    Report
                                                                </Button>
                                                                </NavLink>
                                                            </CardActions>
                                                        </Card>

                                                    </Grid>





                                                // <div className='container'>
                                                //     <div className='card flex-row open' >
                                                //         <TableContainer component={Paper}>
                                                //             <div>
                                                //                 <FontAwesomeIcon
                                                //                     icon={faBookOpen}
                                                //                     style={
                                                //                         {
                                                //                             width:"5.5%",
                                                //                             height:"5.1%"
                                                //                         }}/>
                                                //                 <div className='flex-column grade' style={{padding:"1px"}}>
                                                //                     <div className='gradeTitle' style={{color:"dimgrey", fontSize:"1.2em"}}>{exam.name|| 'NA'}</div>
                                                //                     <div className='author'style={{color:"darkgrey", fontSize:"1.2em"}}>{exam.startDate|| 'NA'}&nbsp; - &nbsp;{exam.endDate|| 'NA'} </div>
                                                //
                                                //                 </div>
                                                //                 <div className='flex-column grade' style={{padding:"1px"}}>
                                                //                     <div className='gradeTitle' style={{color:"darkgrey"}}>Exam Type : {exam.type|| 'NA'}</div>
                                                //
                                                //                 </div>
                                                //                 <div className='flex-column garde' style={{padding:"1px"}}>
                                                //                     <NavLink className="navlink" to={`/marksheets/${this.state.type}/exam/${exam._id}`}>
                                                //                          <Button variant="contained" color="#ffffff">Results </Button>
                                                //                     </NavLink>
                                                //
                                                //                         &nbsp;  &nbsp;   &nbsp;
                                                //                     <NavLink className="navlink" to={`/examreport/${this.state.type}/exam/${exam._id}`}>
                                                //                         <Button variant="outlined">Report</Button>
                                                //                     </NavLink>
                                                //
                                                //                 </div>
                                                //
                                                //             </div>
                                                //         </TableContainer>
                                                //     </div>
                                                // </div>
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

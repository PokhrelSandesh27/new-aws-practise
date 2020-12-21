import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';
import {NavLink} from 'react-router-dom'
import Container from "@material-ui/core/Container";
import { withStyles } from '@material-ui/core/styles';
 import {useStyles} from '../../../UseStyles'
import { connect } from 'react-redux'
import Button from "@material-ui/core/Button";
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
const state = {
    labels:['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Attendance',
            backgroundColor: [
                '#E8EAF6',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4',
                '#FFD248',


                '#1A237E',
                '#FFEC00',
                '#18EBFF',
                '#FFBBF5',
                '#6CFF2A'
            ],
            hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F',
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#B21F00',
                '#C9DE00',
                '#2FDE00'
            ],
            data: [30, 30, 30, 30, 30, 30,30,30,30,30,30,30]
        }
    ]
}
class AttendancePiChart extends Component {
    render() {
        const {classes} = this.props;
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
                            <NavLink to={'/home/homepage'}>
                                <StyledBreadcrumb
                                    component="a"
                                    label="Home"
                                    icon={<HomeIcon fontSize="small" />}

                                />
                            </NavLink>
                            <Typography variant={"inherit"} color="secondary">Attendance</Typography>
                            {/*<StyledBreadcrumb*/}
                            {/*    label=""*/}
                            {/*    deleteIcon={<ExpandMoreIcon />}*/}
                            {/*    onClick={this.handleClick()}*/}
                            {/*    onDelete={this.handleClick()}*/}
                            {/*/>*/}
                        </Breadcrumbs>


                        <div className='column4'>
                            <Pie
                             data={state}

                                 options={{
                                   title:{
                                       display:true,
                                       text:'Attendance chart',
                                       fontSize:18,

                                   },
                        legend:{
                            display:true,
                            position:'right',
                            fontSize: 20,

                        }
                    }}
                />
                            <div >
                                <NavLink to={`/attendance/view/student`}>
                                    <Button variant="contained" size={'small'}
                                            style={{backgroundColor:"rgb(252,153,142)",  marginLeft:"19%", marginTop:"12%"}}>
                                        check Details
                                    </Button>
                                </NavLink>
                            </div>
                        </div>

                    </div>
                </Container>
            </main>

        );
    }
}
export default connect(state => ({
     paymentReducer: state.paymentReducer,
    classroomReducer: state.classroomReducer,
}))(withStyles(useStyles)(AttendancePiChart))

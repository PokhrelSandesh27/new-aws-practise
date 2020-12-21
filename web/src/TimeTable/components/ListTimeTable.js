import React, { Component } from 'react'
import "../static/css/style.css"
import { connect } from 'react-redux'
import {  searchTimeTable } from '../action'
import { get } from 'lodash'
import moment from 'moment'
import { getAllSlot } from '../../Slot/action'
import { faEnvelope, faHome, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import {  faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import { Paper } from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import Tooltip from "@material-ui/core/Tooltip";


class ListTimeTable extends Component {
    state = {

    }


    componentDidMount () {
        const body = {
            classroom: this.props.match.params.id
        }
        this.props.dispatch(getAllSlot())
        this.props.dispatch(searchTimeTable(body))
    }
    getSubject(timetable, slotId) {
        const entry = timetable.find(t => get(t, 'slot._id') === slotId)
        return get(entry, 'subject.name')
    }
    createSub (timetable, slotId) {
        const entry = timetable.find(t => get(t, 'slot._id') === slotId)
        const id = get(entry, '_id')
        this.props.history.push('/timetable/video/'+ id)
    }


    render () {
        const { classes } = this.props;
        const { timetables, serchState } = this.props.timetableReducer
        const { slots, fetchState: slotFetchState } = this.props.slotReducer
        const sundayTimeTable = timetables.filter(t => t.day === 'Sunday')
        const mondayTimeTable = timetables.filter(t => t.day === 'Monday')
        const tuesTimeTable = timetables.filter(t => t.day === 'Tuesday')
        const wednTimeTable = timetables.filter(t => t.day === 'Wednesday')
        const thrusTimeTable = timetables.filter(t => t.day === 'Thursday')
        const friTimeTable = timetables.filter(t => t.day === 'Friday')
        const saturday = timetables.filter(t => t.day === 'Saturday')

        // console.log('start time', slotTime)
        console.log('log sunday', sundayTimeTable)

        console.log('log timetables', timetables)

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
            <div className="page-content">

                    <h2>List of the Time table.</h2>

                <div className="row" >
                    <Button onClick={this.props.history.goBack}
                            style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                    >⬅ Go back</Button>


                            {
                                serchState === 1 &&
                                <div>
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        style={
                                            {
                                                width:"10.5%",
                                                height:"10.1%",
                                                margin: "27%",
                                                marginLeft:"40%"
                                            }}/>
                                </div>
                            }
                            {


                                 serchState===  2 &&
                                 <TableContainer component={Paper}>
                                <table class="assingmentTable">

                                    <thead>
                                        <tr>
                                            <th>Time/Period</th>
                                            <th>Sunday</th>
                                            <th>Monday</th>
                                            <th>Tuesday</th>
                                            <th>Wednesday</th>
                                            <th>Thursday</th>
                                            <th>Friday</th>
                                            <th>saturday</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        slots.map((period, index) => {
                                             return (

                                                 <tr>

                                                     <td>{moment(period.startTime, "Hmm").format("h:mm")}-{moment(period.endTime, "Hmm").format("HH:mm")}</td>


                                                     <td className="navlink" style={{color:"black"}} onClick={this.getSubject(sundayTimeTable, period._id) ? this.createSub.bind(this, sundayTimeTable, period._id) :''}>
                                                         {this.getSubject(sundayTimeTable, period._id)}
                                                     </td>
                                                     <td className="navlink"  style={{color:"black"}} onClick={this.getSubject(mondayTimeTable, period._id) ? this.createSub.bind(this, mondayTimeTable, period._id) :''}>
                                                         {this.getSubject(mondayTimeTable, period._id)}
                                                     </td>
                                                     <td  className="navlink" style={{color:"black"}} onClick={this.getSubject(tuesTimeTable, period._id) ? this.createSub.bind(this, tuesTimeTable, period._id) :''}>
                                                         {this.getSubject(tuesTimeTable, period._id)}
                                                     </td >
                                                     <td  className="navlink" style={{color:"black"}}  onClick={this.getSubject(wednTimeTable, period._id) ? this.createSub.bind(this, wednTimeTable, period._id) :''}>
                                                         {this.getSubject(wednTimeTable, period._id)}
                                                     </td>
                                                     <td className="navlink" style={{color:"black"}} onClick={this.getSubject(thrusTimeTable, period._id) ? this.createSub.bind(this, thrusTimeTable, period._id) :''}>
                                                         {this.getSubject(thrusTimeTable, period._id)}
                                                     </td>
                                                     <td className="navlink" style={{color:"black"}} onClick={this.getSubject(friTimeTable, period._id) ? this.createSub.bind(this, friTimeTable, period._id) :''} >
                                                         {this.getSubject(friTimeTable, period._id)}
                                                     </td>
                                                     <td className="navlink" style={{color:"black"}} onClick={this.getSubject(saturday, period._id) ? this.createSub.bind(this, saturday, period._id) :''} >
                                                         {this.getSubject(saturday, period._id)}
                                                     </td>

                                                 </tr>
                                             )
                                        })
                                    }
                                    </tbody>

                                </table>
                                 </TableContainer>
                            }

                            {
                                serchState === 3 &&
                                <div>Something went wrong</div>
                            }
                </div>
            </div>
                </Container>
            </main>
        )

    }

}
export default connect(state => ({
    slotReducer:state.slotReducer,
    timetableReducer: state.timetableReducer

}))(withStyles(useStyles)(ListTimeTable))

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import { connect } from 'react-redux'
import moment from 'moment'
import { searchEvent } from '../actions'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import CreateEvent from './Popup/CreateEvent'
import { StyleWrapper } from '../../styleWrapper'
import { getGroups, isManagement } from '../../utils'
import { getAllUsers } from '../../User/actions'
import Card from "@material-ui/core/Card";

class EventCalender extends Component {

    state = {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        create: {
            start: new Date(),
            end: new Date(),
            key: 0
        },
        showCreateEvent: false,
    }

    componentDidMount () {
        this.refreshList()
        const create = this.state.create
        create.start.setHours(0)
        create.start.setMinutes(0)
        create.end.setHours(23)
        create.end.setMinutes(59)
        this.setState({ create })
    }

    refreshList (data = {}) {
        const { month, year } = this.state
        const req = { startYear: year, startMonth: month, endYear: year, endMonth: month, ...data }
        this.props.dispatch(searchEvent(req))
    }

    loadEvents = (args) => {
        const month = parseInt((args.end.getMonth() + 1 + args.start.getMonth() + 1) / 2)
        const year = args.end.getFullYear()
        const req = { startYear: year, startMonth: month, endYear: year, endMonth: month }
        this.setState({ month, year })
        this.refreshList(req)
    }

    toEventsList (eventsList) {
        return eventsList.map(event => {
            return {
                id: event._id,
                allDay: true,
                title: event.title,
                start: moment(`${event.startYear}/${event.startMonth}/${event.startDate}`, 'YYYY/MM/DD').format('YYYY-MM-DD'),
                end: moment(`${event.endYear}/${event.endMonth}/${event.endDate}`, 'YYYY/MM/DD').add(1, 'days').format('YYYY-MM-DD')
                // We need to use moment because we need the leading zeros on date and month
                // Also we need to add a day as the full calender takes endDate as exclusive
            }
        })
    }

    handleDateClick = (arg) => {
        console.log('i hit here')
        const { create } = this.state
        const month = arg.date.getMonth()
        const date = arg.date.getDate()
        const year = arg.date.getFullYear()
        const Eventgroup = getGroups()
        console.log(Eventgroup, "groups")
        if(Eventgroup.includes('MANAGEMENT')){
            console.log('And  hit here as mgmt')
            create.start.setFullYear(year, month, date)
            create.end.setFullYear(year, month, date)
            create.key++
            this.setState({ showCreateEvent: true, create })
        }
        else{
            this.setState({ showCreateEvent: false})
        }




    }

    hideCreateEvent = (lastEvent = {}) => {
        if (lastEvent.hasOwnProperty('_id')) {
            this.refreshList()
        }
        this.setState({ showCreateEvent: false })
    }

    render () {
        const { events: a } = this.props.eventReducer
        const events = this.toEventsList(a)


        // TODO This only shows the events that falls under the current month

        return (
            <Card>
                {
                    this.state.showCreateEvent &&
                    <CreateEvent key={`createEvent-${this.state.create.key}`} showModal={this.state.showCreateEvent}
                                 init={this.state.create}
                                 closeModal={this.hideCreateEvent}/>
                }

                <FullCalendar

                    dateClick={
                        this.handleDateClick.bind()
                    }
                    plugins={[dayGridPlugin, interactionPlugin]}
                    datesSet={this.loadEvents}
                    events={events}

                />

            </Card>
        )
    }
}

export default connect(state => ({

    eventReducer: state.eventReducer,
}))(withStyles(useStyles)(EventCalender))

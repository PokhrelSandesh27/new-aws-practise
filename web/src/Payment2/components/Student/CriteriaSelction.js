import React from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { TextField } from '@material-ui/core'
import {getUser} from '../../../utils'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const DatePickerInput = (label, { value, onClick }) => <TextField onClick={onClick}
                                                                  value={value}
                                                                  form={'non-existing-form'}
                                                                  label={label}
                                                                  style={{ width: "100%", padding:"10px"}}
                                                                  variant="filled"/>

const StartDate = e => DatePickerInput('Start Date', e)
const EndDate = e => DatePickerInput('End Date', e)

class CriteriaSelcetion extends React.Component {

    state = {
        localStore: {
            startDate: moment().subtract(2, 'M').toDate(),
            endDate: new Date(),
            user: getUser()._id,
        },
    }

    timeout = null

    changed = (data = {}) => this.props.onChanged({ ...this.state.localStore, ...data })

    updateLocalStore = (key, value) => {
        const { localStore } = this.state
        localStore[key] = value
        this.setState({ localStore })
        this.changed({ [key]: value })
    }

    dateChanged = date => {
        this.updateLocalStore('endDate', date)
    }

    render () {
        const { classes } = this.props
        return (
            <div>
                <Grid container spacing={3} sm={12} style={{width:"100%" }}>
                    <Grid item  sm={6} style={{width:"100%"}}>
                <DatePicker
                    style={{width:"100%"}}
                    selected={this.state.localStore.startDate}
                    onChange={date => this.updateLocalStore('startDate', date)}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    customInput={<StartDate/>}
                />
                    </Grid>
                    <Grid item  sm={6} style={{width:"100%"}}>
                <DatePicker
                    style={{width:"100%"}}
                    selected={this.state.localStore.endDate}
                    onChange={date => this.dateChanged(date)}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    maxDate={new Date()}
                    customInput={<EndDate/>}
                />
                    </Grid>
            </Grid>
            </div>
        )
    }

}

export default connect(state => ({
    classroomReducer: state.classroomReducer,
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(CriteriaSelcetion))


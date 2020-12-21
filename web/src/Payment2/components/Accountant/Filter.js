import React from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'
import { clearSearch, searchStudent } from '../../../Student/actions'
import { cleanObject } from '../../../utils'
import { get } from 'lodash'
import { getAllClassroom } from '../../../Classroom/actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import moment from 'moment'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { ArrowDropDown, ArrowDropDownCircle } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// TODO Extract this functional component so that we can use it on other date picker as well
const DatePickerInput = (label, { value, onClick }) => <TextField onClick={onClick}
                                                                  value={value}
                                                                  form={'non-existing-form'}
                                                                  label={label}
                                                                  variant="filled"

style={{ width: "100%"}}/>

const StartDate = e => DatePickerInput('Start Date', e)
const EndDate = e => DatePickerInput('End Date', e)

class Filter extends React.Component {

    state = {
        localStore: {
            startDate: moment().subtract(2, 'M').toDate(),
            endDate: new Date(),
            user: null,
            // classroom: null,
        },
        classroomStore: {
            classroom: -1,
        }
    }

    timeout = null

    changed = (data = {}) => this.props.onChanged({ ...this.state.localStore, ...data })

    updateLocalStore = (key, value) => {
        const { localStore } = this.state
        localStore[key] = value
        this.setState({ localStore })
        this.changed({ [key]: value })
    }

    updateClassroomStore = (key, value) => {
        const { classroomStore, localStore } = this.state
        classroomStore[key] = value
        localStore.user = null
        this.setState({ classroomStore, localStore })
        if (classroomStore.classroom !== -1)
            this.updateStudent({ [key]: value })
        else
            this.props.dispatch(clearSearch())
        this.changed({ user: null })
    }

    updateStudent = (data = {}) => {
        const { classroomStore } = this.state
        const req = { ...classroomStore, ...data }
        req.classroom = get(classroomStore, 'classroom._id', null)
        this.props.dispatch(searchStudent(cleanObject(req)))
    }

    dateChanged = date => {
        this.updateLocalStore('endDate', date)
    }

    inputChanged = (e, value, reason) => {
        const { classroom } = this.state.classroomStore
        if (this.timeout) clearTimeout(this.timeout)
        if (classroom !== -1) return
        if (reason === 'input' && value.length > 1) {
            this.timeout = setTimeout(() => this.updateStudent({ username: ''/*value*/ }), 300)
            return
        }
        // if the reason is not input and the value is less than one, empty the previous results
        this.props.dispatch(clearSearch())
    }

    studentChangedSimple = (e) => this.updateLocalStore('user', e.target.value)
    studentChanged = (e, option) => this.updateLocalStore('user', option)
    // classroomChanged = (e, option) => this.updateClassroomStore('classroom', option)
    classroomChanged = (e) => this.updateClassroomStore('classroom', e.target.value)

    getOptionLabel = option => {
        if (!option) return ''
        const user = option.student
        return `${user.fullName} (${user.username})`
    }

    getOptionLabelClassroom = (option) => {
        if (!option) return ''
        return `${option.grade} ${option.section}`
    }

    componentDidMount () {
        // this.props.dispatch(searchStudent({}))
        this.props.dispatch(getAllClassroom())
        this.changed()
    }

    render () {
        const { students, fetchState: studentSearch } = this.props.studentReducer
        const { classrooms } = this.props.classroomReducer
        const { classes } = this.props
        return (


                <Grid container spacing={3} sm={12} style={{width:"100%" , marginLeft:"3%"}}>
                    <Grid item  sm={3} style={{width:"100%"}}>
                        <FormControl variant="outlined" className={classes.formControl}
                                     style={{ marginTop: '1%', width:"100%"}}>
                                <InputLabel id="classroom-select-outlined-label">Classroom</InputLabel>
                                <Select
                                    labelId="classroom-select-outlined-label"
                                    id="classroom-select-outlined"
                                    label={'Classroom'}
                                    value={this.state.classroomStore.classroom}
                                    onChange={this.classroomChanged}>
                                    <MenuItem aria-label="None" value={-1}>All Classrooms</MenuItem>
                                    {
                                        classrooms.map(classroom =>
                                            <MenuItem value={classroom}>{`${classroom.grade} ${classroom.section}`}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>

                    </Grid>
                    <Grid item  sm={3} style={{width:"100%"}}>
                        {
                            this.state.classroomStore.classroom === -1 &&

                            <Autocomplete
                                id="student_suggestion"
                                freeSolo
                                key={this.state.classroomStore.classroom || 'unique-classroom-id'}
                                options={students}
                                value={this.state.localStore.user}
                                style={{ marginTop: '1%'}}
                                getOptionLabel={this.getOptionLabel}
                                onChange={this.studentChanged}
                                onInputChange={this.inputChanged}
                                loading={studentSearch === 1}
                                renderInput={(params) => <TextField {...params} form={'non-existing-form'}
                                                                    label="All Students"
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        endAdornment: (
                                                                            <React.Fragment>
                                                                                {studentSearch === 1 ? <CircularProgress
                                                                                    color="inherit"
                                                                                    size={20}/> : null}
                                                                                {params.InputProps.endAdornment}
                                                                            </React.Fragment>
                                                                        ),
                                                                    }}
                                />}
                            />
                        }
                        {
                            this.state.classroomStore.classroom !== -1 &&
                            <React.Fragment>
                                <FormControl variant="outlined" className={classes.formControl}
                                             style={{ marginTop: '1%', width:"100%"}}>
                                    <InputLabel id="user-select-outlined-label"
                                                style={{width:"100%"}}>
                                        {`Student ${studentSearch === 1 ? '(Loading..)' : ''}`}
                                    </InputLabel>
                                    <Select
                                        labelId="user-select-outlined-label"
                                        id="user-select-outlined"
                                        style={{width:"100%"}}
                                        label={`Student ${studentSearch === 1 ? '(Loading..)' : ''}`}
                                        value={this.state.localStore.user}
                                        onChange={this.studentChangedSimple}>
                                        {
                                            students.map(student =>
                                                <MenuItem value={student}>
                                                    {`${student.student.fullName}(${student.student.username})`}
                                                </MenuItem>
                                            )
                                        }
                                        {
                                            students.length === 0 &&
                                            <MenuItem
                                                value={-1} disabled>No students found.
                                            </MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                            </React.Fragment>
                        }
                    </Grid>
                    <Grid item  sm={3} style={{width:"100%"}}>

                        <DatePicker
                            style={{width:"100%"}}
                            selected={this.state.localStore.startDate}
                            onChange={date => this.updateLocalStore('startDate', date)}
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            customInput={<StartDate/>}
                        />
                    </Grid>
                    <Grid item  sm={3} style={{width:"100%"}}>
                        <DatePicker
                            selected={this.state.localStore.endDate}
                            onChange={date => this.dateChanged(date)}
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            maxDate={new Date()}
                            customInput={<EndDate/>}
                        />
                    </Grid>

                {/*<Autocomplete*/}
                {/*    id="classroom_suggestion"*/}
                {/*    options={classrooms}*/}
                {/*    style={{ marginTop: '1%', flexGrow: 1 }}*/}
                {/*    getOptionLabel={this.getOptionLabelClassroom}*/}
                {/*    onChange={this.classroomChanged}*/}
                {/*    renderInput={(params) => <TextField {...params} form={'non-existing-form'}*/}
                {/*                                        label="Classroom"*/}
                {/*                                        variant="outlined"/>}*/}
                {/*/>*/}



        </Grid>
        )
    }

}

export default connect(state => ({
    // paymentReducer: state.paymentReducer,
    // paymentConfigurationReducer: state.paymentConfigurationReducer,
    // scholarshipConfigurationReducer: state.scholarshipConfigurationReducer,
    classroomReducer: state.classroomReducer,
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(Filter))


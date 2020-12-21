import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import Button from '@material-ui/core/Button'
import MyTextField from '../../../components/TextField'
import { customStyles, kCategory } from '../../konstants'
import { connect } from 'react-redux'
import { createEventAwait } from '../../actions'
import { createInformationAwait } from '../../../Information/actions'
import { getUser } from '../../../utils'
import { get } from 'lodash'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DateTimePicker from '../DateTimePicker'
import moment from 'moment'
import { getDate } from '../../utils'

Modal.setAppElement('#root')
toast.configure()

class CreateEvent extends Component {

    state = {
        isCreating: false,
        information: {
            'category': kCategory
        },
        event: {},
        hasEventDetails: false

    }

    componentDidMount () {
        const { information } = this.state
        const start = moment(this.props.init.start)
        const end = moment(this.props.init.end)

        const event = { ...getDate(start, 'start'), ...getDate(end, 'end') }
        information.validDate = start.format('YYYY-MM-DD')
        this.setState({ event, information })

    }

    handler = (type, me, value) => this.setState({ [type]: { ...this.state[type], [me]: value } })
    handlerEvent = (me, value) => this.handler('event', me, value)
    handlerInformation = (me, value) => this.handler('information', me, value)
    hasEventsDetailsHandleChange = (e) => this.setState({ hasEventDetails: !this.state.hasEventDetails })

    dateChanged = (date, name) => {
        const { event, information } = this.state
        if (name === 'start')
            information.validDate = moment(date.startTime).format('YYYY-MM-DD')
        this.setState({ ...this.state, information, event: { ...event, ...date } })
    }

    create = async (e) => {
        this.setState({ isCreating: true })
        e.preventDefault()
        const { event, information, hasEventDetails } = this.state
        if (hasEventDetails) {
            const { _id: notifier } = getUser()
            const resInfo = await this.props.dispatch(createInformationAwait({ ...information, notifier }))
            const statusInfo = get(resInfo, 'value.request.status', get(resInfo, 'response.status'))
            if (statusInfo === 200) {
                event.information = get(resInfo, 'value.data._id')
            } else if (statusInfo === 400) {
                toast.warning(get(resInfo, 'response.data'))
                this.setState({ isCreating: false })
                return
            } else {
                toast.error(get(resInfo, 'response.data', 'An error occurred.'))
                this.setState({ isCreating: false })
                return
            }
        }

        const resEvent = await this.props.dispatch(createEventAwait(event))
        const statusEvent = get(resEvent, 'value.request.status', get(resEvent, 'response.status'))
        if (statusEvent === 200) {
            toast.success('Event Added.')
            this.setState({
                information: { 'category': kCategory },
                hasEventDetails: false,
                event: {},
                isCreating: false
            })
            this.props.closeModal(get(resEvent, 'value.data'))
            return
            // TODO Refactor this
        } else if (statusEvent === 400) {
            toast.warning(get(resEvent, 'response.data'))
        } else {
            toast.error(get(resEvent, 'response.data', 'An error occurred.'))
        }
        this.setState({ isCreating: false })
    }

    render () {
        const { classes, init } = this.props
        return (
            <React.Fragment>
                <Modal
                    isOpen={true}
                    onRequestClose={!this.state.isCreating ? this.props.closeModal : () => {}}
                    shouldCloseOnOverlayClick={false}
                    style={customStyles}
                    contentLabel="Example Modal">

                    <h1 style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'skyblue' }}>Add New
                        Event</h1>
                    <hr/>

                    <div className="col-6" style={{ display: 'flex', justifyContent: 'center' }}>

                        <form id={'createEventForm'} className={classes.root} onSubmit={this.create}
                              style={{ width: '100%' }}>
                            <div className="col-md-8 order-md-2" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}>
                                <MyTextField id="filled"
                                             variant="filled"
                                             me='title'
                                             handler={this.handlerEvent}
                                             defaultValue="Title "
                                             label={'Title'}/>
                                <DateTimePicker onChange={this.dateChanged} name={'start'}
                                                datetime={init.start}/>
                                <DateTimePicker onChange={this.dateChanged} name={'end'} datetime={init.end}/>
                                <FormControlLabel
                                    control={<Checkbox checked={this.state.hasEventDetails}
                                                       onChange={this.hasEventsDetailsHandleChange}
                                                       name="hasMoreDetails"/>}
                                    label="Add more details"
                                />

                                {
                                    this.state.hasEventDetails &&
                                    <React.Fragment>
                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     disabled={!this.state.hasEventDetails}
                                                     me='summary'
                                                     handler={this.handlerInformation}
                                                     label="Summary"/>


                                        <MyTextField id="filled"
                                                     variant="filled"
                                                     me='description'
                                                     disabled={!this.state.hasEventDetails}
                                                     handler={this.handlerInformation}
                                                     label="Description"/>


                                        {/*<MyTextField id="filled"*/}
                                        {/*             variant="filled"*/}
                                        {/*             me='validDate'*/}
                                        {/*             disabled={!this.state.hasEventDetails}*/}
                                        {/*             handler={this.handlerInformation}*/}
                                        {/*             type="date"*/}
                                        {/*             defaultValue="2017-05-24"*/}
                                        {/*/>*/}
                                    </React.Fragment>
                                }

                            </div>

                        </form>

                    </div>
                    <br>
                    </br>

                    <div className="row">
                        <div className="col-6" style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="Darkgrey" className="close"
                                    onClick={!this.state.isCreating ? this.props.closeModal : () => {}}>Cancel
                            </Button>
                            <Button form={'createEventForm'} disabled={this.state.isCreating} type={'submit'}
                                    variant="contained" color="primary" className="Create"
                                    style={{ marginLeft: '2%' }}>{this.state.isCreating ? 'Publishing' : 'Publish'}
                            </Button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

export default connect(state => ({
    informationReducer: state.informationReducer,
}))(withStyles(useStyles)(CreateEvent))

import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { Autocomplete } from '@material-ui/lab'
import { TextField, withStyles } from '@material-ui/core'
import MyTextField from '../../../components/TextField'
import Button from '@material-ui/core/Button'
import { useStyles } from '../../../UseStyles'
import { getUser, isManagement } from '../../../utils'
import { searchUser } from '../../../User/actions'
import { searchStudent } from '../../../Student/actions'
import { defaultParent } from '../../constants'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { createMessageAwait } from '../../actions'

Modal.setAppElement('#root')
toast.configure()

const customStyles = {
    content: {
        height: '50%',
        top: '25%',
        left: '35%',
        right: '25%',
        bottom: '25%',
        backgroundImage: 'linear-gradient(-180deg, skyblue, white)',
        boxShadow: '0 4px 8px 0',
        color: 'ghostwhite'
    }
}

class Composer extends React.Component {

    state = {
        isSending: false,
        localStore: {
            // parent: defaultParent,
        }
    }

    isManagement = isManagement()

    _function = this.isManagement ? searchUser : searchStudent

    componentDidMount () {
        this.props.dispatch(this._function({}))
    }

    closeModal = () => {
        this.props.hideModal(false)
    }

    sendMessage = async (e) => {
        e.preventDefault()
        const { _id: sender } = getUser()
        const req = { ...this.state.localStore, sender }
        this.setState({ isSending: true })
        const res = await this.props.dispatch(createMessageAwait(req))
        const status = get(res, 'value.request.status', get(res, 'response.status'))
        if (status === 200) {
            toast.info('Message Sent')
            this.setState({ localStore: {  }, isSending: false })
            this.props.hideModal(true)
            return;
        } else if (status === 400) {
            toast.warning(get(res, 'response.data'))
        } else {
            toast.error(get(res, 'response.data', 'An error occurred.'))
        }
        this.setState({ isSending: false })
    }

    // The student path is for the accounts other than of the management.
    getUser = (option) => get(option, 'student', option)

    receiverChanged = (e, option) => this.handler('receiver', get(this.getUser(option), '_id', ''))

    handler = (me, value) =>
    {
        this.setState({ localStore: { ...this.state.localStore, [me]: value } })
    }

    getOptionLabel = (option) => {
        if (!option) return ''
        const user = this.getUser(option)
        return `${user.fullName}-${user.groups[0]}`
    }

    render () {
        const classes = this.props.classes
        const { users } = this.props.userReducer
        const { students } = this.props.studentReducer
        const options = this.isManagement ? users : students
        return (
            <Modal
                isOpen={this.props.showModal}
                onRequestClose={!this.state.isSending ? this.closeModal : () => {}}
                shouldCloseOnOverlayClick={false}
                style={customStyles}
                contentLabel="Compose a message">

                <h1 style={{ backgroundColor: '#2F4F4F', color: 'white' }}>COMPOSE</h1>
                <hr/>

                <div className="col-6" style={{ display: 'flex' }}>
                    <form className={classes.root} onSubmit={this.sendMessage}
                          style={{ width: '100%' }}>
                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: '2%'
                        }}>
                            {/*<Autocomplete*/}
                            {/*    id="suggestion"*/}
                            {/*    options={options}*/}
                            {/*    getOptionLabel={this.getOptionLabel}*/}
                            {/*    onChange={this.receiverChanged}*/}
                            {/*    renderInput={(params) => <TextField {...params} form={'non-existing-form'}*/}
                            {/*                                        label="Groups"*/}
                            {/*                                        variant="outlined"/>}*/}
                            {/*/>*/}


                            <Autocomplete
                                id="suggestion"
                                options={options}
                                style={{marginTop:"1%"}}
                                getOptionLabel={this.getOptionLabel}
                                onChange={this.receiverChanged}
                                renderInput={(params) => <TextField {...params} form={'non-existing-form'}
                                                                    label="Type Name to search"
                                                                    variant="outlined"/>}
                            />

                            <MyTextField id="outlined"
                                         variant="outlined"
                                         me='content'
                                         handler={this.handler}
                                         label="Message"
                            />
                        </div>
                    </form>
                </div>
                <br>
                </br>

                <div className="row">
                    <div className="col-6" style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <Button variant="contained" color="Darkgrey" disable className="close" onClick={this.closeModal.bind(this)}>+Attachment</Button> */}

                        <Button variant="contained" color="primary" className="Create"
                                style={{ marginLeft: '2%' }}
                                type={'submit'}
                                onClick={this.sendMessage}
                                disabled={this.state.isSending}
                        >{this.state.isSending ? 'Sending' : 'Send'}</Button>
                        &nbsp;

                        <Button variant="text" color="primary" style={{ backgroundColor: '#DCDCDC' }}
                                onClick={!this.state.isSending ? this.closeModal : () => {}}>cancel</Button>
                    </div>
                </div>
            </Modal>

        )
    }
}

export default connect(state => ({
    userReducer: state.userReducer,
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(Composer))

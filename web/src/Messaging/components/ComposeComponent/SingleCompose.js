import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserDetail from '../UserDetail'
import MessageBox from '../MessageBox'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const customStyles = {
    content: {
        top: '25%',
        left: '25%',
        right: '25%',
        bottom: '25%',
        backgroundImage: 'linear-gradient(-180deg, skyblue, white)',
        color: 'ghostwhite'
    }
}

class Compose extends Component {

    onCompletion = (status, message) => {
        this.props.onCompletion(status, message)
    }

    groupChanged = e => {
        const currentValue = e.target.value
        const { options } = this.state
        options.group = currentValue
        this.setState({
            options
        })
        this.updateList(options)
    }

    render () {

        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={() => this.onCompletion(false, {})}
                style={customStyles}
                contentLabel="Compose Single"
            >
                {
                    this.props.receiver &&
                    <React.Fragment>
                        <h1 style={{display:"flex", justifyContent:"center"}}>Reply</h1>
                        <hr></hr>
                        <UserDetail receiver={this.props.receiver}/>
                        <MessageBox receiver={this.props.receiver} parent={this.props.parent} onMessageSent={this.onCompletion.bind(this)}/>
                    </React.Fragment>
                }

            </Modal>

        )
    }
}

export default connect(state => ({
    classroomReducer: state.classroomReducer
}))(Compose)

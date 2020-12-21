import React, {Component} from "react";
import {getUser} from "../../../utils";
import {searchMessages} from "../../actions";
import moment from "moment";
import Button from "@material-ui/core/Button";

class inboxMessage extends Component{

    state = {
        compose: {
            status: false,
            receiver: null
        }
    }

    componentDidMount () {
        this.reloadMsg()
    }

    composeAMessage (receiver) {
        this.openModal()
        this.setState({
            compose: {
                status: true,
                receiver: receiver

            }
        })
    }
    openModal () {
        this.setState({ showModalState: true })
    }

    closeModal () {
        this.setState({ showModalState: false })
    }
    messageComposed = (message, status) => {
        this.setState({
            compose: {
                status: false,
                receiver: null,
            }
        })
    }

    reloadMsg = () => {
        const user = getUser()
        const role = !!this.props.sender ? 'sender' : 'receiver'
        // console.log({
        //     [role]: user._id,
        // })
        this.props.dispatch(searchMessages({
            [role]: user._id,
        }))
    }

    render () {
        const { messages, fetchState } = this.props.messagingReducer
        const role = this.props.sender ? 'sender' : 'receiver'
        return(
            <React.Fragment>
            {

                messages.reverse()
                    .map((message, i) => {
                        return (

                            <tr className="unread">
                                <td className="inbox-small-cells">
                                    <input type="checkbox" className="mail-checkbox"/>
                                </td>
                                <td className="inbox-small-cells"><i className="fa fa-star"></i></td>
                                <td className="view-message dont-show">{message[role].fullName}</td>
                                <td className="view-message">{message.content}</td>
                                <td className="view-message inbox-small-cells"></td>
                                <td className="view-message text-right">{moment(message.createdAt).fromNow()}</td>
                                <Button variant="contained" color="primary"  style={{marginLeft:"57%"}}
                                        onClick={() => {this.composeAMessage(message[role])}}>
                                    Reply
                                </Button>
                            </tr>
                        )


                    })
            }
            </React.Fragment>



        )
    }

}
export default inboxMessage

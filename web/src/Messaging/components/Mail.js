import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { updateMessages } from '../utils'
import { getUserById, getUserByIdAwait } from '../../User/actions'
import { mailViewType } from '../constants'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify'
import Composer from './NewTem/Composer'

toast.configure()

class Mail extends Component {

    state = {
        receiver: null,
        composerModal: false
    }

    messageSent = () => {

    }

    receiverChanged = (receiver) => {
        this.props.dispatch(updateMessages(receiver))
        this.setState({ receiver })
        // TODO This only changes the URL itself
        // history.push(`/messaging/${receiver._id}`)
    }

    async componentDidMount () {
        const receiver = this.props.match.params.id || null
        // if (!!receiver) {
        //     const userReducer = await this.props.dispatch(getUserByIdAwait(receiver))
        //     if ((userReducer.value || undefined) && userReducer.value.request.status === 200) {
        //         this.setState({
        //             receiver: userReducer.value.data
        //         })
        //     }
        // }
    }

    composerOpen = () => {
        this.setState({ composerModal: true })
    }

    composerClose = (e, status) => {
        this.setState({ composerModal: false })
        if (status) {

        }
    }

    render () {
        const Content = (!!this.props.content) ? this.props.content : this.props.children
        const { classes } = this.props

        return (

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Messages</h2>
                        <div className="row">
                            <Button onClick={this.props.history.goBack}
                                    style={{ marginLeft: '1%', backgroundColor: '#f0f1f6', color: 'green' }}
                            >⬅ Go back
                            </Button>
                            <br></br>

                            <div className="col-md-6">
                                <div className="panel panel-primary">
                                    <div className="mailbox">
                                        <div className="nav">
                                            <a onClick={this.composerOpen}
                                               className={this.props.mailViewType === mailViewType.COMPOSE}
                                               style={{ cursor: 'pointer' }}>
                                                Compose
                                            </a>
                                            <NavLink to={'/messaging/inbox'}
                                                     className={this.props.mailViewType === mailViewType.RECEIVED}>Inbox</NavLink>
                                            <NavLink to={'/messaging/sent'}
                                                     className={this.props.mailViewType === mailViewType.SEND}>Sent</NavLink>
                                        </div>
                                        <div className="messages">
                                            {
                                                Content
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Composer showModal={this.state.composerModal} hideModal={this.composerClose}/>

                </Container>
            </main>
        )
    }
}

export default connect(state => ({}))(withStyles(useStyles)(Mail))

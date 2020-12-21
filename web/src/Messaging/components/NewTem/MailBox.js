import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { useStyles } from '../../../UseStyles'
import '../../static/css/NewMailBox.css'
import inbox from './InboxMessage'
import NavMail from './Nav'

class MailBox extends Component {

    render () {
        const classes = this.props
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Messages</h2>
                        <div className="contaMail">
                            <div className="mail-box"><NavMail/></div>
                        </div>
                    </div>
                </Container>
            </main>

        )
    }

}

export default connect(state => ({}))(withStyles(useStyles)(MailBox))

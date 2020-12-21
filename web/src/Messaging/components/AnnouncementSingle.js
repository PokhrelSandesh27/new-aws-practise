import React, { Component } from 'react'
import Announcement from './Announcement'

export default class AnnouncementSingle extends Component {

    render () {
        return (
            <Announcement {...this.props}/>
        )
    }
}


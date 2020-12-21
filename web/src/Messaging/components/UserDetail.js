import React, { Component } from 'react'

const imagePreviewUrl = 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true'

export default class UserDetail extends Component {

    render () {
        const user = this.props.receiver
        console.info(user)
        return (
            <div style={{fontSize:"18px", color:'green'}}>
                {/*<img src={user.photo || imagePreviewUrl} alt={user.profile} width="50px" height="50px"/>*/}
                {user.fullName}<span>{user.groups}</span>
            </div>
        )
    }
}

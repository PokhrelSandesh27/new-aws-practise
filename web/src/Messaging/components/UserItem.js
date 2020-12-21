import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { getAllUsers } from '../../User/actions'
import '../static/css/style.css'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core'
import { useStyles } from '../../UseStyles'

class Layout extends Component {

    state = {}

    onChanged = () => {
        this.props.onChanged(this.props.user)
    }

    componentDidMount () {
    }

    render () {

        const isActive = this.props.isActive || false
        const user = this.props.user
        const{classes}= this.props

        return (
            // <NavLink to={`/messaging/${user._id}`}>
            <li key={user._id}
                className={isActive ? 'active  user-item' : 'user-item'}
                onClick={this.onChanged.bind(this)}
                style={{display:" block ruby"}}
            >
               <img src={user.photo} className="avatar"/>
                {user.fullName}
                <Divider className={classes.root} variant="inset" component="li" />

            </li>
            // </NavLink>
        )
    }
}

export default connect(state => ({
    userReducer: state.userReducer
}))(withStyles(useStyles)(Layout))

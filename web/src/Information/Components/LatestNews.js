import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { searchInformation } from '../actions'
import moment from 'moment'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import Table from '@material-ui/core/Table'
import { kCategory } from '../konstants'

class LatestNews extends Component {

    componentDidMount () {
        const { latest } = this.props
        if (!latest)
            this.props.dispatch(searchInformation({ 'category': kCategory }))
    }

    render () {
        const { latest } = this.props
        const isPreloaded = !!latest
        const { informations: infos, searchState } = this.props.informationReducer
        const { classes } = this.props
        const informations = isPreloaded ? latest : infos

        const start = isPreloaded ? 0 : 1

        return (
            <Card style={{ backgroundColor: '#050664', height: '20%' }}>
                <CardContent>
                    <label style={{ fontSize: '18px', marginLeft: '25%', color: 'white' }}><b>LATEST
                        NEWS</b></label>

                </CardContent>
                <hr></hr>
                {
                    (searchState === 2 || isPreloaded) &&
                    informations.slice(start, start + 3).map(item => (
                        <CardContent>
                            <label style={{ fontSize: '15px' }}><FontAwesomeIcon
                                icon={faPaperclip}
                                style={{ marginLeft: '5%', color: 'grey' }}/><p
                                style={{ marginLeft: '5%', color: 'white' }}>{item.summary}</p>
                                <p className="noticeTitle"
                                   style={{
                                       color: 'white',
                                       marginLeft: '29%'
                                   }}>{moment(item.validDate).format('LL')}</p>
                            </label>
                        </CardContent>
                    ))
                }
                {
                    (searchState === 1) &&
                    <span>Loading</span>
                }
            </Card>
        )
    }
}

export default connect(state => ({
    informationReducer: state.informationReducer,
}))(withStyles(useStyles)(LatestNews))

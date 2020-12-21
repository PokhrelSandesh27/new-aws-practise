import React from 'react'
import { Input } from '@material-ui/core'
import moment from 'moment'
import { getDate } from '../utils'

const css = {
    'display': 'inline-flex',
    'align-items': 'center',
    // 'background-color': '#fff',
    // 'border': '4px solid darkturquoise',
    'border-radius': '8px'
}

export default class DateTimePicker extends React.Component {

    state = {
        datetime: moment(this.props.datetime)
    }

    date = e => {
        const date = e.target.value.split('-')
        this.update({ y: date[0], M: date[1] - 1, D: date[2] })
    }

    time = e => {
        const date = e.target.value.split(':')
        this.update({ h: date[0], m: date[1] })

    }

    update = data => {
        const { onChange } = this.props
        const { datetime } = this.state
        datetime.set(data)
        this.setState({ datetime })
        onChange(getDate(datetime, this.props.name), this.props.name)
    }

    render () {
        const { datetime } = this.state
        return (
            <div style={css}>
                <Input type="date" onChange={this.date} value={datetime.format('YYYY-MM-DD')}/>
                <span/>
                <Input type="time" onChange={this.time} value={datetime.format('HH:mm')}/>
            </div>
        )
    }

}

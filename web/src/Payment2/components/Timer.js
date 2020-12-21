import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import { confirmAlert } from "react-confirm-alert"
import momentDurationFormatSetup from "moment-duration-format";
import moment from 'moment'
import { QuestionGroups } from './QuetsionGroup'


class Timer extends Component {

    constructor(props) {
        super(props);

        let fixDate = moment(props.endTime).format("DD MMM YYYY hh:mm:ss") ;

        console.log(fixDate , 'fixdate')
        let DateTime = (new Date()).setHours(15,0,0); // for 3:00:00 pm
        let currDate = moment(new Date()).format("DD MMM YYYY hh:mm:ss") ;
        console.log(currDate, "currentdate")
        let diff =moment(fixDate).diff(currDate);
        console.log(diff,"difference")
        let d = moment.duration(diff);
        console.log(d,"value of d")
        this.state = { fixDate, diff: d };


    }


    tick() {
        let currDate = moment(new Date()).format("DD MMM YYYY hh:mm:ss") ;
        let diff =moment(this.state.fixDate).diff(currDate);
        let d = moment.duration(diff);
        this.setState({
            diff: d
        });
    }
    componentDidMount() {

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    render() {
        const { diff } = this.state;
        return (
            <div>
                { !this.props.isComplete?
                <h3>Time: {diff.hours()}:{diff.minutes()}:{diff.seconds()}</h3>:
                    <h3>Time:0:0:0</h3>


                }

            </div>
        );
    }
}
export default connect(state => ({
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(Timer))

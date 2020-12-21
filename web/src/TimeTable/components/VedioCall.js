import React, { Component } from 'react'
import Jitsi from 'react-jitsi'
import { getUser } from '../../utils'
import { getMeetingById } from '../../Meeting/actions'
import { getTimeTableById, searchTimeTable } from '../action'
import { connect } from 'react-redux'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Button from '@material-ui/core/Button'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {NavLink} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip)

const interfaceConfig = {
    LANG_DETECTION: false,
    lang: 'en',
    APP_NAME: 'ams',
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    HIDE_INVITE_MORE_HEADER: true,
    MOBILE_APP_PROMO: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
    TOOLBAR_BUTTONS: [
        'desktop',
        'microphone',
        'camera',
        'fullscreen',
        'fodeviceselection',
        'hangup',
        'profile',
        'chat',
        'settings',
        'videoquality',
        'tileview',
        'download',
        'help',
        'mute-everyone'
        // 'security'
    ]
}

const
    config = {
        defaultLanguage: 'es',
        prejoinPageEnabled: false,
        desktopSharingChromeDisabled: false,
        desktopSharingFirefoxDisabled: false
    }

class VideoCall extends Component {

    componentDidMount () {
        console.log('this.props', this.props.match.params.id)
        const id = this.props.match.params.id
        this.props.dispatch(getTimeTableById(id))
    }

    api = null

    handleAPI = (JitsiMeetAPI) => {
        JitsiMeetAPI.executeCommand('toggleVideo')
        // this.api = JitsiMeetAPI
    }

    // toggleScreenShare = () => {
    //     this.api.executeCommand('toggleShareScreen')
    // }

    //const { timetable, fetchState } = this.props.timetableReducer

    render () {
        const { classes } = this.props
        const { timetable, fetchState } = this.props.timetableReducer
        console.log('id', timetable)
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>

                    <div className="page-content">

                        {fetchState === 1 &&
                            <div>
                                <CircularProgress
                                    className={classes.progressCircle}
                                    size={40}
                                    left={-20}
                                    top={10}
                                    status={'loading'}
                                    style={{marginLeft: '50%', marginTop:'20%'}}
                                    disableShrink />
                            </div>

                        }
                        <Breadcrumbs aria-label="breadcrumb"
                                     style={{float: 'right'}}>
                            <StyledBreadcrumb onClick={this.props.history.goBack}
                                              component="a"
                                              label="Back"
                                              icon={<ArrowBackIosIcon fontSize="small" />}>

                            </StyledBreadcrumb>
                            <NavLink to={'/home/homepage'}>
                                <StyledBreadcrumb
                                    component="a"
                                    label="Home"
                                    icon={<HomeIcon fontSize="small" />}

                                />
                            </NavLink>
                            <NavLink to={'/timetable/student/classroom'}>
                                <StyledBreadcrumb
                                    component="a"
                                    href="#"
                                    label="Schedule"

                                />
                            </NavLink>

                            <Typography variant={"inherit"} color="secondary">Video call</Typography>

                        </Breadcrumbs>
                        {fetchState === 3 && <div> No Meeting Link is Provided...</div>}
                        {

                            fetchState === 2 &&

                            <div>

                                {/*<h4 className="mb-3">Submissions List for</h4>*/}
                                {/* TODO Create a separate component for the following details*/}
                                {/*<Button onClick={this.toggleScreenShare}>Screen Sharing</Button>*/}
                                <Button variant="contained" style={{ width: '100%' }} color="primary">
                                    {
                                        `Classroom :${timetable.classroom.grade}${timetable.classroom.section}`

                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {

                                        `Teacher : ${timetable.teacher.fullName}`
                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {

                                        `Subject : ${timetable.subject.name}`
                                    }
                                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    {

                                        `Period : ${timetable.slot.name}`
                                    }
                                </Button>

                                <Jitsi
                                    domain="meet.jit.si"
                                    onAPILoad={this.handleAPI}
                                    roomName={timetable.link} // link -> read from X
                                    displayName={getUser().fullName} // username
                                    interfaceConfig={interfaceConfig}
                                    config={config}
                                    frameStyle={{ width: '1010px' }}

                                />
                            </div>
                        }
                    </div>
                </Container>
            </main>
        )
    }
}

export default connect(state => ({

    timetableReducer: state.timetableReducer
}))(withStyles(useStyles)(VideoCall))


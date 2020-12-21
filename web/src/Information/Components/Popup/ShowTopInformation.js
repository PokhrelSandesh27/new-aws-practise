import React, { Component } from 'react'
// import '../static/css/style.css'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import Button from '@material-ui/core/Button'
import { customStyles, kCategory, ModalStyle } from '../../konstants'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { searchInformation } from '../../actions'
import moment from 'moment'
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
Modal.setAppElement('#root')
toast.configure()

class ShowTopInformation extends Component {

    refresh = () => {
        this.props.dispatch(searchInformation({ 'category': kCategory }))
    }

    render () {
        const { informations, searchState } = this.props.informationReducer
        const { classes } = this.props

        return (


            <Dialog fullScreen open={this.props.showModal} onClose={this.props.closeModal} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.props.closeModal} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h5" className={classes.title} style={{display:"flex", justifyContent:"center"}}>
                            Notice Board
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={this.props.closeModal} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    {
                        searchState === 2 &&
                        informations.map(item => (
                            <ListItem button>
                                <ListItemText
                                    primary={item.summary}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary">
                                                {item.description}
                                            </Typography>
                                            <Typography color={'primary'} >
                                                {get(item, 'notifier.fullName', 'NA')}
                                            </Typography>
                                            <Typography color={'secondary'} style={{float:"right"}}>
                                                Date: {moment(item.validDate).format('LL')}
                                            </Typography>
                                        </React.Fragment>}>
                                </ListItemText>
                                <Divider />
                            </ListItem>
                        ))
                    }
                </List>
            </Dialog>
















            // <Modal
            //     isOpen={this.props.showModal}
            //     onAfterOpen={this.refresh}
            //     onRequestClose={this.props.closeModal}
            //     style={ModalStyle}
            //     contentLabel="Example Modal">
            //
            //     <h1 style={{ display: 'flex', justifyContent: 'center' }}>Notice Board</h1>
            //
            //     <h5 style={{ display: 'flex', justifyContent: 'center' }}></h5>
            //
            //
            //     <div className="col-6" style={{ display: 'flex', justifyContent: 'center' }}>
            //
            //         <ul className="noticebord">
            //             {
            //                 searchState === 2 &&
            //                 informations.map(item => (
            //                     <li className="event">
            //                         <h3>{item.summary}</h3>
            //                         <p>{item.description}</p>
            //                         <p>
            //                             By: {get(item, 'notifier.fullName', 'NA')} Date: {moment(item.validDate).format('LL')}
            //                         </p>
            //                     </li>
            //                 ))
            //             }
            //             {
            //                 searchState === 1 &&
            //                 <span>Loading</span>
            //             }
            //         </ul>
            //     </div>
            //     <br>
            //     </br>
            //     <div className="row">
            //         <div className="col-6" style={{ display: 'flex', justifyContent: 'center' }}>
            //             <Button variant="contained" color="Darkgrey" className="close"
            //                     onClick={this.props.closeModal}>Close</Button>
            //         </div>
            //     </div>
            // </Modal>

        )
    }
}

export default connect(state => ({
    informationReducer: state.informationReducer,
}))(withStyles(useStyles)(ShowTopInformation))

import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import { render } from "react-dom";
import Modal from 'react-modal'

// import  Modal  from "react-responsive-modal";
import { toast } from 'react-toastify'
import Button from '@material-ui/core/Button'
import MyTextField from '../../../components/TextField'
import { customStyles, kCategory } from '../../konstants'
import { connect } from 'react-redux'
import { createInformation, createInformationAwait } from '../../actions'
import { getUser } from '../../../utils'
import { get } from 'lodash'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Container from '@material-ui/core/Container'
import DialogContentText from "@material-ui/core/DialogContentText";


Modal.setAppElement('#root')
toast.configure()


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogTitles = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
class CreateInformation extends Component {

    state = {
        isPosting: false,
        localStore: {
            'category': kCategory
        }
    }

    handler = (me, value) => this.setState({ localStore: { ...this.state.localStore, [me]: value } })

    createInfo = async (e) => {
        this.setState({ isPosting: true })
        e.preventDefault()
        const { _id: notifier } = getUser()
        const req = { ...this.state.localStore, notifier }

        const res = await this.props.dispatch(createInformationAwait(req))
        const status = get(res, 'value.request.status', get(res, 'response.status'))
        if (status === 200) {
            toast.info('Notice published')
            this.setState({ localStore: { 'category': kCategory }, isPosting: false })
            this.props.closeModal(true)
            return
        } else if (status === 400) {
            toast.warning(get(res, 'response.data'))
        } else {
            toast.error(get(res, 'response.data', 'An error occurred.'))
        }
        this.setState({ isPosting: false })
    }
    //
    //
    // closeModal= () =>{
    //     this.setState({ showModalState: false })
    // }


    render () {
        const { classes } = this.props
        return (

            // <Dialog
            //     id={'createInformationForm'}
            //     scroll={'paper'}
            //          onClose={this.closeModal}
            //          aria-labelledby="customized-dialog-title" open={this.state.showModalState}>
            //     <DialogTitles id="customized-dialog-title" onClose={this.closeModal}>Create ClassRoom</DialogTitles>
            //     <DialogContent>
            //         <DialogContentText>
            //             To Create Classroom Please fill the form below with ClassTeacher
            //         </DialogContentText>
            //
            //         <MyTextField id="filled"
            //                      variant="filled"
            //
            //                      me='summary'
            //                      handler={this.handler}
            //                      label="Summary"/>
            //
            //
            //         <MyTextField id="filled"
            //                      variant="filled"
            //                      me='description'
            //                      handler={this.handler}
            //                      label="Description"/>
            //
            //
            //         <MyTextField id="filled"
            //                      variant="filled"
            //                      me='validDate'
            //                      handler={this.handler}
            //                      type="date"
            //                      defaultValue="2017-05-24"
            //         />
            //
            //
            //     </DialogContent>
            //     <DialogActions>
            //         <Button onClick={!this.state.isPosting ? this.props.closeModal : () => {}} color="primary">
            //             Cancel
            //         </Button>
            //         <Button
            //
            //             form={'createInformationForm'} disabled={this.state.isPosting} type={'submit'}
            //             variant="contained"
            //             color="primary"
            //             onSubmit={this.createInfo}
            //             >{this.state.isPosting ? 'Publishing' : 'Publish'}
            //         </Button
            //             >
            //     </DialogActions>
            // </Dialog>



            <Modal
                isOpen={this.props.showModal}
                onRequestClose={!this.state.isPosting ? this.props.closeModal : () => {}}
                shouldCloseOnOverlayClick={false}
                style={customStyles}
                contentLabel="Example Modal">

                <h1 style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'skyblue' }}>Notice Board</h1>
                <hr/>

                <div className="col-6" style={{ display: 'flex', justifyContent: 'center' }}>

                    <form id={'createInformationForm'} className={classes.root} onSubmit={this.createInfo}
                          style={{ width: '100%' }}>
                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            flexDirection: 'column',

                        }}>
                            <MyTextField id="filled"
                                         variant="filled"

                                         me='summary'
                                         handler={this.handler}
                                         label="Summary"/>


                            <MyTextField id="filled"
                                         variant="filled"
                                         me='description'
                                         handler={this.handler}
                                         label="Description"/>


                            <MyTextField id="filled"
                                         variant="filled"
                                         me='validDate'
                                         handler={this.handler}
                                         type="date"
                                         defaultValue="2017-05-24"
                            />

                        </div>

                    </form>

                </div>
                <br>
                </br>

                <div className="row">
                    <div className="col-6" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="Darkgrey" className="close"
                                onClick={!this.state.isPosting ? this.props.closeModal : () => {}}>Cancel</Button>

                        <Button form={'createInformationForm'} disabled={this.state.isPosting} type={'submit'}
                                variant="contained" color="primary" className="Create"
                                style={{ marginLeft: '2%' }}>{this.state.isPosting ? 'Publishing' : 'Publish'}</Button>

                    </div>
                </div>
            </Modal>


        )
    }
}

export default connect(state => ({
    informationReducer: state.informationReducer,
}))(withStyles(useStyles)(CreateInformation))

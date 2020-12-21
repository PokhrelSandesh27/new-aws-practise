import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {mailViewType} from "../../constants";
import inbox from "./InboxMessage";
import {updateMessages} from "../../utils";
import {getUserByIdAwait} from "../../../User/actions";
import Container from "@material-ui/core/Container";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {useStyles} from "../../../UseStyles";



class NavMail extends Component{

    state = {
        receiver: null
    }

    messageSent = () => {

    }

    receiverChanged = (receiver) => {
        this.props.dispatch(updateMessages(receiver))
        this.setState({ receiver })
        // TODO This only changes the URL itself
        // history.push(`/messaging/${receiver._id}`)
    }

    async componentDidMount () {
        const receiver = this.props.match.params.id || null
        if (!!receiver) {
            const userReducer = await this.props.dispatch(getUserByIdAwait(receiver))
            if ((userReducer.value || undefined) && userReducer.value.request.status === 200) {
                this.setState({
                    receiver: userReducer.value.data
                })
            }
        }
    }

    render() {
        const Content = (!!this.props.content) ? this.props.content : this.props.children
        const{classes}= this.props
        return(
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Messages</h2>
                        <div className="contaMail">
                            <div className="mail-box">
            <aside className="sm-side">
                <div className="user-head">
                    <a className="inbox-avatar" href="javascript:;">
                        <img width="64" hieght="60"
                             src="https://bootsnipp.com/img/avatars/ebeb306fd7ec11ab68cbcaa34282158bd80361a7.jpg"/>
                    </a>
                    <div className="user-name">
                        <h5><a href="#">Alireza Zare</a></h5>
                        <span><a href="#">Info.Ali.Pci@Gmail.com</a></span>
                    </div>
                    <a className="mail-dropdown pull-right" href="javascript:;">
                        <i className="fa fa-chevron-down"></i>
                    </a>
                </div>
                <div className="inbox-body">
                    <a href="#myModal" data-toggle="modal" title="Compose" className="btn btn-compose">
                        Compose
                    </a>

                    <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabIndex="-1"
                         id="myModal" className="modal fade" style={{display: "none"}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button aria-hidden="true" data-dismiss="modal" className="close"
                                            type="button">×
                                    </button>
                                    <h4 className="modal-title">Compose</h4>
                                </div>
                                <div className="modal-body">
                                    <form role="form" className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-lg-2 control-label">To</label>
                                            <div className="col-lg-10">
                                                <input type="text" placeholder="" id="inputEmail1"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-2 control-label">Cc / Bcc</label>
                                            <div className="col-lg-10">
                                                <input type="text" placeholder="" id="cc"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-2 control-label">Subject</label>
                                            <div className="col-lg-10">
                                                <input type="text" placeholder="" id="inputPassword1"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-lg-2 control-label">Message</label>
                                            <div className="col-lg-10">
                                                        <textarea rows="10" cols="30" className="form-control" id=""
                                                                  name=""></textarea>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-lg-offset-2 col-lg-10">
                      <span className="btn green fileinput-button">
                                                        <i className="fa fa-plus fa fa-white"></i>
                                                        <span>Attachment</span>
                      <input type="file" name="files[]" multiple=""/>
                      </span>
                                                <button className="btn btn-send" type="submit">Send</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <ul className="inbox-nav inbox-divider">
                    <li className="active">
                        <NavLink to={'/messaging/inbox'}
                                 className={this.props.mailViewType === mailViewType.RECEIVED}>
                             Inbox</NavLink>

                    </li>
                    <li>
                        <NavLink to={'/messaging/sent'}
                                 className={this.props.mailViewType === mailViewType.SEND}>
                             Sent Mail</NavLink>

                    </li>

                </ul>
                 <div>

                </div>

            </aside>

                <aside className="lg-side">
                    <div className="inbox-head">
                        <h3>Inbox</h3>
                        <form action="#" className="pull-right position">
                            <div className="input-append">
                                <input type="text" className="sr-input" placeholder="Search Mail"/>
                                <button className="btn sr-btn" type="button"><i className="fa fa-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="inbox-body">

                        <table className="table table-inbox table-hover">
                            <tbody>

                            {
                                Content
                            }
                            </tbody>
                        </table>
                    </div>
                </aside>
                            </div>
                            </div>
                            </div>
                </Container>
            </main>

        )
    }

}

export default connect(state => ({}))(withStyles(useStyles)(NavMail))

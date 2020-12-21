import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { uploadBook, getBookById ,uploadCover} from '../actions'
import '../static/css/style.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Footer from "../../NavBar/components/Footer";
import Box from "@material-ui/core/Box";



toast.configure()

class UploadBooks extends Component {

    state = {
        localStore: {},
        redirect: false,
        uploadFile: false,

    }

    componentDidMount () {
        const id = this.props.match.params.id
        const localStore = { ...this.state.localStore }
        this.setState({ localStore })
        this.props.dispatch(getBookById(id))
    }

    newFileSelected = event => {
        const file = event.target.files[0]
        const id = event.target.id
        this.setState({ [id]: file, uploadFile: true })
    }
    newCoverSelected=event=>{
        const coverfile = event.target.files[0]
        const id = event.target.id
        this.setState({ [id]: coverfile, uploadFile: true })
    }

    handler (me, value) {
        const localStore = { ...this.state.localStore }

        localStore[me] = value

        this.setState({ localStore })
    }

    // saveFile () {
    //     fileSaver.saveAs(
    //         process.env.REACT_APP_CLIENT_URL + "/resources/cv.pdf",
    //         "MyCV.pdf"
    //     );
    // }

    async uploadNewBook () {
        const { localStore, file, coverfile } = this.state

        const formBody = new FormData()
        const form = new FormData()
        formBody.append('file', file)
        form.append('file', coverfile)

        const bookId = this.props.match.params.id

        if (file) {
            this.props.dispatch(uploadBook(bookId, formBody))
            toast.success('Book added')

        }
        if(coverfile){
            this.props.dispatch(uploadCover(bookId, form))
            toast.success('Book Cover added')
        }
        else {
            toast.warning('Select File')
        }
    }

    render () {
        const { classes } = this.props;
        const { book } = this.props.libraryReducer
        return (

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                <div className="page-content">
                    <div className="row">
                        <h2>Library Book</h2>
                        <button onClick={this.props.history.goBack}
                                style={{marginLeft:'1%', backgroundColor: "#f0f1f6", color:"green"}}
                        >⬅ Go back</button>
                        <div className="row">
                            <div className="column">
                                <div className="card3">
                                    <div className="container">

                                        {

                                            !!book.link && !!book.coverLink &&
                                            <div>
                                                <embed src={book.link}
                                                       background-color="black"
                                                        height = "400" width = "550px" overFlow="hidden">

                                                </embed>

                                            </div>


                                        }
                                        {
                                            !book.link && !book.coverLink &&
                                            <Fragment>
                                                <label htmlFor="file" style={{fontSize:'18px'}}>Select a file to upload</label>
                                                {/*<input type="file" id='file' onChange={this.newFileSelected} className="form-control"*/}
                                                {/*       accept="application/pdf,application/vnd.ms-excel"/>*/}

                                                <input type="file" id='file'
                                                       onChange={this.newFileSelected}
                                                       className="input"
                                                       accept="application/pdf,application/vnd.ms-excel"/>

                                                <label htmlFor="file" style={{fontSize:'18px'}}>Select a Cover to upload</label>
                                                <input type="file" id='coverfile'
                                                       onChange={this.newCoverSelected}
                                                       className="input"/>


                                                <button
                                                    className="upload"
                                                    type="submit"
                                                    onClick={this.uploadNewBook.bind(this)}> Upload Book
                                                </button>
                                            </Fragment>


                                        }


                                    </div>
                                </div>
                            </div>

                            <div className="column" style={{width:"40%"}}>
                                <div className="card2" style={{marginLeft:"40%"}}>
                                    <h1>Basic Information</h1>

                                    <table className="Data">
                                        <tr>
                                        </tr>
                                        <tr>
                                            <td>Book Name</td>
                                            <td>{book.name}</td>

                                        </tr>
                                        <tr>
                                            <td>Author</td>
                                            <td>{book.author}</td>

                                        </tr>
                                        <tr>
                                            <td>Description</td>
                                            <td>{book.description}</td>

                                        </tr>
                                        {
                                            !!book.link &&
                                            <tr>
                                                <td>Download </td>
                                                <td>
                                                    <a className="navlink"
                                                        href={book.link} download={book.name}> Download Here </a>
                                                </td>
                                            </tr>
                                        }


                                    </table>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                    <Box pt={4}>
                        <Footer/>
                    </Box>
                </Container>
            </main>

        )
    }

}

export default connect(state => ({

    libraryReducer: state.libraryReducer
}))(withStyles(useStyles)(UploadBooks))

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../../UseStyles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { createQuestionSet, uploadQuestion } from '../../actions'

class CreateQuestion extends React.Component {
    state = {
        redirect: 'false',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctanswer: '',
        createButton: false,
        uploadButton: true,
        localstore: []
    }

    handleFormSubmit = (e) => {

        e.preventDefault();
        let localstore = [...this.state.localstore];
        localstore.push({
            question: this.state.question,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            correctanswer: this.state.correctanswer,
        });

        this.setState({
            localstore,
            question: '',
            option1:'',
            option2:'',
            option3:'',
            option4:'',
            correctanswer:'',
        });
    };

    handleQuestion = (e) => {
        this.setState({
            question: e.target.value
        })
    }

    handleOption1 = (e) => {
        this.setState({
            option1: e.target.value
        })
    }

    handleOption2 = (e) => {
        this.setState({
            option2: e.target.value
        })
    }
    handleOption3 = (e) => {
        this.setState({
            option3: e.target.value
        })
    }

    handleOption4 = (e) => {
        this.setState({
            option4: e.target.value
        })
    }


    handleChange = (e) => {
        this.setState({
            correctanswer: e.target.value
        })
    }

    makeJson = async () => {
        this.props.dispatch(createQuestionSet({questionSet: this.state.localstore}))

        this.setState({
            uploadButton: false,
            createButton: true
        })
    }

    upload =async () => {

        const questionSet = this.props.mcqReducer.questionSet._id
        const urlReq = "{\"questionSet\":\"" +questionSet+"\"}"
        await this.props.dispatch(uploadQuestion(urlReq, this.props.match.params.examDetailId))
        window.location.reload(false).delay(3000);
    }


    render () {
        const { classes } = this.props
        const showQuestion = this.state.localstore.length > 0
        const localstore = this.state.localstore

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Type your question and options here.</h2>


                        <div>
                            <paper>
                                <div className="container">
                                    <br/>

                                    <div>
                                        {
                                            showQuestion &&

                                            <Paper>
                                                <h2><p>Question List</p></h2>
                                                <form>
                                                    <br/>

                                                    {localstore.map((question, i) => {
                                                        return(
                                                            <Typography align={'left'} color={'primary'} variant={'h6'} display={'block'} style={{marginLeft:"1.5%"}}>
                                                                {i+1}. {question.question}

                                                                <RadioGroup  name="option" style={{flexDirection:"row"}}>

                                                                    <FormControlLabel
                                                                        value={question.option1}
                                                                        control={<Radio/>}
                                                                        label= {question.option1} />

                                                                    <FormControlLabel
                                                                        value={question.option2}
                                                                        control={<Radio/>}
                                                                        label= {question.option2} />

                                                                    <FormControlLabel
                                                                        value={question.option3}
                                                                        control={<Radio/>}
                                                                        label= {question.option3} />

                                                                    <FormControlLabel
                                                                        value={question.option4}
                                                                        control={<Radio/>}
                                                                        label= {question.option4} />

                                                                </RadioGroup>
                                                            </Typography>
                                                        )

                                                    })}
                                                </form>
                                                <br/><br/><br/>
                                            </Paper>

                                        }
                                    </div>




                                    <form className='from-group ' onSubmit={this.handleFormSubmit}>
                                        <br/><br/>
                                        <input className='form-control no-border input-field ' id="question" placeholder="Type your question" value={this.state.question} type="text" name="question" onChange={this.handleQuestion} required/>

                                        <RadioGroup  name="options" style={{flexDirection:"column"}} onChange={this.handleChange}>

                                            <FormControlLabel
                                                value={this.state.option1}
                                                control={<Radio/>}
                                            /> <input className='form-control no-border input-field ' id="option1" placeholder="Option 1" value={this.state.option1} type="text" name="option1" onChange={this.handleOption1} required/>

                                            <FormControlLabel
                                                value={this.state.option2}
                                                control={<Radio/>}
                                            /> <input className='form-control no-border input-field ' id="option2" placeholder="Option 2" value={this.state.option2} type="text" name="option2" onChange={this.handleOption2} required/>

                                            <FormControlLabel
                                                value={this.state.option3}
                                                control={<Radio/>}
                                            /> <input className='form-control no-border input-field ' id="option3" placeholder="Option 3" value={this.state.option3} type="text" name="option3" onChange={this.handleOption3} required/>

                                            <FormControlLabel
                                                value={this.state.option4}
                                                control={<Radio/>}
                                            /> <input className='form-control no-border input-field ' id="option4" placeholder="Option 4" value={this.state.option4} type="text" name="option4" onChange={this.handleOption4} required/>

                                        </RadioGroup>
                                        <div className="text-center">
                                            <button type='submit' className="mt-3 col-md-12 btn  btn-primary">Add question</button>
                                        </div>
                                    </form>

                                    <br/><br/>

                                </div>

                                <br/>

                                <h1><p>If completed inserting all question upload the question.</p></h1>
                                <Button variant="contained"
                                        align ="right"
                                        disabled={this.state.createButton}
                                        style={{backgroundColor:"yellowgreen", gap:"3%"}

                                        }onClick={this.makeJson} type="button">
                                    Create
                                </Button>&emsp;
                                <Button variant="contained"
                                        align ="right"
                                        disabled={this.state.uploadButton}
                                        style={{backgroundColor:"yellowgreen", gap:"3%"}

                                        }onClick={this.upload} type="button">
                                    Upload
                                </Button>
                            </paper>
                        </div>
                    </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    studentReducer: state.studentReducer,
    mcqReducer: state.mcqReducer,
}))(withStyles(useStyles)(CreateQuestion))

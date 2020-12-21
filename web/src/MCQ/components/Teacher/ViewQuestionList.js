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
import { uploadQuestion } from '../../actions'
import { getAllQuestions } from '../../actions'

class ViewQuestionList extends React.Component {
    state = {
        redirect: 'false',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctanswer: '',
        localstore: []
    }

    componentDidMount() {
        this.props.dispatch(getAllQuestions())
    }

    render () {
        const { classes } = this.props
        const showQuestion = this.state.localstore.length > 0
        const localstore = this.state.localstore
        // const {questionReducer} = this.state.props.studentReducer

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h1>List of Questions Prepared.</h1>


                        <div>
                            <paper>
                                <div className="container">
                                    <br/>
                                    <form className='from-group ' onSubmit={this.handleFormSubmit}>

                                        {/*<p>Type your question here.</p>*/}
                                        {/*<input className='form-control no-border input-field ' id="question" value={this.state.question} type="text" name="question" onChange={this.handleQuestion} required/>*/}
                                        {/*<br/> <br/>*/}
                                        {/*<p>Option 1</p>*/}
                                        {/*<input className='form-control no-border input-field ' id="option1" value={this.state.option1} type="text" name="option1" onChange={this.handleOption1} required/>*/}
                                        {/*<br/><br/>*/}
                                        {/*<p>Option 2</p>*/}
                                        {/*<input className='form-control no-border input-field ' id="option2" value={this.state.option2} type="text" name="option2" onChange={this.handleOption2} required/>*/}
                                        {/*<br/><br/>*/}
                                        {/*<p>Option 3</p>*/}
                                        {/*<input className='form-control no-border input-field ' id="option3" value={this.state.option3} type="text" name="option3" onChange={this.handleOption3} required/>*/}
                                        {/*<br/><br/>*/}
                                        {/*<p>Option 4</p>*/}
                                        {/*<input className='form-control no-border input-field ' id="option4" value={this.state.option4} type="text" name="option4" onChange={this.handleOption4} required/>*/}
                                        {/*<br/><br/>*/}
                                        {/*<p>Index for correct answer. (for eg. type 1 if option 1 is correct.</p>*/}
                                        {/*<input className='form-control no-border input-field ' id="correctanswer" value={this.state.correctanswer} type="text" name="correctanswer" onChange={this.handleCorrectAnswer} required/>*/}
                                        {/*<br/><br/>*/}
                                        {/*<div className="text-center">*/}
                                        {/*    <button type='submit' className="mt-3 col-md-12 btn  btn-primary">Add more question...</button>*/}
                                        {/*</div>*/}
                                    </form>

                                    <br/><br/>

                                    <div>
                                        {
                                            showQuestion &&

                                            <Paper>
                                                <h2><p>Question List</p></h2>
                                                <form>
                                                    <br/>
                                                    {console.log("local store", this.state.localstore)}

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
                                            </Paper>
                                        }

                                    </div>
                                </div>

                                <br/><br/>

                                {/*<h1><p>If completed inserting all question upload the question.</p></h1>*/}
                                {/*<Button variant="contained"*/}
                                {/*        align ="right"*/}
                                {/*        style={{backgroundColor:"yellowgreen", gap:"3%"}*/}

                                {/*        }onClick={this.makeJson} type="button">*/}
                                {/*    Upload*/}
                                {/*</Button>*/}


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
}))(withStyles(useStyles)(ViewQuestionList))

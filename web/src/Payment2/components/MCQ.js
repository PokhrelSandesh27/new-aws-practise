import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { toast } from 'react-toastify'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { QuestionGroups } from './QuetsionGroup'
import Button from '@material-ui/core/Button'
import Countdown from "react-countdown";
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Icon from '@material-ui/core/Icon'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { normalize } from 'fast-glob'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import CancelIcon from '@material-ui/icons/Cancel';
import { NavLink } from 'react-router-dom'
import green from '@material-ui/core/colors/green'
import moment from 'moment'
import Timer from './Timer'

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
})

const DialogTitles = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    )
})

class MCQ extends React.Component {

    state = {
        check: [],
        submitting: false,
        correct: '',
        unanswered: '',
        wrong :'',
        duration: new Date(),
        seconds: 0,
        timer : 0,
        hours:'',
        minutes :"",
        // seconds: '',


        timeLeft:'',
        showModalState: false,
        isComplete: false, // whether the example is complete or not
        schema: [ // array
            {
                questionNumber: 'q1',
                question: 'Your question 01 ?',
                options: [
                    { value: 1, display: 'Answer 01' },
                    { value: 2, display: 'Answer 02' },
                    { value: 3, display: 'Answer 03' },
                    { value: 4, display: 'Answer 04' },
                ],
                correctAnswer: 2,
                studentAnswer: 0,
            },
            {
                questionNumber: 'q2',
                question: 'Your question 02 ?',
                options: [
                    { value: 1, display: 'Answer 01' },
                    { value: 2, display: 'Answer 02' },
                    { value: 3, display: 'Answer 03' },
                    { value: 4, display: 'Answer 04' },
                ],
                correctAnswer: 1,
                studentAnswer: 0
            }
        ]
    }


    timeOut=()=>{

        this.setState({ submitting: true,isComplete: true})

    }

    tick() {
        const { duration } = this.state;
        if (this.state.seconds === duration) {
            confirmAlert({
                title: 'Times UP',
                message: 'Your form is submitted',
                // buttons: [
                //     {
                //         label: 'Yes',
                //         onClick: () => this.mainAnswer()
                //     },
                //     {
                //         label: 'No',
                //         onClick: () => alert('Do not submit form Now')
                //     }
                // ]
            });

        } else {
            this.setState((prevState) => ({
                seconds: prevState.seconds + 1
            }));
        }
    }

    componentDidMount() {
        // let schema = [...this.state.schema]
        // const data =  JSON.parse(localStorage.getItem('schema')) ;
        // console.log(data, 'retrive wala ho ')
        // this.setState({schema:data})
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    handleChange2 = (questionId, answerId, index) => {
        let value = this.state.check
        value[questionId] = answerId
        this.setState({ check: value })
        console.log(this.state.check, 'check')

    }

    checkAnswer = () => { // -> start confirmation modal
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.mainAnswer()
                },
                {
                    label: 'No',
                    onClick: () => alert('Do not submit form Now')
                }
            ]
        });


    }

    handleChange = (event, index) => {
        const answer = parseInt(event.target.value)
        let schema = [...this.state.schema]
        let question = { ...schema[index] }
        question.studentAnswer = answer
        schema[index] = question
        const data = JSON.stringify( schema)
        console.log(data, 'data')
        localStorage.setItem('schema', data);
        this.setState({ schema: schema })
    }

    mainAnswer () {
        const schema = [...this.state.schema]
        const correct = schema.filter(q => q.studentAnswer == q.correctAnswer)
        const wrong  = schema.filter(q => q.studentAnswer !== q.correctAnswer)
        console.log('log worng', wrong.length)
        console.log('log correct answers', correct.length)
        const unanswered = this.state.schema.filter(q => q.studentAnswer == 0)

        console.log('the question is unanswered', unanswered.length)
        this.setState({ submitting: true, correct: correct, unanswered: unanswered, wrong:wrong, isComplete: true })
    }

    closeModal = () => {
        this.setState({ showModalState: false })
    }

    render () {
        const { classes } = this.props
        const { schema, isComplete, correct, wrong, unanswered, hours, minutes, seconds } = this.state
        console.log('schema', schema)
        let timeLeft = moment.utc(this.state.duration, "DD-MM-YYYY", true).valueOf() - this.state.seconds;
        // const question = schema[0]

        // console.log('log question', question)

        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Multiple Choice Question.</h2>
                            <Timer timeOut={ this.timeOut} />
                        {
                            isComplete &&
                                <Paper style={{ backgroundColor:'#87c4c6'}}>

                                {

                                        <p style={{ fontSize: '18px'}}>
                                            Total correct Answer:{correct.length} &nbsp; &nbsp;
                                            Total Wrong Answer:{wrong.length} &nbsp; &nbsp;
                                            Total un-Answered:{unanswered.length} &nbsp; &nbsp;
                                        </p>
                                }
                                </Paper>

                        }
                        {/*this will be moved*/}


                        {
                            this.state.schema.map((aquest, index) => {
                                return (
                                    <>
                                        <Typography align={'left'} color={'primary'} variant={'h6'} display={'block'} style={{marginLeft:"1.5%"}}>
                                        {aquest.questionNumber}. &nbsp;{aquest.question}
                                        </Typography>
                                        <br/>
                                        <FormControl component="fieldset">
                                            <br/>
                                            <RadioGroup
                                                className={classes.group}
                                                aria-label="gender"
                                                value={aquest.studentAnswer}
                                                onChange={(event) => this.handleChange(event, index)}>
                                                {
                                                    aquest.options.map(q => {
                                                        return (
                                                            <FormControlLabel
                                                                disabled={isComplete}
                                                                value={q.value}
                                                                control={<Radio/>} label={q.display}/>
                                                        )
                                                    })
                                                }

                                                {
                                                    isComplete &&
                                                        <div>
                                                            {
                                                                (aquest.correctAnswer === aquest.studentAnswer) ?
                                                                    <div style={{ fontSize: '22px', marginTop: "8%" }}>
                                                                        <CheckCircleOutlineIcon style={{ color: green[500] }}/>
                                                                    </div> :
                                                                    <div style={{ fontSize: '22px', marginTop: "8%" }}>

                                                                                <CancelIcon   color="secondary"/> &nbsp; &nbsp;

                                                                        correct Answer: <b>{aquest.correctAnswer}</b>
                                                                    </div>
                                                            }
                                                        </div>


                                                }
                                            </RadioGroup>
                                        </FormControl>



                                        <hr/>
                                    </>
                                )
                            })
                        }

                        {
                            <p>
                                write a confirmation modal here
                            </p>
                        }

                        {/*{question.questionNumber}*/}
                        {/*{question.question}*/}
                        {/*<FormControl component="fieldset">*/}
                        {/*    <FormLabel component="legend">Gender</FormLabel>*/}
                        {/*    <RadioGroup aria-label="gender" name="gender1" value={question.studentAnswer}*/}
                        {/*                onChange={(event) => this.handleChange(event, 0)}>*/}
                        {/*        {*/}
                        {/*            question.options.map(q => {*/}
                        {/*                return (*/}
                        {/*                    <FormControlLabel value={q.value} control={<Radio/>} label={q.display}/>*/}
                        {/*                )*/}
                        {/*            })*/}
                        {/*        }*/}
                        {/*    </RadioGroup>*/}
                        {/*</FormControl>*/}


                        {/*end*/}


                        {/*<div>*/}
                        {/*    {this.state.schema.map((aquest, i) => {*/}
                        {/*        return (*/}

                        {/*            <form>*/}
                        {/*                <br/> {aquest.question.questionNumber}  {aquest.question.question} <br/>*/}


                        {/*                /!*<FormControl component="fieldset">*!/*/}
                        {/*                /!*    <FormLabel component="legend">Gender</FormLabel>*!/*/}
                        {/*                /!*    <RadioGroup aria-label="gender" name="gender1" value={question.studentAnswer}*!/*/}
                        {/*                /!*                onChange={(event) => this.handleChange(event, aquest)}>*!/*/}
                        {/*                /!*        {*!/*/}
                        {/*                /!*            aquest.question.options.map(q => {*!/*/}
                        {/*                /!*                return (*!/*/}
                        {/*                /!*                    <FormControlLabel value={q.value} control={<Radio/>} label={q.display}/>*!/*/}
                        {/*                /!*                )*!/*/}
                        {/*                /!*            })*!/*/}
                        {/*                /!*        }*!/*/}
                        {/*                /!*    </RadioGroup>*!/*/}
                        {/*                /!*</FormControl>*!/*/}

                        {/*            </form>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*    }*/}
                        {/*</div>*/}



                        <div>
                            <Button variant={'contained'} color={'primary'}
                                    onClick={this.checkAnswer}
                                    disabled={this.state.submitting}>
                                Exam Complete
                            </Button>
                        </div>


                        {/*<Dialog*/}
                        {/*    scroll={'paper'}*/}
                        {/*    onClose={this.closeModal}*/}
                        {/*    aria-labelledby="customized-dialog-title" open={this.state.showModalState}>*/}
                        {/*    <DialogTitles id="customized-dialog-title" onClose={this.closeModal}>*/}
                        {/*        <h1>Game Over. Final score is {this.state.score} points</h1>*/}
                        {/*        <p>The correct Answers for the quiz are</p>*/}
                        {/*        <p style={{ color: 'lightcoral' }}>*/}

                        {/*            {*/}
                        {/*                this.state.schema.map((aquest, index) => {*/}
                        {/*                    return (*/}
                        {/*                        <li className='ui floating message options'*/}
                        {/*                            key={index}>*/}
                        {/*                            {aquest.questionNumber}&nbsp;{aquest.question}*/}
                        {/*                            <br/>*/}
                        {/*                            your Answer: {aquest.studentAnswer}*/}
                        {/*                            <br/>*/}
                        {/*                            correct Answer: {aquest.correctAnswer}*/}
                        {/*                            /!*{*!/*/}
                        {/*                            /!*    if(aquest.studentAnswer===)*!/*/}
                        {/*                            /!*}*!/*/}
                        {/*                        </li>*/}

                        {/*                    )*/}
                        {/*                })*/}
                        {/*            }*/}
                        {/*            correct: {this.state.correct.length}*/}

                        {/*            <br/>*/}
                        {/*            unanswered : {this.state.unaswer.length}*/}
                        {/*            <br/>*/}
                        {/*            check :{this.state.check}*/}
                        {/*        </p>*/}
                        {/*    </DialogTitles>*/}
                        {/*    <DialogContent dividers>*/}
                        {/*        <Typography gutterBottom>*/}
                        {/*            /!*{get(this.state.book, 'description')}*!/*/}
                        {/*        </Typography>*/}

                        {/*    </DialogContent>*/}
                        {/*    <DialogActions>*/}
                        {/*        <Button autoFocus onClick={this.closeModal} color="primary">*/}
                        {/*            Close*/}
                        {/*        </Button>*/}
                        {/*    </DialogActions>*/}
                        {/*</Dialog>*/}


                    </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(MCQ))

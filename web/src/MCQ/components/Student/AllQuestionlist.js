import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../../UseStyles'
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button'
import { getExamDetail, hasAttend, searchExamDetail } from '../../../Exam/ExamDetails/actions'
import { QuestionGroups } from '../../../Payment2/components/QuetsionGroup'
import { confirmAlert } from "react-confirm-alert"
import Paper from '@material-ui/core/Paper'
import Timer from '../../../Payment2/components/Timer'
import { getUser } from '../../../utils'
import { createMarkSheet } from '../../../Exam/MarkSheet/actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";





toast.configure()

class AllQuestionlist extends Component {

    state = {
        check:[],
        isComplete: false,
        correct :'',
        wrong :'',
        unanswered :'',
        subject: this.props.match.params.subject,
        classroom: this.props.match.params.classroom,
        questionSet: this.props.match.params.questionSet,
        score :'',
        index : 0

    }
    goToNext = () => {

        this.setState({ index: (this.state.index + 1)  });
    };
    goToPrev = () => {

        this.setState({ index: (this.state.index - 1) });
    };


    handleChange = (questionId, answerId, index) => {
        let value = this.state.check
        value[questionId] = answerId
        this.setState({ check: value })
        console.log(this.state.check, 'check')

    }



    componentDidMount() {
        const id = this.props.match.params.id
        this.props.dispatch(getExamDetail(id))
    }


    create=()=>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.checkAnswer()
                },
                {
                    label: 'No',
                    onClick: () => alert('Do not submit form Now')
                }
            ]
        });
    }

   checkAnswer(){
       const { examDetail } = this.props.examDetailsReducer;
       const check = this.state.check;
       let count = 0;
       let correct = 0;
       let wrong = 0;
       let unanswered = 0;

       let exam = examDetail.exam._id;
       let eDetail = examDetail._id;
       let user = getUser()._id;
       examDetail.questionSet.questionSet.map(question=>{
            if(check[question.questionNumber]!==undefined){
                if(question.correctAnswer==check[question.questionNumber]){
                    correct++;

                }
                else {
                    wrong++;
                }
            }
            else{
                unanswered++;

            }
       })
       let theoryMarks = correct;
       let pracMarks = 0;
       this.props.dispatch(createMarkSheet({exam, examDetail:eDetail,student:user,theoryMarks, pracMarks} ))
           .then(resp => {
               toast.success('compleated')
               this.props.dispatch(hasAttend(user,eDetail ))
           })
       console.log("right amswer",count);
       this.setState({isComplete:true, wrong:wrong, correct:correct, unanswered:unanswered, score:correct})
    }




    render() {
        const {classes} = this.props;
        const { examDetail , readState} = this.props.examDetailsReducer
        console.log(this.props.match.params.classroom, "mcq list ")
        {
            readState===2 &&
            console.log(examDetail, "exam My her list ")
        }

        const {isComplete} = this.state;
        const { correct, unanswered, wrong,score } = this.state;



        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">


                        <div className="col-md-8 order-md-2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            width: '98%',
                            marginLeft: "1%",
                            marginRight: "1%",
                            marginTop:"1%",
                            marginBottom:"3%"
                        }}>




                            {
                                isComplete &&
                                <Paper style={{ backgroundColor:'#87c4c6'}}>

                                    {

                                        <p style={{ fontSize: '18px'}}>
                                            Total correct Answer:{correct} &nbsp; &nbsp;
                                            Total Wrong Answer:{wrong} &nbsp; &nbsp;
                                            Total un-Answered:{unanswered} &nbsp; &nbsp;
                                            Total Score:{score} &nbsp; &nbsp;
                                        </p>
                                    }
                                </Paper>

                            }
                            {
                                readState === 1 &&
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
                            {
                                readState === 3 &&
                                <div>
                                    failed
                                </div>

                            }


                            {
                                readState === 2 &&


                                <div>
                                    <div className="column4">
                                        <Card  variant="outlined">
                                            <CardContent>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    Check Board
                                                </Typography>
                                                <Typography style={{display:"flex" , flexDirection:"row", gap:"10px"}} color="textSecondary">
                                                    {
                                                        examDetail.questionSet.questionSet.map((questions, i)=>{
                                                            return(
                                                                <div >
                                                                    {this.state.check[questions.questionNumber]!==undefined ?
                                                                        <Avatar style={{backgroundColor:'green', width:"30px", height:"30px"}}>
                                                                            {i}
                                                                        </Avatar>:
                                                                        <Avatar style={{backgroundColor:'red',width:"30px", height:"30px"}}>
                                                                            {i}
                                                                        </Avatar>

                                                                    }

                                                                </div>
                                                            )

                                                        })
                                                    }
                                                </Typography>

                                            </CardContent>
                                        </Card>
                                        <br/>
                                        <Card  variant="outlined">
                                        <Timer
                                            startTime = {examDetail.startTime}
                                            endTime = {examDetail.endTime}
                                            isComplete = {this.state.isComplete}
                                        />
                                        </Card>

                                        <br/>
                                        <Card>
                                            <CardActions>
                                        <Button
                                            variant="contained" color={'default'}
                                            type="submit"
                                            disabled={this.state.index===0}
                                            onClick={this.goToPrev}>prev
                                        </Button>
                                        <Button
                                            variant="contained" color={'default'}
                                            type="submit"
                                            disabled={this.state.index===(examDetail.questionSet.questionSet.length-1)}
                                            onClick={this.goToNext}
                                        >Next</Button>
                                        {
                                            this.state.index==(examDetail.questionSet.questionSet.length-1)?
                                                <Button
                                                    variant="contained"
                                                    style={{backgroundColor: "lightgreen", width:"30%",marginTop: "3%", marginBottom: "3%"}}
                                                    type="submit"
                                                    disabled={this.state.isComplete}
                                                    onClick={this.create.bind()}
                                                >Submit</Button>:null
                                        }
                                        </CardActions>
                                        </Card>

                                    </div>
                                    {/*<div className="column3">*/}
                                    {/*    <Timer*/}
                                    {/*        startTime = {examDetail.startTime}*/}
                                    {/*        endTime = {examDetail.endTime}*/}
                                    {/*        isComplete = {this.state.isComplete}*/}
                                    {/*    />*/}
                                    {/*</div>*/}



                                    {/*<Paper style={{display:"flex" , flexDirection:"row", gap:"10px"}}>*/}
                                    {/*    {*/}
                                    {/*        examDetail.questionSet.questionSet.map((questions, i)=>{*/}
                                    {/*            return(*/}
                                    {/*                <div >*/}
                                    {/*                    {this.state.check[questions.questionNumber]!==undefined ?*/}
                                    {/*                        <Avatar style={{backgroundColor:'green', width:"30px", height:"30px"}}>*/}
                                    {/*                            {i}*/}
                                    {/*                        </Avatar>:*/}
                                    {/*                        <Avatar style={{backgroundColor:'red',width:"30px", height:"30px"}}>*/}
                                    {/*                            {i}*/}
                                    {/*                        </Avatar>*/}

                                    {/*                    }*/}

                                    {/*                </div>*/}
                                    {/*            )*/}

                                    {/*        })*/}
                                    {/*    }*/}
                                    {/*</Paper>*/}



                                    {

                                        <QuestionGroups
                                            question={examDetail.questionSet.questionSet[this.state.index]}
                                            selectedAnswer ={ this.state.check[examDetail.questionSet.questionSet[this.state.index].questionNumber]!==undefined?
                                                this.state.check[examDetail.questionSet.questionSet[this.state.index].questionNumber]:0
                                            }

                                            isComplete = {this.state.isComplete}
                                            handelChange={this.handleChange}/>

                                    }





                                </div>
                            }

                        </div>
                    </div>
                </Container>
            </main>



        )
    }
}

export default connect(state => ({
    mcqReducer: state.mcqReducer,
    paymentReducer: state.paymentReducer,
    userReducer:state.userReducer,
    studentReducer: state.studentReducer,
    classroomReducer: state.classroomReducer,
    examDetailsReducer : state.examDetailsReducer
}))(withStyles(useStyles)(AllQuestionlist))



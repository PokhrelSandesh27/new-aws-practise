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
import { AswerSumitted } from './AnsweSubmitted'

toast.configure()

class MCQ extends React.Component {

    state = {
        check:[],
        schema: [

            {

                q: {
                    id:'1A',
                    question: "whats your name ?",

                    options: [

                        { value: "a", display: "Ajay" },

                        { value: "b", display: "Ajay" },

                        { value: "c", display: "Ajay" },

                        { value: "d", display: "Ajay" }

                    ],
                    right:'a',
                    selected_answer: 'a'
                }
            },

            {

                q: {
                    id:'2A',
                    question: "whats your name ?",

                    options: [

                        { value: "a", display: "Ajay" },

                        { value: "b", display: "Ajay" },

                        { value: "c", display: "Ajay" },

                        { value: "d", display: "Ajay" }

                    ],
                    right:'c',
                    selected_answer: "b"

                }

            }
        ]
    }
    handleChange = (questionId, answerId, index) => {
        let value = this.state.check
        const newdata = this.state.schema
        value[questionId]= answerId
        this.setState({check:value})

    };
    // Selected = (Id) => {
    //     const schema = this.state.schema
    //     schema.selected_answer=Id
    //     this.setState({schema})
    //     console.log(schema, 'check')
    // };
    //

    //  validateAnswer = () => {
    //      const question = this.state.schema.q.question.id
    //     // const question = props.scg[props.current_question];
    //     const correctAnswer = question.answers.filter(x => x.is_right === 1);
    //
    //     if (props.selected_answer === null) {
    //         alert("No nulls");
    //     } else {
    //         correctAnswer[0].value === props.selected_answer
    //             ? alert("correct")
    //             : alert("wrong");
    //     }
    // };



    render () {
        const { classes } = this.props
        console.log("local", this.state.schema)
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <h2>Multiple Choice Question.</h2>

                        <div>
                            {this.state.schema.map((aquest, i) => {
                                return (

                                    <AswerSumitted
                                        question={aquest}
                                        handelChange={this.handleChange.bind(this, aquest)}
                                        checked={this.Selected.bind(this, aquest)}
                                    />

                                )
                            })
                            }
                            <Button variant={'contained'} color={'primary'} onClick={this.validateAnswer}>
                                submit
                            </Button>
                        </div>




                    </div>
                </Container>
            </main>
        )
    }

}

export default connect(state => ({
    studentReducer: state.studentReducer,
}))(withStyles(useStyles)(MCQ))

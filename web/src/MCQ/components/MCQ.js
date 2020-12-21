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

                    ]

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

                    ]

                }

            }
        ]
    }
    handleChange = (questionId, answerId) => {
        let value = this.state.check
        value[questionId]= answerId
        this.setState({check:value})
        console.log(this.state.check, 'check')
    };



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

                                        <QuestionGroups
                                            question={aquest}
                                        handelChange={this.handleChange}/>



                                        //
                                        // <form>
                                        //         <br/>{i +1} {aquest.q.question} <br/>
                                        //         <FormControl component="fieldset">
                                        //             <RadioGroup  name="option"   onChange={this.handleChange} >
                                        //                             { aquest.q.options.map((answer, i) => {
                                        //                                 return (
                                        //                                     <FormControlLabel
                                        //                                 value={answer.value}
                                        //                                 control={<Radio/>}
                                        //                                 label= {answer.display} />
                                        //                                 )
                                        //                             })}
                                        //                         </RadioGroup>
                                        //         </FormControl>
                                        // </form>
                                    )
                                })
                                }
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

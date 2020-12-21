import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { useStyles } from '../../UseStyles'
import FormLabel from '@material-ui/core/FormLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import green from '@material-ui/core/colors/green'
import CancelIcon from '@material-ui/icons/Cancel'

export  const QuestionGroups =(props) => {

    const [value, setValue] = React.useState('0');
        console.log(props, "props quetsion")
  const handleChanges = (event) => {
      props.handelChange(props.question.questionNumber,event.target.value)
      setValue(event.target.value)
    };


    return (
        <Paper>

            <br/>
            <Typography align={'left'} color={'primary'} variant={'h6'} display={'block'} style={{marginLeft:"1.5%"}}>
            {props.question.questionNumber}. &nbsp;
            {props.question.question}
            </Typography>
            <br/>
            <FormControl component="fieldset">
                <br/>
                <RadioGroup  name="option" value={props.selectedAnswer} onChange={handleChanges}>
                    {props.question.options.map((answer, i) => {
                        return (
                            <FormControlLabel
                                key={i}
                                value={answer.value.toString()}
                                control={<Radio/>}
                                disabled={props.isComplete}
                                label= {answer.display}

                            />
                        )
                    })}
                    {
                        props.isComplete &&
                        <div>
                            {
                                (props.question.correctAnswer == value)?
                                    <div style={{ fontSize: '22px', marginTop: "8%" }}>
                                        <CheckCircleOutlineIcon style={{ color: green[500] }}/>
                                    </div> :
                                    <div style={{ fontSize: '22px', marginTop: "8%" }}>

                                        <CancelIcon   color="secondary"/> &nbsp; &nbsp;

                                        correct Answer: <b>{props.question.correctAnswer}</b>
                                    </div>
                            }

                        </div>
                    }
                </RadioGroup>
            </FormControl>


            <hr/>

        </Paper>
    )
}

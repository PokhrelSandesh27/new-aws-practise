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

export  const AswerSumitted =(props) => {
    console.log(props,'myprope')

    const handleChange = (event) => {
        props.handelChange(props.question.q.id,event.target.value)
    };

    return (
        <Paper>
            <form>
                <br/>
                <Typography align={'left'} color={'primary'} variant={'h6'} display={'block'} style={{marginLeft:"1.5%"}}>
                    {props.question.q.id}. &nbsp;
                    {props.question.q.question}
                </Typography>
                <br/>
                <FormControl component="fieldset">
                    <br/>
                    <RadioGroup  name="option"  onChange={handleChange}  style={{flexDirection:"row"}}>
                        {props.question.q.options.map((answer, i) => {
                            return (
                                <FormControlLabel
                                    value={answer.value}
                                    control={<Radio/>}
                                    color={'primary'}
                                    label= {answer.display}
                                    checked={props.question.q.selected_answer === answer.value}
                                />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
                <hr/>
            </form>
        </Paper>
    )
}

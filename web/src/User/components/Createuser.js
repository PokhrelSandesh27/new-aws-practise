import React from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {useStyles} from "../../UseStyles";
import MyTextField from "../../components/TextField";
import {createUser, getAllUsers} from '../actions'
import Container from "@material-ui/core/Container";
import {formatDate} from "react-calendar/dist/umd/shared/dateFormatter";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";
import {emphasize} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip)
class Createuser extends React.Component {

    state = {
        formData: {
            username:'',
            fullName:'',
            email: '',
            currentAddress:'',
            permanentAddress:'',
            phone:'',
            motherName:'',
            fatherName:'',
            status:'',
            groups:[],
            password: ''
        }
    }

    handleChange = (event) => {
        const formData = {...this.state.formData}
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }
    groupsChanged = event => {
        const formData = {...this.state.formData}

        formData.groups = [event.target.value]
        this.setState({formData})
    }

    handleSubmit = () => {
        const {formData} = this.state

        const req = {...formData}
        this.props.dispatch(createUser(req))
    }

    render() {
        const {classes} = this.props;
        const { formData } = this.state;
        return (
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <div className="page-content">
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}>
                            <Breadcrumbs aria-label="breadcrumb"
                                         style={{float: 'right'}}>
                                <StyledBreadcrumb onClick={this.props.history.goBack}
                                                  component="a"
                                                  label="Back"
                                                  icon={<ArrowBackIosIcon fontSize="small" />}>

                                </StyledBreadcrumb>

                                <StyledBreadcrumb
                                    component="a"
                                    label="User"
                                    onClick={this.props.history.goBack}
                                />
                                <Typography variant={'inherit'} color={'secondary'}>
                                    Add User
                                </Typography>
                            </Breadcrumbs>
                            <br/> <br/>
                            <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    label="UserName"
                                    onChange={this.handleChange}
                                    name="username"
                                    value={formData.username}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    type={ 'password'}
                                    value={formData.password}
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['this field is required', 'password must be longer than 6 character',"Password must be shorter than 10"]}
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    label="FullName"
                                    onChange={this.handleChange}
                                    name="fullName"
                                    value={formData.fullName}
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['this field is required', 'FullName must be longer than 6 character']}
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    label="phone"
                                    onChange={this.handleChange}
                                    name="phone"
                                    value={formData.phone}
                                    validators={[ 'isNumber']}
                                    errorMessages={['Phone Number should be in Numeric form' ]}
                                />


                            </Grid>
                            <br/>
                            <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    label="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={formData.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                />
                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="Father"
                                    onChange={this.handleChange}
                                    name="fatherName"
                                    value={formData.fatherName}
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['this field is required', 'FullName must be longer than 6 characters']}b
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="motherName"
                                    onChange={this.handleChange}
                                    name="motherName"
                                    value={formData.motherName}
                                    validators={['required', 'minStringLength:6']}
                                    errorMessages={['this field is required', 'FullName must be longer than 6 characters']}b
                                />

                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="currentAddress"
                                    onChange={this.handleChange}
                                    name="currentAddress"
                                    value={formData.currentAddress}
                                    validators={["required"]}
                                    errorMessages={["this field is required"]}
                                />
                            </Grid>
                            <br/>
                            <Grid container justify="flex-start" spacing={3} style={{gap: "5%", marginLeft: "3%", marginTop:"1%"}}>
                                <TextValidator
                                    id="filled"
                                    variant="filled"
                                    required
                                    label="permanentAddress"
                                    onChange={this.handleChange}
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                />

                                <div>
                                    <select
                                        name="status"
                                        onChange={this.handleChange}
                                        className='forminput'>
                                        <option value={null} disabled selected>Please Select Status</option>
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="DE-ACTIVE">DE-ACTIVE</option>
                                    </select>

                                </div>
                                <div>
                                    <select
                                        name="groups"
                                        className='forminput'
                                        onChange={this.groupsChanged}>
                                        <option value={null} disabled selected>Please select Groups</option>
                                        <option value="STAFF">STAFF</option>
                                        <option value="LIBRARIAN">LIBRARIAN</option>
                                        <option value="MANAGEMENT">MANAGEMENT</option>
                                        <option value="TEACHER">TEACHER</option>
                                        <option value="ACCOUNTANT">ACCOUNTANT</option>

                                    </select>
                                </div>
                            </Grid>
                            <br/>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"  fullWidth>
                                submit

                            </Button>
                        </ValidatorForm>
                    </div>
                </Container>
            </main>
        );
    }
}

export default connect(state => ({
    userReducer: state.userReducer
}))(withStyles(useStyles)(Createuser))


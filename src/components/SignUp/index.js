import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase/index';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
    <div>
        <h1>SignUpPage</h1>
        <SignUpForm/>
    </div>
)

const INITIAL_STATE = {
    username:'',
    email:'',
    passwordOne:'',
    passwordTwo:'',
    isAdmin: false,
    error: null
}


class SignUpFormBase extends Component{
    constructor(props){
        super(props);
        this.state={...INITIAL_STATE}
    }
    onSubmit = event => {
        const {username, email, passwordOne,isAdmin} = this.state;
        const roles = [];
        if(isAdmin){roles.push(ROLES.ADMIN)}
        this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            // create user in your firebase realtime database
            this.props.firebase.user(authUser.user.uid).set({username,email,roles})
        })
        .then(() => {
            this.setState({...INITIAL_STATE});
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({error})
        })
        event.preventDefault();
    }
    onChange = event => {
        this.setState({[event.target.name]:event.target.value})
    }
    onChangeCheckbox = event => {
        this.setState({[event.target.name]:event.target.checked});
    }
    render(){
        const {username,email,passwordOne,passwordTwo,isAdmin,error} = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === ''
        return(
            <form onSubmit={this.onSubmit}>
            <input type="text" value={username} name="username" onChange={this.onChange} placeholder="Full Name" required/>
            <input type="email" value={email} name="email" onChange={this.onChange} placeholder="E-Mail Address" required/>
            <input type="password" value={passwordOne} name="passwordOne" onChange={this.onChange} placeholder="Password" required/>
            <input type="password" value={passwordTwo} name="passwordTwo" onChange={this.onChange} placeholder="Confirm Password" required/>
            <label>Admin: <input name="isAdmin" type="checkbox" checked={isAdmin} onChange={this.onChangeCheckbox}/></label>
            <button disabled={isInvalid} type="submit">Sign Up</button>
            {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignUpLink = () => (
    <p>Don't have an account ? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
)
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
export default SignUpPage;

export {SignUpForm, SignUpLink};
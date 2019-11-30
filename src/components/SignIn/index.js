import React,{Component} from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import {SignUpLink} from '../SignUp/index';
import {PasswordForgetLink} from '../PasswordForget/index';
import { withFirebase } from './../Firebase/index';
import * as ROUTES from '../../constants/routes'

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <SignInGoogle />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
)

const INITIAL_STATE={
    email:'',
    password:'',
    error: null
}

class SignInFormBase extends Component{
    constructor(props){
        super(props)

        this.state={...INITIAL_STATE};
    }
    onSubmit = event => {
        const {email,password} = this.state;

        this.props.firebase.doSignInWithEmailAndPassword(email,password)
        .then(() => {
            this.setState({...INITIAL_STATE})
            this.props.history.push(ROUTES.HOME)
        })
        .catch(error => {
            this.setState({error})
        })
        event.preventDefault()
    }
    onChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    render(){
        const {email,password,error} = this.state;
        const isInvalid = password === '' || email === ''

        return(
            <form onSubmit={this.onSubmit}>
                <input type="email" name="email" value={email} onChange={this.onChange} placeholder="Email Address"/>
                <input type="password" name="password" value={password} onChange={this.onChange} placeholder="Password"/>
                <button type="submit" disabled={isInvalid}>Sign In</button>    

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

class SignInGoogleBase extends Component{
    constructor(props){
        super(props);
        this.state = {error:null}
    }
    onSubmit = event => {
        this.props.firebase.doSignInWithGoogle().then(socialAuthUser => {
            // create a user in firebase realtime db
            return this.props.firebase.user(socialAuthUser.user.uid)
            .set({
                username: socialAuthUser.user.displayName,
                email: socialAuthUser.user.email,
                roles:[]
            })
        })
        .then(() => {
            this.setState({error: null});
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({error})
        })
        event.preventDefault()
    }
    render(){
        const {error} = this.state;

        return(
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In With Google</button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignInForm = compose(withRouter,withFirebase)(SignInFormBase)
const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase)
export default SignInPage;
export {SignInForm, SignInGoogle};
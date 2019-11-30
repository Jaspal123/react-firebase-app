import React from 'react';

import AuthUserContext from './context';
import {withFirebase} from '../Firebase/index';

const needsEmailVerification = authUser => {
    authUser && !authUser.emailVerified && authUser.providerData.map(provider => provider.providerId).includes('password');
}

const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component{
        constructor(props){
            super(props);
            this.state = {isSent: false}
        }
        onSendEmailVerification = () => {
            this.props.firebase.doSendEmailVerification().then(() => this.setState({isSent: true}))
        }
        render(){
            return(
                <AuthUserContext.Consumer>
                    {authUser => 
                    needsEmailVerification(authUser) ? (
                        <div>
                        {this.state.isSent ? (
                            <p>
                             E-mail confirmation sent: Check your E-mails (spam folder included)
                            for a confirmation E-mail or send another confirmation E-mail
                        </p>
                        ) : (
                            <p>
                                Verify your E-mail: Check your E-mails (spam folder included)
                                for a confirmation E-mail or send another confirmation E-mail
                            </p>
                        )}
                            
                            <button type="button" onClick={this.onSendEmailVerification} disabled={this.state.isSent}>
                            Send confirmation Email
                            </button>
                        </div>
                    ): (
                        <Component {...this.props}/>
                    )
                    }
                </AuthUserContext.Consumer>
            )
        }
    }
    return withFirebase(WithEmailVerification)
}

export default withEmailVerification;
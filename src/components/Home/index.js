import React from 'react'
import {compose} from 'recompose'

import {withAuthorization, withEmailVerification} from './../Session/index';
const HomePage = () => (
    <div>
        <h1>HomePage</h1>
        <p>Home Page is Accessible to every sign in user.</p>
    </div>
)

const condition = authUser => !!authUser;

export default compose(withEmailVerification, withAuthorization(condition))(HomePage);
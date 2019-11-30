import React from 'react'
import {withAuthorization} from './../Session/index';
const HomePage = () => (
    <div>
        <h1>HomePage</h1>
        <p>Home Page is Accessible to every sign in user.</p>
    </div>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
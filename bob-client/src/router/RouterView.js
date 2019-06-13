import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RAuthentication from '../router/r-authentication';
import RLayout from '../router/r-layout';
import PrivateRoute from './PrivateRoute';

class RouterView extends Component {
    render() {
        return (
            <Switch>
                <Route  path='/auth' component={RAuthentication} />
                <Route  path="/" component={RLayout} />
            </Switch>
        );
    }
}


export default RouterView;
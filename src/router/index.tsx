import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as React from 'react';

import DialogboxDemo from '../page/dialogbox';

const PrimaryRoute = () => {
    return <HashRouter>
        <Switch>
            <Route path={'/dialogbox'} component={DialogboxDemo}></Route>
            <Redirect from="/" to="/dialogbox" />
        </Switch>
    </HashRouter>
}

export default PrimaryRoute;
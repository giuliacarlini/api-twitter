import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Download from './pages/download';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Download} />    
            </Switch>
        </BrowserRouter>
    )
}
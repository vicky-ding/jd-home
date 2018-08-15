import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import '../src/asset/style/public.css';
import FirstContainer from './container/first';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Redirect from="/" exact to="/first" />
            <Route path="/:index" component={FirstContainer} />
        </Switch>
    </BrowserRouter>,
document.getElementById('app'));
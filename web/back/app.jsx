import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import '../src/asset/style/public.css';
import '../src/asset/iconfont/style.css';
import HomeContainer from './container/home';
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path="/home" component={HomeContainer} />
            <Route path="/home/:item" component={HomeContainer} />
        </Switch>
    </HashRouter>,
document.getElementById('app'));
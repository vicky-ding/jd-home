import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import './asset/style/public.css';
import './asset/iconfont/style.css';
import HomeContainer from './container/home';
import { Switch, Redirect, Route, HashRouter } from 'react-router-dom';

ReactDOM.render(
        <HashRouter>
            <Switch>
                <Redirect from="/" exact to="/home" />
                <Route path="/home/:menu" component={HomeContainer} />
                <Route path="/home" component={HomeContainer} />
            </Switch>
        </HashRouter>,
document.getElementById('app')); 
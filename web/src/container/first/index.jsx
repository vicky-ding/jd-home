import './index.css';
import React from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import Sidebar from '../sidebar/index';

export default class FirstContainer extends React.Component {
    render() {
        return (
            <div className="ant-layout-base">
                <Sidebar />
                <div id="main-content-div" className="ant-layout-main">
                <Header userName="刘永浪"/>
                <Footer />
                </div>
            </div>
        );
    }
}
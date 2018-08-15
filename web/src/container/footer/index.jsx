import './index.css';
import React from 'react';
import { BackTop } from 'antd';

/**
 * 定义Footer组件
 */
export default class Footer extends React.Component {

    render() {
        return (
            <div>
                <BackTop target={() => document.getElementById('main-content-div')} />
                <div className="ant-layout-footer">我是footer</div>
            </div>
        );
    }

}
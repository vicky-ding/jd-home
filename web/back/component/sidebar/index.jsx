import './index.css';
import * as React from 'react';

export default class Sidebar extends React.Component {
    static defaultProps = {
        title: '后台管理'
    }

    render() {
        return (
            <div className="sidebar-component">
                <div className="header-left">
                    <span className="span-icon icon-menu"></span>
                    <div className="header-title">{this.props.title}</div>
                </div>
                <div className="header-right">
                    <div className="header-menu-left">{this.props.children}</div>
                    <div className="header-menu-right">{this.props.right && this.props.right}</div>
                </div>
            </div>
        )
    }
}
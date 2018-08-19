import './index.css';
import * as React from 'react';
import { Menu, Icon } from 'antd';
import classnames from 'classnames';
import GoodsInfo from '../goods-info';
import GoodsEdit from '../goods-edit';
import Header from '../../component/header';
import { Redirect, Switch, Route, Link } from 'react-router-dom';

export default class Home extends React.Component {
    headerMenu = [
        { key: 'home' , name: '首页'},
        { key: 'yunying' , name: '运营'},
        { key: 'goods' , name: '商品'}
    ]

    state = {
        showSidebar: true,
        currentHeaderMenu: 'home'
    }

    render() {
        return (
            <div className="home-container">
                <Header className="header-box"
                    title="京东后台"
                    right={this.headerRightRender()}
                    headerIconClick={() => this.setState({showSidebar: !this.state.showSidebar})} >
                    <ul className="header-menu">
                        {this.headerMenu.map((item, index) => 
                            <li key={index}
                                onClick={this.headerMenuClick.bind(this, item.key)}
                                className={classnames({active: this.state.currentHeaderMenu === item.key})}>
                                <span className="span-inner">{item.name}</span>
                            </li>)
                        }
                    </ul>
                </Header>
                <div className="container-box">
                    <div className={classnames('sidebar', {'hide-sidebar': !this.state.showSidebar})}>
                        <Menu mode="inline" 
                            className="sidebar-menu"
                            defaultOpenKeys={['sub1']}
                            defaultSelectedKeys={['1']} >
                            <Menu.SubMenu key="sub1"
                                title={<span><Icon type="appstore" /><span>商品管理</span></span>}>
                                <Menu.Item key="1">
                                    <Link to="/home/info">商品信息</Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/home/edit">编辑信息</Link>
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu key="sub2"
                                title={<span><Icon type="setting" /><span>商品审核</span></span>}>
                                <Menu.Item key="3">审核列表</Menu.Item>
                                <Menu.Item key="4">待审核列表</Menu.Item>
                                <Menu.Item key="5">已审核列表</Menu.Item>
                            </Menu.SubMenu>
                        </Menu>
                    </div>
                    <div className="content">
                        <Switch>
                            <Redirect from="/home" exact to="/home/info" />
                            <Route path="/home/info" component={GoodsInfo} />
                            <Route path="/home/edit" component={GoodsEdit} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }

    headerRightRender() {
        return (
            <ul>
                <li className="menu-user-li">
                    <i className="menu-user-icon icon-notice"></i>
                </li>
                <li className="menu-user-li">
                    <i className="menu-user-icon icon-head"></i>
                    <span className="span-inner">Ding</span>
                </li>
                <li className="menu-user-li">
                    <span className="span-inner">退出</span>
                </li>
            </ul>
        )
    }

    headerMenuClick(menuKey) {
        this.setState({ currentHeaderMenu: menuKey });
    }
}
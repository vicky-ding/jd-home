import './index.css';
import * as React from 'react';
import http from '../../util/http';
import { Input, InputNumber, Switch, Button, Table, message } from 'antd';

export default class GoodsInfo extends React.Component {
    state = {
        list: [],
        loading: false,
        form: {
            title: '',
            url: '',
            icon: '',
            active: false,
            orderval: 1
        }
    }

    columns = [{
        title: '名称',
        align: 'center',
        dataIndex: 'title'
    }, {
        title: '排序值',
        align: 'center',
        dataIndex: 'orderval'
    }, {
        title: '是否上架',
        align: 'center',
        render: row => row.active ? '是' : '否'
    }, {
        title: '图像预览',
        align: 'center',
        render: row => <img style={{width: 100, height: 100}} src={row.icon}/>
    }, {
        width: 300,
        title: '跳转链接',
        align: 'center',
        dataIndex: 'url',
        render: text => <a href="#">{text}</a>
    }, {
        width: 300,
        title: '图像链接',
        align: 'center',
        dataIndex: 'icon'
    }]

    componentWillMount() {
        this.getListData();
    }

    render() {
        return (
            <div className="goods-container">
                <div className="block-box flex">
                    <div className="form-left">
                        <div className="mb-20">
                            <label>名称：</label>
                            <Input value={this.state.form.title} style={{ width: 200 }} placeholder="请输入名称" onChange={e => this.setFormState('title', e.target.value)} />
                            <label style={{ marginLeft: 20 }}>排序值：</label>
                            <InputNumber min={1} style={{ width: 100 }} defaultValue={this.state.form.orderval} value={this.state.form.orderval} onChange={value => this.setFormState('orderval', value)} />
                        </div>
                        <div className="flex mb-20">
                            <label>跳转链接：</label>
                            <Input value={this.state.form.url} style={{ flex: 1 }} placeholder="请输入跳转链接" onChange={e => this.setFormState('url', e.target.value)} />
                        </div>
                        <div className="flex mb-20">
                            <label>图像链接：</label>
                            <Input value={this.state.form.icon} style={{ flex: 1 }} placeholder="请输入图像链接" onChange={e => this.setFormState('icon', e.target.value)} />
                        </div>
                        <div className="flex-between mt-20">
                            <div>
                                <label>是否上架：</label>
                                <Switch checked={this.state.form.active} onChange={checked => this.setFormState('active', checked)} />
                            </div>
                            <div>
                                <Button onClick={this.addOtherApp.bind(this)} type="primary" className="mr-20">添加</Button>
                                <Button>清空</Button>
                            </div>
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="preview">
                            {this.state.form.icon && <img src={this.state.form.icon} />}
                            <p>{this.state.form.title}</p>
                        </div>
                    </div>
                </div>
                <div className="block-box">
                    <Table bordered loading={this.state.loading} rowKey={(record, index) => index} columns={this.columns} dataSource={this.state.list}/>
                </div>
            </div>
        )
    }

    setFormState(key, val) {
        this.state.form[key] = val;
        this.setState({ form: this.state.form });
    }

    getListData() {
        this.setState({loading: true});
        http.post({
            url: '/otherapp/listAll'
        }).then(result => {
            if (result.stat === 'OK') {
                this.setState({ list: result.data.list });
            } else {
                message.error(result.data.message || '出错了');
            }
            this.setState({loading: false});
        }).catch(err => {
            this.setState({loading: false});
            message.error('网络出了问题，请重新尝试~')
        });
    }

    addOtherApp() {
        http.post({
            url: '/otherapp/addOtherApp',
            data: this.state.form
        }).then(result => {
            if (result.stat === 'OK') {
                message.success('添加成功~');
            } else {
                message.error(result.data.message || '出错了');
            }
        }).catch(err => message.error('网络出了问题，请重新尝试~'));
    }
}
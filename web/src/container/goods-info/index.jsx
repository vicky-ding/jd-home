import './index.css';
import * as React from 'react';
import { Input, InputNumber, Switch, Button, Table } from 'antd';

export default class GoodsInfo extends React.Component {
    state = {
        title: '',
        url: '',
        icon: '',
        active: false,
        orderval: 1
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

    data = [{
        key: '0',
        title: '京东金融',
        orderval: 1,
        active: false,
        url: 'http://www.baidu.com',
        icon: 'http://imgtu.5011.net/uploads/content/20170207/4051451486453572.jpg'
    }]

    render() {
        return (
            <div className="goods-container">
                <div className="block-box flex">
                    <div className="form-left">
                        <div className="mb-20">
                            <label>名称：</label>
                            <Input value={this.state.title} style={{ width: 200 }} placeholder="请输入名称" onChange={e => this.setState({ title: e.target.value })} />
                            <label style={{ marginLeft: 20 }}>排序值：</label>
                            <InputNumber min={1} style={{ width: 100 }} defaultValue={this.state.orderval} value={this.state.orderval} onChange={value => this.setState({ orderval: value })} />
                        </div>
                        <div className="flex mb-20">
                            <label>跳转链接：</label>
                            <Input value={this.state.url} style={{ flex: 1 }} placeholder="请输入跳转链接" onChange={e => this.setState({ url: e.target.value })} />
                        </div>
                        <div className="flex mb-20">
                            <label>图像链接：</label>
                            <Input value={this.state.icon} style={{ flex: 1 }} placeholder="请输入图像链接" onChange={e => this.setState({ icon: e.target.value })} />
                        </div>
                        <div className="flex-between mt-20">
                            <div>
                                <label>是否上架：</label>
                                <Switch checked={this.state.active} onChange={checked => this.setState({ active: checked })} />
                            </div>
                            <div>
                                <Button type="primary" className="mr-20">添加</Button>
                                <Button>清空</Button>
                            </div>
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="preview">
                            {this.state.icon && <img src={this.state.icon} />}
                            <p>{this.state.title}</p>
                        </div>
                    </div>
                </div>
                <div className="block-box">
                    <Table bordered columns={this.columns} dataSource={this.data}/>
                </div>
            </div>
        )
    }
}
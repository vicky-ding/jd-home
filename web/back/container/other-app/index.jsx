import './index.css';
import * as React from 'react';
import http from '../../util/http';
import { Input, InputNumber, Switch, Button, Table, message, Breadcrumb, Modal, Form, Select } from 'antd';

export default class OtherApp extends React.Component {
    state = {
        list: [],
        total: 0,        //总共几条数据
        pageSize: 10,     //一页显示几条数据
        current: 1,
        loading: false,
        form: {
            title: '',
            url: '',
            icon: '',
            active: false,
            orderval: 1
        },
        active: '',
        isAdd: true
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
        render: row => <img style={{ width: 100, height: 100 }} src={row.icon} />
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
    }, {
        width: 160,
        title: '操作',
        align: 'center',
        render: row => (
            <div>
                <Button style={{ marginLeft: 10 }} size='small' onClick={this.openDialog.bind(this, false, row)}>编辑</Button>
                <Button style={{ marginLeft: 10 }} type='danger' size='small' onClick={this.delete.bind(this, row)}>删除</Button>
            </div>
        )
    }]

    componentWillMount() {
        // this.getListData();
        this.getListData(this.state.current, this.state.pagination);
        // this.toSelctChange(this.state.current, this.state.pagination);
    }

    render() {
        return (
            <div className="goods-container">
                <Breadcrumb style={{ marginBottom: 20 }}>
                    <Breadcrumb.Item>导航管理</Breadcrumb.Item>
                    <Breadcrumb.Item>导航信息</Breadcrumb.Item>
                </Breadcrumb>
                <Modal
                    okText='确定'
                    cancelText="取消"
                    visible={this.state.visible}
                    title={this.state.isAdd ? '添加记录' : '编辑记录'}
                    onCancel={() => this.setState({ visible: false })}
                    onOk={this.state.isAdd ? this.addOtherApp.bind(this) : this.editOtherApp.bind(this)}>
                    <Form>
                        <div className="flex">
                            <div className="form-left">
                                <div className="flex mb-20">
                                    <label>名称：</label>
                                    <Input value={this.state.form.title} style={{ flex: 1 }} placeholder="请输入名称" onChange={e => this.setFormState('title', e.target.value)} />
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
                                        <label>排序值：</label>
                                        <InputNumber min={1} style={{ width: 100 }} defaultValue={this.state.form.orderval} value={this.state.form.orderval} onChange={value => this.setFormState('orderval', value)} />
                                        <label style={{ marginLeft: 20 }}>是否上架：</label>
                                        <Switch checked={this.state.form.active} onChange={checked => this.setFormState('active', checked)} />
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
                    </Form>
                </Modal>
                <div className="block-box">
                    <label>是否上架：</label>
                    <Select style={{ width: 100 }}
                        defaultValue=""
                        onChange={value => this.setState({ active: value })}>
                        <Select.Option value="">全部</Select.Option>
                        <Select.Option value="1">是</Select.Option>
                        <Select.Option value="0">否</Select.Option>
                    </Select>
                    <Button className="ml-20" onClick={this.getListData.bind(this)}>查询</Button>
                    {/* <Button className="ml-20" onClick={this.toSelctChange.bind(this)}>查询</Button> */}
                    <Button className="ml-20" onClick={this.openDialog.bind(this, true)}>添加</Button>
                </div>

                <div className="block-box">
                    <Table bordered loading={this.state.loading} rowKey={(record, index) => index}
                        columns={this.columns} dataSource={this.state.list}
                        pagination={{
                            total: this.state.total,
                            pageSize: this.state.pageSize,
                            defaultCurrent: this.state.current,
                            showTotal: total => `共 ${total} 条`,
                            onChange: (current, pageSize) => {
                                this.setState({
                                    current: current,
                                    pageSize: pageSize
                                }, () => this.getListData(current, pageSize))
                            }
                        }} />
                </div>
            </div>
        )
    }

    setFormState(key, val) {
        this.state.form[key] = val;
        this.setState({ form: this.state.form });
    }
    // 一开始的查询操作
    // getListData() {
    //     this.setState({ loading: true });
    //     let params = {};
    //     if (this.state.active !== '') {
    //         params.active = this.state.active;
    //     }
    //     http.post({
    //         url: '/otherapp/listAll',
    //         data: params
    //     }).then(result => {
    //         if (result.stat === 'OK') {
    //             let total = result.data.list.length
    //             this.setState({ list: result.data.list, total: total });
    //         } else {
    //             message.error(result.message || '出错了');
    //         }
    //         this.setState({ loading: false });
    //     }).catch(err => {
    //         this.setState({ loading: false });
    //         message.error('网络出了问题，请重新尝试~')
    //     });
    // }

    // 结合分页的查询操作
    getListData() {
        this.setState({ loading: true });
        let params = {};
        if (this.state.active !== '') {
            params.active = this.state.active;
        }
        params.current = this.state.current,
        params.pageSize = this.state.pageSize;

        http.post({
            url: '/otherapp/PageListAll',
            data: params
        }).then(result => {
            if (result.stat === 'OK') {
                this.setState({ list: result.data.list, total: result.data.total });
            } else {
                message.error(result.message || '出错了');
            }
            this.setState({ loading: false });
        }).catch(err => {
            this.setState({ loading: false });
            message.error('网络出了问题，请重新尝试~')
        });
    }


    // toSelctChange(current = 1, pageSize = 10) {
    //     this.setState({ loading: true });
    //     // this.setState({current: current});
    //     // this.setState({pageSize: pageSize});
    //     let params = {};
    //     console.log(',,,')
    //     // params.active = this.state.active,
    //     params.current = this.state.current,
    //     params.pageSize = this.state.pageSize;

    //     http.post({
    //         url: '/otherapp/jd.pageList',
    //         data: params
    //     }).then(result => {
    //         if (result.stat === 'OK') {
    //             this.setState({ list: result.data.list, total: result.data.total });
    //         } else {
    //             message.error(result.message || '出错了');
    //         }
    //         this.setState({ loading: false });
    //     }).catch(err => {
    //         this.setState({ loading: false });
    //         message.error('网络出了问题，请重新尝试~')
    //     });
    // }

    // 添加
    addOtherApp() {
        http.post({
            url: '/otherapp/addOtherApp',
            data: this.state.form
        }).then(result => {
            if (result.stat === 'OK') {
                message.success('添加成功~');
                this.getListData();
            } else {
                message.error(result.message || '出错了');
            }
        }).catch(err => message.error('网络出了问题，请重新尝试~'));
    }

    // 删除记录
    delete(row) {
        self = this;
        Modal.confirm({
            title: '提示',
            content: '确定删除该记录吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                http.post({
                    url: '/otherapp/deleteById',
                    data: {
                        id: row.id
                    }
                }).then(result => {
                    if (result.stat === 'OK') {
                        message.success('删除成功');
                        self.getListData()
                    } else {
                        message.error(result.message || '出错了');
                    }
                }).catch(err => message.error('网络出了问题，请重新尝试~'));
            }
        })

    }

    // 编辑
    editOtherApp() {
        http.post({
            url: '/otherapp/editOtherApp',
            data: this.state.form
        }).then(result => {
            if (result.stat === 'OK') {
                message.success('编辑成功~');
                this.setState({ visible: false });
                this.getListData();
            } else {
                message.error(result.message || '出错了');
            }
        }).catch(err => message.error('网络出了问题，请重新尝试~'));
    }

    openDialog(isAdd, row) {
        let form = {
            title: '',
            url: '',
            icon: '',
            active: false,
            orderval: 1
        }
        if (!isAdd) {
            form = row;
            form.active = !!row.active;
        }
        this.setState({
            isAdd: isAdd,
            visible: true,
            form: form
        })
    }
}
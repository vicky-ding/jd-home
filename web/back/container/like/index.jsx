import './index.css';
import * as React from 'react';
import http from '../../util/http';

import { Breadcrumb, Modal, Form, Input, message, InputNumber, Switch, Select, Button, Table } from 'antd'

export default class Like extends React.Component {
    state = {
        list: [],
        current:1,
        pageSize:10,
        total:0,
        visible: false,
        loading: false,
        form: {
            description:'',
            price:'',
            url: '',
            icon: '',
            active: false,
            orderval: 1
        },
        active: '',
        isAdd: true
    }

    columns = [{
        title:'商品描述',
        align:'center',
        dataIndex:'description'
    },{
        title:'商品价格',
        align:'center',
        dataIndex:'price'
    },{
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
        width: 250,
        title: '跳转链接',
        align: 'center',
        render: row => <a href={row.url} target="_blank">{row.url}</a>
    }, {
        width: 250,
        title: '图像链接',
        align: 'center',
        dataIndex: 'icon'
    }, {
        width: 160,
        title: '操作',
        align: 'center',
        render: row => (
            <div>
                <Button style={{ marginLeft: 10 }} size="small" onClick={this.openDialog.bind(this, false, row)}>编辑</Button>
                <Button style={{ marginLeft: 10 }} type="danger" size="small" onClick={this.delete.bind(this, row)}>删除</Button>
            </div>
            // <div>
            //     <Button style={{ marginLeft: 10 }} size="small">编辑</Button>
            //     <Button style={{ marginLeft: 10 }} type="danger" size="small">删除</Button>
            // </div>
        )
    }]
    componentWillMount() {
        this.getListData();
    }

    render() {
        return (
            <div className="goods-container">
                <Breadcrumb>
                    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                    <Breadcrumb.Item>猜你喜欢</Breadcrumb.Item>
                </Breadcrumb>
                <Modal
                    okText='确定'
                    cancelText='取消'
                    visible={this.state.visible}
                    title={this.state.isAdd ? '添加记录' : '删除记录'}
                    onCancel={() => this.setState({ visible: false })}
                    onOk={this.state.isAdd?this.addLikeGoods.bind(this):this.editLikeGoods.bind(this)}
                >
                    <Form>
                        <div className="flex">
                            <div className="form-left">
                                <div className="flex mb-20">
                                    <label>商品描述：</label>
                                    <Input value={this.state.form.description} style={{ flex: 1 }} placeholder="请输入名称" onChange={e => this.setFormState('description', e.target.value)} />
                                </div>
                                <div className="flex mb-20">
                                    <label>商品价格：</label>
                                    <Input value={this.state.form.price} style={{ flex: 1 }} placeholder="请输入名称" onChange={e => this.setFormState('price', e.target.value)} />
                                </div>
                                <div className="flex mb-20">
                                    <label>跳转链接：</label>
                                    <Input value={this.state.form.url} style={{ flex: 1 }} placeholder="请输入跳转链接" onChange={e => this.setFormState('url', e.target.value)} />
                                </div>
                                <div className="flex mb-20">
                                    <label>图像链接：</label>
                                    <Input value={this.state.form.icon} style={{ flex: 1 }} placeholder="请输入图像链接" onChange={e => this.setFormState('icon', e.target.value)} />
                                </div>
                                <div className="flex mb-20">
                                    <label>相似商品链接</label>
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
                    <Button className="ml-20" onClick={this.openDialog.bind(this, true)}>添加</Button>
                </div>
                <div className="block-box">
                    <Table bordered loading={this.state.loading}
                     rowKey={(record, index) => index} 
                     columns={this.columns} 
                     dataSource={this.state.list} 
                     pagination ={{
                         total: this.state.total,
                         pageSize:this.state.pageSize,
                         showTotal: total => `一共${total}条数据`,
                         onChange: (current, pageSize)=>{
                             this.setState({
                                 current: current,
                                 pageSize: pageSize
                             }, ()=>this.getListData(current, pageSize))
                         }
                     }}/>
                </div>

            </div>
        )   
    }

    setFormState(key, val) {
        this.state.form[key] = val;
        this.setState({ form: this.state.form });
    }

    // 查询
    // getListData() {
    //     this.setState({loading: true});
    //     let params = {};
    //     if (this.state.active !== '') {
    //         params.active = this.state.active;
    //     }
    //     http.post({
    //         url: '/like/listAll',
    //         data: params
    //     }).then(result => {
    //         if (result.stat === 'OK') {
    //             this.setState({ list: result.data.list });
    //         } else {
    //             message.error(result.message || '出错了');
    //         }
    //         this.setState({loading: false});
    //     }).catch(err => {
    //         this.setState({loading: false});
    //         message.error('网络出了问题，请重新尝试~')
    //     });
    // }

    // 结合分页查询
    getListData(){
        this.setState({loading: true})
        let params = {}
        params.active = this.state.active
        params.current = this.state.current
        params.pageSize = this.state.pageSize

        http.post({
            url: '/like/PageListAll',
            data: params
        }).then(
            result =>{
                if(result.stat === 'OK'){
                    this.setState({list: result.data.list, total: result.data.total})                 
                }else{
                    message.error(result.message || '出错了')                   
                } 
                 this.setState({loading:false})
            }
        ).catch(
            err =>{
                this.setState({loading: false}),
                message.error('网络出了问题，请重新尝试~')
            }
        )
    }
    // 添加
    addLikeGoods() {
        http.post({
            url: '/like/addLikeGoods',
            data: this.state.form
        }).then(result => {
            console.log(result)
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
                    url: '/like/deleteById',
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
    editLikeGoods() {
        http.post({
            url: '/like/editLikeGoods',
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
        console.log('openDialog已执行')
    }
}
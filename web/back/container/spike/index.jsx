import './index.css';
import * as React from 'react';
import http from '../../util/http'
import { Breadcrumb, Modal, Table, Form, Input, message, InputNumber, Switch, Select, Button } from 'antd'
export default class Spike extends React.Component {
    state = {
        list: [],
        total: 0,
        current: 1,
        pagSize: 10,
        visible: false,
        loading: false,
        moreLink: '',
        time: '',
        form: {
            url: '',
            icon: '',
            priceNow: '',
            priceBefore: '',
            active: false,
            orderal: 1,
        },
        active: '',
        isAdd: true
    }

    columns = [
        {
            title: '排序值',
            align: 'center',
            dataIndex: 'orderal'
        }, {
            title: '是否上架',
            align: 'center',
            render: row => row.active ? '是' : '否'
        }, {
            title: '图像预览',
            align: 'center',
            render: row => <img style={{ width: 100, height: 100 }} src={row.icon} />
        }, {
            title: '跳转链接',
            align: 'cneter',
            render: row => <a href={row.url} target="_blank">{row.url}</a>
        }, {
            title: '图像链接',
            align: 'center',
            dataIndex: 'icon'
        }, {
            title: '秒杀价格',
            align: 'center',
            dataIndex: 'priceNow',
        }, {
            title: '原价',
            align: 'center',
            dataIndex: 'priceBefore'
        }, {
            width: 160,
            title: '操作',
            align: 'center',
            render: row => (
                <div>
                    <Button style={{ marginLeft: 10 }} size="small" onClick={this.openDialog.bind(this, false, row)}>编辑</Button>
                    <Button style={{ marginLeft: 10 }} type="danger" size="small" onClick={this.delete.bind(this, row)}>删除</Button>        
                </div>
            )
        }]


        componentWillMount() {
            this.getListData(this.state.current,this.state.pageSize);
        }
    
    render() {
        return (
            <div className="goods-container">
                <Breadcrumb>
                    <Breadcrumb.Item>导航管理</Breadcrumb.Item>
                    <Breadcrumb.Item>秒杀倒计时</Breadcrumb.Item>
                </Breadcrumb>
                <Modal
                    okText='确定'
                    cancelText="取消"
                    visible={this.state.visible}
                    title={this.state.isAdd ? '添加记录':'编辑记录'}
                    onCancel={() => this.setState({ visible: false })}
                    onOk={this.state.isAdd ? this.addList.bind(this) : this.editList.bind(this)}
                >
                    <div className="flex">
                        <div className="form-left">
                            <div className="flex mb-20">
                                <label>秒杀价格</label>
                                <Input value={this.state.form.priceNow} 
                                    style={{ flex: 1 }}
                                    placeholder='请输入秒杀价格' 
                                    onChange={e => this.setFormState('priceNow', e.target.value)}>
                                </Input>
                            </div>
                            <div className="flex mb-20">
                                <label>原价</label>
                                <Input value={this.state.form.priceBefore} 
                                    style={{ flex: 1 }}
                                    placeholder='请输入原价' 
                                    onChange={e => this.setFormState('priceBefore', e.target.value)}>
                                </Input>
                            </div>
                            <div className="flex mb-20">
                                <label>跳转链接</label>
                                <Input value={this.state.form.url} 
                                    style={{ flex: 1 }}
                                    placeholder='请输入跳转链接' 
                                    onChange={e => this.setFormState('url', e.target.value)}>
                                </Input>
                            </div>
                            <div className="flex mb-20">
                                <label>图像链接</label>
                                <Input value={this.state.form.icon} style={{ flex: 1 }}
                                    placeholder='请输入图像链接' onChange={e => {
                                        this.setFormState('icon', e.target.value)
                                    }}>
                                </Input>
                            </div>

                                <div className="flex-between mt-20">
                                <div>
                                    <label>排序值：</label>
                                    <InputNumber min={1} style={{ width: 100 }} defaultValue={this.state.form.orderval} value={this.state.form.orderval} onChange={value => this.setFormState('orderval', value)} />
                                    <label style={{ marginLeft: 20 }}>是否上架：</label>
                                    <Switch checked={this.state.form.active} onChange={active => this.setFormState('active', active)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-right">
                            <div className="preview">
                                {this.state.form.icon && <img src={this.state.form.icon} />}
                            </div>
                        </div>
                    </div>
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
                        pagination={{
                            total: this.state.total,
                            pageSize: this.state.pageSize,
                            showTotal: total => `一共${total}条数据`,
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
    // 结合分页查询
    getListData() {
        this.setState({ loading: true })
        let params = {}
        params.current = this.state.current
        params.active = this.state.active
        params.pageSize = this.state.pagSize

        http.post({
            url: '/spike/pageListAll',
            data: params
        }).then(
            result => {
                if (result.stat === 'OK') {
                    this.setState({ list: result.data.list, total: result.data.total })
                } else {
                    message.error(result.message || '出错了')
                }
                this.setState({ loading: false })
            }
        ).catch(
            err => {
                this.setState({ loading: false })
                message.error('网络出了问题，请重新尝试~')
            }
        )
    }
    // 添加
    addList() {
        http.post({
            url: '/spike/addList',
            data: this.state.form
        }).then(result => {
            if (result.stat === 'OK') {
                message.success('添加成功')
                this.getListData()
            } else {
                message.error(result.message || '出错了')
            }
        }).catch(err => message.error('网络出了问题，请重新尝试~'))
    }
    // 删除
    deleteById(row) {
        self = this,
            Modal.confirm({
                title: '提示',
                content: '确定删除这条记录吗？',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    http.post({
                        url: '/spike/deleteById',
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
                    }).catch(err => message.error('网络出了问题，请重新尝试~'))
                }
            })
    }
    // 编辑
    editList() {
        http.post({
            url: '/like/editList',
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
            url: '',
            icon: '',
            priceNow: '',
            priceBefore: '',
            active: false,
            orderal: 1,
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

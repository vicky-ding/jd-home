import './index.css';
import * as React from 'react';
import SwiperForm from './form';
import http from '../../util/http';
import { Input, InputNumber, Switch, Button, Table, message, Breadcrumb, Modal, Select, Form } from 'antd';

export default class Swiper extends React.Component {
    state = {
        list: [],
        total: 0,        //总共几条数据
        pageSize: 10,     //一页显示几条数据
        current: 1,
        visible: false,
        loading: false,
        form: {
            url: '',
            icon: '',
            active: false,
            orderval: 1
        },
        active: '',
        isAdd: true
    }

    columns = [{
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
        render: row => <a href={row.url} target="_blank">{row.url}</a>
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
                <Button style={{marginLeft: 10}} size="small" onClick={this.openDialog.bind(this, false, row)}>编辑</Button>
                <Button style={{marginLeft: 10}} type="danger" size="small" onClick={this.delete.bind(this, row)}>删除</Button>
            </div>
        )
    }]

    componentWillMount() {
        this.getListData(this.state.current,this.state.pageSize);
    }

    renderForm() {

    }

    render() {
        return (
            <div className="goods-container">
                <Breadcrumb style={{marginBottom: 20}}>
                    <Breadcrumb.Item>导航管理</Breadcrumb.Item>
                    <Breadcrumb.Item>轮播图信息</Breadcrumb.Item>
                </Breadcrumb>
                <Modal 
                    okText='确定'
                    cancelText="取消"
                    visible={this.state.visible}
                    title={this.state.isAdd ? '添加记录':'编辑记录'}
                    onCancel={() => this.setState({ visible: false })}
                    onOk={this.state.isAdd ? this.addSwiper.bind(this):this.editSwiper.bind(this)}>
                    <div className="flex">
                        <div className="form-left">
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
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className="block-box">
                    <label>是否上架：</label>
                    <Select style={{width: 100}}
                        defaultValue=""
                        onChange={value => this.setState({active: value})}>
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
                         total:this.state.total,
                         pageSize:this.state.pageSize,
                         defaultCurrent:this.state.current,
                         showTotal: total => `共${total}条数据`,
                         onChange: (current,pageSize)=>{
                             this.setState({
                                current: current,
                                pageSize: pageSize
                             },()=> this.getListData(current,pageSize))
                         }
                     }
                     }/>
                </div>
                {/* <SwiperForm
                    onCreate={this.addSwiper}
                    visible={this.state.visible}
                    title={this.state.isAdd?'添加记录':'编辑记录'}
                    onCancel={() => this.setState({ visible: false })}/> */}
            </div>
        )
    }

    setFormState(key, val) {
        this.state.form[key] = val;
        this.setState({ form: this.state.form });
    }

    // getListData() {
    //     this.setState({loading: true});
    //     let params = {};
    //     if (this.state.active !== '') {
    //         params.active = this.state.active;
    //     }
    //     http.post({
    //         url: '/swiper/listAll',
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
        this.setState({loading:true})
        let params = {}

        params.active = this.state.active
        params.current = this.state.current
        params.pageSize = this.state.pageSize
        http.post({
            url: '/swiper/jd.pageListAll',
            data: params
        }).then(
            result =>{
                if(result.stat === 'OK'){
                    this.setState({list: result.data.list, count: result.data.total})
                    this.setState({loading:false})
                }else{
                    this.setState({loading: false})
                    message.error(result.message || '出错了')
                }
            }
        ).catch(err=>{
            this.setState({loading: false})
            message.error('网络出了问题，请重新尝试~')
        })

    }

    addSwiper() {
        http.post({
            url: '/swiper/addSwiper',
            data: this.state.form
        }).then(result => {
            if (result.stat === 'OK') {
                message.success('添加成功~');
                this.setState({visible: false});
                this.getListData();
            } else {
                message.error(result.message || '出错了');
            }
        }).catch(err => message.error('网络出了问题，请重新尝试~'));
    }

    editSwiper() {
        http.post({
            url: '/swiper/editSwiper',
            data: this.state.form
        }).then(result => {
            if (result.stat === 'OK') {
                message.success('编辑成功~');
                this.setState({visible: false});
                this.getListData();
            } else {
                message.error(result.message || '出错了');
            }
        }).catch(err => message.error('网络出了问题，请重新尝试~'));
    }

    delete(row) {
        let me = this;
        Modal.confirm({
            title: '提示',
            content: '确定删除该条记录吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                http.post({
                    url: '/swiper/deleteById',
                    data: {
                        id: row.id
                    }
                }).then(result => {
                    if (result.stat === 'OK') {
                        message.success('删除成功~');
                        me.getListData();
                    } else {
                        message.error(result.message || '出错了');
                    }
                }).catch(err => message.error('网络出了问题，请重新尝试~'));
            }
        })
    }

    openDialog(isAdd, row) {
        let form = {
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
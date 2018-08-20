import './index.css';
import * as React from 'react';
import classnames from 'classnames';
import { Breadcrumb, Input, Select, DatePicker, Button, Pagination, Menu, Checkbox } from 'antd'
const Option = Select.Option
export default class GoodsInfo extends React.Component {
    ListheadMenu = [
        { key: 'upGoods', name: '上架' },
        { key: 'downGoods', name: '下架' },
        { key: 'invalid', name: '置为无效' },
        { key: 'valid', name: '恢复有效' },
        { key: 'nolimit', name: '不备货限制' }
    ]
    state = {
        current: 'upGoods'
    }
    goods = [
        { jdID: '12345', ptID: '123434', name: '奶粉', title: '图片1', source: '自营', logo: '美素佳儿', price: 450, state: '上架', spStatus: '上架待审批' },
        { jdID: '12345', ptID: '123434', name: '奶粉', title: '图片1', source: '自营', logo: '美素佳儿', price: 450, state: '上架', spStatus: '上架待审批' },
        { jdID: '12345', ptID: '123434', name: '奶粉', title: '图片1', source: '自营', logo: '美素佳儿', price: 450, state: '上架', spStatus: '上架待审批' },
        { jdID: '12345', ptID: '123434', name: '奶粉', title: '图片1', source: '自营', logo: '美素佳儿', price: 450, state: '上架', spStatus: '上架待审批' },
        { jdID: '12345', ptID: '123434', name: '奶粉', title: '图片1', source: '自营', logo: '美素佳儿', price: 450, state: '上架', spStatus: '上架待审批' },

    ]
    count = 0
    render() {
        return (
            <div className="goods-container">
                <div className="content-first">
                    <Breadcrumb>
                        <Breadcrumb.Item><a href='#'>商品管理</a></Breadcrumb.Item>
                        <Breadcrumb.Item><a href='#'>商品信息</a></Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="content-form goods-info">
                    <div>
                        <span className="form-item" key="1">京东SKUID：<Input className="form-input" style={{ width: "200px" }} /></span>
                        <span className="form-item" key="2">平台SKUID：<Input className="form-input" style={{ width: "210px" }} /></span>
                        <span className="form-item" key="3">商品名称：<Input className="form-input" style={{ width: "200px" }} /></span>
                    </div>
                    <div>
                        <span className="form-item" key="4">商品来源：
                            <Select defaultValue="京东自营" className="form-input" style={{ marginLeft: '9px', width: '200px' }}>
                                <Select.Option value="良心商铺" >良心商铺</Select.Option>
                                <Select.Option value="小麦商铺" >小麦商铺</Select.Option>
                                <Select.Option value="京东自营" >京东自营</Select.Option>
                            </Select>
                        </span>

                        <span className="form-item" key="5">所属类目：
                            <Select className="form-input" defaultValue="请选择" style={{ width: 129 }} >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>Disabled</Option>
                                <Option value="yiminghe">Yiminghe</Option>
                            </Select>
                            <Select className="form-input" defaultValue="请选择" style={{ width: 129 }} >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>Disabled</Option>
                                <Option value="yiminghe">Yiminghe</Option>
                            </Select>
                            <Select className="form-input" defaultValue="请选择" style={{ width: 129 }} >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>Disabled</Option>
                                <Option value="yiminghe">Yiminghe</Option>
                            </Select>
                        </span>

                        <span className="form-item" key="6">商品名称：
                            <Input className="form-input" style={{ width: "142px" }} /></span>
                    </div>

                    <div>
                        <span className="form-item" key="7">产品经理：<Input className="form-input" style={{ width: "150px" }} /></span>
                        <span className="form-item" key="8">产品所有人：<Input className="form-input" style={{ width: "210px" }} /></span>
                        <span className="form-item" key="9">平台商品状态 : <Input className="form-input" style={{ width: "140px" }} /></span>
                    </div>

                    <div>
                        <span className="form-item" key="7">
                            发布时间：<DatePicker className="form-input" style={{ width: "170px" }} />
                            至<DatePicker className="form-input" style={{ width: "170px" }} />
                        </span>
                        <span className="form-item" key="8">
                            <Button type="primary" classame="form-btn">查询</Button>
                        </span>
                        <span className="form-item" key="9">
                            <Button classame="form-btn">重置</Button>
                        </span>
                    </div>
                </div>

                <div className="content-list goods-info">
                    <div className="content-list-head">
                        <ul className="list-head-left">
                            {
                                this.ListheadMenu.map((item) =>
                                    <li key={item.key}
                                        onClick={this.handleClicklist.bind(this, item.key)}
                                        className={classnames({ active: this.state.current === item.key })}>
                                        <span>{item.name}</span>
                                    </li>)
                            }
                        </ul>
                        <div className="list-head-right">
                            <Button className='list-head-button'>
                                <i className="menu-user-icon icon-icon1"></i>
                                <span className="span-inner">批量发布</span>
                            </Button>

                            <Button className='list-head-button'>
                                <i className="menu-user-icon icon-icon2"></i>
                                <span className="span-inner">发布商品</span>
                            </Button>
                        </div>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                    <div className="content-list-body">
                        <div className="list-body-title">
                            <span className="item-span1"><Checkbox></Checkbox> </span>
                            <span className="list-body-item item-span2">京东SKUID</span>
                            <span className="list-body-item item-span3">平台SKUID</span>
                            <span className="list-body-item item-span4">商品名称</span>
                            <span className="list-body-item item-span5">商品主题</span>
                            <span className="list-body-item item-span6">品牌</span>
                            <span className="list-body-item item-span7">来源</span>
                            <span className="list-body-item item-span8">平台价</span>
                            <span className="list-body-item item-span9">平台商品状态</span>
                            <span className="list-body-item item-span10">审批状态</span>
                            <span className="list-body-item item-span11">操作</span>
                        </div>
                        <div className="list-body-content">
                            {
                                this.goods.map((item) => {
                                    return (
                                        <div key={'listbody'+ this.count++} className="list-body-allitems">
                                            <span className="item-span1"><Checkbox></Checkbox> </span>
                                            <span className="list-body-item item-span2">{item.jdID}</span>
                                            <span className="list-body-item item-span3">{item.ptID}</span>
                                            <span className="list-body-item item-span4">{item.name}</span>
                                            <span className="list-body-item item-span5">{item.title}</span>
                                            <span className="list-body-item item-span6">{item.logo}</span>
                                            <span className="list-body-item item-span7">{item.source}</span>
                                            <span className="list-body-item item-span8">{item.price.toFixed(2)}</span>
                                            <span className="list-body-item item-span9">{item.state}</span>
                                            <span className="list-body-item item-span10">{item.spStatus}</span>
                                            <span className="list-body-item item-span11">
                                                <span className ="moreInfo"><a href="#">详情</a></span>
                                                <span className = "edit"><a href="#">编辑</a></span>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="content-list-footer">
                        <Pagination defaultCurrent={3} total={500} />
                    </div>
                </div>
            </div>

        )
    }
    handleClicklist(menukey) {
        this.setState({ current: menukey })
    }
}
import * as React from 'react';
import { Modal, Form, Input, InputNumber, Switch } from 'antd';

const FormItem = Form.Item;

class SwiperForm extends React.Component {
    componentWillMount() {
        console.log(this.props)
    }

    render() {
        const { visible, onCancel, onCreate, title, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                onOk={onCreate}
                onCancel={onCancel}
                okText="确定"
                cancelText="取消"
                title={title} >
                <Form layout="vertical">
                    <div className="flex">
                        <div className="form-left">
                        <FormItem className="flex mb-20" label="名称：">
                                {getFieldDecorator('url', {
                                    rules: [{ required: true, message: '名称不能为空' }],
                                })(
                                    <Input style={{ flex: 1 }} placeholder="请输入名称" />
                                )}
                            </FormItem>
                            <FormItem className="flex mb-20" label="跳转链接：">
                                {getFieldDecorator('url', {
                                    rules: [{ required: true, message: '跳转链接不能为空' }],
                                })(
                                    <Input style={{ flex: 1 }} placeholder="请输入跳转链接" />
                                )}
                            </FormItem>
                            <FormItem className="flex mb-20" label="图像链接：">
                                {getFieldDecorator('icon', {
                                    rules: [{ required: true, message: '图像链接不能为空' }],
                                })(
                                    <Input style={{ flex: 1 }} placeholder="请输入图像链接" />
                                )}
                            </FormItem>
                            <div className="flex-between mt-20">
                                <FormItem className="flex mb-20" label="排序值：">
                                    {getFieldDecorator('orderval')(
                                        <InputNumber min={1} style={{ width: 100 }} />
                                    )}
                                </FormItem>
                                <FormItem className="flex mb-20" label="是否上架：">
                                    {getFieldDecorator('active')(
                                        <Switch />
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="form-right">
                            <div className="preview">
                                {form.icon && <img src={form.icon} />}
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(SwiperForm)
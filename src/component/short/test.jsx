import React from 'react';
import { Input, Modal, Form } from 'antd';
import styles from './UserModal.less';

const FormItem = Form.Item;

@Form.create({})
class UserModal extends React.PureComponent {

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevProps.visible) {
      prevProps.form.resetFields();
    }
  };

  handleOk = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'demo/update',
        payload: {
          currentItem: fieldsValue
        }
      });
    });
  }

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'demo/hideModal'
    })
  }

  render() {
    const { currentItem, form, visible } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const { getFieldDecorator } = form;
    return (
      <div className={styles.root}>
        <Modal
          title="编辑"
          visible={visible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <Form>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('name', {
                initialValue: currentItem.name,
                rules: [{
                  required: true, message: 'Please input your name!',
                }],
              })(
                <Input placeholder="请输入用户名" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="年龄"
            >
              {getFieldDecorator('age', {
                initialValue: currentItem.age,
                rules: [{
                  required: true, message: 'Please input your age!',
                }],
              })(
                <Input placeholder="请输入年龄" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="地址"
            >
              {getFieldDecorator('address', {
                initialValue: currentItem.address,
                rules: [{
                  required: true, message: 'Please input your address!',
                }],
              })(
                <Input placeholder="请输入地址" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default UserModal;
// export default (Form.create({})(UserModal));



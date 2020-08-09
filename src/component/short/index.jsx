import React, { Component } from 'react'
import { Form, Input, Button,Divider,Table } from 'antd';

export default class index extends Component {
    render() {
        const dataSource = [
            {
                key:'1',
                edit:'编辑',
                short: "https://d.imgo.tv/U", 
                url: "http://www.mgtv.com/imexpireURL", 
                user_id:'test',
                user_id:'1',
                app_name:'name'
            }
        ]
        const columns = [
            {
              title: '操作',
              dataIndex: 'edit',
              key: 'edit',
            },
            {
              title: '短链',
              dataIndex: 'short',
              key: 'short',
            },
            {
              title: 'URL',
              dataIndex: 'url',
              key: 'url',
            },
            {
                title: '用户',
                dataIndex: 'user_id',
                key: 'user_id',
            },
            {
                title: '应用',
                dataIndex: 'app_name',
                key: 'app_name',
            },
          ];
        return (
            <div>
                <Form 
                    layout="inline"
                    name="basic"
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="URL"
                        name="URL"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 600}} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            生成
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation='left'>生成短链列表</Divider>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}

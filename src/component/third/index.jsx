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
              title: '应用名称',
              dataIndex: 'edit',
              key: 'edit',
            },
            {
              title: 'Token',
              dataIndex: 'short',
              key: 'short',
            },
            {
              title: '域名白名单',
              dataIndex: 'url',
              key: 'url',
            },
            {
                title: '操作',
                dataIndex: 'user_id',
                key: 'user_id',
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
                        name="AppName"
                        rules={[{ required: true, message: 'Please input your AppName!' }]}
                    >
                        <Input style={{ width: 200}} placeholder='应用名称' />
                    </Form.Item>
                    <Form.Item
                        name="URL"
                        rules={[{ required: true, message: 'Please input your URL!' }]}
                    >
                        <Input style={{ width: 600}} placeholder='长链域名白名单 多个用逗号 , 分开，非白名单域名禁止生成短链,如: m.mgtv.com'/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            生成
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation='left'>生成应用列表</Divider>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        )
    }
}

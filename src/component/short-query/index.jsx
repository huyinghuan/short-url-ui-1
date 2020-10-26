import React, { Component } from 'react'
import { Form, Input, Button, Divider, Table, Space } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { fetchAPI } from '../../service/index';

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            loading: true
        }
    }
    columns = [
        {
            title: '操作',
            key: "edit",
            align: 'center',
            width: 150,
            render: (text, record) => {
                let href = [this.props.location.pathname, record.short_id].join("/");
                return (
                    <Space size="middle">
                        <Button icon={<FormOutlined />} type="link" onClick={() => { this.goto(href, record) }}>编辑</Button>
                    </Space>
                )
            }
        },
        {
            title: '短链',
            dataIndex: 'short',
            key: 'short',
            width: 300,
            align: 'center'
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            ellipsis: true,
        },
        {
            title: '用户',
            dataIndex: 'user_id',
            key: 'user_id',
            width: 150,
            align: 'center'
        },
    ];
    query(url) {
        fetchAPI(`/short/query/any?url=${url}`, { method: "GET" }).then((data) => {
            this.setState({ dataSource: data.data, loading: false })
        }).catch((e) => {
            console.log(e);
        })
    }
    onFinish(val) {
        this.query(val.url)
        // console.log(val.url);
    }
    render() {
        return (
            <div>
                <Form
                    layout="inline"
                    name="basic"
                    onFinish={this.onFinish.bind(this)}
                >
                    <Form.Item
                        name="url"
                        rules={[{ required: true, message: 'Please input your url!' }]}
                    >
                        <Input style={{ width: 600 }} placeholder='URL' />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            查询
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation='left'>查询结果</Divider>
                <Table dataSource={this.state.dataSource} columns={this.columns} rawKey="short_id" />
            </div>
        )
    }
}

import React, { Component } from 'react'
import { Form, Input, Button, Divider, Table, Space } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router'
import { fetchAPI } from '../../service/index';
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            page: {
                index: 1,
                pageSize: 10,
                total: 56,
                pageTotal: 6
            },
            loading: true
        }
        this.LoadData(1, this.state.page.pageSize)
    }

    LoadData(pageIndex, pageSize) {
        fetchAPI(`/short/my/list?pageIndex=${pageIndex}&pageSize=${pageSize}`, { method: "GET" }).then((data) => {
            this.setState({ dataSource: data.data, page: data.page, loading: false })
        }).catch((e) => {
            this.setState({ loading: false })
        })
    }
    goto(href, record) {
        this.props.history.push(href)
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
    OnChange(e) {
        let page = this.state.page
        page.index = e.current
        page.pageSize = e.pageSize
        this.setState({ page })
        this.LoadData(e.current)
    }
    onFinish(val) {
        console.log(val);
        fetchAPI(`/short`, { method: "POST" }, val).then(() => {
            this.LoadData(1)
        })
    }
    render() {
        return (
            <div>
                <Form
                    layout="inline"
                    name="basic"
                    onFinish={this.onFinish.bind(this)}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="URL"
                        name="URL"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 600 }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            生成
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation='left'>生成短链列表</Divider>
                <Table
                    rowKey="short_id"
                    loading={this.state.loading}
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        total: this.state.page.total,
                        pageSizeOptions: [10, 20, 50]
                    }}
                    onChange={this.OnChange.bind(this)}
                />
            </div>
        )
    }
}
export default withRouter(index)
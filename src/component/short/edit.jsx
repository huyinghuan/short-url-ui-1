import React, { Component } from 'react'
import { Form, Input, Button,Divider,Table,Select} from 'antd';
import { get } from '../../service/index';
const { Option } = Select;
export default class edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSource:[]
        }
        console.log(props);
        this.LoadData()
    }
    LoadData(){
        let id = this.props.match.params.id
        get(`/short/${id}`, {method:"GET"}).then((data)=>{
            console.log(data);
            this.setState({dataSource:data})
        }).catch((e)=>{
            console.log(e);
        })
    }
    dataSource = [
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
    columns = [
        {
            title: '描述',
            key:"describe",
            dataIndex: 'describe',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
        },
        {
          title: '比例',
          dataIndex: 'ratio',
          key: 'ratio',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
        },

    ];
    render() {
        return (
            <div>
                <Form 
                    layout="inline"
                    name="basic"
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        // initialValue={}
                        name="short"
                        // rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 200}} readOnly="readonly" placeholder={this.state.dataSource.short}/>
                    </Form.Item>
                    <Form.Item
                        initialValue={this.state.dataSource.url}
                        name="url"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 300}} />
                    </Form.Item>
                    <Form.Item  label='分流'>
                    <Select
                    
                        placeholder="Select "
                        style={{ width: 120, margin: '0 8px' }}
                    >
                        <Option value="forbi">禁用</Option>
                        <Option value="IP">IP</Option>
                        <Option value="UserAgent">UserAgent</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            应用
                        </Button>
                    </Form.Item>
                </Form>
                <Divider></Divider>
                <Form 
                    layout="inline"
                    name="basic"
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="short"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 200}} placeholder='描述'/>
                    </Form.Item>
                    <Form.Item
                        name="url"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 300}} placeholder='url' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
                <Divider></Divider>
                <Table dataSource={this.dataSource} columns={this.columns} />
            </div>
        )
    }
}

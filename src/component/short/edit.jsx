import React, { Component } from 'react'
import { Form, Input, Button,Divider,Table,Select,notification,InputNumber,Popconfirm } from 'antd';
import { get } from '../../service/index';
import {DeleteOutlined} from '@ant-design/icons';
const { Option } = Select;
export default class edit extends Component {
    constructor(props){
        super(props)
        this.LoadData()
        this.state = {
            dataSource:[],
            List:[]
        }
        // console.log(props);
        this.loadList()
    }
    loadList(){
        get(`/short/${this.props.match.params.id}/tag`, {method:"GET"}).then((data)=>{
            console.log(data);
            data.forEach(item=>{
                item.key = item.id
            })
            this.setState({List:data})
        }).catch((e)=>{
            console.log(e);
        })
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
    del(id){
        get(`/short/${this.props.match.params.id}/tag/${id}`,{ method: "DELETE" }).then(()=>{
            notification.success({
                message: '操作成功',
                placement: 'topRight',
                duration: 3,
            });
            this.loadList()
        })
    }
    columns = [
        {
            title: '描述',
            key:"desc",
            dataIndex: 'desc',
            align:'center'
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
        },
        {
          title: '比例',
          dataIndex: 'proportion',
          key: 'proportion',
          align:'center'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(_,record)=>{
                let Listid = record.id
                return(
                    <Popconfirm placement="topLeft" title="确认删除?" onConfirm={()=>{this.del(record.id)}} okText="Yes" cancelText="No">
                        <Button danger icon={<DeleteOutlined />} type="link"  >删除</Button>
                    </Popconfirm>
                )
            },
            align:'center'
        },

    ];
    onFinish(val){
        console.log(val);
        let id = this.props.match.params.id
        switch(val.params){
            case '禁用':
                val.params = ''
                break;
            case 'UserAgent':
                val.params = 'ua'
                break;
            default:
                val.params = 'ip'
                break;
            
        }
        let v = {
            id:id,
            url:val.url,
            params:val.params,
            status: true
        }
        get(`/short/${id}`,{method:'PUT'},v).then(()=>{
            notification.success({
                message: '操作成功',
                placement: 'topRight',
                duration: 3,
            });
        }).catch((e)=>{

        })
    }
    onChange(val){
        console.log(val);
    }

    descFinish(val){
        get(`/short/${this.props.match.params.id}/tag`,{method:'POST'},val).then(()=>{
            notification.success({
                message: '操作成功',
                placement: 'topRight',
                duration: 3,
            });
            this.loadList()
        }).catch((e)=>{

        })

    }
    
    render() {
        const url = this.state.dataSource.url
        return (
            <div>
                <Form 
                    layout="inline"
                    name="basic"
                    onFinish={this.onFinish.bind(this)}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        // initialValue={}
                        name="short"
                        rules={[{ required: true, message: 'Please input the short-url!' }]}
                    >
                        <Input style={{ width: 200}}  placeholder={this.state.dataSource.short}/>{/*readOnly="readonly"*/ }
                    </Form.Item>
                    <Form.Item
                        initialValue={url}
                        // resetFields={this.reset(initialValue)}
                        name="url"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 600}} placeholder={url}/>
                    </Form.Item>
                    <Form.Item  label='分流' rules={[{ required: true }]} name='params'>
                    <Select
                        placeholder="Select"
                        onChange={this.onChange}
                        style={{ width: 120, margin: '0 8px' }}
                    >
                        <Option value="禁用" >禁用</Option>
                        <Option value="ip">IP</Option>
                        <Option value="UserAgent">UserAgent</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={()=>{}}>
                            应用
                        </Button>
                    </Form.Item>
                </Form>
                <Divider></Divider>
                <Form 
                    layout="inline"
                    name="basic"
                    onFinish={this.descFinish.bind(this)}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="desc"
                        rules={[{ required: true, message: 'Please make some descriptions!' }]}
                    >
                        <Input style={{ width: 200}} placeholder='描述'/>
                    </Form.Item>
                    <Form.Item
                        name="url"
                        rules={[{ required: true, message: 'Please input the url!' }]}
                    >
                        <Input style={{ width: 300}} placeholder='url' />
                    </Form.Item>
                    <Form.Item
                        name="proportion"
                    >
                       <InputNumber
                            defaultValue={0}
                            min={0}
                            max={100}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            // onChange={onChange}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
                <Divider></Divider>
                <Table dataSource={this.state.List} columns={this.columns} />
            </div>
        )
    }
}

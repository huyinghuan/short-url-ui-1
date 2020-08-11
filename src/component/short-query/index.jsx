import React, { Component } from 'react'
import { Form, Input, Button,Divider,Table,Typography} from 'antd';
import {FormOutlined} from '@ant-design/icons';
import { get } from '../../service/index';
import {FormatData} from '../../assets/js/FormatData'
const { Paragraph } = Typography;

export default class index extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSource:[],
            loading:true
        }
    }
    columns = [
        {
            title: '操作',
            key:"edit",
            dataIndex: 'edit',
            width:150,
            align:'center',
            render:(text, record)=>{
                return (
                    <div>
                        <Button icon={<FormOutlined />} type="link" onClick={()=>{this.goto()}}>编辑</Button>
                    </div>
                )
            }
        },
        {
            title: '短链',
            dataIndex: 'short',
            key: 'short',
            width:300,
            align:'center',
            render:(val,record,index)=>{
                return(
                <Paragraph copyable>{val}</Paragraph>

                )
            }
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            // textWrap: 'word-break',
            ellipsis: true,
        },
        {
            title: '用户',
            dataIndex: 'user_id',
            key: 'user_id',
            width:150,
            align:'center'
        },
        {
            title: '应用',
            dataIndex: 'app_name',
            key: 'app_name',
            width:150,
            align:'center'
        },
    ];
    query(url){
        get(`/short/query/any?url=${url}`, {method:"GET"}).then((data)=>{
            console.log(FormatData(data));
            this.setState({dataSource:FormatData(data),loading:false})
        }).catch((e)=>{
            console.log(e);
        })
    }
    onFinish(val){
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
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="url"
                        rules={[{ required: true, message: 'Please input your url!' }]}
                    >
                        <Input style={{ width: 600}} placeholder='URL'/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            查询
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation='left'>查询结果</Divider>
                <Table dataSource={this.state.dataSource} columns={this.columns} />
            </div>
        )
    }
}

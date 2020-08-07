import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import {
  FileTextOutlined,
  SearchOutlined,
  EditOutlined,
  KeyOutlined

} from '@ant-design/icons';
import Short from '../short/'
// import {Route, Switch, Link} from 'react-router-dom';
import './index.scss'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default class index extends Component {
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    menuClick(item){
        let queue = [this.props.match.path]
        if(item.key !== "home"){
            queue.push(item.key)
        }
        this.props.history.push(queue.join("/"))
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"><img src={require('../../assets/images/logo.png')} alt=''/></div>
                    <Menu 
                        theme="dark" 
                        defaultSelectedKeys={['1']} 
                        mode="inline" 
                        onClick={(item, key)=>{this.menuClick(item, key)}}
                    >
                        <Menu.Item key="short" icon={<FileTextOutlined />}>
                            短链生成
                        </Menu.Item>
                        <Menu.Item key="short-query" icon={<EditOutlined />}>
                            短链查询与修改
                        </Menu.Item>
                        <Menu.Item key="app-query" icon={<SearchOutlined />}>
                            应用生成短链查询
                        </Menu.Item>
                        <Menu.Item key="third" icon={<KeyOutlined />}>
                            第三方API Token申请
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Short />
                            </div>
                        </Content>
                    <Footer style={{ textAlign: 'center' }}> MGTV</Footer>
                </Layout>
            </Layout>
        )
    }
}

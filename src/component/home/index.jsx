import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import {
  FileTextOutlined,
  SearchOutlined,
  EditOutlined,
  KeyOutlined

} from '@ant-design/icons';
import Short from '../short/'
import {Route, Switch, Link, withRouter} from 'react-router-dom';
import ShortQuery from '../short-query'
import AppQuery from '../app-query'
import Third from '../third'
import './index.scss'
const { Header, Content, Footer, Sider } = Layout;
class index extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        };
        console.log(props);
    }
    
    

    menuClick(item){
        let queue = [this.props.match.path]
        // if(item.key !== "home"){
        //     queue.push(item.key)
        // }
        // this.props.history.push(queue.join("/"))
        console.log(queue);
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider>
                    <div className="logo"><img src={require('../../assets/images/logo.png')} alt=''/></div>
                    <Menu 
                        theme="dark" 
                        defaultSelectedKeys={['1']} 
                        mode="inline" 
                        onClick={(item, key)=>{this.menuClick(item, key)}}
                    >
                        <Menu.Item key="short" icon={<FileTextOutlined />}>
                            <Link to='/short'>短链生成</Link>
                        </Menu.Item>
                        <Menu.Item key="short-query" icon={<EditOutlined />}>
                            <Link to='/short-query'>短链查询与修改</Link>
                        </Menu.Item>
                        
                        <Menu.Item key="app-query" icon={<SearchOutlined />}>
                            <Link to='/app-query'>应用生成短链查询</Link>
                        </Menu.Item>
                        <Menu.Item key="third" icon={<KeyOutlined />}>
                            <Link to='/third'>第三方API Token申请</Link>
                        </Menu.Item>
                        
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {/* <Short /> */}
                            <Switch>
                                <Route path='/short' component={Short} />
                                <Route path='/short-query' component={ShortQuery} />
                                <Route path='/app-query' component={AppQuery} />
                                <Route path='/third' component={Third} />
                            </Switch>
                            </div>
                        </Content>
                    <Footer style={{ textAlign: 'center' }}> MGTV</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default index

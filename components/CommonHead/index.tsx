import React, { Component } from 'react';
import { NextPage } from 'next';
import './index.less';
import Link from 'next/link';
import { Menu, Badge, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Router, { withRouter } from 'next/router';
import NProgress from 'nprogress';
import '../../assets/np.less';
const { SubMenu } = Menu;

interface HeadProps {
    router: any;
}

interface State {
    current: string;
}
const homeRouterArr: string[] = [
    'home',
    'footballScore',
    'basketball',
    'ESports',
    'recommend',
    'information',
    'dataInfo',
    'down',
];

class CommonHead extends Component<HeadProps, State> {
    constructor(props: any) {
        super(props);
        const pathname: string =
            props.router && props.router.pathname
                ? props.router.pathname.split('/')[1]
                : '';
        this.state = {
            current: homeRouterArr.indexOf(pathname) > -1 ? pathname : 'home',
        };
    }
    handleClick = (e: any) => {
        // this.setState({ current: e.key });
    };
    componentDidMount() {
        Router.events.on('routeChangeStart', (...args) => {
            console.log('1.routeChangeStart->路由开始变化,参数为:', ...args);
            NProgress.start();
        });
        Router.events.on('routeChangeComplete', (...args) => {
            //防止接口报错路径已经跳转了 但是当前选中项没有跳转成功
            NProgress.done();
            const { router } = this.props;
            const pathname: string =
                router && router.pathname ? router.pathname.split('/')[1] : '';
            this.setState({
                current: homeRouterArr.indexOf(pathname) > -1 ? pathname : 'home',
            });
            console.log('2.routeChangeComplete->路由结束变化,参数为:', ...args);
        });
        Router.events.on('routeChangeError', (...args) => {
            NProgress.done();
            console.log('4,routeChangeError->跳转发生错误,参数为:', ...args);
        });
    }
    public render() {
        const { current } = this.state;
        return (
            <header className="header-wrap">
                <div className="header-logo-menu-box">
                    <div className="logo-box">
                        <Link href="/">
                            <h1>NEITU</h1>
                        </Link>
                    </div>
                    <div className="menu-box">
                        <Menu
                            onClick={e => this.handleClick(e)}
                            selectedKeys={[current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="home">
                                <Link href="/">
                                    <a target="_blank">首页</a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="schoolRecruitment">
                                <Link href="/schoolRecruitment">
                                    <a target="_blank">校招</a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="socialRecruitment">
                                <Link href="/socialRecruitment">
                                    <a target="_blank">社招</a>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>

                <div className="login-box">
                    <Button>
                        <Link href="/login">
                            <a target="_blank" rel="noopener noreferrer">
                                登录
                           </a>
                        </Link>
                        <Link href="/register">
                            <a target="_blank" rel="noopener noreferrer">
                                注册
                           </a>
                        </Link>
                    </Button>
                    
                </div>
            </header>
        );
    }
}

export default withRouter(CommonHead);

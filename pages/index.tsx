import React, { Component, ReactNode } from 'react';
import { Button } from 'antd';
import apiFun from '../api/apiFun';
import IndexComponent from '../components/IndexComponent';
import moment from 'moment';
import { handleBackData } from '../utils/common';
interface State { }
interface Props {
    testObj: any;
}

class Home extends Component<Props, State> {
    static async getInitialProps({ req }) {

        /* 请求数据 */
        const testObj = {};
        // const testObj = await apiFun.test({});
        return { testObj };
    }
    render(): ReactNode {
        const { testObj = {} } = this.props;
        return (
            <div>
                <p>内容</p>
            </div>
        );
    }
}

export default Home;

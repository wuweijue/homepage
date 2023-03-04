import * as React from 'react';
import PrimaryRoute from './router';
/* 在根组件引入样式文件 */
import './app.less';
import 'react-dialogbox/lib/dialogbox.css';
import { Menu } from 'antd';
/* dialogbox会在第一次引入时挂载到window上，后续可通过window.dialogbox访问 */

import dialogbox from 'react-dialogbox';

const menuList = [
    {
        title: 'react-dialogbox 对话框',
        key: 'dialogbox'
    },
]

const defaultSelectedKeys = ['dialogbox'];

const App = () => {

    const changeRoute = (info)=>{
        const href = window.location.href;
        const baseUrl = href.split('/#/')[0];
        window.location.href = baseUrl + '/#/' + info.key
    }

    return <div className='app'>
        <Menu
            defaultSelectedKeys={defaultSelectedKeys}
            className='menu'
            mode="inline"
            theme='dark'
            onClick={(info)=>{
                changeRoute(info)
            }}
        >
            {
                menuList.map(item => {
                    return <Menu.Item key={item.key}>
                        {item.title}
                    </Menu.Item>
                })
            }
        </Menu>
        <PrimaryRoute />
    </div>

}

export default App
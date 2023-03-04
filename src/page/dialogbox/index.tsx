import { Button, Checkbox, Form, Input, InputNumber, Radio, Switch } from 'antd';
import * as React from 'react';
import dialogboxMethod, { Dialogbox } from 'react-dialogbox/src/components';
import Tab from '../../components/tab/Tab';
import './dialogbox.less';
import './index.less';
import MonacoEditor from 'react-monaco-editor';

const code1 = (
    `import { Dialogbox } from 'react-dialogbox';

class App extends React.Component {
    state = {
        visible: false
    }
    render(){
        <div>
            <button onClick={()=>this.setState(visble: true)}>对话框</button>
            <Dialogbox visible={this.state.visible} onCancel={()=>this.setState(visble: false)}/>
        </div>  
    }
}`
)

const code2 = (
    `import { Dialogbox }, dialogboxMethod from 'react-dialogbox';
    
class App extends React.Component {
    render(){
        <div>
            <button onClick={()=>{
                // 返回一个实例对象，其中的close方法用来关闭当前对话框
                const { close } = dialogboxMethod.showDialogbox(<Dialogbox 
                    title='这是一个对话框'
                    visible={true}
                    onCancel={close}
                    />);

            }}>对话框</button>
        </div>  
    }
}`
)

const code3 = (
    `import { Dialogbox }, dialogboxMethod from 'react-dialogbox';
        
class App extends React.Component {
    render(){
        <div>
            <button onClick={()=>{
                const { close } = dialogboxMethod.open({
                    title: '这是一个对话框'.
                    onCancel: close
                });
            }}>对话框</button>
        </div>  
    }
}`
)

var formatJson = function (json, options?) {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    }
    (json.split('\r\n')).forEach(function (node, index) {
        var i = 0,
            indent = 0,
            padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    }
    );
    return formatted;
};

class DialogDemo extends React.Component {
    state = {
        title: '',
        mask: true,
        maskClosable: false,
        width: 400,
        height: 200,
        fullScreen: false,
        header: true,
        footerNum: 1,
        footerContent: '',
        draggable: false,
        okText: '',
        cancelText: '',
        activeKey: '0',
        footer: null,
    }

    editorDidMountHandle = (editor) => {
        editor.getAction('editor.action.formatDocument').run()
    }

    handleEditorChange = (newValue, e) => {
        try {
            let code = JSON.parse(newValue)
            this.setState({ ...code })
        } catch (error) {

        }

    }

    render(): React.ReactNode {
        const { title, footerNum, footerContent, mask, maskClosable, width, height, header, draggable, okText, cancelText, activeKey, fullScreen } = this.state
        let footer;
        const state_copy = { ...this.state }
        delete state_copy.footerNum;
        delete state_copy.footerContent;
        delete state_copy.activeKey;
        switch (footerNum) {
            case 1: footer = true;
                break;
            case 2: footer = false;
                break;
            case 3: footer = footerContent;
                break;
            default: footer = true;
        }
        state_copy.footer = footer;
        const tabList = [
            {
                key: '0',
                title: '可选的UI配置',
                component: <div>
                    <div className="top">
                        <Button onClick={() => {
                            const { dialogboxId } = dialogboxMethod.open({
                                onCancel() {
                                    dialogboxMethod.hideDialogbox(dialogboxId)
                                },
                                isModal: true,
                                title,
                                mask,
                                maskClosable,
                                width,
                                height,
                                fullScreen,
                                header,
                                footer,
                                draggable
                            })
                        }}>点击出现对话框</Button>
                    </div>

                    <div className="bottom">
                        <div className='formWrapper'>
                            <div className='form-title'>调试面板</div>
                            <Form labelAlign='left'>
                                <Form.Item label="对话框标题 (title)">
                                    <Input value={title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                </Form.Item>
                                <Form.Item label="遮罩层阴影 (mask)">
                                    <Switch checked={mask} onChange={(checked) => { this.setState({ mask: checked }) }} />
                                </Form.Item>
                                <Form.Item label="点击阴影关闭 (maskClosable)">
                                    <Switch checked={maskClosable} onChange={() => {
                                        if (!maskClosable) {
                                            this.setState({
                                                mask: true
                                            })
                                        }
                                        this.setState({
                                            maskClosable: !maskClosable
                                        })
                                    }} />
                                </Form.Item>
                                <Form.Item label="设置宽度 (width)" tooltip='最值区间为[浏览器可视宽度,200]，超出最值部分自动调整，支持百分比'>
                                    <InputNumber value={width} onChange={(value) => {
                                        this.setState({ width: value })
                                    }} />
                                </Form.Item>
                                <Form.Item label="设置高度 (height)" tooltip='最值区间为[浏览器可视高度,120]，超出最值部分自动调整，支持百分比'>
                                    <InputNumber value={height} onChange={(value) => {
                                        this.setState({ height: value })
                                    }} />
                                </Form.Item>
                                <Form.Item label="初始全屏 (fullScreen)">
                                    <Switch checked={fullScreen} onChange={(checked) => {
                                        this.setState({ fullScreen: checked })
                                    }} />
                                </Form.Item>
                                <Form.Item label="是否可拖拽 (draggable)">
                                    <Switch checked={draggable} onChange={(checked) => {
                                        this.setState({ draggable: checked })
                                    }} />
                                </Form.Item>

                                <Form.Item label="是否展示头部 (header)">
                                    <Switch checked={header} onChange={(checked) => {
                                        this.setState({ header: checked })
                                    }} />
                                </Form.Item>

                                <Form.Item label="是否展示底部 (footer)" tooltip='footer的取值：当值为布尔值时，true为显示，false为隐藏'>
                                    <Radio.Group value={footerNum} onChange={(e => {
                                        this.setState({ footerNum: e.target.value })
                                    })}>
                                        <Radio value={1} > 显示默认底栏</Radio>
                                        <Radio value={2} > 不显示底栏</Radio>
                                        <Radio value={3} > 自定义底栏显示内容</Radio>
                                    </Radio.Group>

                                </Form.Item>
                                <Form.Item label="自定义底部内容 (footer)" tooltip='footer的取值：当值为字符串或者jsx时，值为显示的内容'>
                                    <Input disabled={footerNum !== 3} value={footerContent} onChange={(e) => { this.setState({ footerContent: e.target.value }) }} />
                                </Form.Item>

                                <Form.Item label="自定义确认按钮内容 (okText)">
                                    <Input placeholder={'确认'} value={okText} onChange={(e) => { this.setState({ okText: e.target.value }) }} />
                                </Form.Item>

                                <Form.Item label="自定义取消按钮内容 (cancelText)">
                                    <Input placeholder={'取消'} value={cancelText} onChange={(e) => { this.setState({ cancelText: e.target.value }) }} />
                                </Form.Item>

                            </Form>
                        </div >
                        <div className='code-wrapper'>
                            <MonacoEditor
                                width="600"
                                height="600"
                                language="json"
                                theme="vs"
                                options={{
                                    autoIndent: 'brackets',//自动布局
                                    automaticLayout: true,
                                    tabSize: 4,
                                    minimap: {
                                        enabled: false // 不要小地图
                                    },
                                }}
                                onChange={this.handleEditorChange}
                                value={formatJson(JSON.stringify(state_copy))}
                                editorDidMount={this.editorDidMountHandle}
                            />
                        </div>
                    </div >
                </div >
            },
            {
                key: '1',
                title: '使用案例',
                component: <div className="top2">
                    <div>
                        <div className='title'>组件内嵌使用</div>
                        <MonacoEditor
                            width="960"
                            height="280"
                            theme="vs"
                            options={{
                                autoIndent: 'brackets',//自动布局
                                automaticLayout: true,
                                tabSize: 4,
                                minimap: {
                                    enabled: false // 不要小地图
                                },
                                readOnly: true
                            }}
                            onChange={this.handleEditorChange}
                            value={code1}
                            editorDidMount={this.editorDidMountHandle}
                        />
                    </div>

                    <div>
                        <div className='title'>使用 showDialogbox api调用</div>
                        <MonacoEditor
                            width="960"
                            height="340"
                            theme="vs"
                            options={{
                                autoIndent: 'brackets',//自动布局
                                automaticLayout: true,
                                tabSize: 4,
                                minimap: {
                                    enabled: false // 不要小地图
                                },
                                readOnly: true
                            }}
                            onChange={this.handleEditorChange}
                            value={code2}
                            editorDidMount={this.editorDidMountHandle}
                        />
                    </div>

                    <div>
                        <div className='title'>使用 open api调用</div>
                        <MonacoEditor
                            width="960"
                            height="280"
                            theme="vs"
                            options={{
                                autoIndent: 'brackets',//自动布局
                                automaticLayout: true,
                                tabSize: 4,
                                minimap: {
                                    enabled: false // 不要小地图
                                },
                                readOnly: true
                            }}
                            onChange={this.handleEditorChange}
                            value={code3}
                            editorDidMount={this.editorDidMountHandle}
                        />
                    </div>
                </div>
            },
            {
                key: '2',
                title: '非模态对话框（多窗口）',
                component: <div>
                    <Button onClick={() => {
                        const { close } = dialogboxMethod.open({
                            width: 800,
                            height: 480,
                            onCancel: () => {
                                close()
                            },
                            onOk: () => {
                                close()
                            },
                            title: '窗口1',
                            children: <p>
                                轻轻的我走了，
                                正如我轻轻的来；
                                我轻轻的招手，
                                作别西天的云彩。

                                那河畔的金柳，
                                是夕阳中的新娘；
                                波光里的艳影，
                                在我的心头荡漾。

                                软泥上的青荇，
                                油油的在水底招摇；
                                在康河的柔波里，
                                我甘心做一条水草！

                                那榆荫下的一潭，
                                不是清泉，是天上虹；
                                揉碎在浮藻间，
                                沉淀着彩虹似的梦。


                            </p>
                        })
                        const { close: close2 } = dialogboxMethod.open({
                            onCancel: () => {
                                close2()
                            },
                            onOk: () => {
                                close2()
                            },
                            title: '窗口2',
                            children: <p>
                                寻梦？撑一支长篙，
                                向青草更青处漫溯；
                                满载一船星辉，
                                在星辉斑斓里放歌。

                                但我不能放歌，
                                悄悄是别离的笙箫；
                                夏虫也为我沉默，
                                沉默是今晚的康桥！

                                悄悄的我走了，
                                正如我悄悄的来；
                                我挥一挥衣袖，
                                不带走一片云彩。
                            </p>
                        })
                    }}>点击展示对话框</Button>
                </div>
            }
        ]

        return <div className='dialogDemo'>
            <Tab tabList={tabList} activeKey={activeKey} onChange={(key) => this.setState({ activeKey: key })} />
        </div>
    }


}

export default DialogDemo;


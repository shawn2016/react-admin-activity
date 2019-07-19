/* 主页 */

// ==================
// 所需的各种插件
// ==================

import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Resizable, ResizableBox } from "react-resizable";
import { bindActionCreators } from "redux";
import P from "prop-types";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";
import qs from "qs";
import {
  Select,
  Drawer,
  Button,
  Divider,
  Form,
  Input,
  Row,
  Col,
  Layout,
  Icon,
  Tooltip,
  Avatar,
  Menu,
  Dropdown,
  Popconfirm,
  Badge,
  Popover,
  Tabs,
  List,
  Tag,
  Spin,
  Table,
  message
} from "antd";

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;
const { SubMenu, Item } = Menu;
const postComponentMessage = (componentIndex, component) => {
  document.getElementById("pagePreviewIframe").contentWindow.postMessage(
    {
      type: "component",
      componentIndex: componentIndex,
      component: component
    },
    "*"
  );
};

const emptyComponent = {
  name: "",
  config: {
    props: null
  }
};
// ==================
// 所需的所有组件
// ==================

import css from "./index.scss";

// ==================
// 本页面所需action
// ==================

import {
  getPages,
  getComponents,
  putPages
} from "../../../a_action/act-action";
import withViewport from "../../../decorators/withViewport";
@createForm()
@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({ getPages, getComponents, putPages }, dispatch)
  })
)
@withViewport
export default class PageAdminContainer extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any
  };
  constructor(props) {
    super(props);
    this.state = {
      sourceData: [], // 菜单数据（层级）
      treeDom: [], // 生成的菜单结构
      chosedKey: [], // 当前选中
      openKeys: [], // 当前需要被展开的项
      deviceWidth: 320,
      deviceHeight: 568,
      page: {
        components: [],
        template: null
      },
      components: [],
      component: emptyComponent,
      componentIndex: -1,

      pageGenerating: false,
      pagePublishing: false,

      showComponents: false,

      deviceWidth: 320,
      deviceHeight: 568,

      publishUrl: "",
      config: null,
      collapsed: false,
      visible: false
    };
    const query = qs.parse(location.href.split("?")[1], {
      ignoreQueryPrefix: true
    });
    this.getPage(query.pageId);
    this.getComponents();
  }
  componentDidMount = () => {
    window.addEventListener(
      "message",
      event => {
        // if(event.origin !== 'http://localhost:3000') return;
        if (event.data.type === "componentIndex") {
          this.showEditComponentDialog(event.data.componentIndex);
        }
      },
      false
    );
    // this.makeSourceData(this.props.data);
    // this.nowChosed(this.props.location);
  };

  UNSAFE_componentWillReceiveProps(nextP) {
    // if (this.props.data !== nextP.data) {
    //   this.makeSourceData(nextP.data);
    // }
    // if (this.props.location !== nextP.location) {
    //   this.nowChosed(nextP.location);
    // }
  }
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  /** 处理当前选中 **/
  nowChosed(location) {
    const paths = location.pathname.split("/").filter(item => !!item);
    this.setState({
      chosedKey: [location.pathname],
      openKeys: paths.map(item => `/${item}`)
    });
  }

  /** 菜单展开和关闭时触发 **/
  onOpenChange(keys) {
    this.setState({
      openKeys: keys
    });
  }

  /** 处理原始数据，将原始数据处理为层级关系 **/
  makeSourceData(data) {
    const d = _.cloneDeep(data);
    // 按照sort排序
    d.sort((a, b) => {
      return a.sorts - b.sorts;
    });
    const sourceData = this.dataToJson(null, d) || [];
    const treeDom = this.makeTreeDom(sourceData, "");
    this.setState({
      sourceData,
      treeDom
    });
  }

  /** 工具 - 递归将扁平数据转换为层级数据 **/
  dataToJson(one, data) {
    let kids;
    if (!one) {
      // 第1次递归
      kids = data.filter(item => !item.parent);
    } else {
      kids = data.filter(item => item.parent === one.id);
    }
    kids.forEach(item => (item.children = this.dataToJson(item, data)));
    return kids.length ? kids : null;
  }
  addComponentToPage = component => {
    let page = this.state.page;
    const componentIndex = page.components.length;
    const cloneComponent = _.cloneDeep(component);
    page.components.push(cloneComponent);
    this.setState({
      page: page
    });
    postComponentMessage(componentIndex, cloneComponent);
    this.showEditComponentDialog(componentIndex);
    this.setState({
      visible: false
    });
    message.success("添加成功");
  };
  // 构建字段
  makeLocalColumns = () => {
    const columns = [
      {
        title: "项目",
        dataIndex: "project",
        key: "project"
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "操作",
        key: "control",
        width: 200,
        render: (text, record) => {
          const controls = [];
          controls.push(
            <Popconfirm
              key="3"
              title="确定添加吗?"
              onConfirm={() => this.addComponentToPage(record)}
              okText="确定"
              cancelText="取消"
            >
              <span className="control-btn blue">
                <Tooltip placement="top" title="添加">
                  <Icon type="sync" />
                </Tooltip>
              </span>
            </Popconfirm>
          );

          const result = [];
          controls.forEach((item, index) => {
            if (index) {
              result.push(<Divider key={`line${index}`} type="vertical" />);
            }
            result.push(item);
          });
          return result;
        }
      }
    ];
    return columns;
  };
  /** 构建树结构 **/
  makeTreeDom(data, key) {
    return data.map((item, index) => {
      const newKey = `${key}/${item.url.replace(/\//, "")}`;
      console.log("都是些什么啊：", newKey);
      if (item.children) {
        return (
          <SubMenu
            key={newKey}
            title={
              !item.parent && item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              ) : (
                item.title
              )
            }
          >
            {this.makeTreeDom(item.children, newKey)}
          </SubMenu>
        );
      } else {
        return (
          <Item key={newKey}>
            <Link to={newKey}>
              {!item.parent && item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.title}</span>
            </Link>
          </Item>
        );
      }
    });
  }
  getComponents = async () => {
    this.props.actions
      .getComponents(null, { withFileContent: 1 })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            components: res.data
          });
        }
      })
      .catch(() => {});
  };
  getPage = _id => {
    this.props.actions
      .getPages({ _id })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            page: res.data
          });
        }
      })
      .catch(() => {});
  };

  showEditComponentDialog = componentIndex => {
    const component = this.state.page.components[componentIndex];
    this.setState({
      componentIndex: componentIndex,
      component: component,
      showComponents: false
    });
    console.log(component);
    this.setState({
      config: component.config.properties
    });
  };
  handleChangeDevice = value => {
    this.setState({
      deviceWidth: value.split("*")[0],
      deviceHeight: value.split("*")[1]
    });
  };
  handleResize = (event, { element, size }) => {
    this.setState({
      deviceWidth: size.width,
      deviceHeight: size.height
    });
  };
  callback = key => {
    console.log(key);
  };
  /** 点击切换菜单状态 **/
  onToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  inputChange = (event, item, key) => {
    console.log(event.target.value, item, key);
    const component = this.state.page.components[this.state.componentIndex];
    component.config.properties[key].default = event.target.value;
    component.config.props[key] = event.target.value;
    console.log(component);
    postComponentMessage(this.state.componentIndex, component);
  };
  updatePage = () => {
    const page = this.state.page;
    this._updatePage(page, (err, data) => {
      if (err) {
        message.error("修改失败");
      }
      if (data.retcode === 0) {
        message.success("修改成功");
      } else {
        message.error("修改失败");
      }
    });
  };

  _updatePage = async (page, callback) => {
    console.log("updating page: ", page);
    let clonePage = _.cloneDeep(page);
    const _id = clonePage._id;
    // reset component's fileContent to reduce request size
    clonePage.components.forEach(item => {
      delete item.fileContent;
    });
    this.props.actions
      .putPages({
        clonePage,
        _id
      })
      .then(res => {
        console.log("添加用户返回数据：", res);
        if (res.status === 200) {
          message.success("保存成功");
        } else {
          message.error(res.message);
        }
      });
  };

  generatePage = async () => {
    const page = this.state.page;
    const _id = page._id;
    const data = {
      pageId: _id
    };
    this.setState({
      pageGenerating: true
    });
    try {
      const res = await fetch(`/api/generate/`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      this.setState({
        pageGenerating: false
      });
      const json = await res.json();
      if (json.retcode === 0) {
        message.success("生成成功");
        // window.open(`/${page.project}/pages/${page.name}/`);
      } else {
        message.error("生成失败");
      }
    } catch (error) {
      console.error(error);
      message.error("生成失败");
    }
  };

  downloadPage = () => {
    const id = this.state.page._id;
    window.open(`/api/download/${id}`);
  };

  previewPage = () => {
    this.generatePage();
    // const page = this.state.page;
    // window.open(`${page.project}/pages/${page.name}`);
  };
  /**
   * 退出全屏
   */
  exitFullScreen = () => {
    // 判断各种浏览器，找到正确的方法
    const exitMethod =
      document.exitFullscreen || //W3C
      document.mozCancelFullScreen || //Chrome等
      document.webkitExitFullscreen;
    if (exitMethod) {
      exitMethod.call(document);
    } else if (typeof window.ActiveXObject !== "undefined") {
      //for Internet Explorer
      const wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
    this.setState({
      fullScreen: false
    });
  };
  /**
   * 进入全屏
   * **/
  requestFullScreen = () => {
    const element = document.documentElement;
    // 判断各种浏览器，找到正确的方法
    const requestMethod =
      element.requestFullScreen || //W3C
      element.webkitRequestFullScreen || //Chrome等
      element.mozRequestFullScreen || //FireFox
      element.msRequestFullScreen; //IE11
    if (requestMethod) {
      requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") {
      //for Internet Explorer
      const wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
    this.setState({
      fullScreen: true
    });
  };
  exit = () => {
    this.props.history.goBack();
  };
  // 构建table所需数据
  makeLocalData = data => {
    return data.map((item, index) => {
      return {
        key: index,
        _id: item._id,
        name: item.name,
        fileContent: item.fileContent,
        config: item.config,
        project: item.project
      };
    });
  };
  render() {
    const {
      deviceHeight,
      deviceWidth,
      page,
      config,
      pageGenerating
    } = this.state;
    console.log(config);
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin
        size="large"
        spinning={pageGenerating}
        tip="页面生成中..."
        delay={500}
      >
        <Drawer
          title="本地组件列表"
          width={500}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div className="diy-table">
            <Table
              columns={this.makeLocalColumns()}
              loading={this.state.localComponentsLoading}
              dataSource={this.makeLocalData(this.state.components)}
            />
          </div>
        </Drawer>
        <Layout className={css.page}>
          <Sider
            theme="light"
            width={120}
            className={css.sider}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            {/* <div
          className={
            this.props.collapsed ? c(css.menuLogo, css.hide) : css.menuLogo
          }
        >
          <Link to="/">
            <img src={ImgLogo} />
            <div>React-Admin</div>
          </Link>
        </div> */}
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={this.state.chosedKey}
              {...(this.props.collapsed
                ? {}
                : { openKeys: this.state.openKeys })}
              onOpenChange={e => this.onOpenChange(e)}
            >
              {this.state.treeDom}
            </Menu>
          </Sider>
          <Layout>
            <Header className={classNames(css.header)}>
              <Tooltip
                placement="bottom"
                title={this.state.collapsed ? "展开菜单" : "收起菜单"}
              >
                <Icon
                  className={classNames(
                    css.trigger,
                    { [css.fold]: !this.state.collapsed },
                    "flex-none"
                  )}
                  type={"menu-unfold"}
                  onClick={this.onToggle}
                />
              </Tooltip>
              <div
                className={classNames(
                  css.rightBox,
                  "flex-auto flex-row flex-je flex-ac"
                )}
              >
                <Tooltip
                  placement="bottom"
                  title={this.state.fullScreen ? "退出全屏" : "全屏"}
                >
                  <div className={css.full}>
                    <Icon
                      className={classNames(css.icon, "flex-none")}
                      type={this.state.fullScreen ? "shrink" : "arrows-alt"}
                      onClick={
                        this.state.fullScreen
                          ? this.exitFullScreen
                          : this.requestFullScreen
                      }
                    />
                  </div>
                </Tooltip>
                <Tooltip placement="bottom" title="预览并保存">
                  <Button
                    onClick={this.previewPage}
                    className={classNames(css.editButton, "flex-none")}
                    type="primary"
                  >
                    预览
                  </Button>
                </Tooltip>
                <Button
                  onClick={this.showDrawer}
                  className={classNames(css.editButton, "flex-none")}
                  type="primary"
                >
                  添加组件
                </Button>
                <Button
                  onClick={this.updatePage}
                  className={classNames(css.editButton, "flex-none")}
                  type="primary"
                >
                  保存
                </Button>
                <Tooltip placement="bottom" title="退出编辑">
                  <Button
                    onClick={this.exit}
                    className={classNames(css.editButton, "flex-none")}
                    type="primary"
                    icon="poweroff"
                  />
                </Tooltip>
              </div>
            </Header>
            <Content className={css.content}>
              <div className={classNames(css.home)}>
                <div className={classNames(css.leftActivity)}>
                  <Row>
                    <Col span={8}>
                      <Select
                        defaultValue="320*568"
                        style={{ width: 120 }}
                        onChange={this.handleChangeDevice}
                      >
                        <Option value="320*480">iPhone4</Option>
                        <Option value="320*568">iPhone5</Option>
                        <Option value="375*627">iPhone6</Option>
                        <Option value="414*736">iPhone6S</Option>
                      </Select>
                    </Col>
                    <Col span={8} style={{ lineHeight: 2.4 }}>
                      {deviceWidth}*{deviceHeight}
                    </Col>
                  </Row>
                  <Resizable
                    onResize={this.handleResize}
                    height={deviceHeight}
                    width={deviceWidth}
                  >
                    <div
                      style={{
                        height: deviceHeight,
                        width: deviceWidth
                      }}
                    >
                      <iframe
                        id="pagePreviewIframe"
                        className={css.previewIframe}
                        style={{
                          width: deviceWidth - 20,
                          height: deviceHeight - 20
                        }}
                        src={`/#/activity/previewactivity_page?pageId=${
                          page._id
                        }`}
                        frameBorder="0"
                      />
                    </div>
                  </Resizable>
                </div>
                <div className={classNames(css.rightActivity)}>
                  <Tabs tabBarGutter={3} onChange={this.callback}>
                    <TabPane tab="基础设置" key="1">
                      <div className={classNames(css.TabPaneItem)}>
                        <Divider orientation="left">基本选项</Divider>
                        <Form>
                          {config &&
                            Object.keys(config).map((key, index) => {
                              return (
                                <Form.Item
                                  key={index}
                                  label={config[key].title}
                                >
                                  <Input
                                    onChange={e => {
                                      this.inputChange(e, config[key], key);
                                    }}
                                    defaultValue={config[key].default}
                                  />
                                </Form.Item>
                              );
                            })}

                          {/* <Form.Item
                    wrapperCol={{
                      xs: { span: 24, offset: 0 },
                      sm: { span: 16, offset: 8 }
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item> */}
                        </Form>
                      </div>
                    </TabPane>
                    <TabPane tab="派奖方式" key="2">
                      Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="奖项设置" key="3">
                      Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="高级设置" key="4">
                      Content of Tab Pane 4
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Content>
            {/* <Footer /> */}
          </Layout>
        </Layout>
      </Spin>
    );
  }
}

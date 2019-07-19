/** Role 系统管理/角色管理 **/

// ==================
// 所需的各种插件
// ==================

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import P from "prop-types";
import QRCode from "qrcode.react";
import {
  Form,
  Button,
  Icon,
  Input,
  Table,
  message,
  Popconfirm,
  Modal,
  Radio,
  Tooltip,
  Divider,
  Select,
  InputNumber,
  Drawer,
  Popover,
  DatePicker,
  TimePicker,
  Cascader
} from "antd";
import css from "./index.scss";
import c from "classnames";
import tools from "../../../util/tools"; // 工具

// ==================
// 所需的所有组件
// ==================

import TreeTable from "../../../a_component/TreeChose/PowerTreeTable";

// ==================
// 本页面所需action
// ==================

import {
  getPagesList,
  getProjects,
  createPage,
  delPages,
  updatePage
} from "../../../a_action/act-action";
// ==================
// Definition
// ==================
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;
@connect(
  state => ({
    powerTreeData: state.sys.powerTreeData,
    powers: state.app.powers
  }),
  dispatch => ({
    actions: bindActionCreators(
      {
        getPagesList,
        getProjects,
        createPage,
        delPages,
        updatePage
      },
      dispatch
    )
  })
)
@Form.create()
export default class RoleAdminContainer extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any,
    powers: P.array,
    form: P.any,
    powerTreeData: P.array
  };

  constructor(props) {
    super(props);
    this.state = {
      page: [],
      project: [],
      pagePro: {
        name: "",
        description: "",
        project: "",
        owner: ""
      },
      pageNum: 0,
      pageSize: 1,
      dialogType: "",
      selectId: ""
    };
    this.getPagesList();
  }

  getPagesList = () => {
    this.props.actions
      .getPagesList()
      .then(res => {
        if (res.status === 200) {
          this.setState({
            page: res.data
          });
        }
      })
      .catch(() => {});
  };

  // 编辑
  editactive = id => {
    this.props.history.push(`/activity/editactivity_page?pageId=${id}`);
  };
  removePage = _id => {
    this.props.actions
      .delPages({ _id })
      .then(res => {
        if (res.status === 200) {
          message.success("删除模板成功");
          setTimeout(() => {
            this.getPagesList();
          }, 2000);
        }
      })
      .catch(() => {});
  };
  copyactive = item => {
    this.props.actions
      .createPage({
        description: item.description,
        project: item.project,
        components: item.components,
        config: item.config,
        name: item.name + new Date().getTime()
      })
      .then(res => {
        if (res.msgCode === "PTM0000") {
          message.success("复制模板成功");
          this.setState({
            visible: false
          });
          setTimeout(() => {
            this.getPagesList();
          }, 2000);
        } else {
          message.error(res.msgInfo);
        }
      });
  };
  onModalShow = type => {};
  // 构建字段
  makeColumns = () => {
    const columns = [
      {
        title: "序号",
        dataIndex: "serial",
        key: "serial"
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "简介",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "文件夹",
        dataIndex: "project",
        key: "project"
      },
      {
        title: "操作",
        key: "control",
        width: 200,
        render: (text, record) => {
          const controls = [];
          const p = this.props.powers;
          p.includes("role:query") &&
            controls.push(
              <span key="0" className="control-btn blue">
                <Popover
                  placement="top"
                  content={
                    <QRCode
                      value={`http://localhost:8888/#/iframe/previewactive/${1}`}
                    />
                  }
                  trigger="click"
                >
                  <Tooltip placement="top" title="预览">
                    <Icon type="qrcode" />
                  </Tooltip>
                </Popover>
              </span>
            );
          p.includes("role:query") &&
            controls.push(
              <span
                key="1"
                className="control-btn green"
                onClick={() => this.editactive(record._id)}
              >
                <Tooltip placement="top" title="查看">
                  <Icon type="eye" />
                </Tooltip>
              </span>
            );
          p.includes("role:up") &&
            controls.push(
              <span
                key="2"
                className="control-btn blue"
                onClick={() => this.showCreatePageDialog("edit", record)}
              >
                <Tooltip placement="top" title="编辑">
                  <Icon type="edit" />
                </Tooltip>
              </span>
            );
          controls.push(
            <span
              key="3"
              className="control-btn blue"
              onClick={() => this.copyactive(record)}
            >
              <Tooltip placement="top" title="复制模板">
                <Icon type="copy" />
              </Tooltip>
            </span>
          );
          controls.push(
            <Popconfirm
              key="4"
              title="确定删除吗?"
              onConfirm={() => this.removePage(record._id)}
              okText="确定"
              cancelText="取消"
            >
              <span className="control-btn red">
                <Tooltip placement="top" title="删除">
                  <Icon type="delete" />
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
  syncLocalComponent = index => {
    this.props.actions
      .syncLocalComponent(this.state.localComponents[index])
      .then(res => {
        if (res.status === 200) {
          message.success("同步成功");
          this.setState({
            visible: false
          });
          setTimeout(() => {
            this.getComponents();
          }, 2000);
        }
      })
      .catch(() => {});
  };

  // 构建table所需数据
  makeData = data => {
    return data.map((item, index) => {
      return {
        key: item._id,
        _id: item._id,
        serial: index + 1 + this.state.pageNum * this.state.pageSize,
        name: item.name,
        components: item.components,
        config: item.config,
        description: item.description,
        sorts: item.sorts,
        project: item.project,
        conditions: item.conditions,
        control: item.id,
        powers: item.powers
      };
    });
  };

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

  updatePage = item => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.actions
          .updatePage({
            _id: this.state.selectId,
            data: {
              name: values.name,
              description: values.description,
              project: values.project
            }
          })
          .then(res => {
            if (res.msgCode === "PTM0000") {
              message.success("编辑模板成功");
              this.setState({
                visible: false
              });
              setTimeout(() => {
                this.getPagesList();
              }, 2000);
            } else {
              message.error(res.msgInfo);
            }
          });
      }
    });
  };
  createPage = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.actions.createPage({ ...values }).then(res => {
          if (res.msgCode === "PTM0000") {
            message.success("新增模板成功");
            this.setState({
              visible: false
            });
            setTimeout(() => {
              this.getPagesList();
            }, 2000);
          } else {
            message.error(res.msgInfo);
          }
        });
      }
    });
  };
  showCreatePageDialog = (type, item) => {
    if (type === "edit") {
      this.props.form.setFieldsValue({
        project: item.project,
        description: item.description,
        name: item.name
      });
    } else if (type === "add") {
      this.props.form.setFieldsValue({
        project: "",
        description: "",
        name: ""
      });
    }
    this.setState({
      visible: true,
      dialogType: type,
      selectId: (item && item._id) || ""
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  dialogOk = () => {
    switch (this.state.dialogType) {
      case "add":
        this.createPage();
        break;
      case "edit":
        this.updatePage();
        break;

      default:
        break;
    }
  };
  render() {
    const { Option } = Select;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    const p = this.props.powers;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="g-search">
          <ul className="search-func">
            <li>
              <Button
                type="primary"
                disabled={!p.includes("role:add")}
                onClick={() => this.showCreatePageDialog("add")}
              >
                <Icon type="plus-circle-o" />
                新增模板
              </Button>
            </li>
          </ul>
        </div>
        <div className="diy-table">
          <Table
            pagination={false}
            columns={this.makeColumns()}
            loading={this.state.componentsLoading}
            dataSource={this.makeData(this.state.page)}
          />
        </div>
        <Modal
          title="新增模板"
          cancelText="取消"
          okText="确定"
          visible={this.state.visible}
          onOk={this.dialogOk}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout}>
            <Form.Item label="模板名称">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入模板名称" }]
              })(<Input placeholder="请输入模板名称" />)}
            </Form.Item>
            <Form.Item label="文件夹名">
              {getFieldDecorator("project", {
                rules: [{ required: true, message: "请输入文件夹名" }]
              })(<Input placeholder="请输入文件夹名" />)}
            </Form.Item>
            <Form.Item label="模板简介">
              {getFieldDecorator("description", {
                rules: [{ required: true, message: "请输入模板简介" }]
              })(<Input.TextArea placeholder="请输入模板简介" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

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
  Popover
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
  getComponents,
  getLocalComponents,
  syncLocalComponent,
  delComponents
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
        getComponents,
        getLocalComponents,
        syncLocalComponent,
        delComponents
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
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      componentsLoading: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,

      selectedComponentIndex: -1,

      localComponents: [],
      selectedLocalComponentIndex: -1,
      components: [],
      pageNum: 0,
      pageSize: 10,
      visible: false,
      localComponentsLoading: false
    };
    this.getComponents();
    this.getLocalComponents();
  }
  getLocalComponents = () => {
    this.props.actions
      .getLocalComponents()
      .then(res => {
        if (res.status === 200) {
          this.setState({
            localComponents: res.data
          });
        }
      })
      .catch(() => {});
  };
  getComponents = async () => {
    this.props.actions
      .getComponents()
      .then(res => {
        if (res.status === 200) {
          this.setState({
            components: res.data
          });
        }
      })
      .catch(() => {});
  };
  // 编辑
  editactive = id => {
    this.props.history.push(`/activity/editactive/${id}`);
  };
  onModalShow = type => {};
  removeComponent = _id => {
    this.props.actions
      .delComponents({ _id })
      .then(res => {
        if (res.msgCode === "PTM0000") {
          message.success("删除成功");
          setTimeout(() => {
            this.getComponents();
          }, 2000);
        }
      })
      .catch(() => {});
  };
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
        title: "操作",
        key: "control",
        width: 200,
        fixed: "right",
        render: (text, record) => {
          const controls = [];
          const p = this.props.powers;
          controls.push(
            <Popconfirm
              key="1"
              title="确定删除吗?"
              onConfirm={() => this.removeComponent(record._id)}
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
              title="确定同步到数据库吗?"
              onConfirm={() => this.syncLocalComponent(record.key)}
              okText="确定"
              cancelText="取消"
            >
              <span className="control-btn blue">
                <Tooltip placement="top" title="同步到数据库">
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

  // 构建table所需数据
  makeData = data => {
    return data.map((item, index) => {
      return {
        key: item._id,
        _id: item._id,
        serial: index + 1 + this.state.pageNum * this.state.pageSize,
        name: item.name,
        desc: item.desc,
        sorts: item.sorts,
        conditions: item.conditions,
        control: item.id,
        powers: item.powers
      };
    });
  };

  // 构建table所需数据
  makeLocalData = data => {
    return data.map((item, index) => {
      return {
        key: index,
        _id: item._id,
        name: item.name,
        project: item.project
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
  render() {
    const me = this;
    const { form } = me.props;
    const p = this.props.powers;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      }
    };

    return (
      <div>
        <div className="g-search">
          <ul className="search-func">
            <li>
              <Button
                type="primary"
                disabled={!p.includes("role:add")}
                onClick={() => this.showDrawer(null, "add")}
              >
                <Icon type="plus-circle-o" />
                同步组件
              </Button>
            </li>
          </ul>
        </div>
        <div className="diy-table">
          <Table
            pagination={false}
            columns={this.makeColumns()}
            loading={this.state.componentsLoading}
            dataSource={this.makeData(this.state.components)}
          />
        </div>
        <Drawer
          title="本地组件列表"
          width={500}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div className="diy-table">
            <Table
              pagination={false}
              columns={this.makeLocalColumns()}
              loading={this.state.localComponentsLoading}
              dataSource={this.makeLocalData(this.state.localComponents)}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

/* 主页 */

// ==================
// 所需的各种插件
// ==================

import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { bindActionCreators } from "redux";
import P from "prop-types";
import qs from "qs";

const emptyComponent = {
  name: "",
  config: {
    props: null
  }
};
// ==================
// 所需的所有组件
// ==================

// ==================
// 本页面所需action
// ==================

import { getPages, getComponents } from "../../../a_action/act-action";

@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators({ getPages, getComponents }, dispatch)
  })
)
export default class PreviewActiveContainer extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any
  };
  constructor(props) {
    super(props);
    this.state = {
      page: {
        components: [],
        template: null
      },
      componentIndex: 0
    };
    const query = qs.parse(location.href.split("?")[1], {
      ignoreQueryPrefix: true
    });
    this.getPages(query.pageId);
  }

  componentDidMount = () => {
    window.addEventListener(
      "message",
      event => {
        // if(event.origin !== 'http://localhost:3000') return;
        console.log("previewPage receives message", event);
        if (event.data.type === "page") {
          this.setState({
            page: event.data.page
          });
        }
        if (event.data.type === "component") {
          let page = this.state.page;
          const componentIndex = event.data.componentIndex;
          const component = event.data.component;
          page.components[componentIndex] = component;
          this.setState({
            componentIndex: componentIndex,
            component: component,
            page: page
          });
        }
      },
      false
    );
  };
  handleComponentTap = index => {
    console.log(index);
    this.setState({
      componentIndex: index
    });
    window.parent.postMessage(
      {
        type: "componentIndex",
        componentIndex: index
      },
      "*"
    );
  };

  getPages = _id => {
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
  render() {
    const page = this.state.page;
    console.log(page);
    page.components = page.components ? page.components : [];
    const componentIndex = this.state.componentIndex;
    const pageComponents = page.components.map((component, index) => {
      const Com = eval(component.fileContent);
      const className = classNames("component", {
        editing: componentIndex === index
      });
      return (
        <div
          className={className}
        //   onClick={() => {
        //     this.handleComponentTap(index);
        //   }}
          key={window.performance.now()}
        >
          <Com {...component.config.props} />
        </div>
      );
    });
    return (
      <div className="PreviewPage">
        <div className="page-components">{pageComponents}</div>
      </div>
    );
  }
}

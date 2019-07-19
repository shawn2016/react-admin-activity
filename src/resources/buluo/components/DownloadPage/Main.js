import React, { Component } from "react";
import {
  initAnalytics,
  buriedPointEvent,
  pageView
} from "../../../../util/analytins";
import { login } from "../../../../util/analytinsType";
import styles from "./style.scss";

import withStyles from "../../../../decorators/withStyles";

import withViewport from "../../../../decorators/withViewport";
var sa = require("sa-sdk-javascript/sensorsdata.min.js");
if (!window.sa) {
  window.sa = sa;
}
initAnalytics();
@withViewport
@withStyles(styles)
class Com extends Component {
  constructor(props) {
    super(props);
    pageView();
  }
  getA = () => {
    buriedPointEvent(login.submit);
  };
  render() {
    const props = this.props;
    const pageStyles = {
      background: props.backgroundColor,
      height: this.props.viewport.height
    };
    const btnStyles = {
      background: props.btnBackgroundColor
    };
    return (
      <div style={pageStyles} className="buluo-DownloadPage">
        <div className="logo-wrap">
          <img className="logo" src={props.logo} />
        </div>
        <div className="download-btns-wrap">
          <a
            style={btnStyles}
            onClick={this.getA}
            className="download-btn iphone"
          >
            {props.iOSText}
          </a>
          <a
            style={btnStyles}
            href={props.androidUrl}
            className="download-btn android"
          >
            {props.androidText}
          </a>
        </div>
      </div>
    );
  }
}

module.exports = Com;

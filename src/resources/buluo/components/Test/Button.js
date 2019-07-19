import React, { Component } from "react";
import styles from "./style.scss";
//import 'script!./qrcode.js';
import withStyles from "../../../../decorators/withStyles";
import fetch from "sx-fetch";
const API = {
  smsForLogin: "/signup/smsForLogin",
  sendsms: "/cmm/sendsms",
  getStw: "/my/getStsw", // 获取4个认证项的状态(看基本信息是否认证)
  imageCode: "/signup/sendImg"
};
@fetch.inject()
@withStyles(styles)
class Com extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageCodeUrl: ""
    };
  }
  //获取图片验证码
  getImage = () => {
    this.props.$fetch.get(API.imageCode).then(res => {
      if (res && res.msgCode === "PTM0000") {
        this.setState({
          imageCodeUrl: res.image
        });
      } else {
        console.log("=======================");
        // Toast.info(res.msgInfo);
      }
    });
  };
  componentDidMount() {
    this.getImage();
  }

  render() {
    return (
      <div className="btn">
        按钮
        <img src={this.state.imageCodeUrl} />
      </div>
    );
  }
}

module.exports = Com;

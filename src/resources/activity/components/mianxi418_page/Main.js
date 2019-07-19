import React, { PureComponent } from "react";
import qs from "qs";
import styles from "./index.scss";
import activity_bg from "./img/activity_bg.png";
import card_50000 from "./img/50000.png";
import liyou from "./img/liyou.png";
import { buriedPointEvent } from "../../../../util/analytins";
import { activity } from "../../../../util/analytinsType";
// import SmsAlert from '../components/SmsAlert';
// import Alert_mpos from 'pages/mpos/mpos_no_realname_alert_page';
import Cookie from "js-cookie";
import "../../../../util/flexible_css.js";
import "../../../../util/flexible.min.js";
import fetch from "sx-fetch";
import fastClick from "fastclick";
import { store } from "../../../../util/store";
import withStyles from "../../../../decorators/withStyles";
var sa = require("sa-sdk-javascript/sensorsdata.min.js");
import { Button } from "antd-mobile";
if (!window.sa) {
  window.sa = sa;
}
fastClick.prototype.focus = function(targetElement) {
  targetElement.focus();
};
fastClick.attach(document.body);
const API = {
  saveUserInfoEngaged: "/activeConfig/saveUserInfoEngaged/AC001" // 用户是否参与过免息
};
@withStyles(styles)
@fetch.inject()
class mianxi418_page extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showLoginTip: false, // 是否登陆弹框
      showAwardModal: false, // 获奖弹框
      showNoAwardModal: false, // 无领取资格弹框
      showModalType: "", // 展示弹框类型
      urlData: {}, // url上的参数
      showBoundle: false // 是否展示未实名的弹框
    };
  }

  componentWillMount() {
    const queryData = qs.parse(location.search, { ignoreQueryPrefix: true });
    this.setState({
      urlData: queryData
    });
  }

  componentDidMount() {
    const { urlData } = this.state;
    if (urlData.entry) {
      // 根据不同入口来源埋点
      buriedPointEvent(activity.mianxi418Entry, {
        entry: urlData.entry
      });
    }
  }
  getStatus = () => {
    this.child.validateMposRelSts({
      smsProps_disabled: true,
      loginProps_disabled: true,
      loginProps_needLogin: true,
      otherProps_type: "home"
    });
  };
  goTo = () => {
    const { urlData } = this.state;
    // 根据不同入口来源埋点
    buriedPointEvent(activity.mianxi418Btn, {
      entry: urlData.entry
    });
    if (urlData && urlData.entry && urlData.entry.indexOf("ismpos_") > -1) {
      if (urlData.appId && urlData.token) {
        this.getStatus();
      } else {
        this.setState({
          noLogin: true,
          showLoginTip: true
        });
      }
    } else if (Cookie.get("fin-v-card-token")) {
      store.setToken(Cookie.get("fin-v-card-token"));
      this.goHomePage();
    } else if (urlData.entry.indexOf("isxdc_menu") > -1) {
      // store.setInvoking418(true); // 登录页下线了 首页下了
      this.props.history.replace('/common/wx_middle_page?NoLoginUrl="/login"');
    }
  };
  closeModal = () => {
    this.setState({
      showModal: false
    });
  };
  closeTip = () => {
    this.setState({
      showLoginTip: false
    });
  };

  // 跳转协议
  go = url => {
    this.props.history.push(`/protocol/${url}`);
  };

  // 进入首页
  goHomePage = () => {
    this.props.$fetch
      .get(API.saveUserInfoEngaged)
      .then(res => {
        this.props.history.push("/home/home");
      })
      .catch(err => {
        this.props.history.push("/home/home");
      });
  };

  onRef = ref => {
    this.child = ref;
  };

  render() {
    const { showModal, showLoginTip, showBoundle } = this.state;
    return (
      <div className="main">
        {/* <SmsAlert
					onRef={this.onRef}
					goSubmitCb={{
						PTM0000: (res, getType) => {
							this.goHomePage();
						},
						URM0008: (res, getType) => {},
						others: (res, getType) => {}
					}}
					goLoginCb={{
						PTM0000: (res, getType) => {
							this.goHomePage();
						},
						URM0008: (res, getType) => {},
						others: (res, getType) => {}
					}}
					validateMposCb={{
						PTM9000: (res, getType) => {
							this.props.history.replace('/mpos/mpos_ioscontrol_page?entryType=ioscontrol');
						},
						others: (res, getType) => {
							this.setState({
								showBoundle: true
							});
						}
					}}
					chkAuthCb={{
						authFlag0: (res, getType) => {},
						authFlag1: (res, getType) => {
							this.goHomePage();
						},
						authFlag2: (res, getType) => {
							// this.props.toast.info('暂无活动资格');
						},
						others: (res, getType) => {}
					}}
					doAuthCb={{
						authSts00: (res, getType) => {
							this.goHomePage();
						},
						others: (res, getType) => {}
					}}
				/> */}
        <img src={activity_bg} className="activity_bg" />
        <div
          className="rule"
          onClick={() => {
            this.setState({
              showModal: true
            });
          }}
        >
          活动规则
        </div>
        <div className="mt_500">
          <div className="card_box">
            <img src={card_50000} />
          </div>
          <div className="btn_box">
            <a onClick={this.goTo}>免费申请</a>
          </div>
          <div className="btn_bottom_text">每人1次参与机会，限前1000名</div>
          <div className="card_box">
            <img src={liyou} />
          </div>
          <div className="footer_text">
            <span style={{ color: "#fff" }}>参与即同意</span>
            <span
              onClick={() => {
                this.go("register_agreement_page");
              }}
            >
              《随行付金融用户注册协议》
            </span>
            <span
              onClick={() => {
                this.go("privacy_agreement_page");
              }}
            >
              《随行付用户隐私权政策》
            </span>
          </div>
          <div className="footer_b_text">
            关注还到公众号 后台回复【红包】
            <br />
            领100元现金抽奖资格
          </div>
          <div className="footer_h_text">
            <div className="text">本活动最终解释权归随行付-还到所有</div>
          </div>
        </div>
        {showLoginTip && (
          <div className="modal">
            <div className="mask" />
            <div className="modalWrapper tipWrapper">
              <div className="tipText">
                <span>小主～</span>
                <br />
                <span>活动火热进行中，快前往「还到」参与！</span>
              </div>
              <div className={styles.closeBtn} onClick={this.closeTip} />
            </div>
          </div>
        )}
        {showModal ? (
          <div className="modal">
            <div className="mask" />
            <div className="modalWrapper">
              <div>
                <h2>活动规则</h2>
                <ol>
                  <li>1.活动开始时间：2019年4月19日；</li>
                  <li>2.活动对象：还到注册用户；</li>
                  <li>3.活动参与：仅在随行付Plus和还到公众号内进行；</li>
                  <li>
                    4.活动内容：活动期间，每天通过活动页面的前1000名借款用户，借款金额3000元及以上，则可享最高5万元，最高30天的免息（实际奖励以审批金额为准），每人仅限1次免息奖励；
                  </li>
                  <li>
                    5.奖励形式：借款金额满足条件后，免息奖励以免息券形式发放，届时可前往“我的-优惠券”中查看使用；
                  </li>
                  <li>
                    6.免息券自发放之日起35天内有效，请在还款时使用，未在有效期使用，则视为放弃；
                  </li>
                  <li className="redText">
                    Tips:已在还到借款并还清用户，再次借款，免息力度更大哦！
                  </li>
                </ol>
              </div>
              <div className="closeBtn" onClick={this.closeModal} />
            </div>
          </div>
        ) : null}
        <Button type="primary">primary</Button>
        {/* {showBoundle ? <Alert_mpos /> : null} */}
      </div>
    );
  }
}

module.exports = mianxi418_page;

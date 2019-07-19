// DC 对外
// XDC mpos入口=>对内
import { isMPOS } from './common';
let prefix = `DC`;
// dc 多
// xdc少

if (isMPOS() || JSON.parse(sessionStorage.getItem('isMPOS'))) {
	prefix = 'XDC';
}
// console.log(JSON.parse(sessionStorage.getItem('isMPOS')),'test')
const login = {
	getCode: `${prefix}_LOGIN_GET_CODE`, // 注册登录页-点击获取验证码
	submit: `${prefix}_LOGIN_SUBMIT` // 注册登录页-一键代还
};

const home = {
	applyCreditRepayment: `${prefix}_HOME_APPLY_CREDIT_REPAYMENT`, // 首页-点击申请信用卡代还按钮
	// homeContinueApply: `${prefix}_HOME_CONTINUE_APPLY`, // 还卡-继续申请  增加属性，继续页面：基本信息认证，银行列表，运营商认证
	HomeCardRenew: `${prefix}_HOME_CARD_RENEW`, // 借钱换信用卡  重新更新
	easyRepay: `${prefix}_HOME_EASY_REPAYMENT`, // 首页-点击一键还卡（代还）
	repayOtherCredit: `${prefix}_HOME_REPAY_OTHER_CREDIT`, // 首页-点击代还其他信用卡
	viewBill: `${prefix}_HOME_VIEW_BILL`, // 首页-点击查看代还账单
	durationDay30: `${prefix}_MINE_CREDIT_EXTENSION_DURATION_DAY_30`, // 申请期限-30天
	durationMonth3: `${prefix}_MINE_CREDIT_EXTENSION_DURATION_MONTH_3`, // 申请期限-3个月
	durationMonth6: `${prefix}_MINE_CREDIT_EXTENSION_DURATION_MONTH_6`, // 申请期限-6个月
	durationMonth9: `${prefix}_MINE_CREDIT_EXTENSION_DURATION_MONTH_9`, // 申请期限-9个月
	durationMonth12: `${prefix}_MINE_CREDIT_EXTENSION_DURATION_MONTH_12`, // 申请期限-12个月
	moneyCreditCardConfirm: `${prefix}_MONEY_CREDIT_CARD_CONFIRM`, // 借钱还信用卡-提交申请成功
	moneyCreditCardConfirmBtn: `${prefix}_MONEY_CREDIT_CARD_CONFIRM_BTN`, // 借钱还信用卡-提交申请按钮
	// compensationCreditCardConfirm: `${prefix}_COMPENSATION_CREDIT_CARD_CONFIRM`, // 代偿信用卡-确认
	userRetrieveContinue: `${prefix}_USER_RETRIEVE_CONTINUE`, // 用户挽回-再等等
	userRetrieveQuit: `${prefix}_USER_RETRIEVE_QUIT`, // 用户挽回-放弃
	repaymentIntentionAll: `${prefix}_REPAYMENT_INTENTION_ALL`, // 还款意愿-全额还款
	repaymentIntentionLowest: `${prefix}_REPAYMENT_INTENTION_LOWEST`, // 还款意愿-最低还款
	repaymentIntentionPart: `${prefix}_REPAYMENT_INTENTION_PART`, // 还款意愿-部分还款
	lenders: `${prefix}_HOME_LENDERS`, // 放款日期-立即放款
	lendersOrder: `${prefix}_HOME_LENDERS_ORDER`, // 放款日期-预约放款
	borrowingSubmit: `${prefix}_HOME_BORROWING_PRE_SUBMIT`, // 代还信息确认页-点击确认按钮
	borrowingSubmitResult: `${prefix}_HOME_BORROWING_PRE_SUBMIT_RESULT`, // 代还信息确认页-点击确认按钮-结果事件
	informationMyselfFrontCard: `${prefix}_HOME_BASE_INFO_FRONT_CARD`, // 实名认证页-点击拍摄身份证正面
	informationMyselfBackCard: `${prefix}_HOME_BASE_INFO_BACK_CARD`, // 实名认证页-点击拍摄身份证反面
	informationTapNameInp: `${prefix}_HOME_BASE_INFO_USERNAME`, // 实名认证页-点击姓名输入框
	informationTapIDInp: `${prefix}_HOME_BASE_INFO_IDCARD`, // 实名认证页-点击身份证号输入框
	informationConfirm: `${prefix}_HOME_BASE_INFO_CONFIRM`, // 实名认证页-确定按钮
	basicInfoBury: `${prefix}_HOME_BASE_INFO_BURY`, // 基本信息输入框下拉框埋点
	basicInfoComplete: `${prefix}_HOME_BASICINFO_COMPLETE`, // 基本信息页-确定按钮
	landingPage: `${prefix}_HOME_LANDING_PAGE`, // 落地页
	bannerClick: `${prefix}_HOME_BANNER_CLICK`, // 点击banner
	cardResult: `${prefix}_HOME_CARD_RESULT`, // 信用卡提交结果埋点
	operatorResult: `${prefix}_HOME_OPERATOR_RESULT`, // 运营商提交结果埋点
	faceAuthResult: `${prefix}_HOME_FACEAUTH_RESULT`, // 人脸提交结果埋点
	downloadBtnClick: `${prefix}_DOWNLOAD_BTN_CLICK`, // 下载页点击按钮事件
	manualAudit: `${prefix}_RETURN_CARD_VIEWING_PROGRESS_MANUALAUDIT`, //人工审核
	machineAudit: `${prefix}_RETURN_CARD_VIEWING_PROGRESS_MACHINE`, //机器审核
	quickLoan: `${prefix}_RETURN_CARD_VIEWING_PROGRESS_LOAN`, //快速放款
	signedLoan: `${prefix}_RETURN_CARD_VIEWING_PROGRESS_BORROWING`, //立即签约借款
	applyLoan: `${prefix}_RETURN_CARD_VIEWING_PROGRESS_APPLY`, //申请借钱还信用卡
	billImport: `${prefix}_RETURN_CARD_VIEWING_PROGRESS_IMPORT`, //账单导入
	billContinueImport: `${prefix}_RETURN_CARD_VIEWING_PROGRESS_CONTINUEIMPORT`, //继续导入信用卡账单
	continueRealInfo: `${prefix}_RETURN_CARD_VIEWING_PROGRESS_OPERATOR`, //继续确认身份信息
	selectCreditCardResult: `${prefix}_CARD_SELECTION_CARDSELECTION`, //选择信用卡_选卡结果
	addCreditCard: `${prefix}_CARD_SELECTION_NEWCARD`, //新增需要还款信用卡
	importOtherCreditCard: `${prefix}_ADD_SCHEDULE_CREDIT_CARDS`, //选择导入其他信用卡
	replaceCard: `${prefix}_APPLY_LOAN_CARD_REPLACEMENT`, //申请借钱还-更换卡
	gotIt: `${prefix}_QUICK_PAY_GOTIT`, //快速打款中-我知道了
	manualAuditFollow: `${prefix}_AWAITING_AUDIT_FOLLOW`, //等待人工审核-关注
	assessingBindCard: `${prefix}_RAPID_ASSESSMENT_BINDING_CARD`, //快速评估中-绑卡
	protocolSmsFail: `${prefix}_HOME_PROTOCOL_SMS_FAIL`, // 签约借款页协议绑卡校验失败埋点
	protocolBindFail: `${prefix}_HOME_PROTOCOL_BIND_FAIL`, // 签约借款页协议绑卡绑定失败埋点
	protocolBindBtnClick: `${prefix}_HOME_PROTOCOL_MODAL_BTN_CLICK`, // 签约借款页协议绑卡短验弹框按钮点击

	dialogInformation: `${prefix}_QUESTION_FEEDBACK_BASIC_INFORMATION`,
	dialogInformation_wait: `${prefix}_QUESTION_FEEDBACK_BASIC_INFORMATION_CONTINUE`,
	dialogInformation_close: `${prefix}_QUESTION_FEEDBACK_BASIC_INFORMATION_CLOSE`,

	dialogMoxieBank: `${prefix}_QUESTION_FEEDBACK_BANK`,
	dialogMoxieBank_wait: `${prefix}_QUESTION_FEEDBACK_BANK_CONTINUE`,
	dialogMoxieBank_close: `${prefix}_QUESTION_FEEDBACK_BANK_CLOSE`,

	dialogLoanRepay: `${prefix}_QUESTION_FEEDBACK_APPLY`,
	dialogLoanRepay_wait: `${prefix}_QUESTION_FEEDBACK_APPLY_CONTINUE`,
	dialogLoanRepay_close: `${prefix}_QUESTION_FEEDBACK_APPLY_CLOSE`,

	feedModalOperator: `${prefix}_TIPS_OPERATORS_RETRIEVE`, //找回运营商密码
	feedModalInterbank: `${prefix}_TIPS_INTERNETBANK_RETRIEVE`, //找回信用卡密码
	feedModalSubmit: `${prefix}_TIPS_OTHERISSUES`, //反馈问题提交事件
	feedModalBtnClick: `${prefix}_TIPS_RISSUES` //选择问题按钮点击总事件
};

const mine = {
	faq: `${prefix}_MINE_FAQ`, // 常见问题页
	saveConfirm: `${prefix}_MINE_SAVE_CONFIRM`, // 绑定储蓄卡页-确定按钮
	creditConfirm: `${prefix}_MINE_CREDIT_CONFIRM`, // 绑定信用卡页-确定按钮
	creditExtension: `${prefix}_MINE_CREDIT_EXTENSION`, // 风控授信项页 从哪进入（首页、我的）
	creditExtensionConfirm: `${prefix}_MINE_CREDIT_EXTENSION_CONFIRM`, // 风控授信项页-点击提交代还金申请按钮
	creditExtensionBack: `${prefix}_MINE_CREDIT_EXTENSION_BACK`, // 风控授信项页
	creditExtensionRealName: `${prefix}_MINE_CREDIT_EXTENSION_REAL_NAME`, // 风控授信项页 点击实名认证
	creditExtensionBaseInfo: `${prefix}_MINE_CREDIT_EXTENSION_BASE_INFO`, // 风控授信项页 点击基本信息认证
	creditExtensionOperator: `${prefix}_MINE_CREDIT_EXTENSION_OPERATOR`, // 风控授信项页 点击运营商认证
	creditExtensionFaceAuth: `${prefix}_MINE_CREDIT_EXTENSION_FACEAUTH`, // 风控授信项页 点击人脸识别认证
	creditExtensionZM: `${prefix}_MINE_CREDIT_EXTENSION_ZM`, // 风控授信项页 点击芝麻分认证
	protocolSmsFail: `${prefix}_MINE_PROTOCOL_SMS_FAIL`, // 绑定储蓄卡页协议绑卡校验失败埋点
	protocolBindFail: `${prefix}_MINE_PROTOCOL_BIND_FAIL` // 绑定储蓄卡页协议绑卡绑定失败埋点
};

const order = {
	repayment: `${prefix}_ORDER_DETAILS_REPAYMENT`, // 账单详情页-主动还款按钮
	repaymentFirst: `${prefix}_ORDER_DETAILS_REPAYMENT_FIRST`, // 账单详情页-付款详情-立即还款按钮
	returnHome: `${prefix}_ORDER_BACK_HOME`, // 还款完成页-返回首页按钮
	openNow: `${prefix}_ORDER_OPEN_NOW`, // 还款完成页-弹框里立即开启按钮
	closeModal: `${prefix}_ORDER_CLOSE_MODAL` // 还款完成页-弹框里关闭按钮
};

const membership = {
	confirmBuyPre: `${prefix}_MEMBERSHIP_CONFIRM_BUY_PRE`, // 会员卡购买页-确认购买按钮
	bindCardCredit: `${prefix}_MEMBERSHIP_BIND_CARD_CREDIT`, // 会员卡购买页-绑定银行卡-信用卡页-确认绑定按钮
	bindCardSave: `${prefix}_MEMBERSHIP_BIND_CARD_SAVE`, // 会员卡购买页-绑定银行卡-储蓄卡页-确认绑定按钮
	confirmBuy: `${prefix}_MEMBERSHIP_CONFIRM_BUY` // 会员卡购买-确认购买页-确认购买按钮
};

const bugLog = {
	apiErrorLog: `${prefix}_API_ERROR_LOG`, // 接口异常报错日志
	pageErrorLog: `${prefix}_PAGE_ERROR_LOG` // 页面异常报错日志
};

const mpos_service_authorization = {
	auth_btn: `${prefix}_AUTH_PAGE_AUTH_BTN`,
	auth_page: `${prefix}_MPOS_AUTH_PAGE`
};

const activity = {
	newUserEntry: `${prefix}_NEW_USER_ACTIVITY_ENTRY`, // 拉新活动运营入口来源埋点
	couponEntry: `${prefix}_COUPON_ACTIVITY_ENTRY`, // 领取优惠券活动运营
	dazhuanpan_316_entry: `${prefix}_DAZHUANPAN_316_ACTIVITY_ENTRY`, // 316大转盘入口区分
	dazhuanpan_316_draw_result: `${prefix}_DAZHUANPAN_316_DRAW_RESULT`, // 316大转盘中奖情况
	jupeiEntry: `${prefix}_JUPEI_ACTIVITY_ENTRY`, //拒就赔活动
	funsisongEntry: `${prefix}_ACTIVITY_FUNSISONG_ENTRY`, // 放肆送活动入口
	couponBtnClick: `${prefix}_ACTIVITY_COUPON_GET`, // 放肆送活动领取按钮点击
	redBagBtnClick: `${prefix}_ACTIVITY_REDBAG_GET`, // 放肆送活动还信用卡赚钱按钮点击
	joinNowClick: `${prefix}_ACTIVITY_CHECK_COUPON`, // 放肆送活动弹框立即参与按钮点击
	checkCouponClick: `${prefix}_ACTIVITY_JOIN_NOW`, // 放肆送活动弹框查看优惠劵按钮点击
	homeModalBtnClick: `${prefix}_ACTIVITY_HOME_MODAL_CLICK`, // 放肆送活动中mpos 还到弹窗 点击
	mianxi418Entry: `${prefix}_ACTIVITY_MIANXI_418_ENTRY`, // 最高免息30天 活动入口
	mianxi418Btn: `${prefix}_ACTIVITY_MIANXI_418_BTN`, // 最高免息30天 按钮
	wenjuanEntry: `${prefix}_ACTIVITY_WENJUAN_ENTRY`, // 问卷入口
	wenjuanBtn: `${prefix}_ACTIVITY_WENJUAN_BTN`, // 问卷提交按钮
	wenjuanShare: `${prefix}_ACTIVITY_WENJUAN_SHARE`, // 问卷提交分享
	wenjuanHome: `${prefix}_ACTIVITY_WENJUAN_Home`, // 问卷去首页
	jjpEntry: `${prefix}_ACTIVITY_JUJIUPEI_ENTRY`, //拒就赔活动入口
	jjpGetBtn: `${prefix}_ACTIVITY_JUJIUPEI_GET_BTN`, //拒就赔领取按钮点击
	jjpMposConfirmBtn: `${prefix}_ACTIVITY_JUJIUPEI_MPOS_CONFIRM`, //拒就赔mpos中弹框确定按钮点击
	jjpWxConfirmBtn: `${prefix}_ACTIVITY_JUJIUPEI_WX_CONFIRM`, //拒就赔微信中弹框确定按钮点击
	jjpHomeModalClick: `${prefix}_ACTIVITY_JUJIUPEI_HOME_MODAL_CLICK`, //拒就赔首页弹框按钮点击
	brandEntry: `${prefix}_ACTIVITY_BRAND_ENTRY`, // 品牌活动入口
	brandBtnClick: `${prefix}_ACTIVITY_BRAND_TIYAN_BTN`, // 品牌活动还到体验按钮点击
	brandHomeModalClick: `${prefix}_ACTIVITY_BRAND_HOME_MODAL_CLICK`, // 品牌活动首页弹框开启生涯模式按钮点击
	fenqiHomeModalGoBtn: `${prefix}_FENQI_HOME_MODAL_GO_BTN`, //现金分期活动弹窗按钮点击
	fenqiHomeModalClose: `${prefix}_FENQI_HOME_MODAL_CLOSE`, //现金分期活动弹窗关闭
	mayReceiveBtn: `${prefix}_ACTIVITY_TWO_RECEIVE`, // 五月狂欢活动 畅想双重豪礼 领取 按钮
	mayExtractBtn: `${prefix}_ACTIVITY_TWO_EXTRACT`, // 五月狂欢活动 畅想双重豪礼 抽奖 按钮
	mayNewRecBtn: `${prefix}_ACTIVITY_NEW_ONEKEYCOLLECTION`, // 五月狂欢活动 新用户专享 一键领取 按钮
	mayNewRulesBtn: `${prefix}_ACTIVITY_NEW_ACTIVITYRULES`, // 五月狂欢活动 新用户专享 活动规则 按钮
	mayNewConfirmRecBtn: `${prefix}_ACTIVITY_NEW_RECEIVEIMMEDIATELY_CONFIRMRECEIPT`, // 五月狂欢活动 新用户专享-马上领取 确认领取 按钮
	mayNewUseNowBtn: `${prefix}_ACTIVITY_NEW_CONGRATULATIONS_USEIMMEDIATELY`, // 五月狂欢活动 新用户专享-恭喜您 马上使用 按钮
	mayNewToOldBtn: `${prefix}_ACTIVITY_NEW_SORRY_JUMP`, // 五月狂欢活动 新用户专享-抱歉 跳转老用户专享 按钮
	mayOldDrawBtn: `${prefix}_ACTIVITY_OLD_STARTRAFFLE`, // 五月狂欢活动 老用户专享-开始抽奖 按钮
	mayOldToNewBtn: `${prefix}_ACTIVITY_OLD_SORRY_JUMP`, // 五月狂欢活动 老用户专享-跳转新用户专享 按钮
	mayOldAuthTipsBtn: `${prefix}_ACTIVITY_OLD_TIPS_AUTHENTICATION`, // 五月狂欢活动 老用户专享-提示 填写认证资料 按钮
	mayOldNoPrizeBtn: `${prefix}_ACTIVITY_OLD_FRIENDSHIPTIPS_NOPRIZE`, // 五月狂欢活动 老用户专享-友情提示-奖品数量-知道了 按钮
	mayOldNoChanceBtn: `${prefix}_ACTIVITY_OLD_FRIENDSHIPTIPS_NOCHANCE`, // 五月狂欢活动 老用户专享-友情提示-抽奖机会-知道了 按钮
	mayOldUseNowBtn: `${prefix}_ACTIVITY_OLD_CONGRATULATIONS`, // 五月狂欢活动 老用户专享-恭喜你 立即使用 按钮
	mayOldRulesBtn: `${prefix}_ACTIVITY_OLD_ACTIVITYRULES`, // 五月狂欢活动 老用户专享 活动规则 按钮
	mayOldMyPrizeBtn: `${prefix}_ACTIVITY_OLD_MYPRIZE`, // 五月狂欢活动 老用户专享 我的奖品 按钮
	mayOldMyPrizeUseBtn: `${prefix}_ACTIVITY_OLD_MYPRIZE_IMMEDIATEUSE`, // 五月狂欢活动 老用户专享-我的奖品 立即使用 按钮
	mayJoinSuccess: `${prefix}_ACTIVITY_JOIN_SUCCESS`, // 五月狂欢活动 成功参与埋点（调用后台接口）
	koubeiEntry: `${prefix}_ACTIVITY_KOUBEI_ENTRY`, // 口碑活动入口来源
	koubeiBtnClick: `${prefix}_ACTIVITY_KOUBEI_TIYAN_BTN`, // 口碑活动还到体验按钮点击
	koubeiHomeOldModalClick: `${prefix}_ACTIVITY_KOUBEI_HOME_OLDMODAL_CLICK`, // 口碑活动首页老用户弹框
	koubeiHomeNewModalClick: `${prefix}_ACTIVITY_KOUBEI_HOME_NEWMODAL_CLICK`, // 口碑活动首页新用户弹框
	jd618Entry: `${prefix}_JD618_ENTRY`,
	freebillEntry: `${prefix}_FREEBILL_ENTRY`,
	jd618BtnClick: `${prefix}_ACTIVITY_JD618_BTN`,
	jd618ModalBtnClick: `${prefix}_ACTIVITY_JD618_MODAL_BTN`,
	freeBillBtnClick: `${prefix}_ACTIVITY_FREEBILL_BTN`,
	freeBillModalBtnClick: `${prefix}_ACTIVITY_FREEBILL_MODAL_BTN`,
	yhq7ModalBtnClick: `${prefix}_ACTIVITY_YHQ7_MODAL_BTN`,
	yhq50ModalBtnClick: `${prefix}_ACTIVITY_YHQ50_MODAL_BTN`,
	jd618ResultModalClick: `${prefix}_JD618_RESULT_MODAL_CLICK`,
	jd618HomeModalClose: `${prefix}_JD618HOMEMODALCLOSE`,
	freeBillHomeModalClose: `${prefix}_FREEBILLHOMEMODALCLOSE`
};

const moxie_bank_list = {
	bankChooes: `${prefix}_CREDIT_BANK_CHOOES`, // 拉新活动运营入口来源埋点
	bankRefresh: `${prefix}_CREDIT_BANK_REFRESH` // 领取优惠券活动运营
};

const mpos_ioscontrol_page = {
	iosControlPageView: `${prefix}_MPOS_HD_WECHAT`, // mpos 管控页页面/mpos引流微信页面加载完成
	copySuccess: `${prefix}_COPY_SUCCESS` // mpos 管控页页面/mpos引流微信页面复制成功
};

const loan_repay_confirm = {
	// back30: `${prefix}_PRODUCT_BACK_30`,
	// sure30: `${prefix}_PRODUCT_SURE_30`,
	// cancle30: `${prefix}_PRODUCT_CANCLE_30`,
	// select30: `${prefix}_PRODUCT_SELECT_30`
};

const other = {
	outerDownloadBtnClick: `${prefix}_OUTER_DOWNLOAD_BUTTON_CLICK` //外部下载页按钮点击事件
};

const loan_fenqi = {
	day30: `${prefix}_FENQI_DATE_DAY_30`,
	month3: `${prefix}_FENQI_DATE_MONTH_3`,
	month6: `${prefix}_FENQI_DATE_MONTH_6`,
	month9: `${prefix}_FENQI_DATE_MONTH_9`,
	month12: `${prefix}_FENQI_DATE_MONTH_12`,
	moneyBlur: `${prefix}_FENQI_MONEY_BLUR`,
	repayPlan: `${prefix}_FENQI_REPAY_PLAN`,
	resaveCard: `${prefix}_FENQI_RESAVECARD`,
	payCard: `${prefix}_FENQI_PAYCARD`,
	contract: `${prefix}_FENQI_CONTRACT`,
	clickSubmit: `${prefix}_FENQI_CLICK_SUBMIT`,
	submitResult: `${prefix}_FENQI_SUBMIT_RESULT`,
	fenqiGoBack: `${prefix}_FENQI_GO_BACK`,
	fenqiDownload: `${prefix}_FENQI_DOWNLOAD_CLICK`,
	fenqiHomeApplyBtn: `${prefix}_FENQI_HOME_APPLY_BTN`
};

export {
	login,
	home,
	mine,
	order,
	membership,
	bugLog,
	mpos_service_authorization,
	activity,
	moxie_bank_list,
	mpos_ioscontrol_page,
	loan_repay_confirm,
	loan_fenqi,
	other
};

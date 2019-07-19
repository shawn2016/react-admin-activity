// 本地存储
import { storeTypes } from './storeTypes';
import { isPhone } from './common';

const { localStorage, sessionStorage } = window;
// 默认使用sessionstorage
let STORAGE_METHOD = sessionStorage;
const storageUtil = {
	// && list.includes(funcName) bug机 全部存入到
	setItem(key, value, funcName) {
		STORAGE_METHOD = isBugBrowser() ? localStorage : sessionStorage;

		STORAGE_METHOD.setItem(key, JSON.stringify(value));
	},
	getItem(key, funcName) {
		STORAGE_METHOD = isBugBrowser() ? localStorage : sessionStorage;

		const value = STORAGE_METHOD.getItem(key);
		return JSON.parse(value);
	},
	clear(funcName) {
		STORAGE_METHOD = isBugBrowser() ? localStorage : sessionStorage;

		STORAGE_METHOD.clear();
	},
	removeItem(key, funcName) {
		STORAGE_METHOD = isBugBrowser() ? localStorage : sessionStorage;

		STORAGE_METHOD.removeItem(key);
	},
	multiGet(keys) {
		const values = {};
		keys.forEach((key) => {
			values[key] = this.getItem(key);
		});
		return values;
	},
	multiRemove(keys) {
		keys.forEach((key) => this.removeItem(key));
	}
};

// 定义需要特殊处理的浏览器
const bugBrowserArr = [ 'vivobrowser', 'oppobrowser', 'safari' ];

// 检测是否是某种 bug 浏览器
const isBugBrowser = () => {
	const u = navigator.userAgent.toLowerCase();
	// Toast.info(u,0)
	const bugBrowserList = bugBrowserArr.filter((item) => u.indexOf(item) > -1);
	return (
		bugBrowserList.length > 0 &&
		u.indexOf('micromessenger') <= -1 &&
		u.indexOf('suixingpay-mpos') <= -1 &&
		!isPhone()
	);
};

let store = {};
// 需要区别对待的存储字段
let list = [ 'Token', 'JumpUrl', 'H5Channel', 'billNo' ];

// 本地存储工厂函数，生成 set get remove 方法(优先使用sessionstorage)
const storeFactory = (funcName, key) => {
	store[`set${funcName}`] = (data) => {
		storageUtil.setItem(key, data, funcName);
	};
	store[`get${funcName}`] = () => storageUtil.getItem(key, funcName);
	store[`remove${funcName}`] = () => storageUtil.removeItem(key, funcName);
};

// 循环添加存储方法(包括local session)
for (let funName in storeTypes) {
	storeFactory(funName, storeTypes[funName]);
}

export { store };
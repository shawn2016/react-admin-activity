const success = (obj, options) => {
  return {
    data: obj,
    status: 200,
    msgCode: "PTM0000",
    msgInfo: (options && options.msgInfo) || "请求成功"
  };
};
const fail = (obj, options) => {
  return {
    data: obj,
    status: 200,
    msgCode: "PTM1001",
    msgInfo: (options && options.msgInfo) || "请求失败"
  };
};
export default { success, fail };

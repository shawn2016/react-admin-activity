import fetch from "sx-fetch";
const fetchInit = () => {
  fetch.init({
    timeout: 10000, // 默认超时
    baseURL: `/wap`, // baseurl
    onShowErrorTip: (err, errorTip) => {
      console.log(err);
      setTimeout(() => {
        if (errorTip) console.log("系统开小差，请稍后重试");
      }, 0);
    },
    onShowSuccessTip: (response, successTip) => {
      switch (response.data.msgCode) {
        case "PTM0000":
          return;
        default:
      }
    }
  });
  // 拦截请求
  fetch.axiosInstance.interceptors.request.use(
    cfg => {
      return cfg;
    },
    error => {
      Promise.reject(error);
    }
  );
  // 拦截响应
  fetch.axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

export default fetchInit;

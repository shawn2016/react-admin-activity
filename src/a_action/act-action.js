/**
  一些公共的action可以写在这里，比如用户登录、退出登录、权限查询等
  其他的action可以按模块不同，创建不同的js文件
**/

import Fetchapi from "../util/fetch-api"; // 自己写的工具函数，封装了请求数据的通用接口
import { message } from "antd";

/**
 * 获取页面信息
 * **/
export const getPages = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch(
      `api/pages/${params._id}?withFileContent=1`,
      params,
      {
        method: "get"
      }
    );
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};
/**
 * 删除
 * **/
export const delPages = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch(`api/pages/${params._id}`, params, {
      method: "delete"
    });
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};
/**
 * 保存配置
 * **/
export const putPages = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch(
      `api/pages/${params._id}`,
      params.clonePage,
      {
        method: "put"
      }
    );
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 保存配置
 * **/
export const updatePage = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch(
      `api/pages/${params._id}`,
      params.data,
      {
        method: "put"
      }
    );
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 保存配置
 * **/
export const createPage = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch(`api/pages`, params, {
      method: "post"
    });
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 获取页面信息
 * **/
export const getPagesList = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch(`api/pages`, params, {
      method: "get"
    });
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 获取页面组件信息
 * **/
export const getComponents = (params = {}, options) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch(
      options ? `api/components?withFileContent=1` : "api/components",
      params,
      {
        method: "get"
      }
    );
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 获取本地组件
 * **/
export const getLocalComponents = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/sync/components", params, {
      method: "get"
    });
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};
/**
 * 同步组件
 * **/
export const syncLocalComponent = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/components", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 获取项目
 * **/
export const getProjects = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/projects", params, {
      method: "get"
    });
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 删除项目
 * **/
export const delProjects = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch(`api/projects/${params.id}`, null, {
      method: "delete"
    });
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};
/**
 * 删除组件
 * **/
export const delComponents = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch(
      `api/components/${params._id}`,
      params,
      {
        method: "delete"
      }
    );
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

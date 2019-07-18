/**
 * 系统模块action
 * **/
import Fetchapi from "../util/fetch-api"; // 自己写的工具函数，封装了请求数据的通用接口
import { message } from "antd";

/**
 * 获取所有菜单
 * **/
export const getMenus = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/getmenus", params);
    if (res.data.status === 200) {
      await dispatch({
        type: "SYS.getMenus",
        payload: res.data.data
      });
    }
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};
/**
 * 根据菜单ID获取对应的菜单信息
 * @id:可以是一个数字也可以是一个数组
 * **/
export const getMenusById = (params = []) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/getMenusById", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 添加菜单
 * @params: {
    'name',
    'url',
    'parent',
    'icon',
    'desc',
    'sorts',
    'conditions',
  * }
 * **/
export const addMenu = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/addmenu", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 修改菜单
 * **/
export const upMenu = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/upmenu", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 删除菜单
 * **/
export const delMenu = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/delmenu", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 根据菜单ID查询其下的权限数据
 * **/
export const getPowerDataByMenuId = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/getpowerbymenuid", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 根据权限ID查询对应的权限数据
 * @id: 可以是一个数字也可以是一个数组
 * **/
export const getPowerById = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/getPowerById", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 添加权限
 * **/
export const addPower = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/addpower", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 修改权限
 * **/
export const upPower = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/uppower", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 删除权限
 * **/
export const delPower = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/delpower", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 分页查询角色数据
 * **/
export const getRoles = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/getroles", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 查询所有角色数据
 * **/
export const getAllRoles = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/getAllRoles", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 通过角色ID查询对应的角色数据
 * @id: 可以是一个数字，也可以是一个数组
 * 返回值是数组
 * **/
export const getRoleById = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/getRoleById", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 添加角色
 * **/
export const addRole = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/addrole", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 修改角色
 * **/
export const upRole = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/uprole", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 删除角色
 * **/
export const delRole = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/delrole", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 通过角色ID查询该角色拥有的所有菜单和权限详细信息
 * **/
export const findAllPowerByRoleId = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/findAllPowerByRoleId", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 获取所有的菜单及权限详细信息
 * **/
export const getAllPowers = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/getAllPowers", params);
    if (res.data.status === 200) {
      await dispatch({
        type: "SYS.getAllPowers",
        payload: res.data.data
      });
    }
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 通过角色ID给指定角色设置菜单及权限
 * **/
export const setPowersByRoleId = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/setPowersByRoleId", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 条件分页查询用户列表
 * **/
export const getUserList = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/getUserList", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 添加用户
 * **/
export const addUser = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/addUser", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 修改用户
 * **/
export const upUser = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/upUser", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 删除用户
 * **/
export const delUser = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/delUser", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

/**
 * 给用户分配角色
 * **/
export const setUserRoles = (params = {}) => async dispatch => {
  try {
    const res = await Fetchapi.newFetch("api/setUserRoles", params);
    return res.data;
  } catch (err) {
    message.error("网络错误，请重试");
  }
};

import axios from './request';
import qs from 'qs';

/** 2020-2-21 0021
 *作者:王青高
 *功能: 获取文章列表
 *参数: {Object} options: 读取文章列表接口参数
 */
const getList = options => {
    return axios.get('/public/list?' + qs.stringify(options));
};

// 获取收藏和足迹接口
const getFoot = options => {
    return axios.get('/footprint/getFoot?' + qs.stringify(options));
};

// 清除收藏或足迹接口
const clearFoot = options => {
    return axios.get('footprint/clearFoot?' + qs.stringify(options));
};

// 获取书库所有分类
const getAllBook = () => {
    return axios.get('/shuku/getAllTypes');
};
// 获取书库热门分类
const getHotBook = () => {
    return axios.get('/shuku/getHotType');
};
// 获取医案热门分类
const getHotDoctor = () => {
    return axios.get('/yian/getHotType');
};
// 获取医案分类
const getAllDoctor = () => {
    return axios.get('/yian/getParentType');
};
// 获取医案二级分类
const getChildrenDoctor = pid => {
    return axios.get('/yian/getSubTypeByPid?' + qs.stringify(pid));
};
export {
    getList,
    getFoot,
    clearFoot,
    getAllBook,
    getHotBook,
    getHotDoctor,
    getAllDoctor,
    getChildrenDoctor
};

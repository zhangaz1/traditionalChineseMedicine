import axios from './request';
import qs from 'qs';

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
// 获取医案二级分类
const getChildrenDoctor = pid => {
    return axios.get('/yian/getSubTypeByPid?' + qs.stringify(pid));
};
// 获取首页信息
const getHomeInfo = () => {
    return axios.get('/index/getIndexContent');
};
// 获取指定书籍
const getBookList = id => {
    return axios.get('' + qs.stringify(id));
};
// 获取医案首页信息
const getIndexData = () => {
    return axios.get('/yian/getIndexData');
};
// 获取医案分页搜索
const getDoctorSearch = options => {
    return axios.get('search/searchInfoByKeyWords?' + qs.stringify(options));
};
// 获取医案文章列表
const getDoctorArticle = options => {
    return axios.get('/yian/getInfolistByChannel?' + qs.stringify(options));
};
// 获取医案文章内容
const getDoctorArticleDetail = id => {
    return axios.get('/yian/getInfoById?' + qs.stringify(id));
};
// 收藏/取消收藏
const addToCollectionInfo = id => {
    return axios.get('/yian/addToCollectionInfo?' + qs.stringify(id));
};
export {
    getFoot,
    clearFoot,
    getAllBook,
    getHotBook,
    getChildrenDoctor,
    getHomeInfo,
    getBookList,
    getIndexData,
    getDoctorSearch,
    getDoctorArticle,
    getDoctorArticleDetail,
    addToCollectionInfo
};

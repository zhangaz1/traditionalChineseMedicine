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
// 获取分页搜索
const getSearch = options => {
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
// 获取视频初始化信息
const getVideoData = () => {
    return axios.get('/vedio/getIndexData');
};
// 获取学习方案
const getLearnPlan = () => {
    return axios.get('/learn/getLearnPlan');
};
// 添加学习方案
const addLearnPlan = options => {
    return axios.get('/learn/addLearnPlan?' + qs.stringify(options));
};
// 提交反馈建议
const addFeedBack = content => {
    return axios.get('/learn/addFeedBack?' + qs.stringify(content));
};
// 根据分类获取视频列表
const getVediolistByChannel = options => {
    return axios.get('/vedio/getVediolistByChannel?' + qs.stringify(options));
};
// 点击视频获取内容和目录
const getVedioList = id => {
    return axios.get('/vedio/getVedioList?' + qs.stringify(id));
};
// 获取视频播放内容
const getVedioContent = id => {
    return axios.get('/vedio/getVedioContent?' + qs.stringify(id));
};
// 点击书籍获取目录
const getBookItem = id => {
    return axios.get('/shuku/getBookItem?' + qs.stringify(id));
};
// 点击章节获取内容
const getItemContent = id => {
    return axios.get('/shuku/getItemContent?' + qs.stringify(id));
};
// 点击视频收藏
const addToCollectionVedio = id => {
    return axios.get('/vedio/addToCollectionVedio?' + qs.stringify(id));
};
const getBookListByChannel = options => {
    return axios.get('/shuku/getBookListByChannel?' + qs.stringify(options));
}
export {
    getFoot,
    clearFoot,
    getAllBook,
    getHotBook,
    getChildrenDoctor,
    getHomeInfo,
    getBookList,
    getIndexData,
    getSearch,
    getDoctorArticle,
    getDoctorArticleDetail,
    addToCollectionInfo,
    getLearnPlan,
    addLearnPlan,
    addFeedBack,
    getVideoData,
    getVediolistByChannel,
    getVedioList,
    getVedioContent,
    getBookItem,
    getItemContent,
    addToCollectionVedio,
    getBookListByChannel
};

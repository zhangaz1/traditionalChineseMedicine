import axios from './request';
import qs from 'qs';

/** 2020-2-15 0015
 *作者:王青高
 *功能: 忘记密码 由于接口原因暂时弃用
 *参数: {option: 用户信息、邮箱、验证码}
 */
const forget = option => {
    return axios.post('/login/forget', {
        ...option
    });
};
/** 2020-2-15 0015
 *作者:王青高
 *功能: 登录 由于接口原因暂时弃用
 *参数: {loginInfo: 用户登录信息}
 */
const login = loginInfo => {
    return axios.post('/login/login', {
        ...loginInfo
    });
};

/** 2020-2-15 0015
 *作者:王青高
 *功能: 注册 由于接口原因暂时弃用
 *参数: {regInfo: 用户注册信息}
 */
const reg = regInfo => {
    return axios.post('/login/registByPhone', regInfo);
};
/** 2020/3/25
* 作者：王青高
* 功能：{} 上传头像
* 参数：{file} 图片文件
*/
const upHeadImg = file => {
  return axios.post('/imgupload/upfile', {
      ...file
  });
};
/** 2020/3/31
* 作者：王青高
* 功能：{} 获取用户信息
* 参数：{}
*/
const getUserInfo = () => {
  return axios.get('/my/getUserInfo');
};
/** 2020/3/31
* 作者：王青高
* 功能：{} 修改用户信息
* 参数：{Object} 头像图片、昵称
*/
const updateInfo = options => {
    return axios.get('/my/updateInfo?' + qs.stringify(options));
};
/** 2020/4/1
* 作者：王青高
* 功能：{} 退出登录
* 参数：{}
*/
const logout = () => {
    return axios.get('/login/logout');
};

export { upHeadImg, getUserInfo, updateInfo, logout };

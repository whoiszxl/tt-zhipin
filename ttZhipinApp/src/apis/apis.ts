import { METHODS, PARAM_TYPE } from "./methods";

const apis = {

    recommendList: {url: '/job/api/job/recommend/list', method: METHODS.GET}, //获取推荐职位列表

    /** 会员相关接口 */
    sendSmsCaptcha: {url: '/member/api/login/sms-captcha', method: METHODS.POST}, //发送登录短信
    smsLogin: {url: '/member/api/login/sms', method: METHODS.POST}, //短信登录接口

    logout: {url: '/member/api/member/logout', method: METHODS.POST}, //登出接口
    memberDetail: {url: '/member/api/member/detail', method: METHODS.GET}, //获取用户信息
    memberDetailById: {url: '/member/api/member/detail/', method: METHODS.GET, paramType: PARAM_TYPE.PATH}, //通过memberId获取用户信息

    /** 文件上传相关接口 */
    fileUpload: {url: '/file/file/upload', method: METHODS.POST}, //文件上传

}

export default apis;
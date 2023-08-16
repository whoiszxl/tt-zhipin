import { METHODS, PARAM_TYPE } from "./methods";

const apis = {

    recommendList: {url: '/job/api/job/recommend/list', method: METHODS.GET}, //获取推荐职位列表
    jobDetail: {url: '/job/api/job/', method: METHODS.GET, paramType: PARAM_TYPE.PATH}, //获取职位详情信息，jobId拼接在url之后


    /** 会员相关接口 */
    sendSmsCaptcha: {url: '/member/api/login/sms-captcha', method: METHODS.POST}, //发送登录短信
    smsLogin: {url: '/member/api/login/sms', method: METHODS.POST}, //短信登录接口

    memberInfo: {url: '/member/api/member/info', method: METHODS.GET}, //获取用户信息
    initBaseInfo: {url: '/member/api/member/init/base-info', method: METHODS.POST}, //初始化用户的基本信息
    

    logout: {url: '/member/api/member/logout', method: METHODS.POST}, //登出接口

    /** 文件上传相关接口 */
    fileUpload: {url: '/file/api/file/upload', method: METHODS.POST}, //文件上传

}

export default apis;
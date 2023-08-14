import ApiService from "../apis/ApiService";
import { flow } from "mobx";
import StorageUtil from "../utils/StorageUtil";
import { CommonConstant } from "../common/CommonConstant";
import { View, Button, Alert, StyleSheet } from 'react-native';


class MemberStore {

    token : any;

    loginToken: any;
    
    requestSmsLogin = flow(function* (this: MemberStore, phone: string, smsCode: string, uuid: string, callback: (success: boolean) => void) {
        try {
            const params = {
                phone: phone,
                smsCode: smsCode,
                uuid: uuid
            };

            const { data } = yield ApiService.request('smsLogin', params);
            if (data) {
                if(data.code !== 0) {
                    this.token = null;
                    callback?.(false);
                    Alert.alert(data.message);
                    return;
                }

                this.token = data.data;
                StorageUtil.setItem(CommonConstant.TOKEN, data.data);
                callback?.(true);
            } else {
                this.token = null;
                callback?.(false);
            }
        } catch (error) {
            this.token = null;
            callback?.(false);
        }
    });


    requestSendSmsCaptcha = flow(function* (this: MemberStore, phone: string, callback: (success: boolean) => void) {
        try {
            const params = { phone: phone };
            
            const { data } = yield ApiService.request('sendSmsCaptcha', params);
            if (data) {
                this.loginToken = data.data;
                StorageUtil.setItem(CommonConstant.LOGIN_TOKEN, data.data);
                callback?.(true);
            } else {
                this.loginToken = null;
                callback?.(false);
            }
        } catch (error) {
            console.log(error);
            this.loginToken = null;
            callback?.(false);
        }
    });


    requestMemberInfo = flow(function* (this: MemberStore, callback: (data?: MemberInfoEntity) => void) {
        try {
            
            const { data } = yield ApiService.request('memberInfo');
            if (data) {
                if(data.code === 0) {
                    callback?.(data.data);
                }
            }
        } catch (error) {
            console.log(error);
            this.loginToken = null;
            callback?.(undefined);
        }
    });

    initBaseInfo = flow(function* (this: MemberStore, name: string, gender: number, birthday: string, callback: (success: boolean) => void) {
        try {
            const params = {
                fullName: name,
                gender: gender,
                birthday: birthday
            };
            const { data } = yield ApiService.request('initBaseInfo', params);
            if (data) {
                if(data.code === 0) {
                    callback?.(true);
                }
            }
        } catch (error) {
            console.log(error);
            this.loginToken = null;
            callback?.(false);
        }
    });

}

export default new MemberStore();
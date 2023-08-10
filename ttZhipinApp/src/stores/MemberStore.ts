import ApiService from "../apis/ApiService";
import { flow } from "mobx";
import StorageUtil from "../utils/StorageUtil";
import { CommonConstant } from "../common/CommonConstant";

class MemberStore {

    token : any;
    
    requestLogin = flow(function* (this: MemberStore, username: string, password: string, callback: (success: boolean) => void) {
        try {
            const params = {
                username: username,
                password: password,
            };
            const { data } = yield ApiService.request('login', params);
            if (data) {
                this.token = data.data;
                StorageUtil.setItem(CommonConstant.TOKEN, data.data);
                callback?.(true);
            } else {
                this.token = null;
                callback?.(false);
            }
        } catch (error) {
            console.log(error);
            this.token = null;
            callback?.(false);
        }
    });

}

export default new MemberStore();
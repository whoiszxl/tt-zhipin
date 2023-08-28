import ApiService from "../apis/ApiService";
import { CommonConstant } from "../common/CommonConstant";
import StorageUtil from "../utils/StorageUtil";
import WebSocketUtil from "../utils/WebSocketUtil";

export default class ChatWebSocket {


    private static imei:string = "imei-100";
    private static clientType:number = 1;

    
    static login = async () => {
        // 在发起请求时，从本地缓存中获取并设置 token
        const token = await StorageUtil.getItem(CommonConstant.TOKEN);
        WebSocketUtil.send(this.imei, token!, 1002, this.clientType, "{}");
    }
}






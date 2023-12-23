import ApiService from "../apis/ApiService";
import { observable } from "mobx";



export default class AttachmentResumeStore {

    //@ts-ignore
    @observable attachmentResumeList: AttachmentResume[]  = [];
    
    //获取用户详细信息
    requestOnlineResumeInfo = async () => {
        try {
            const { data } = await ApiService.request('memberAttachmentResumeList', {});
            this.attachmentResumeList = data.data || {};
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    saveAttachmentResume = async (filename: string, url: string) => {
        try {
            const { data } = await ApiService.request('memberAttachmentResumeSave', {
                filename: filename,
                url: url
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    deleteAttachmentResume = async (id: string) => {
        try {
            const { data } = await ApiService.request('memberAttachmentResumeDelete', id);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

}
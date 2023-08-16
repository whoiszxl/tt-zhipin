import { action, observable } from "mobx";
import ApiService from "../apis/ApiService";

const SIZE = 10;
export default class HomeStore {

    page: number = 1;

    //@ts-ignore
    @observable index: number = 0;

    //@ts-ignore
    @observable jobList: JobEntity[] = [];

    //@ts-ignore
    @observable refreshing: boolean = false;

    //@ts-ignore
    @action
    resetPage = () => {
        this.page = 1;
    }

    requestLatestTest = async () => {
        if(this.refreshing) {
            return;
        }

        try{
            this.refreshing = true;

            const params = {
                page: this.page,
                size: SIZE,
            };

            const { data } = await ApiService.request('recommendList', params);
            
            if(data?.data?.total > 0) {
                if(this.page === 1) {
                    this.jobList = data.data.list;
                }else {
                    this.jobList = [...this.jobList, ...(data.data.list)];
                }
                this.page = this.page + 1;
                this.refreshing = false;
            }else {
                if(this.page === 1) {
                    this.jobList = [];
                    this.refreshing = false;
                }else {
                    //没有更多数据了
                }
            }
        }catch(error) {
            
        }finally{
            this.refreshing = false;
        }

        
    }
}
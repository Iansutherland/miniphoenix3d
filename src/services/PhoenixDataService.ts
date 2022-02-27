import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import WifiSite from "../models/WifiSite";
import PhoenixOData, {PhoenixODataResult} from "../models/PhoenixOData";

export default class PhoenixDataService
{
    private http: AxiosInstance;

    constructor() {
        const instance =  axios.create({
            baseURL: 'https://www.phoenixopendata.com/api/3/action/'
        });
        this.http = instance;
    }

    private get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config);
    }

    private request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request<T, R>(config);
    }

    async GetOutdoorPublicWifiSites(limit: number = 10): Promise<WifiSite[] | null> {
        const response =  await this.get<PhoenixOData<WifiSite>>(`datastore_search?resource_id=95dbcf97-beb3-4354-b385-868178e67849&limit=${limit}`);
        return response.data.success ? response.data.result.records : null;
    }

    async GetPackageList() {
        return await this.http.get(`package_list`); 
    }

    async GetGroupList() {
        return await this.http.get(`group_list`); 
    }

    async sqlSearch(query: string) {
        return await this.http.get(`datastore_search_sql?sql=${query}`);
    }
}

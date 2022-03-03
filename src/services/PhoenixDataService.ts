import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import WifiSite from "../models/WifiSite";
import PhoenixOData, {PhoenixODataResult} from "../models/PhoenixOData";
import VehicleFeedData from "../models/VehicleFeed/VehicleFeedData";
import VehicleFeedEntity from "../models/VehicleFeed/VehicleFeedEntity";

export default class PhoenixDataService
{
    private http: AxiosInstance;
    private cancelTokenSource: CancelTokenSource;

    constructor() {
        const instance =  axios.create({
            baseURL: 'https://www.phoenixopendata.com/api/3/action/'
        });
        this.http = instance;
        this.cancelTokenSource = axios.CancelToken.source();
    }

    CancelRequests() {
        this.cancelTokenSource.cancel('Canceling requests');
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

    async GetVehicleFeed(): Promise<VehicleFeedData[] | null>{
        const response = await this.http.get<VehicleFeedEntity | null>(`https://app.mecatran.com/utw/ws/gtfsfeed/vehicles/valleymetro?apiKey=4f22263f69671d7f49726c3011333e527368211f&asJson=true`);
        return response.data ? response.data.entity : null;
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

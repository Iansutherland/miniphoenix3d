import VehicleFeedData from "./VehicleFeedData";

export default class VehicleFeedEntity{
    entity: VehicleFeedData[];
    header: {
        gtfsRealtimeVersion: string;
        incrementality: string;
        timestamp: string;
    }
}
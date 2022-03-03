import Position from "../Position";
import Trip from "../Trip";

export default class Vehicle{
    currentSTatus: string;
    currentSTopSequence: number;
    position: Position;
    stopId: string;
    timestamp: string;
    trip: Trip;
    vehicle: { id: string};
}
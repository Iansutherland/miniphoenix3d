import { LayerGroup, LayersControl, MapContainer, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import PhoenixDataService from './services/PhoenixDataService';
import React, { useState, useEffect } from 'react';
import WifiSite from './models/WifiSite';
import Pin from './components/Pin';
import MapBoxUrl, { mapBoxAttribution} from './services/MapBoxService';
import VehicleFeedEntity from './models/VehicleFeed/VehicleFeedEntity';
import VehicleFeedData from './models/VehicleFeed/VehicleFeedData';
import Vehicle from './models/VehicleFeed/Vehicle';

export default function BasicMap()
{
    const [wifiData, setWifiData] = useState<WifiSite[]>();
    const [vehicleFeed, setVehicleFeed] = useState<VehicleFeedData[]>();
    const attributionText: string = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    const phoenixDataService = new PhoenixDataService();


    useEffect(() => {
        (async () => {
            const response = await phoenixDataService.GetOutdoorPublicWifiSites(10);
            if(response)
                setWifiData(response);

            const vehicleFeedResponse = await phoenixDataService.GetVehicleFeed();
            if(vehicleFeedResponse)
                setVehicleFeed(vehicleFeedResponse);
        })();

        return () => {
            phoenixDataService.CancelRequests();
        }
    }, []);
    
    return(
        <MapContainer id='map' center={[33.448376, -112.074036]} zoom={13}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer name='Streets'>
                    <TileLayer
                        attribution={attributionText}
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked name='Humanitarian'>
                    <TileLayer 
                        attribution={attributionText}
                        url="https://tile-a.openstreetmap.fr/hot/{z}/{x}/{y}.png"/>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Cyclosm">
                    <TileLayer 
                        attribution={attributionText}
                        url = 'https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'/>
                </LayersControl.BaseLayer>
                <LayersControl.Overlay name="Free Wifi Spots">
                    <LayerGroup>
                        {wifiData ? wifiData.map((spot: WifiSite) => {
                            return(
                                <Pin key={spot._id} X={spot.X} Y={spot.Y}>
                                    <Popup>
                                    {getWifiSiteMetaData(spot)}
                                    </Popup>
                                </Pin>
                            );
                        }) :
                        ""}
                </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Vehicle Feed">
                    <LayerGroup>
                        {vehicleFeed ? vehicleFeed?.map((data: VehicleFeedData) => {
                            const vehicle: Vehicle = data.vehicle;
                            return(
                                <Pin key={data.id} X={vehicle.position.longitude.toString()} Y={vehicle.position.latitude.toString()}>
                                    <Popup>
                                    {getVehicleFeedMetaData(vehicle)}
                                    </Popup>
                                </Pin>
                            );
                        })
                        : ""}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Specified Vehicles">
                    <LayerGroup>
                    {getSpecifiedVehicles(vehicleFeed)}
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        
    </MapContainer>
    );
}

function getWifiSiteMetaData(site: WifiSite)
{
    return (
        <React.Fragment>
            <p>SiteName: {site.SITE_NAME}</p>
            <p>Type: {site.FACILITY_TYPE}</p>
        </React.Fragment>
    );
}

function getVehicleFeedMetaData(vehicle: Vehicle) {
    return (
        <React.Fragment>
            <p>vehicleID: {vehicle.vehicle.id}</p>
            {/* <p>trip: {vehicle.trip.scheduleRelationship + "ID:" + vehicle.trip.tripId}</p> */}
        </React.Fragment>
    )
}

function getSpecifiedVehicles(vehicleFeed: VehicleFeedData[] | undefined){
    const specifiedVehicleIds = ["5038", "5207", "5632"];
    const filteredVehicles: VehicleFeedData[] | null = vehicleFeed ? vehicleFeed?.filter(x => specifiedVehicleIds.includes(x.vehicle.vehicle.id)) : null;
    return(
        <React.Fragment>
            {filteredVehicles ? filteredVehicles.map((data: VehicleFeedData) => {
                            const vehicle: Vehicle = data.vehicle;
                            return(
                                <Pin key={data.id} X={vehicle.position.longitude.toString()} Y={vehicle.position.latitude.toString()}>
                                    <Popup>
                                    {getVehicleFeedMetaData(vehicle)}
                                    </Popup>
                                </Pin>
                            );
                        })
                        : ""}
        </React.Fragment>
    )
}
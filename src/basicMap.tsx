import { LayerGroup, LayersControl, MapContainer, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import PhoenixDataService from './services/PhoenixDataService';
import React, { useState, useEffect } from 'react';
import WifiSite from './models/WifiSite';
import Pin from './components/Pin';
import MapBoxUrl, { mapBoxAttribution} from './services/MapBoxService';

export default function BasicMap()
{
    const [data, setData] = useState<WifiSite[]>();
    const baseMaps = {
        Streets: L.tileLayer(MapBoxUrl(), {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mapBoxAttribution}),
        Light: L.tileLayer(MapBoxUrl(), {id: 'mapbox/light-v10', tileSize: 512, zoomOffset: -1, attribution: mapBoxAttribution}),
        Satellite: L.tileLayer(MapBoxUrl(), {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mapBoxAttribution}),
    }
    const attributionText: string = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    const phoenixDataService = new PhoenixDataService();

    useEffect(() => {
        (async () => {
            const response = await phoenixDataService.GetOutdoorPublicWifiSites(10);
            if(response)
                setData(response);
        })();
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
                <LayersControl.Overlay checked name="Free Wifi Spots">
                    <LayerGroup>
                        {data ? data.map((spot: WifiSite) => {
                            return(
                                <Pin key={spot._id} X={spot.X} Y={spot.Y}>
                                    <Popup>
                                    {getWifiSiteData(spot)}
                                    </Popup>
                                </Pin>
                            );
                        }) :
                        ""}
                </LayerGroup>
                </LayersControl.Overlay>
                
            </LayersControl>
        
    </MapContainer>
    );
}

function getWifiSiteData(site: WifiSite)
{
    return (
        <React.Fragment>
            <p>SiteName: {site.SITE_NAME}</p>
            <p>Type: {site.FACILITY_TYPE}</p>
        </React.Fragment>
    );
}
import { MapContainer, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import PhoenixDataService from './services/PhoenixDataService';
import React, { useState, useEffect } from 'react';
import WifiSite from './models/WifiSite';
import Pin from './components/Pin';
import LayerControl from './components/layer/LayerControl';
import MapBoxUrl, { mapBoxAttribution} from './services/MapBoxService';

export default function BasicMap()
{
    const [data, setData] = useState<WifiSite[]>();
    const baseMaps = {
        Streets: L.tileLayer(MapBoxUrl(), {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mapBoxAttribution}),
        Light: L.tileLayer(MapBoxUrl(), {id: 'mapbox/light-v10', tileSize: 512, zoomOffset: -1, attribution: mapBoxAttribution}),
        Satellite: L.tileLayer(MapBoxUrl(), {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mapBoxAttribution}),
    }
    const [baseMap, setBaseMap] = useState(baseMaps.Satellite);
    const phoenixDataService = new PhoenixDataService();

    useEffect(() => {
        (async () => {
            const response = await phoenixDataService.GetOutdoorPublicWifiSites(10);
            if(response)
                setData(response);
        })();
    }, []);
    
    return(
        <MapContainer id='map' center={[33.448376, -112.074036]} zoom={13} layers={[baseMap]}>
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
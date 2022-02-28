import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import PhoenixDataService from './services/PhoenixDataService';
import React, { useState, useEffect } from 'react';
import WifiSite from './models/WifiSite';
import Pin from './components/Pin';

export default function BasicMap()
{
    const [data, setData] = useState<WifiSite[]>();
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
        <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            accessToken={process.env.REACT_APP_SAUCE}
            id='mapbox/satellite-v9'
        />
        {data ? data.map((spot: WifiSite) => {
             console.log(`${parseFloat(spot.X)}, ${parseFloat(spot.Y)}`);
            return(
                <Pin X={spot.X} Y={spot.Y} _id={spot._id}>
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
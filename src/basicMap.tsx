import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import PhoenixDataService from './services/PhoenixDataService';
import { useState, useEffect } from 'react';
import WifiSite from './models/WifiSite';

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
            <Marker key={spot._id} position={[parseFloat(parseFloat(spot.Y).toFixed(3)), parseFloat(parseFloat(spot.X).toFixed(3))]}
            icon={new Icon({iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>
                    {spot.SITE_NAME}
                </Popup>
            </Marker>
            );
        }) :
        ""}
    </MapContainer>
    );
}
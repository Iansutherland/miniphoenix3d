import L from 'leaflet';
import { TileLayer } from 'react-leaflet';
import React, { useState } from 'react';

export default function LayerControl(props: any) {
    const [layer, setLayer] = useState<"mapbox/streets-v11" | "mapbox/light-v10" | "mapbox/satellite-v9">("mapbox/streets-v11");
    const styles = {
        height: '30px',
        width: '100px',
        position: 'absolute',
        top: '10px',
        right: '30px',
        zIndex: '400'
    } as React.CSSProperties;

    const layers = {
        Streets: 'mapbox/streets-v11',
        Light: 'mapbox/light-v10',
        Satellite: 'mapbox/satellite-v9'
    };
    
    const selectOnChange = (e: any) => {
        console.log(`chose: ${e.target.value}`);
        setLayer(e.target.value);
    };

    return(
        <React.Fragment>
            <select style={styles} onChange={selectOnChange}>
                {Object.entries(layers).map((keyValue, index) => <option key={index} value={keyValue[1]}>{keyValue[0]}</option>)}
            </select>
            <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                accessToken={process.env.REACT_APP_MAP_SAUCE}
                id={layer}
            />
        </React.Fragment>
    );
}
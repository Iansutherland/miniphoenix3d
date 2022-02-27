import { Icon } from "leaflet";
import { Marker } from "react-leaflet";

export default function Pin(props: any): JSX.Element {
    return (
    <Marker position={[51.505, -0.09]}
        icon={new Icon({iconUrl: 'leaflet/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41]})}>
            {props.children}
    </Marker>
    );
}
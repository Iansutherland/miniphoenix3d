import { Icon } from "leaflet";
import { Marker } from "react-leaflet";

export interface PinProps {
    X: string,
    Y: string,
    children: any
}

export default function Pin(props: PinProps): JSX.Element {

    return (
        <Marker position={[parseFloat(props.Y), parseFloat(props.X)]}
        icon={new Icon({iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41]})}>
            {props.children}
    </Marker>
    );
}
import { Icon } from "leaflet";
import { Marker } from "react-leaflet";

export interface PinProps {
    _id: string,
    X: string,
    Y: string,
    children: any
}

export default function Pin(props: PinProps): JSX.Element {

    return (
        <Marker key={props._id} position={[parseFloat(parseFloat(props.Y).toFixed(3)), parseFloat(parseFloat(props.X).toFixed(3))]}
        icon={new Icon({iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41]})}>
            {props.children}
    </Marker>
    );
}
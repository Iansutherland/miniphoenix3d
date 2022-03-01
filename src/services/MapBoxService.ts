export default function MapBoxUrl(): string {
    return `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAP_SAUCE}`;
}

export const mapBoxAttribution =  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import { TileLayer, BitmapLayer } from 'deck.gl';
import PhoenixDataService from './services/PhoenixDataService';

// DeckGL react component
export default function Deskgltest() {
    const phoenixDataService = new PhoenixDataService();
    const [vehicleFeed, setVehicleFeed] = useState();

    useEffect(() => {
        (async () => {
            const vehicleFeedResponse = await phoenixDataService.GetVehicleFeed();
            if(vehicleFeedResponse)
                setVehicleFeed(vehicleFeedResponse);
        })();
    });

    // Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -112.074036,
    latitude: 33.448376,
    zoom: 13,
    pitch: 25,
    bearing: 0
  };
  
  // Data to be used by the LineLayer
  const data = [
    {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
  ];
  const layers = [
    BaseMapLayer(),
    VehicleFeedLayer(vehicleFeed)
  ];

  return <div style={{zIndex:"1000"}}>
      <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers} />
  </div>
}

function BaseMapLayer() {
    return new TileLayer({
        data: 'https://tile-a.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    
        minZoom: 0,
        maxZoom: 19,
        tileSize: 256,
        
        renderSubLayers: props => {
            const {
              bbox: {west, south, east, north}
            } = props.tile;
      
            return new BitmapLayer(props, {
              data: null,
              image: props.data,
              bounds: [west, south, east, north]
            });
          }
    })
}

function VehicleFeedLayer(vehicleFeed){
    const ICON_MAPPING = {
        marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
      };
    return new TileLayer({
        id: 'vehicleFeed_layer',
        data: vehicleFeed,
        minZoom: 0,
        maxZoom: 19,
        iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        getIcon: d=> 'marker',
        sizeScale: 15,
        getPosition: d => d.coordinates,
        getSize: d => 5,
        // getColor: d => [Math.sqrt(d.exits), 140, 0]
    })
}
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { usStatesData } from '../assets/data';
import './usStatesComponents.css';

const center = [40.63463151377654, -97.89969605983609];

const usStatesComponents = () => {
  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ width: '100vw', height: '700px' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=hJwAa5UvQW8UR9vievPR"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        usStatesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          const stateName = state.properties.name;
          const statePopulation = state.properties.density;

          return (<Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#BD0026",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                })
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: 'white',
                  fillColor: '#FD8D3C'
                });
              },
            }}
          >
            <Tooltip sticky>
              <div className="">
                <div className="">{`State Name - ${stateName}`}</div>
                <div className="">{`Population - ${statePopulation}`}</div>
              </div>
            </Tooltip>
          </Polygon>)
        })
      }
    </MapContainer>
  )
}

export default usStatesComponents


/**
 eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#BD0026",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                })
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: 'white',
                  fillColor: '#FD8D3C'
                });
              },
              click: (e) => {

              }
            }}
 */
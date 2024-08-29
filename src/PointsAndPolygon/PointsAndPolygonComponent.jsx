import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Icon } from 'leaflet';

const pointsAndPolygonComponent = () => {
  const [points, setPoints] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const housingIcon = new Icon({
    iconUrl: "https://img.icons8.com/plasticine/100/exterior.png",
    iconSize: [38, 45], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {
    // Fetch point and polygon data from API
    fetchPointData();
    fetchPolygonData();
  }, []);

  const fetchPointData = async () => {
    // Simulated API call
    const samplePoints = [
      { id: 1, lat: 51.505, lng: -0.09, info: 'Coordinates near the London Eye' },
      { id: 2, lat: 51.50, lng: -0.1, info: 'Coordinates near Big Ben' },
      { id: 3, lat: 51.515, lng: -0.09, info: 'Coordinates near Buckingham Palace' },
      { id: 4, lat: 51.52, lng: -0.08, info: 'Coordinates near the British Museum' },
      { id: 5, lat: 51.525, lng: -0.1, info: 'Coordinates near the Tower of London' },
    ];
    setPoints(samplePoints);
  };

  const fetchPolygonData = async () => {
    // Simulated API call
    const samplePolygons = [
      { id: 1, coordinates: [
        [51.515, -0.09],
        [51.52, -0.1],
        [51.52, -0.12],
        [51.51, -0.1],
      ]},
    ];
    setPolygons(samplePolygons);
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedFeature({ type: 'click', lat, lng });
      },
    });
    return null;
  };
  return (
    <div className="app">
      <MapContainer center={[51.5212411667077, -0.092010498046875]} zoom={13} style={{ height: '550px', width: '100%' }}>
        <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map((point) => (
          <Marker 
            key={point.id} 
            position={[point.lat, point.lng]}
            icon={housingIcon}
            eventHandlers={{
              click: () => setSelectedFeature({ type: 'point', lat: point.lat, lng: point.lng }),
            }}
          >
            <Tooltip><span>{point.info}</span></Tooltip>
          </Marker>
        ))}
        {polygons.map((polygon) => (
          <Polygon 
            key={polygon.id} 
            positions={polygon.coordinates}
            eventHandlers={{
              click: () => setSelectedFeature({ type: 'polygon', ...polygon }),
            }}
          >
            <Tooltip sticky><span>This is Polygon.</span></Tooltip>
          </Polygon>
        ))}
        <MapEvents />
      </MapContainer>
      {selectedFeature && (
        <div className="feature-info">
          <h3>Selected Feature</h3>
          <p>Type: {selectedFeature.type}</p>
          {selectedFeature.type === 'point' && (
            <>
              <p>Latitude: {selectedFeature.lat}</p>
              <p>Longitude: {selectedFeature.lng}</p>
            </>
          )}
          {selectedFeature.type === 'polygon' && (
            <p>Polygon ID: {selectedFeature.id}</p>
          )}
          {selectedFeature.type === 'click' && (
            <>
              <p>Clicked Latitude: {selectedFeature.lat}</p>
              <p>Clicked Longitude: {selectedFeature.lng}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default pointsAndPolygonComponent
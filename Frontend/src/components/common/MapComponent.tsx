import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Land } from '@/types';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41]
});

interface MapComponentProps {
  lands: Land[];
  height?: string;
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (land: Land) => void;
}

const MapComponent = ({ 
  lands, 
  height = "400px", 
  center = [37.7749, -122.4194], 
  zoom = 9,
  onMarkerClick
}: MapComponentProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div 
        style={{ height }}
        className="w-full bg-muted/30 flex items-center justify-center"
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        className="rounded-md border"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lands.map(land => (
          <Marker 
            key={land.id} 
            position={[land.location.lat, land.location.lng]} 
            icon={icon}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(land);
                }
              }
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-medium text-sm">{land.location.address.split(',')[0]}</h3>
                <p className="text-xs text-muted-foreground">
                  {land.location.address.split(',').slice(1).join(',').trim()}
                </p>
                <p className="text-xs mt-1">
                  <span className="font-medium">Area:</span> {land.area} sq. ft.
                </p>
                <p className="text-xs">
                  <span className="font-medium">Price:</span> ${land.price.toLocaleString()}
                </p>
                <div className="mt-2 text-xs">
                  <span className={`px-1.5 py-0.5 rounded-full ${
                    land.status === 'verified' ? 'bg-green-100 text-green-800' :
                    land.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {land.status.charAt(0).toUpperCase() + land.status.slice(1)}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
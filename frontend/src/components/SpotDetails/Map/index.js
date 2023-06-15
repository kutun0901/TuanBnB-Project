import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import "./Map.css";

export default function Map({ spot }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: Number(spot.lat), lng: Number(spot.lng) }), [spot]);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const handleMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} onClick={handleMarkerClick} />
      {infoWindowOpen && (
        <InfoWindow position={center} onCloseClick={handleMarkerClick}>
          <div>Exact location provided after booking</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

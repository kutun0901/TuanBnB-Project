import {GoogleMap, useJsApiLoader, Marker} from "@react-google-maps/api"
import { useMemo } from "react"
import "./Map.css"

export default function Map({ spot }) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
    });

    const center = useMemo(() => ({lat: Number(spot.lat), lng: Number(spot.lng)}), [spot])

    if (!isLoaded) return <div>Loading...</div>

    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
            <Marker position={center} />
        </GoogleMap>
    )
}

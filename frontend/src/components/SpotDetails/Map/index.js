import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import { useMemo } from "react"
import "./Map.css"

export default function Map({ spot }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)

    const center = useMemo(() => ({lat: 37.7749, lng: -122.4194}), [])

    if (!isLoaded) return <div>Loading...</div>

    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
            <Marker position={center} />
        </GoogleMap>
    )
}

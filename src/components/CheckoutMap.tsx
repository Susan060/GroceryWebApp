'use client'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L, { LatLngExpression, marker } from 'leaflet'
import "leaflet/dist/leaflet.css"

const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})
import { useEffect } from 'react'
type props = {
    position: [number, number],
    setPosition: (pos: [number, number]) => void
}
function CheckoutMap({ position, setPosition }: props) {
    const DragableMarker: React.FC = () => {
        const map = useMap()
        useEffect(() => {
            map.setView(position as LatLngExpression, 15, { animate: true })
        }, [])
        return <Marker icon={markerIcon} position={position as LatLngExpression} draggable={true}
            eventHandlers={{
                dragend: (e: L.LeafletEvent) => {
                    const marker = e.target as L.Marker
                    const { lat, lng } = marker.getLatLng()
                    setPosition([lat, lng])
                }
            }} />

    }
    return (
        <MapContainer center={position as LatLngExpression} zoom={13} scrollWheelZoom={true} className='w-full h-full'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DragableMarker />
        </MapContainer>
    )
}

export default CheckoutMap

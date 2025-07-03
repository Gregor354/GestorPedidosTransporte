import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";
import dynamic from "next/dynamic";

interface ModalSeleccionarUbicacionProps {
    onClose: () => void;
    onSelect: (lat: string, lng: string) => void;
}

const LocationMarker = ({ onSelect }: { onSelect: (lat: string, lng: string) => void }) => {
    const [position, setPosition] = React.useState<[number, number] | null>(null);

    useMapEvents({
        click(e: LeafletMouseEvent) {
            setPosition([e.latlng.lat, e.latlng.lng]);
            onSelect(e.latlng.lat.toString(), e.latlng.lng.toString());
        },
    });

    return position === null ? null : <Marker position={position} />;
};

const ModalSeleccionarUbicacion: React.FC<ModalSeleccionarUbicacionProps> = ({ onClose, onSelect }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div
            className="modal-content"
            style={{ width: "700px", maxWidth: "95vw", minHeight: "450px" }}
            onClick={e => e.stopPropagation()}
        >
            <button className="modal-close" onClick={onClose}>X</button>
            <h4>Selecciona la ubicación en el mapa</h4>
            <MapContainer
                center={[-12.017743764801092, -77.04958677291872]}
                zoom={15}
                style={{ height: 350, width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker onSelect={onSelect} />
            </MapContainer>
            <p>Haz clic en el mapa para seleccionar la ubicación.</p>
        </div>
    </div>
);

export default ModalSeleccionarUbicacion;
import React, { useState, useEffect, use } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface ModalItinerarioProps {
  identificador: string;
  onClose: () => void;
}

const ModalItinerario: React.FC<ModalItinerarioProps> = ({ identificador, onClose }) => {
    const handleClose = () => {onClose();}
    const [mapaUbicacion, setMapaUbicacion] = useState<{lat: string, lng: string} | null>(null);
    const [listaItinerario, setListaItinerario] = React.useState([]);
    const fetchListaItinerario = async () => {
        try {
            const response = await fetch(`http://localhost:3300/api/lista-itinerario?identificador=${identificador}`);
            if (!response.ok) {
                console.error('Error HTTP:', response.status, response.statusText);
                return;
            }
            const data = await response.json();
            setListaItinerario(data);
        } catch (error) {
            console.error('Error fetching itinerario:', error);
        }
    }
    useEffect(() => {
        fetchListaItinerario();
    }, [identificador]);
    return (
        <div 
            className="modal-overlay"
            onClick={handleClose}
        >
            <div 
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
            >

                <h3>Itinerario</h3>
                {mapaUbicacion === null ? (
                    <button className="modal-close" onClick={handleClose}>Cerrar Itinerario</button>
                ) : (
                    <button className="modal-close" onClick={() => setMapaUbicacion(null)}>Cerrar mapa</button>
                )}
                
                <table className='tabla-pedidos'>
                    <thead>
                        <tr>
                            <th>Parada</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Ubicación</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaItinerario.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>Cargando....</td>
                            </tr>
                        ) : (
                            <>  
                                {listaItinerario.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td>{item.CONT_I_PARADA}</td>
                                        <td>{item.CONT_V_FECHA_PARADA}</td>
                                        <td>{item.CONT_V_HORA_PARADA}</td>
                                        <td>
                                            <button
                                                className="icon-btn-maps"
                                                title="Ver en Google Maps"
                                                onClick={() =>
                                                    setMapaUbicacion({
                                                        lat: item.CONT_V_LATITUD,
                                                        lng: item.CONT_V_LONGITUD
                                                    })
                                                }
                                            >
                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            </button>
                                        </td>
                                        <td>{item.CONT_V_LUGAR_DESTINO}</td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
                {mapaUbicacion && (
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <iframe
                            title="Google Maps"
                            width="90%"
                            height="350"
                            style={{ border: 0, borderRadius: '8px' }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps?q=${mapaUbicacion.lat},${mapaUbicacion.lng}&z=16&output=embed`}
                        />
                    </div>
                )}
            </div>
        </div>
    )
};

export default ModalItinerario;
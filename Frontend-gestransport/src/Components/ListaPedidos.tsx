'use client';
import React, { useState, useEffect, use } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faUsers, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import ModalItinerario from './ModalItinerario';

interface ListaPedidosProps {
  contenidoCentral: string;
  setContenidoCentral: (valor: string) => void;
}

interface ModalPedidoProps {
  identificador: string;
  onClose: () => void;
}


const ListaPedidos: React.FC<ListaPedidosProps> = ({ contenidoCentral, setContenidoCentral }) => {

    const [modalIdentificador, setModalIdentificador] = useState<string | null>(null);

    const [listaPedidosTransporte, setListaPedidosTransporte] = useState([]);
    const fetchListaPedidosTransporte = async () => {
        try {
            const response = await fetch('http://localhost:3300/api/lista-pedidos');
            if (!response.ok) {
                console.error('Error HTTP:', response.status, response.statusText);
                return;
            }
            const data = await response.json();
            setListaPedidosTransporte(data);
        } catch (error) {
            console.error('Error fetching lista pedidos:', error);
        }
    }
    useEffect(() => {
        fetchListaPedidosTransporte();
    }, []);

    //const [contenidoCentral, setContenidoCentral] = useState("Lista de Pedidos de Transporte");
    return (
        <> 
            <div className='container-fluid'> 
            {/* <!-- Botón para crear nuevo registro --> */}
            <div className="d-flex justify-content-start mb-3">
                <button
                    className="btn-crear-pedido"
                    onClick={() => setContenidoCentral("Formulario del Pedido de Transporte")}
                >
                    Crear nuevo Pedido de Transporte
                </button>
            </div>
            {/* Sección central */}
            <div className="tabla-contenedor">
                <table className="tabla-pedidos">
                    <thead>
                        <tr>
                            <th style={{width: '5%'}}>Nro</th>
                            <th style={{width: '40%'}}>Detalles del destino</th>
                            <th style={{width: '10%'}}>Itinerario</th>
                            <th style={{width: '10%'}}>Pasajeros</th>
                            <th style={{width: '10%'}}>Documentos</th>
                            <th style={{width: '15%'}}>Estado del Trámite</th>
                            <th style={{width: '10%'}}>Actualizar</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-pedidos-transporte">
                        {listaPedidosTransporte.length === 0 ? (
                            <tr>
                                <td colSpan={7}>No hay pedidos disponibles</td>
                            </tr>
                        ) : (
                            listaPedidosTransporte.map((pedido: any, idx: number) => (
                            <tr key={idx}>
                                <td>{pedido.CONT_NU_ID}</td>
                                <td>{pedido.CONT_V_DETALLES_DESTINO}</td>
                                <td>
                                    <button
                                        title="Ver Itinerario"
                                        className="icon-btn-maps"
                                        onClick={() => setModalIdentificador(pedido.CONT_V_IDENTIFICADOR_CONSTRUIDO)}
                                    >
                                        <FontAwesomeIcon icon={faRoute} />
                                    </button>
                                </td>
                                <td>
                                    <button title="Ver Pasajeros" className="icon-btn-maps">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </button>
                                </td> 
                                <td>
                                    <button title="Ver Documentos" className="icon-btn-maps">
                                        <FontAwesomeIcon icon={faFileAlt} />
                                    </button>
                                </td>
                                <td>{pedido.CONT_V_ESTADO_PEDIDO}</td>
                                <td>
                                    {/* Aquí puedes poner un botón o icono para actualizar */}
                                    <button>Actualizar</button>
                                </td>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {modalIdentificador && (
                    <ModalItinerario
                        identificador={modalIdentificador}
                        onClose={() => setModalIdentificador(null)}
                    />
                )}
            </div>
            </div>
        </>
    )
    
}

export default ListaPedidos;
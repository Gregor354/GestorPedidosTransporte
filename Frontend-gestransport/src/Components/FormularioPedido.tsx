'use client';
//import '../app/css/style.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faRoute, faUsers, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import ModalSeleccionarUbicacion from './ModalSeleccionarUbicacion';

interface FormularioPedidoProps {
  contenidoCentral: string;
  setContenidoCentral: (valor: string) => void;
}
const FormularioPedido: React.FC<FormularioPedidoProps> = ({ contenidoCentral, setContenidoCentral }) => {
    type FilaItinerario = {
        parada: string; // Nuevo campo
        fecha: string;
        hora: string;
        lugar: string;
        latitud: string;
        longitud: string;
    };
    type FilaPasajero = {
        apellido: string;
        nombre: string;
        tipoDocumento: string;
        nroDocumento: string;
        telefono: string;
        declaracionJurada: File | null;
        responsable: boolean;
    };
    const [mostrarModalUbicacion, setMostrarModalUbicacion] = useState(false);
    const [campoUbicacionActivo, setCampoUbicacionActivo] = useState<null | "bus" | "conductor">(null);
    const [filaUbicacionActiva, setFilaUbicacionActiva] = useState<number | null>(null);

    // Estado para manejar la visibilidad de los campos del formulario
    const [verFormularioPedido, setVerFormularioPedido] = useState(false);
    const [datosDelServicio, setDatosDelServicio] = useState(false);
    const [cantidadDiasNoches, setCantidadDiasNoches] = useState(false);
    const [itinerarioAlmacenado, setItinerarioAlmacenado] = useState(false);
    const [relacionPasajeros, setRelacionPasajeros] = useState(false);

    // estados para manejar los inputs del formulario
    const { setValue, register, watch } = useForm();
    const tipoTransporteSeleccionado = watch('tipo_transporte');
    const [tipoTransporteInput, setTipoTransporteInput] = useState("");
    const [detallesDestinoInput, setDetallesDestinoInput] = useState("");
    const [fechaSolicitudInput, setFechaSolicitudInput] = useState("");
    const [oficioSolicitudInput, setOficioSolicitudInput] = useState<File | null>(null);
    const [seguroRiesgoInput, setSeguroRiesgoInput] = useState<File | null>(null);
    const [cantidadDiasInput, setCantidadDiasInput] = useState("");
    const [cantidadNochesInput, setCantidadNochesInput] = useState("");
    const [filas, setFilas] = useState<FilaItinerario[]>([
        { parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }
    ]);
    const [lugarDescansaBusInput, setLugarDescansaBusInput] = useState("");
    const [lugarDescansaBusLatitudInput, setLugarDescansaBusLatitudInput] = useState("");
    const [lugarDescansaBusLongitudInput, setLugarDescansaBusLongitudInput] = useState("");
    const [lugarDescansaConductorInput, setLugarDescansaConductorInput] = useState("");
    const [lugarDescansaConductorLatitudInput, setLugarDescansaConductorLatitudInput] = useState("");
    const [lugarDescansaConductorLongitudInput, setLugarDescansaConductorLongitudInput] = useState("");
    const [filasPasajeros, setFilasPasajeros] = useState<FilaPasajero[]>([
        { apellido: "", nombre: "", tipoDocumento: "DNI", nroDocumento: "", telefono: "", declaracionJurada: null, responsable: false, },
    ]);

    // Estado para manejar los tipos de transporte
    const [tiposTransporte, setTiposTransporte] = useState([]);
    useEffect(() => {
        const fetchTiposTransporte = async () => {
        try {
            const res = await fetch('http://localhost:3300/api/tipo-transporte');
            //console.log('Status de la respuesta:', res.status);
            if (!res.ok) {
              console.error('Error HTTP:', res.status, res.statusText);
              return;
            }
            const data = await res.json();
            //console.log('Datos recibidos:', data);
            setTiposTransporte(data);
        } catch (error) {
            console.error('Error al obtener tipos de transporte:', error);
        }
        };
        fetchTiposTransporte();
    }, []);


    // Obtener los valores de los inputs del formulario
    useEffect(() => {
        switch (tipoTransporteSeleccionado) {
        case 'Transporte interno':
            setVerFormularioPedido(true);
            setDatosDelServicio(false);
            setCantidadDiasNoches(false);
            setItinerarioAlmacenado(false);
            setRelacionPasajeros(false);
            ////////////////////////////
            setDetallesDestinoInput("")
            setFechaSolicitudInput("")
            setOficioSolicitudInput(null)
            setSeguroRiesgoInput(null)
            setCantidadDiasInput("")
            setCantidadNochesInput("")
            setFilas([{ parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }])
            setLugarDescansaBusInput("")
            setLugarDescansaBusLatitudInput("")
            setLugarDescansaBusLongitudInput("")
            setLugarDescansaConductorInput("")
            setLugarDescansaConductorLatitudInput("")
            setLugarDescansaConductorLongitudInput("")
            setFilasPasajeros([])
            break;
        case 'Transporte para funcionarios':
            setVerFormularioPedido(true);
            setDatosDelServicio(true);
            setCantidadDiasNoches(true);
            setItinerarioAlmacenado(true);
            setRelacionPasajeros(true);
            setDetallesDestinoInput("");
            ////////////////////////////
            setDetallesDestinoInput("")
            setFechaSolicitudInput("")
            setOficioSolicitudInput(null)
            setSeguroRiesgoInput(null)
            setCantidadDiasInput("")
            setCantidadNochesInput("")
            setFilas([{ parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }])
            setLugarDescansaBusInput("")
            setLugarDescansaBusLatitudInput("")
            setLugarDescansaBusLongitudInput("")
            setLugarDescansaConductorInput("")
            setLugarDescansaConductorLatitudInput("")
            setLugarDescansaConductorLongitudInput("")
            setFilasPasajeros([{ apellido: "", nombre: "", tipoDocumento: "DNI", nroDocumento: "", telefono: "", declaracionJurada: null, responsable: false, }])
            break;
        case 'Transporte para Visitas tecnicas (Lima)':
            setVerFormularioPedido(true);
            setDatosDelServicio(true);
            setCantidadDiasNoches(true);
            setItinerarioAlmacenado(true);
            setRelacionPasajeros(true);
            setDetallesDestinoInput("");
            ////////////////////////////
            setDetallesDestinoInput("")
            setFechaSolicitudInput("")
            setOficioSolicitudInput(null)
            setSeguroRiesgoInput(null)
            setCantidadDiasInput("")
            setCantidadNochesInput("")
            setFilas([{ parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }])
            setLugarDescansaBusInput("")
            setLugarDescansaBusLatitudInput("")
            setLugarDescansaBusLongitudInput("")
            setLugarDescansaConductorInput("")
            setLugarDescansaConductorLatitudInput("")
            setLugarDescansaConductorLongitudInput("")
            setFilasPasajeros([{ apellido: "", nombre: "", tipoDocumento: "", nroDocumento: "", telefono: "", declaracionJurada: null, responsable: false, }])
            break;
        case 'Transporte para Visitas tecnicas (Provincia)':
            setVerFormularioPedido(true);
            setDatosDelServicio(true);
            setCantidadDiasNoches(true);
            setItinerarioAlmacenado(true);
            setRelacionPasajeros(true);
            setDetallesDestinoInput("");
            ////////////////////////////
            setDetallesDestinoInput("")
            setFechaSolicitudInput("")
            setOficioSolicitudInput(null)
            setSeguroRiesgoInput(null)
            setCantidadDiasInput("")
            setCantidadNochesInput("")
            setFilas([{ parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }])
            setLugarDescansaBusInput("")
            setLugarDescansaBusLatitudInput("")
            setLugarDescansaBusLongitudInput("")
            setLugarDescansaConductorInput("")
            setLugarDescansaConductorLatitudInput("")
            setLugarDescansaConductorLongitudInput("")
            setFilasPasajeros([{ apellido: "", nombre: "", tipoDocumento: "", nroDocumento: "", telefono: "", declaracionJurada: null, responsable: false, }])
            break;
        case 'Transporte de Estudios (Lima)':
            setVerFormularioPedido(true);
            setDatosDelServicio(true);
            setCantidadDiasNoches(true);
            setItinerarioAlmacenado(true);
            setRelacionPasajeros(true);
            ////////////////////////////
            setDetallesDestinoInput("")
            setFechaSolicitudInput("")
            setOficioSolicitudInput(null)
            setSeguroRiesgoInput(null)
            setCantidadDiasInput("")
            setCantidadNochesInput("")
            setFilas([{ parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }])
            setLugarDescansaBusInput("")
            setLugarDescansaBusLatitudInput("")
            setLugarDescansaBusLongitudInput("")
            setLugarDescansaConductorInput("")
            setLugarDescansaConductorLatitudInput("")
            setLugarDescansaConductorLongitudInput("")
            setFilasPasajeros([{ apellido: "", nombre: "", tipoDocumento: "", nroDocumento: "", telefono: "", declaracionJurada: null, responsable: false, }])
            break;
        case 'Transporte de Estudios (Provincia)':
            setVerFormularioPedido(true);
            setDatosDelServicio(true);
            setCantidadDiasNoches(true);
            setItinerarioAlmacenado(true);
            setRelacionPasajeros(true);
            ////////////////////////////
            setDetallesDestinoInput("")
            setFechaSolicitudInput("")
            setOficioSolicitudInput(null)
            setSeguroRiesgoInput(null)
            setCantidadDiasInput("")
            setCantidadNochesInput("")
            setFilas([{ parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }])
            setLugarDescansaBusInput("")
            setLugarDescansaBusLatitudInput("")
            setLugarDescansaBusLongitudInput("")
            setLugarDescansaConductorInput("")
            setLugarDescansaConductorLatitudInput("")
            setLugarDescansaConductorLongitudInput("")
            setFilasPasajeros([{ apellido: "", nombre: "", tipoDocumento: "", nroDocumento: "", telefono: "", declaracionJurada: null, responsable: false, }])
            break;
        case 'Transporte para Eventos (Lima)':
            setVerFormularioPedido(true);
            setDatosDelServicio(true);
            setCantidadDiasNoches(true);
            setItinerarioAlmacenado(true);
            setRelacionPasajeros(true);
            ////////////////////////////
            setDetallesDestinoInput("")
            setFechaSolicitudInput("")
            setOficioSolicitudInput(null)
            setSeguroRiesgoInput(null)
            setCantidadDiasInput("")
            setCantidadNochesInput("")
            setFilas([{ parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }])
            setLugarDescansaBusInput("")
            setLugarDescansaBusLatitudInput("")
            setLugarDescansaBusLongitudInput("")
            setLugarDescansaConductorInput("")
            setLugarDescansaConductorLatitudInput("")
            setLugarDescansaConductorLongitudInput("")
            setFilasPasajeros([{ apellido: "", nombre: "", tipoDocumento: "", nroDocumento: "", telefono: "", declaracionJurada: null, responsable: false, }])
            break;
        case 'Transporte para Eventos (Provincia)':
            setVerFormularioPedido(true);
            setDatosDelServicio(true);
            setCantidadDiasNoches(true);
            setItinerarioAlmacenado(true);
            setRelacionPasajeros(true);
            ////////////////////////////
            setDetallesDestinoInput("")
            setFechaSolicitudInput("")
            setOficioSolicitudInput(null)
            setSeguroRiesgoInput(null)
            setCantidadDiasInput("")
            setCantidadNochesInput("")
            setFilas([{ parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }])
            setLugarDescansaBusInput("")
            setLugarDescansaBusLatitudInput("")
            setLugarDescansaBusLongitudInput("")
            setLugarDescansaConductorInput("")
            setLugarDescansaConductorLatitudInput("")
            setLugarDescansaConductorLongitudInput("")
            setFilasPasajeros([{ apellido: "", nombre: "", tipoDocumento: "", nroDocumento: "", telefono: "", declaracionJurada: null, responsable: false, }])
            break;
        default:
            setVerFormularioPedido(false);
            setDatosDelServicio(false);
            setCantidadDiasNoches(false);
            setItinerarioAlmacenado(false);
            setRelacionPasajeros(false);
            ////////////////////////////
            setDetallesDestinoInput("")
            setFechaSolicitudInput("")
            setOficioSolicitudInput(null)
            setSeguroRiesgoInput(null)
            setCantidadDiasInput("")
            setCantidadNochesInput("")
            setFilas([])
            setLugarDescansaBusInput("")
            setLugarDescansaBusLatitudInput("")
            setLugarDescansaBusLongitudInput("")
            setLugarDescansaConductorInput("")
            setLugarDescansaConductorLatitudInput("")
            setLugarDescansaConductorLongitudInput("")
            setFilasPasajeros([])
            break;
        }
    }, [tipoTransporteSeleccionado]);


    // --- INICIO: Lógica para filas del itinerario ---
    const handleInputChange = (i: number, campo: keyof FilaItinerario, valor: string) => {
        const nuevasFilas = [...filas];
        nuevasFilas[i][campo] = valor;
        setFilas(nuevasFilas);
    };

    const filaVacia = (fila: FilaItinerario) =>
        !fila.fecha && !fila.hora && !fila.lugar && !fila.latitud && !fila.longitud;

    const handleAgregarFila = () => {
        const ultima = filas[filas.length - 1];
        if (filaVacia(ultima)) {
        toast.warning("No puedes agregar una nueva fila si la anterior está vacía.");
        return;
        }
        setFilas([
        ...filas,
        { parada: `${filas.length}` , fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }
        ]);
    };

    const handleEliminarUltimaFila = () => {
        if (filas.length > 1) {
        setFilas(filas.slice(0, -1));
        }
    };
    // --- FIN: Lógica para filas del itinerario ---



    // --- INICIO: Lógica para filas de pasajeros ---
    const handleInputChangePasajero = (
        i: number,
        campo: keyof FilaPasajero,
        valor: string | boolean | File | null
    ) => {
        const nuevasFilas = [...filasPasajeros];
        nuevasFilas[i][campo] = valor as never;
        setFilasPasajeros(nuevasFilas);
    };

    const filaPasajeroVacia = (fila: FilaPasajero) =>
        !fila.apellido &&
        !fila.nombre &&
        !fila.tipoDocumento &&
        !fila.nroDocumento &&
        !fila.telefono &&
        !fila.declaracionJurada;

    const handleAgregarFilaPasajero = () => {
        const ultima = filasPasajeros[filasPasajeros.length - 1];
        if (filaPasajeroVacia(ultima)) {
        toast.warning("No puedes agregar una nueva fila si la anterior está vacía.");
        return;
        }
        setFilasPasajeros([
        ...filasPasajeros,
        {
            apellido: "",
            nombre: "",
            tipoDocumento: "DNI",
            nroDocumento: "",
            telefono: "",
            declaracionJurada: null,
            responsable: false,
        },
        ]);
    };

    const handleEliminarUltimaFilaPasajero = () => {
        if (filasPasajeros.length > 1) {
        setFilasPasajeros(filasPasajeros.slice(0, -1));
        }
    };
    // --- FIN: Lógica para filas de pasajeros ---


    // inicio de la funcion para guardar la ficha de pedido
    const guardarFichaMedOcup = async () => {
      // Validar que los campos obligatorios estén completos
      if (!tipoTransporteSeleccionado) { 
          toast.error("Por favor, seleccione un tipo de transporte.");
          return;
      }
      if (!detallesDestinoInput) {
          toast.error("Por favor, ingrese los detalles del destino.");
          return;
      }
      if (!fechaSolicitudInput) {
          toast.error("Por favor, ingrese la fecha de solicitud.");
          return;
      }
      if (datosDelServicio && oficioSolicitudInput === null) {
          toast.error("Por favor, cargue el 'Oficio de Solicitud' debidamente autorizado.");
          return;
      }
      if (datosDelServicio && seguroRiesgoInput === null) {
          toast.error("Por favor, cargue el 'Seguro contra todo riesgo'.");
          return;
      }
      if (cantidadDiasNoches && !cantidadDiasInput) {
          toast.error("Por favor, ingrese la cantidad de días.");
          return;
      }
      if (cantidadDiasNoches && !cantidadNochesInput) {
          toast.error("Por favor, ingrese la cantidad de noches.");
          return;
      }
      if (filas.length < 1) {
          toast.error("Por favor, ingrese al menos una parada en el itinerario.");
          return;
      }
      if (itinerarioAlmacenado && (!lugarDescansaBusInput ||!lugarDescansaBusLatitudInput || !lugarDescansaBusLongitudInput)) {
          toast.error("Debe proporcionar el lugar de descanso del bus, incluyendo latitud y longitud.");
          return;
      }
      if (itinerarioAlmacenado && (!lugarDescansaConductorInput || !lugarDescansaConductorLatitudInput || !lugarDescansaConductorLongitudInput)) {
          toast.error("Debe proporcionar el lugar de descanso del conductor, incluyendo latitud y longitud.");
          return;
      }
      if (relacionPasajeros && filasPasajeros.length < 1) {
          toast.error("Por favor, ingrese al menos un pasajero.");
          return;
      }

      try {
        // Crear un objeto FormData para enviar los datos del formulario
        const formData = new FormData();
        formData.append('tipo_transporte', tipoTransporteSeleccionado);
        formData.append('detalles_destino', detallesDestinoInput);
        formData.append('fecha_solicitud', fechaSolicitudInput);
        if (oficioSolicitudInput) {
          formData.append('oficio_solicitud', oficioSolicitudInput);
        }
        if (seguroRiesgoInput) {
          formData.append('seguro_riesgo', seguroRiesgoInput);
        };
        formData.append('cantidad_dias', cantidadDiasInput);
        formData.append('cantidad_noches', cantidadNochesInput);
        formData.append('lugar_descansa_bus', lugarDescansaBusInput);
        formData.append('lugar_descansa_bus_latitud', lugarDescansaBusLatitudInput);
        formData.append('lugar_descansa_bus_longitud', lugarDescansaBusLongitudInput);
        formData.append('lugar_descansa_conductor', lugarDescansaConductorInput);
        formData.append('lugar_descansa_conductor_latitud', lugarDescansaConductorLatitudInput);
        formData.append('lugar_descansa_conductor_longitud', lugarDescansaConductorLongitudInput);
        formData.append('usuario', '1'); // Cambiar por el ID del usuario autenticado

        // // Agregar el itinerario al FormData
        // filas.forEach((fila, index) => {
        //   Object.entries(fila).forEach(([key, value]) => {
        //    formData.append(`itinerario[${index}][${key}]`, value);
        //   });
        // });

        // // Agregar los pasajeros al FormData
        // filasPasajeros.forEach((fila, index) => {
        //     Object.entries(fila).forEach(([key, value]) => {
        //       formData.append(`pasajeros[${index}][${key}]`, value);
        //     });
        // });

        // Enviar la solicitud POST al servidor
        const response = await fetch('http://localhost:3300/api/insertar-pedido-transporte', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json();
            toast.error(`Error al guardar la ficha: ${errorData.message || 'Error desconocido'}`);
            return;
        } else {
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            toast.success("Ficha guardada exitosamente.");
            // Aquí puedes redirigir o actualizar el estado de tu aplicación según sea necesario
            setContenidoCentral("Lista de Pedidos");
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        toast.error("Ocurrió un error al guardar la ficha. Por favor, inténtelo de nuevo.");
        return;
      }

    }


    return (
        <>
            {/* formulario */}
            <form id="form" 
              onSubmit={e => { e.preventDefault(); guardarFichaMedOcup(); }}
            >
              {/* Tipo de transporte */}
              <div className="card">
                <h3>Tipo de Transporte</h3>
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="tipo_transporte">
                      Seleccione el tipo de transporte a solicitar:
                    </label>
                    <select
                      id="tipo_transporte"
                      {...register('tipo_transporte')}
                    >
                      <option value="" selected disabled>Seleccione...</option>
                      {tiposTransporte.map((tipo: any) => (
                        <option key={tipo.CONT_NU_ID} value={tipo.CONT_V_TIPO}>
                          {tipo.CONT_V_TIPO}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {verFormularioPedido && (
                <div>
                  {/* Requisitos del servicio */}
                  <div className="card">
                    <h3>Requisitos del servicio</h3>
                    <div className="row">
                      <div className="col-50">
                        <label htmlFor="detalles_destino">Detalles del destino {detallesDestinoInput}</label>
                        <input
                          type="text"
                          id="detalles_destino"
                          name="detalles_destino"
                          placeholder="Ej. Dirección General de Administración"
                          value={detallesDestinoInput}
                          onChange={e => setDetallesDestinoInput(e.target.value)}
                        />
                      </div>
                      <div className="col-50">
                        <label htmlFor="fecha_solicitud">Fecha de solicitud: ({fechaSolicitudInput})</label>
                        <input
                          type="date"
                          id="fecha_solicitud"
                          name="fecha_solicitud"
                          value={fechaSolicitudInput}
                          onChange={e => setFechaSolicitudInput(e.target.value)}
                        />
                      </div>
                    </div>
                    {datosDelServicio &&(
                      <div className="row">
                        <div className="col-50">
                          <label htmlFor="oficio_solicitud">
                            Cargar "Oficio de Solicitud" (Debidamente autorizado):
                          </label>
                          <input
                            type="file"
                            id="oficio_solicitud"
                            name="oficio_solicitud"
                            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={e =>
                              setOficioSolicitudInput(e.target.files && e.target.files[0] ? e.target.files[0] : null)
                            }
                          />
                        </div>
                        <div className="col-50">
                          <label htmlFor="seguro_riesgo">Cargar "Seguro contra todo riesgo"</label>
                          <input
                            type="file"
                            id="seguro_riesgo"
                            name="seguro_riesgo"
                            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={e =>
                              setSeguroRiesgoInput(e.target.files && e.target.files[0] ? e.target.files[0] : null)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Itinarario de viaje */}
                  <div className="card">
                    <h3>Itinerario de viaje</h3>
                    { cantidadDiasNoches && (
                      <div className="row">
                        <div className="col-50">
                          <label htmlFor="cantidad_dias">Cantidad de días:</label>
                          <input
                            type="number"
                            id="cantidad_dias"
                            name="cantidad_dias"
                            value={cantidadDiasInput}
                            onChange={e => setCantidadDiasInput(e.target.value)}
                          />
                        </div>
                        <div className="col-50">
                          <label htmlFor="cantidad_noches">Cantidad de noches:</label>
                          <input
                            type="number"
                            id="cantidad_noches"
                            name="cantidad_noches"
                            value={cantidadNochesInput}
                            onChange={e => setCantidadNochesInput(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    <p>*Considere la parada 0 el punto de partida y la última parada el lugar donde el bus terminará su servicio</p>
                    <p>*Considere todas las paradas necesarias, incluyendo hospedaje</p>
                    <table className="table-center" style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '7%' }}>Parada</th>
                          <th style={{ width: '18%' }}>Fecha</th>
                          <th style={{ width: '12%' }}>Hora de partida</th>
                          <th style={{ width: '30%' }}>Lugar de destino</th>
                          <th style={{ width: '16%' }}>Latitud (opcional)</th>
                          <th style={{ width: '16%' }}>Longitud (opcional)</th>
                          <th style={{ width: '3%'}}></th>
                        </tr>
                      </thead>
                      <tbody id="itinerario">
                        {filas.map((fila, i) => (
                          <tr key={i}>
                            <td>
                              <input
                                type="text"
                                readOnly
                                title='Parada'
                                name={`parada${i}`}
                                className="input-table"
                                value={fila.parada}
                                onChange={e => handleInputChange(i, "parada", e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                title='Fecha de parada'
                                name={`fecha_parada${i}`}
                                required
                                className="input-table"
                                value={fila.fecha}
                                onChange={(e) =>
                                  handleInputChange(i, "fecha", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="time"
                                title='Hora de parada'
                                name={`hora_parada${i}`}
                                required
                                className="input-table-hora"
                                value={fila.hora}
                                onChange={(e) =>
                                  handleInputChange(i, "hora", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                title='Lugar de destino'
                                name={`lugar_destino${i}`}
                                placeholder="Ej. Ciudad A"
                                required
                                className="input-table"
                                value={fila.lugar}
                                onChange={(e) =>
                                  handleInputChange(i, "lugar", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                title='Latitud de parada'
                                name={`latitud${i}`}
                                placeholder="-12.123456"
                                className="input-table"
                                value={fila.latitud}
                                onChange={(e) =>
                                  handleInputChange(i, "latitud", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                title='Longitud de parada'
                                name={`longitud${i}`}
                                placeholder="-77.123456"
                                className="input-table"
                                value={fila.longitud}
                                onChange={(e) =>
                                  handleInputChange(i, "longitud", e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="icon-btn-maps"
                                title="Seleccionar en mapa"
                                style={{ alignItems: "center", justifyContent: "center", textAlign: "center", width: "100%" }}
                                onClick={() => setFilaUbicacionActiva(i)}
                              >
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ marginTop: "10px" }}>
                      <button type="button" className="btn-small" onClick={handleAgregarFila}>
                        Agregar fila
                      </button>
                      <button type="button" className="btn-small" onClick={handleEliminarUltimaFila} >
                        Eliminar última fila
                      </button>
                    </div>
                    {/* Lugar donde descansará el bus */}
                    {itinerarioAlmacenado && (
                      <div className="row">
                        <div className="col-50">
                          <label htmlFor="lugar_descansa_bus">Lugar donde descansará el bus</label>
                          <input
                            type="text"
                            id="lugar_descansa_bus"
                            name="lugar_descansa_bus"
                            placeholder="Ej. Almacén Central"
                            required
                            value={lugarDescansaBusInput}
                            onChange={e => setLugarDescansaBusInput(e.target.value)}
                          />
                        </div>
                        <div className="col-25">
                          <label htmlFor="lugar_descansa_bus_latitud">Latitud (opcional)</label>
                          <input
                            type="text"
                            id="lugar_descansa_bus_latitud"
                            name="lugar_descansa_bus_latitud"
                            readOnly
                            disabled
                            placeholder="-12.123456"
                            value={lugarDescansaBusLatitudInput}
                            onChange={e => setLugarDescansaBusLatitudInput(e.target.value)}
                          />
                        </div>
                        <div className="col-25">
                          <label htmlFor="lugar_descansa_bus_longitud">Longitud (opcional)</label>
                          <input
                            type="text"
                            id="lugar_descansa_bus_longitud"
                            name="lugar_descansa_bus_longitud"
                            readOnly
                            disabled
                            placeholder="-77.123456"
                            value={lugarDescansaBusLongitudInput}
                            onChange={e => setLugarDescansaBusLongitudInput(e.target.value)}
                          />
                        </div>
                        <div className="col-10 flex-center">
                          <button
                            type="button"
                            className="icon-btn-maps"
                            title="Seleccionar en mapa"
                            onClick={() => setCampoUbicacionActivo("bus")}
                            style={{ marginLeft: 8, marginTop: 22 }}
                          >
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Lugar donde descansará el conductor */}
                    {itinerarioAlmacenado && (
                      <div className="row">
                        <div className="col-50">
                          <label htmlFor="lugar_descansa_conductor">
                            Lugar donde descansará el conductor (debe ser cercano a donde descansará el bus)
                          </label>
                          <input
                            type="text"
                            id="lugar_descansa_conductor"
                            name="lugar_descansa_conductor"
                            placeholder="Ej. Hotel Central"
                            required
                            value={lugarDescansaConductorInput}
                            onChange={e => setLugarDescansaConductorInput(e.target.value)}
                          />
                        </div>
                        <div className="col-25">
                          <label htmlFor="lugar_descansa_conductor_latitud">Latitud (opcional)</label>
                          <input
                            type="text"
                            id="lugar_descansa_conductor_latitud"
                            name="lugar_descansa_conductor_latitud"
                            placeholder="-12.123456"
                            value={lugarDescansaConductorLatitudInput}
                            onChange={e => setLugarDescansaConductorLatitudInput(e.target.value)}
                          />
                        </div>
                        <div className="col-25">
                          <label htmlFor="lugar_descansa_conductor_longitud">Longitud (opcional)</label>
                          <input
                            type="text"
                            id="lugar_descansa_conductor_longitud"
                            name="lugar_descansa_conductor_longitud"
                            placeholder="-77.123456"
                            value={lugarDescansaConductorLongitudInput}
                            onChange={e => setLugarDescansaConductorLongitudInput(e.target.value)}
                          />
                        </div>
                        <div className="col-10 flex-center">
                          <button
                            type="button"
                            className="icon-btn-maps"
                            title="Seleccionar en mapa"
                            onClick={() => setCampoUbicacionActivo("conductor")}
                            style={{ marginLeft: 8, marginTop: 22 }}
                          >
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Relación de Pasajeros */} 
                  { relacionPasajeros && (
                    <div className="card">
                      <h3>Relación de Pasajeros</h3>
                      <table className="table-center" style={{ width: '100%' }}>
                        <thead>
                          <tr>
                            <th style={{ width: '20%' }}>Apellido</th>
                            <th style={{ width: '20%' }}>Nombre</th>
                            <th style={{ width: '10%' }}>Tipo de documento</th>
                            <th style={{ width: '10%' }}>Nro. de documento de identidad</th>
                            <th style={{ width: '10%' }}>Teléfono</th>
                            <th style={{ width: '20%' }}>Declaración Jurada</th>
                            <th style={{ width: '10%' }}>Responsable del Grupo</th>
                          </tr>
                        </thead>
                        <tbody id="pasajeros">
                          {filasPasajeros.map((fila, i) => (
                            <tr key={i}>
                              <td>
                                <input
                                  type="text"
                                  title='Apellido del pasajero'
                                  name={`apellido_pasajero${i}`}
                                  required
                                  className="input-table"
                                  value={fila.apellido}
                                  onChange={e =>
                                    handleInputChangePasajero(i, "apellido", e.target.value)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  title='Nombre del pasajero'
                                  name={`nombre_pasajero${i}`}
                                  required
                                  className="input-table"
                                  value={fila.nombre}
                                  onChange={e =>
                                    handleInputChangePasajero(i, "nombre", e.target.value)
                                  }
                                />
                              </td>
                              <td>
                                <select
                                  name={`tipo_documento_pasajero${i}`}
                                  title='Tipo de documento del pasajero'
                                  required
                                  className="input-table"
                                  value={fila.tipoDocumento}
                                  onChange={e => handleInputChangePasajero(i, "tipoDocumento", e.target.value)}
                                >  
                                    <option value="" disabled>Seleccione...</option>
                                    <option value="DNI">DNI</option>
                                    <option value="Carné de Extranjería">Carné de Extranjería</option>
                                    <option value="Código UNI">Código UNI</option>
                                </select>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  title='Número de documento del pasajero'
                                  name={`nro_documento_pasajero${i}`}
                                  required
                                  className="input-table"
                                  value={fila.nroDocumento}
                                  onChange={e =>
                                    handleInputChangePasajero(i, "nroDocumento", e.target.value)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  title='Teléfono del pasajero'
                                  name={`telefono${i}`}
                                  required
                                  className="input-table"
                                  value={fila.telefono}
                                  onChange={e =>
                                    handleInputChangePasajero(i, "telefono", e.target.value)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="file"
                                  title='Declaración jurada del pasajero'
                                  name={`declaracion_jurada_pasajero${i}`}
                                  accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                  required
                                  onChange={e =>
                                    handleInputChangePasajero(
                                      i,
                                      "declaracionJurada",
                                      e.target.files && e.target.files[0] ? e.target.files[0] : null
                                    )
                                  }
                                />
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <input
                                  type="checkbox"
                                  title='Responsable del grupo'
                                  name={`responsable_grupo${i}`}
                                  checked={fila.responsable}
                                  onChange={e =>
                                    handleInputChangePasajero(i, "responsable", e.target.checked)
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div style={{ marginTop: '10px' }}>
                        <button
                          type="button"
                          className="btn-small"
                          onClick={handleAgregarFilaPasajero}
                        >
                          Agregar fila
                        </button>
                        <button
                          type="button"
                          className="btn-small"
                          onClick={handleEliminarUltimaFilaPasajero}
                        >
                          Eliminar última fila
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* botones */}
              <div className='row'>
                <button type="submit" className="btn btn-danger btn-sm btn-uni">
                  Enviar
                </button>
                <button 
                  className="btn btn-danger btn-sm btn-uni" 
                  onClick={() => {
                    setDetallesDestinoInput("")
                    setFechaSolicitudInput("")
                    setOficioSolicitudInput(null)
                    setSeguroRiesgoInput(null)
                    setCantidadDiasInput("")
                    setCantidadNochesInput("")
                    setFilas([{ parada: "0", fecha: "", hora: "", lugar: "", latitud: "", longitud: "" }])
                    setLugarDescansaBusInput("")
                    setLugarDescansaBusLatitudInput("")
                    setLugarDescansaBusLongitudInput("")
                    setLugarDescansaConductorInput("")
                    setLugarDescansaConductorLatitudInput("")
                    setLugarDescansaConductorLongitudInput("")
                    setFilasPasajeros([{ apellido: "", nombre: "", tipoDocumento: "", nroDocumento: "", telefono: "", declaracionJurada: null, responsable: false, }])
                    setValue('tipo_transporte','')
                    setContenidoCentral("Lista de Pedidos de Transporte")
                  }}
                >
                  Regresar
                </button>
              </div>
            </form>
            {campoUbicacionActivo && (
              <ModalSeleccionarUbicacion
                onClose={() => setCampoUbicacionActivo(null)}
                onSelect={(lat, lng) => {
                  if (campoUbicacionActivo === "bus") {
                    setLugarDescansaBusLatitudInput(lat);
                    setLugarDescansaBusLongitudInput(lng);
                  } else if (campoUbicacionActivo === "conductor") {
                    setLugarDescansaConductorLatitudInput(lat);
                    setLugarDescansaConductorLongitudInput(lng);
                  }
                  setCampoUbicacionActivo(null);
                }}
              />
            )}
            {filaUbicacionActiva !== null && (
              <ModalSeleccionarUbicacion
                onClose={() => setFilaUbicacionActiva(null)}
                onSelect={(lat, lng) => {
                  handleInputChange(filaUbicacionActiva, "latitud", lat);
                  handleInputChange(filaUbicacionActiva, "longitud", lng);
                  setFilaUbicacionActiva(null);
                }}
              />
            )}
        </>
    )
}

export default FormularioPedido;
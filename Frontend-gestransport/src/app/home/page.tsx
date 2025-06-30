'use client';
import '../css/styles.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormularioPedido from '../../Components/FormularioPedido';
import ListaPedidos from '../../Components/ListaPedidos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute, faUsers, faFileAlt } from '@fortawesome/free-solid-svg-icons';
// ...código existente...

const Home = () => {
  
  //const [formularioPedido, setFormularioPedido] = useState(true);
  const [contenidoCentral, setContenidoCentral] = useState("Lista de Pedidos de Transporte");
  let contenidoCentralCabecera;
  let contenidoCentralRenderizado;


  switch (contenidoCentral) {
    case "Lista de Pedidos de Transporte":
      contenidoCentralCabecera = ("Lista de Pedidos de Transporte");
      contenidoCentralRenderizado = (
        <ListaPedidos 
          contenidoCentral={contenidoCentral}
          setContenidoCentral={setContenidoCentral}
        />
      )
      break;
    case "Formulario del Pedido de Transporte":
      contenidoCentralCabecera = ("Formulario del Pedido de Transporte");
      contenidoCentralRenderizado = (
        <FormularioPedido 
          contenidoCentral={contenidoCentral}
          setContenidoCentral={setContenidoCentral}
        />
      )
      break;
    default:
      contenidoCentralRenderizado = (
        <div className="error-container">
          <h2>Error: Contenido no encontrado</h2>
          <p>La sección solicitada no está disponible.</p>
        </div>
      );
      break;
  }

  return (
    <div>
      {/* cabecera  */}
      <div className="header-uni">
        <img
          src="/imgs/logo-uni-blanco_med.png"
          alt="Logo"
          className="header-uni-logo"
        />
        <div className="header-uni-title-container">
          <h1 className="header-uni-title">
            {contenidoCentralCabecera}
          </h1>
        </div>
      </div>
      {/* Pantalla central */}
      <div className='contenedor-padding'>
        {contenidoCentralRenderizado}
      </div>
      <ToastContainer />
    </div>
  );
};
export default Home;

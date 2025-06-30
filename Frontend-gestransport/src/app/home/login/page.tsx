"use client";
import React, { useState, CSSProperties} from 'react';
import axios from 'axios';

import Cookies from 'js-cookie';
import { CgOpenCollective } from 'react-icons/cg';

export let messagess = null;

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/api/login', { username, password });
      if (response.status === 200) {
        console.log('Login exitoso', response.data.success);
       
        const encodedData = response.data.user;
        console.log('Datos del usuario recibidos:', encodedData);

        // 3. Guardamos el objeto en cookies
        Cookies.set('loginUser', JSON.stringify(encodedData), { expires: 1 });
        console.log('valor de la coockie: ', encodedData)
       
       
        // Si la respuesta es exitosa, redirigir al usuario .a la página de búsqueda
        window.location.href = 'http://localhost:4000/search';
        //console.log('aa', messagess);
      }
    } catch (err) {
      console.log('Error ', err);
      setError('Error de servidor. Por favor, intenta de nuevo más tarde.');
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <div style={styles.container}>
      <div style={styles.lema}>
        <p style={styles.p}> Sistema de Gestión de Contenidos - SGC</p>
      </div>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Iniciar sesión</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="relative md:col-span-2">
              <div className="floating-label-group">
                <input
                  type="text" 
                  id="username" 
                  name="username" 
                  placeholder=" " 
                  required 
                  style={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-md floating-input w-full"
                />
                <label
                  htmlFor="username"
                  className="floating-label2"
                >
                  Usuario
                </label>
              </div>
          </div>

          <div className="relative md:col-span-2 mt-4" style={styles.inputGroup}>
              <div className="floating-label-group">
                <input
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password" 
                placeholder=" " 
                required 
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md floating-input w-full"
                />
                <button 
                type="button" 
                onClick={toggleShowPassword} 
                style={styles.toggleButton}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
                <label
                  htmlFor="password"
                  className="floating-label2"
                >
                  Contraseña
                </label>
              </div>
            </div>
          <div style={styles.buttonGroup}>
            <button className='mr-2' type="submit" style={{...styles.btn, ...styles.accept}}>Aceptar</button>
            <button type="button" style={{...styles.btn, ...styles.cancel}} onClick={() => window.location.href = '/search/login'}>Cancelar</button>
          </div>
          <div className='text-xl' style={styles.forgotPassword}>
            <a href="/forgot-password" style={styles.forgotPasswordLink}>¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles : { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end', // Alinea el contenido al lado derecho
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundImage: 'url("/img/fondo_uni.jpg")',
    position: 'relative',
    backgroundSize: 'cover', // Mantiene el tamaño cubriendo toda el área
    backgroundRepeat: 'no-repeat', // No repite la imagen
    backgroundAttachment: 'fixed', // Fija la imagen al fondo
    paddingRight: '50px', // Opcional: Añade un poco de espacio desde el borde derecho
    
  },
lema: {
    position: 'absolute',
    backgroundColor: 'transparent',
    marginLeft: '12%',
    bottom: '5%',
    textAlign: 'left',
    color: 'white',
    width: '84.5%',
    alignItems: 'start'
  },
  p:{
    fontSize: '27px',
    fontWeight: '700',
    display: 'block',
    marginBlockStart: '1em',
    marginBlockEnd: '0.5em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    unicodeBidi: 'isolate',
  },
  loginBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Levemente transparente
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    maxWidth: '400px',
    width: '100%',
    marginTop: '250px'
  },
  title: {
    textAlign: 'center' as 'center',
    marginBottom: '20px',
    fontSize: '30px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold' as 'bold',
    fontSize: '20px',
  },
  passwordWrapper: {
    position: 'relative' as 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '20px',
  },
  toggleButton: {
    position: 'absolute' as 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer' as 'pointer',
    fontSize: '16px',
    marginTop: '7px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center',
    marginTop: '10px',
  },
  btn: {
    padding: '6px 6px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer' as 'pointer',
    fontSize: '1rem',
  },
  accept: {
    backgroundColor: '#99020b',
    color: 'white',
  fontWeight: '600',
  },
  cancel: {
    backgroundColor: '#99020b',
    color: 'white',
      fontWeight: '600',
  },
  forgotPassword: {
    textAlign: 'center' as 'center',
    marginTop: '20px',
  },
  forgotPasswordLink: {
    color: 'black',
    textDecoration: 'none' as 'none',
  },
};

export default LoginPage;

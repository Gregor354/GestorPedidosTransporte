"use client"; 
const ErrorPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.errorMessage}>Error! No tienes acceso a la pagina.</h2>
      <p style={styles.errorDescription}>
        Intenta nuevamente o comunicate con el administrador
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center' as 'center',
    backgroundColor: '#f8f9fa',
  },
  errorCode: {
    fontSize: '10rem',
    color: '#dc3545',
    margin: '0',
  },
  errorMessage: {
    fontSize: '2rem',
    color: '#343a40',
    margin: '0.5rem 0',
  },
  errorDescription: {
    fontSize: '1.25rem',
    color: '#6c757d',
  },
};

export default ErrorPage;

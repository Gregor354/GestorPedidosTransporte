const sql = require('mssql');
const { configLocalPedidos } = require('../config/dbConfig');
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' }); // Carpeta temporal para archivos

const getTipoTransporte = async (req, res) => {
    let pool = null;
    try {
        pool = await sql.connect(configLocalPedidos);
        const result = await pool.request()
            .query(`SELECT * FROM TIPO_TRANSPORTE 
                WHERE CONT_V_ESTADO = 'Activo'`);
        if (result.recordset.length === 0) {
            console.log('No TipoTransporte found');
            return res.status(404).json({ message: 'No TipoTransporte found' });
        }
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching TipoTransporte:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error('Error closing the database connection:', closeError);
            }
        }
    }
}

const insertarPedido = async (req, res) => {
    let pool = null;
    try {
        // Acceso a los campos enviados por FormData
        const {
            tipo_transporte,
            detalles_destino,
            fecha_solicitud,
            cantidad_dias,
            cantidad_noches,
            lugar_descansa_bus,
            lugar_descansa_bus_latitud,
            lugar_descansa_bus_longitud,
            lugar_descansa_conductor,
            lugar_descansa_conductor_latitud,
            lugar_descansa_conductor_longitud,
            usuario
        } = req.body;

        // Acceso a los archivos
        const oficioSolicitudFile = req.files['oficio_solicitud'] ? req.files['oficio_solicitud'][0] : null;
        const seguroRiesgoFile = req.files['seguro_riesgo'] ? req.files['seguro_riesgo'][0] : null;

        // Aquí puedes guardar los archivos en disco, en la base de datos, o en la nube según tu necesidad

        pool = await sql.connect(configLocalPedidos);
        // Ejemplo de inserción (ajusta los campos y la tabla según tu modelo)
        await pool.request()
            .input('cantidad_dias', sql.Int, cantidad_dias)
            .input('cantidad_noches', sql.Int, cantidad_noches)
            .input('detalles_destino', sql.VarChar, detalles_destino)
            .input('fecha_solicitud', sql.VarChar, fecha_solicitud)
            .input('lugar_descansa_bus', sql.VarChar, lugar_descansa_bus)
            .input('lugar_descansa_bus_latitud', sql.VarChar, lugar_descansa_bus_latitud)
            .input('lugar_descansa_bus_longitud', sql.VarChar, lugar_descansa_bus_longitud)
            .input('lugar_descansa_conductor', sql.VarChar, lugar_descansa_conductor)
            .input('lugar_descansa_conductor_latitud', sql.VarChar, lugar_descansa_conductor_latitud)
            .input('lugar_descansa_conductor_longitud', sql.VarChar, lugar_descansa_conductor_longitud)
            .input('oficio_solicitud', sql.VarChar, oficioSolicitudFile ? oficioSolicitudFile.filename : null)
            .input('seguro_riesgo', sql.VarChar, seguroRiesgoFile ? seguroRiesgoFile.filename : null)
            .input('tipo_transporte', sql.VarChar, tipo_transporte)
            .input('identificador_construido', sql.VarChar, `${tipo_transporte}-${fecha_solicitud}-${usuario}`) // Ejemplo de identificador
            .input('estado_pedido', sql.VarChar, 'SOLICITADO') // Estado inicial del pedido
            .input('usuario', sql.Int, usuario)
            .query(`INSERT INTO [DBO].[PEDIDO_TRANSPORTE] (
                        [CONT_I_CANTIDAD_DIAS],
                        [CONT_I_CANTIDAD_NOCHES],
                        [CONT_V_DETALLES_DESTINO],
                        [CONT_V_FECHA_SOLICITUD],
                        [CONT_V_LUGAR_DESCANSA_BUS],
                        [CONT_V_LUGAR_DESCANSA_BUS_LATITUD],
                        [CONT_V_LUGAR_DESCANSA_BUS_LONGITUD],
                        [CONT_V_LUGAR_DESCANSA_CONDUCTOR],
                        [CONT_V_LUGAR_DESCANSA_CONDUCTOR_LATITUD],
                        [CONT_V_LUGAR_DESCANSA_CONDUCTOR_LONGITUD],
                        [CONT_V_OFICIO_SOLICITUD_EXTENSION],
                        [CONT_V_OFICIO_SOLICITUD_NOMBRE_ARCHIVO],
                        [CONT_V_OFICIO_SOLICITUD_RUTA],
                        [CONT_V_OFICIO_SOLICITUD_TIPO],
                        [CONT_V_SEGURO_RIESGO_EXTENSION],
                        [CONT_V_SEGURO_RIESGO_NOMBRE_ARCHIVO],
                        [CONT_V_SEGURO_RIESGO_RUTA],
                        [CONT_V_SEGURO_RIESGO_TIPO],
                        [CONT_V_TIPO_TRANSPORTE],
                        [CONT_V_IDENTIFICADOR_CONSTRUIDO],
                        [CONT_V_ESTADO_PEDIDO],
                        [CONT_NU_ID_USUARIO]
                    )
                    VALUES (
                        @cantidad_dias,
                        @cantidad_noches,
                        @detalles_destino,
                        @fecha_solicitud,
                        @lugar_descansa_bus,
                        @lugar_descansa_bus_latitud,
                        @lugar_descansa_bus_longitud,
                        @lugar_descansa_conductor,
                        @lugar_descansa_conductor_latitud,
                        @lugar_descansa_conductor_longitud,
                        @oficio_solicitud_extension,
                        @oficio_solicitud_nombre_archivo,
                        @oficio_solicitud_ruta,
                        @oficio_solicitud_tipo,
                        @seguro_riesgo_extension,
                        @seguro_riesgo_nombre_archivo,
                        @seguro_riesgo_ruta,
                        @seguro_riesgo_tipo,
                        @tipo_transporte,
                        @identificador_construido,
                        @estado_pedido,
                        @usuario
                    );`);

        res.status(201).json({ message: 'Pedido insertado correctamente' });
    } catch (error) {
        console.error('Error al insertar pedido:', error);
        res.status(500).json({ error: 'Error al insertar pedido' });
    } finally {
        if (pool) {
            try { await pool.close(); } catch (e) {}
        }
    }
};

module.exports = { getTipoTransporte, insertarPedido };
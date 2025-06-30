const sql = require('mssql');
const { configLocalPedidos } = require('../config/dbConfig');

const getListaPedidos = async (req, res) => {
    let pool = null;
    try {
        pool = await sql.connect(configLocalPedidos);
        const result = await pool.request()
            .query(
                `SELECT * FROM PEDIDO_TRANSPORTE
                Where CONT_NU_ID_USUARIO = 1
                Order by CONT_V_FECHA_SOLICITUD DESC`
            );
        if (result.recordset.length === 0) {
            console.log('No Pedidos found');
            return res.status(404).json({ message: 'No Pedidos found' });
        }
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching Pedidos:', error);
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

const getListaItinerario = async (req, res) => {
    let pool = null;
    try {
        pool = await sql.connect(configLocalPedidos);
        const { identificador } = req.query;
        const result = await pool.request()
            .input('identificador', sql.VarChar, identificador)
            .query(
                `SELECT * FROM ITINERARIO_VIAJE
                WHERE CONT_NU_ID_PEDIDO_TRANSPORTE = @identificador
                ORDER BY CONT_V_FECHA_PARADA, CONT_V_HORA_PARADA ASC`
            );
        if (result.recordset.length === 0) {
            console.log('No Itinerario found for the given identifier');
            return res.status(404).json({ message: 'No Itinerario found for the given identifier' });
        }
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching Itinerario:', error);
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

module.exports = {
    getListaPedidos,
    getListaItinerario
};
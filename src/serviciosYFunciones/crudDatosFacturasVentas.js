import { cargarFacturasVenta, cargarFacturaVenta } from "./obtenerDatos";

export default class CrudDatosFacturasVenta {
    static async facturas(){
        return await cargarFacturasVenta()
    }

    static async factura(id){
        return await cargarFacturaVenta(id)
    }
}
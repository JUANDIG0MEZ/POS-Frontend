import { cargarFacturasCompra, cargarFacturaCompra} from "./obtenerDatos"

export default class CrudDatosFacturasCompra {
    static async facturas(){
        return await cargarFacturasCompra()
    }

    static async factura(id){
        return await cargarFacturaCompra(id)
    }
}
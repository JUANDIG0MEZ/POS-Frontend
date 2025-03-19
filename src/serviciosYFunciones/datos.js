import {cargarClientes, cargarProductos, cargarMedidas, cargarCategorias, cargarMarcas, tiposClientes, cargarFacturasCompra, cargarFacturasVenta} from "./obtenerDatos"

export class ObtenerDatos {
    
    static clientes(){
        return cargarClientes()
    }

    static productos(){
        return cargarProductos()
    }

    static medidas(){
        return cargarMedidas()
    }

    static categorias(){
        return cargarCategorias()
    }

    static marcas(){
        return cargarMarcas()
    }

    static tiposClientes(){
        return tiposClientes()
    }
    static compras(){
        return cargarFacturasCompra()
    }
    static ventas(){
        return cargarFacturasVenta()
    }
    static(id){
        return cargarFacturasCompra(id)
    }

}




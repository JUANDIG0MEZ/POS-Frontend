import { cargarClientes, cargarProductos } from "./obtenerDatos"

export class ObtenerDatos {
    
    static clientes(){
        return cargarClientes()
    }

    static productos(){
        return cargarProductos()
    }

}




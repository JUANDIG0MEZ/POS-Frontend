import {cargarProductos } from "./obtenerDatos"

export default class CrudDatosProductos {
    // Read
    static productos() {
        return cargarProductos()
    }

    static existe(id, datos){
        return datos.some(dato => dato.id == id)
    }

    static encontrarPorId(id, datos){
        return datos.find(dato => dato.id == id)
    }

    static encontrarPorNombre(nombre, datos){
        return datos.find(dato => dato.nombre == nombre)
    }

    static agregarDato(nuevoDato, datos, setDatos){
        if (this.existe(nuevoDato.id, datos)){
            return false
        }
        else {
            setDatos([...datos, nuevoDato])
            return true
        }
    }

    static actualizarDato(id, informacion, datos, setDatos){
        const index = datos.findIndex(dato => dato.id === id)
        if (index !== -1){
            const nuevosDatos = [...datos]
            nuevosDatos[index] = {...nuevosDatos, ...informacion}
            setDatos(nuevosDatos)
            return true
        }
        else{
            return false
        }

    }
}



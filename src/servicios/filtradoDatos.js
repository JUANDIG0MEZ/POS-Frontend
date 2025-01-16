
export class FiltradoDatosProductos {

    static contienenNombre(datos, nombre, propiedad="nombre"){
        return datos.filter(dato => dato[propiedad].toLowerCase().includes(nombre.toLowerCase())) 
    }

    static contienenMarca(datos, marca, propiedad="marca") {
        return datos.filter(dato => dato[propiedad].toLowerCase().includes(marca.toLowerCase()))
    }
    
    static contienenCategoria(datos, categoria, propiedad="categoria"){
        return datos.filter(dato => dato[propiedad].toLowerCase().includes(categoria.toLowerCase()))
    }

    static fullFiltrado(datos, nombre, marca, categoria){
        if (nombre !== ""){
            datos = this.contienenNombre(datos, nombre)
        }
        if (marca !== ""){
            datos = this.contienenMarca(datos, marca)
        }
        if (categoria !== ""){
            datos = this.contienenCategoria(datos, categoria)
        }
        return datos
    }

}




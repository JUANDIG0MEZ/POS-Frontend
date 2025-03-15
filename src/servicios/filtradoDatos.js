
export class FiltradoDatos {

    static filtroCadena(datos, propiedad, valor){
        if (valor){
            return datos.filter(dato => {
                return dato[propiedad].toLowerCase().includes(valor.toLowerCase())}
            )
        }
        return datos
        
    }
    static filtroNumero(datos, propiedad, valor){
        if (!valor){
            return datos
        }
        return datos.filter(dato => dato[propiedad].toString().toLowerCase().includes(valor.toString()))
    }

    static filtroFecha(datos, propiedad, fechaInicio, fechaFinal){
        return datos.filter(dato => {
            const fecha = new Date(dato[propiedad])
            return (!fechaInicio || fecha >= new Date(fechaInicio)) && 
                   (!fechaFinal || fecha <= new Date(fechaFinal))
        })
    }

}

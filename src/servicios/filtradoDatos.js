
export class FiltradoDatos {

    static filtroCadena(datos, propiedad, valor){
        return datos.filter(dato => {
            return dato[propiedad].toLowerCase().includes(valor.toLowerCase())}
        )
    }
    static filtroNumero(datos, propiedad, valor){
        return datos.filter(dato => dato[propiedad].toString().toLowerCase().includes(valor.toString()))
    }

}

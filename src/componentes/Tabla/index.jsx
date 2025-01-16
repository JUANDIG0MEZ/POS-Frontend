import { memo } from "react"


export default function Tabla(props) {


    function seleccionFila(e){
        const fila = e.target.closest('tr')
        if (fila){
            const id = fila.dataset.id
            props.setItemSeleccionado(id)
        }
    }

    function isSeleccionado(actual){
        return actual == props.itemSeleccionado
    }


    return (
        <table className="mx-auto">
            <thead>

                <tr className="bg-gray-50">
                {
                props.datos.length > 0 && Object.keys(props.datos[0]).map((key, indice)=>{
                    if (props.isVisible[key] === false) {
                        return null
                    }
                    return <th key={indice} className="p-1 border">{key}</th>   
                }) 
                }
                </tr>
            </thead>
            <tbody onClick={seleccionFila}> 
                  {
                        props.datos.length > 0 && 
                        props.datos.map((dato)=>{
                            return (
                            <tr
                            key={dato.id} 
                            data-id = {dato.id}
                            className={`bg-white border hover:bg-gray-300 cursor-pointer ${isSeleccionado(dato.id) ? 'bg-gray-400' : '' }`}>
                                {   
                                    Object.keys(dato).map((key, indice)=>{
                                        if (props.isVisible[key] === false) {
                                            return null
                                        }
                                        return <td key={indice} className="p-2 border">{dato[key]}</td>
                                    })
                                }
                            </tr>
                            )
                        })
                    }
            </tbody>
        </table>
    )
}
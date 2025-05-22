import {memo} from 'react'

export default memo(function Tabla(props) {

    const pagina = props.pagina ? props.pagina : 1
    const limite = props.limite ? props.limite : 25

    const offset = (pagina - 1) * limite
    
    function seleccionFila(e){
        const fila = e.target.closest('tr')
        if (fila && props.setIdItemSeleccionado){
            const id = fila.dataset.id
            props.setIdItemSeleccionado(id)
        }
    }

    return (
        <table className="w-full">
            <thead>
                <tr className="bg-gray-50">
                {
                props.datos.length > 0 && Object.keys(props.datos[0]).map((key, indice)=>{
                    if (props.rename && props.rename[key]){
                        return <th key={indice} className="p-2 border">{props.rename[key]}</th>
                    }
                    return <th key={indice} className="p-2 border">{key}</th>
                })
                }
                </tr>
            </thead>
            <tbody onClick={seleccionFila} className=" p-1 h-full w-full overflow-auto">
                { 
                    props.datos.length > 0 && props.datos.map((dato, indiceDato)=>{
                        if (indiceDato < offset || indiceDato >= offset + limite){
                            return null
                        }
                        return (
                        <tr
                            key={dato.id} 
                            data-id = {dato.id}
                            className={`bg-hover cursor-pointer text-center`}>
                            {   
                                Object.keys(dato).map((key, indice)=>{
                                    if (props.isVisible){
                                        if (props.isVisible[key] === false) {
                                            return null
                                        }
                                    }
                                    return <td key={indice} className="p-2 border">{dato[key]}</td>
                                })
                            }
                        </tr>)
                    
                })}                    
            </tbody> 
        </table>
        
    )
})
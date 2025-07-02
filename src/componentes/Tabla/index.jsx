import {memo} from 'react'

export default memo(function Tabla(props) {   
    
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
                <tr className="titulo-tabla">
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
                    props.datos.length ? props.datos.map((dato)=>{

                        return (
                        <tr
                            key={dato.id} 
                            data-id = {dato.id}
                            className={`hover-1 cursor-pointer text-center`}>
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

                    
                }) 
                : null
            } 
                {
                    props.total ?   props.datos.length > 0 && 
                    <tr className="">
                    {   
                        props.datos.length > 0 &&
                        Object.keys(props.datos[0]).map((item, idx)=>{
                            const totalColumns = Object.keys(props.datos[0]).length

                            if (idx == totalColumns -2) {
                                return <td key={idx} className="p-2 border font-bold text-center">Total</td>
                            }
                            else if (idx == totalColumns -1) {
                                return <td key={idx} className="p-2 border text-center">{props.total}</td>
                            }
                            return <td key={idx} className="p-2"></td>
})
                    }
                    </tr>
                    :null
                }
            </tbody> 
        </table>
        
    )
})
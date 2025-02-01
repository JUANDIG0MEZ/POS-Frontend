import {memo} from 'react'

export default memo(function Tabla(props) {
    function seleccionFila(e){
        const fila = e.target.closest('tr')
        if (fila && props.setIdItemSeleccionado){
            const id = fila.dataset.id
            props.setIdItemSeleccionado(id)
        }
    }

    let colspan = 0

    if (props.isVisible){
        colspan = Object.keys(props.isVisible).filter(key => props.isVisible[key] === true).length
    }
    else{
        if (props.datos.length > 0){
            colspan = Object.keys(props.datos[0]).length
        }
    }
    return (
        <table className="w-full">
            <thead>

                <tr className="bg-gray-50">
                {
                props.datos.length > 0 && Object.keys(props.datos[0]).map((key, indice)=>{
                    if (props.isVisible){
                        if (props.isVisible[key] === false) {
                            return null
                        }
                    }
                    return <th key={indice} className="p-2 border">{key}</th>
                })
                }
                </tr>
            </thead>
            <tbody onClick={seleccionFila} className=" p-1 h-full w-full overflow-auto">
                { 
                    props.datos.length > 0 && props.datos.map((dato)=>{
                        return (<tr
                            key={dato.id} 
                            data-id = {dato.id}
                            className={`hover:bg-gray-300 cursor-pointer text-center`}>
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

                {   
                    props.total && props.datos.length> 0 &&
                <tr className=''>
                    {
                        colspan-3 >= 0 && <td colSpan={colspan-2} ></td>
                    }
 
                    {
                        colspan-1 > 0 && <td className="bg-gray-50 p-2 border text-center font-bold">Total</td>
                    }
                    {
                        colspan > 0 && <td className='p-2 border text-center font-bold'>{props.total}</td>
                    }
                </tr>
                }
                
            </tbody>
            
            
        </table>
        
    )
})

import { FaLongArrowAltRight } from "react-icons/fa"
import {memo} from 'react'

export default memo(function DiffTabla(props) {

    function seleccionFila(e){
        const fila = e.target.closest('tr')
        if (fila && props.setIdItemSeleccionado){
            const id = fila.dataset.id
            props.setIdItemSeleccionado(id)
        }
    }


    let colspan = 0
    if (props.tabla1.length > 0){
        colspan = Object.keys(props.tabla1[0]).length
    }

    function comparar(indice, clave){
        if (typeof props.tabla1[indice][clave] === 'number'){
            if (props.tabla1[indice][clave] === props.tabla2[indice][clave]){
                return props.tabla1[indice][clave]
            }
            else if (props.tabla1[indice][clave] > props.tabla2[indice][clave]){
                return (
                    <span className="flex gap-2 justify-center items-center">{props.tabla1[indice][clave]}<FaLongArrowAltRight size={20}/>{<span className='text-red-500'>{props.tabla2[indice][clave]}</span>}</span>
                )
            }
            else {
                return (
                    <span className="flex gap-2 justify-center">{props.tabla1[indice][clave]}<FaLongArrowAltRight size={20}/>{<span className='text-green-700'>{props.tabla2[indice][clave]}</span>}</span>
                )
            }
        }
        else {
            return props.tabla1[indice][clave]
        }
    }

    

    return (
        <table onClick={seleccionFila} className="w-full">
            <thead>

                <tr className="titulo-tabla">
                {
                    props.tabla1.length > 0 && Object.keys(props.tabla1[0]).map((key, indice)=>{
                        if (props.rename && props.rename[key]){
                            return <th key={indice} className="p-2 border">{props.rename[key]}</th>
                        }
                        return <th key={indice} className="p-2 border">{key}</th>
                    })
                }
                </tr>
            </thead>
            <tbody  className=" p-1 h-full w-full overflow-auto">
                { 
                    props.tabla1.length > 0 && props.tabla1.map((fila1, indice)=>{
                        return (<tr
                            key={indice} 
                            data-id = {fila1.id}
                            className={`hover-1 cursor-pointer text-center`}>
                            {   
                                Object.keys(fila1).map((key, indice2)=>{
                                    return <td key={indice2} className="p-2 border justify-center">
                                            {comparar(indice, key)}
                                        </td> 
                                })
                            }
                        </tr>)
                    
                })}    




                {   
                     props.tabla1.length> 0 &&
                <tr className=''>
                    {
                        colspan-3 >= 0 && <td colSpan={colspan-2} />
                    }
 
                    {
                        colspan-1 > 0 && <td className="bg-gray-50 p-2 border text-center font-bold">Total</td>
                    }
                    {
                        colspan > 0 && <td className='p-2 border text-center font-bold'>{compararTotales(props.total, props.total2)}</td>
                    }
                </tr>
                }
                
            </tbody>
            
            
        </table>
        
    )
})



function compararTotales(total1, total2){
    if(total1 === total2){
        return total1
    }
    else if (total1 > total2){
        return (
            <span className="flex gap-2 justify-center items-center">{total1}<FaLongArrowAltRight size={20}/>{<span className='text-red-500'>{total2}</span>}</span>
        )
    }
    else {
        return (
            <span className="flex gap-2 justify-center">{total1}<FaLongArrowAltRight size={20}/>{<span className='text-green-700'>{total2}</span>}</span>
        )
    }
}
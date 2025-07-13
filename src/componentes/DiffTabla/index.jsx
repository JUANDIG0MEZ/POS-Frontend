
import { FaLongArrowAltRight } from "react-icons/fa"
import {memo} from 'react'

export default memo(function DiffTabla({listItems1, listItems2, setIdItemSelected, rename, compare, total1, total2}) {

    function seleccionFila(e){
        const fila = e.target.closest('tr')
        if (fila && setIdItemSelected){
            const id = fila.dataset.id
            setIdItemSelected(id)
        }
    }

    function comparar(indice, clave){
        if (compare[clave]){
            const valor1 = Number(listItems1[indice][clave])
            const valor2 = Number(listItems2[indice][clave])
            if (valor1 === valor2){
                return valor1
            }
            else if (valor1 > valor2){
                return (
                    <span className="flex gap-2 justify-center items-center">{valor1}<FaLongArrowAltRight size={20}/>{<strong className='text-red-500'>$ {valor2}</strong>}</span>
                )
            }
            else {
                return (
                    <span className="flex gap-2 justify-center">{valor1}<FaLongArrowAltRight size={20}/>{<strong className='text-green-700'>$ {valor2}</strong>}</span>
                )
            }
        }
        else {
            return listItems2[indice][clave]
        }
    }


    return (
        <>
            {
                listItems1.length > 0 ? <table onClick={seleccionFila} className="w-full">
            <thead>

                <tr className="titulo-tabla">
                {
                    listItems1.length > 0 && Object.keys(listItems1[0]).map((key, indice)=>{
                        if (rename && rename[key]){
                            return <th key={indice} className="p-2 border">{rename[key]}</th>
                        }
                        return <th key={indice} className="p-2 border">{key}</th>
                    })
                }
                </tr>
            </thead>
            <tbody  className=" p-1 h-full w-full overflow-auto">
                { 
                    listItems1.length > 0 && listItems1.map((fila1, indice)=>{
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
                    (listItems1.length && total1) ? 
                    <tr>
                        {
                        Object.keys(listItems1[0]).map((item, idx)=>{
                            const totalColumns = Object.keys(listItems1[0]).length

                            if (idx == totalColumns -2) {
                                return <td key={idx} className="p-2 border font-bold text-center">Total</td>
                            }
                            else if (idx == totalColumns -1) {
                                return <td key={idx} className="p-2 border text-center">{compararTotales(total1, total2)}</td>
                            }
                            return <td key={idx} className="p-2"></td>
                        })
                    }
                    
                    </tr>
                    : null
                }
                
            </tbody>
            
            
        </table> : null
            }
            
        </>
        
        
    )
})



function compararTotales(total1, total2){
    if(total1 === total2){
        return total1
    }
    else if (total1 > total2){
        return (
            <span className="flex gap-2 justify-center items-center">{total1}<FaLongArrowAltRight size={20}/> {<strong className='text-red-500'>$ {total2}</strong>}</span>
        )
    }
    else {
        return (
            <span className="flex gap-2 justify-center">{total1}<FaLongArrowAltRight size={20}/> {<strong className='text-green-700'>$ {total2}</strong>}</span>
        )
    }
}
import {memo} from 'react'

export default memo(function Tabla({listItems, setIdSelected, rename, total, columns }) {   
    
    function seleccionFila(e){
        const fila = e.target.closest('tr')
        if (fila && setIdSelected){
            const id = fila.dataset.id
            setIdSelected(id)
        }
    }

    return (
        <table className="w-full">
            <thead>
                <tr className="titulo-tabla">
                {
                listItems.length > 0 && columns.map((key, indice)=>{
                    if (rename && rename[key]){
                        return <th key={indice} className="p-2 border">{rename[key]}</th>
                    }
                    return <th key={indice} className="p-2 border">{key}</th>
                })
                }
                </tr>
            </thead>
            <tbody onClick={seleccionFila} className=" p-1 h-full w-full overflow-auto">
                { 
                    listItems.length ? listItems.map((dato)=>{

                        return (
                        <tr
                            key={dato.id} 
                            data-id = {dato.id}
                            className={`hover-1 cursor-pointer text-center`}>
                            {   
                                columns.map((key, indice)=>{
                                    return <td key={indice} className="p-2 border">{dato[key]}</td>
                                })
                            }
                        </tr>)

                    
                }) 
                : null
            } 
                {
                    total ?   listItems.length > 0 && 
                    <tr className="">
                    {   
                        listItems.length > 0 &&
                        columns.map((item, idx)=>{
                            const totalColumns = columns.length

                            if (idx == totalColumns -2) {
                                return <td key={idx} className="p-2 border font-bold text-center">Total</td>
                            }
                            else if (idx == totalColumns -1) {
                                return <td key={idx} className="p-2 border text-center">{total}</td>
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
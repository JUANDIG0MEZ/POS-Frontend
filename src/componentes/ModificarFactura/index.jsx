import Boton from "../Boton"
import DiffTabla from "../DiffTabla"
import { useState, useEffect} from 'react'


export default function ModificarFactura(props){
    const [facturaModificada, setFacturaModificada] = useState(props.facturaOriginal)
    const [totalModificado, setTotalModificado] = useState(props.total)

    const [isItemSeleccionado, setIdItemSeleccionado] = useState(null)

    useEffect(() => {
        setTotalModificado(facturaModificada.reduce((acc, item)=> acc + Number(item.subtotal), 0))
    }, [facturaModificada])


    useEffect(()=> {

    }, [props.factura])



    // function guardarCambios(){
    //         const detalles = facturaModificada.map(item => {
    //             return {
    //                 producto_id: item.id,
    //                 cantidad: item.cantidad,
    //                 precio: item.precio ,
    //                 subtotal: item.subtotal
    //             }
    //         })  

    //         function cb(res){
    //             props.setFacturaOriginal(facturaModificada)
    //             setTotalTabla(res.info.total)
    //             setTotal(res.info.total)
    //             setPagado(res.info.pagado)
    //         }
            
    //         fetchManager(`http://localhost:3000/api/v1/facturas/compras/${id}`, cb, "PATCH", detalles)
    //     }

    //     function cambiarEstado(nuevoValor){
    //         if (nuevoValor === "Entregado"){
    //             setEstado(nuevoValor)
    //         }
            
    //     }

    console.log("facturaModificada desde el modulo modificar factura" , facturaModificada)
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-xl border w-[1200px] items-center gap-4 flex-col">    
                <p className="subtitulo">Modificar productos y servicios</p>
                <div>
                   <DiffTabla tabla1={props.facturaOriginal} tabla2={facturaModificada} total={90} total2= {90} setIdItemSeleccionado={setIdItemSeleccionado}/>
                </div>
                <div className="flex justify-end w-full gap-3">
                    <Boton texto="Cancelar cambios" onClick={()=> props.setShowModal(false)} isNormal={true}/>
                    <Boton texto="Confirmar cambios"/>
                </div>
            </div>
            
        
        </div>
       
    )
}
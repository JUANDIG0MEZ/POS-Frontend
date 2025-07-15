import Boton from '../Boton'
import { useState, useContext } from 'react'
import {toast} from 'sonner'
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones'
import InputNumber from '../InputNumber'
import { ContextInventario } from '../../contextInventario'
import Select from '../Select'
import InputText from '../InputText'
import { FaLongArrowAltRight } from "react-icons/fa"
import Decimal from 'decimal.js'
export default function ModalPagarVenta(props){

    const {
        metodosPago,
        totalNumber
    } = useContext(ContextInventario)

    const numeroFactura = props.numeroFactura
    const porPagar = props.total - props.pagado
    
    const [descripcion, setDescripcion] = useState("")
    const [valorAbono, setValorAbono] = useState(0) 
    const [metodoPago, setMetodoPago] = useState(null)


    function cerrarModal(){
        props.setShowModal(false)
    }


    function realizarAbono(){
        if (valorAbono > porPagar){
            toast.warning("El abono no puede ser mayor al total a pagar")
        }
        else {
            const valorDecimal = new Decimal(valorAbono)
            const metodoPagoFetch = Number(metodoPago)

            if (!metodoPagoFetch) return toast.warning('Selecciona el metodo de pago')
            if (!valorDecimal.gt(0)) return toast.warning('Agrega un valor')
            if (metodoPagoFetch > 1 && !descripcion) return toast.warning('Agrega el numero de referencia')

            const body = {
                venta_id: Number(numeroFactura),
                valor: valorDecimal.toString(),
                id_metodo_pago: metodoPagoFetch
            }
            if (descripcion) body.descripcion = descripcion

            function cbAbono(resData){
                props.setPagado(resData.pagado)
                cerrarModal()
            }
            fetchManager(`http://localhost:3000/api/v1/abono/venta`, cbAbono, "POST", body)
            
            // cerrarModal()
            
        }
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[900px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-3">
                    <h2 className="titulo mb-3">Realizar pago</h2>
                    <h2 className='subtitulo mb-4'>Informacion de la factura</h2>
                    <div className='flex gap-3 mb-3 items-center'>
                        <InputNumber style='w-44' value = {props.total} label1 ="Total factura" instanceNumber={totalNumber} />
                        <InputNumber style='w-44' value = {props.pagado} label1="Pagado" instanceNumber={totalNumber}/>
                        <FaLongArrowAltRight />
                        <InputNumber style="w-44" value = {porPagar} label1="Por pagar" instanceNumber={totalNumber}/>
                    </div>
                    <h2 className='subtitulo mb-4'>Informacion del pago</h2>
                    <div className="flex gap-3 justify-end">
                        
                        <Select listItems={metodosPago} label="Metodo pago" setValue = {setMetodoPago} defaultValue={0}/>
                        <div className={`${metodoPago < 2 ? "opacity-50 pointer-events-none": ""} flex flex-1 gap-3`}>
                            <InputText value={descripcion} setValue={setDescripcion} label1="Agrega la referencia o nro de comprobante"/>
                        </div>
                        <InputNumber style="w-44" value = {valorAbono} setValue={setValorAbono}  label1="Valor de pago" instanceNumber={totalNumber}/>
                        
                    </div>
                    <div className='justify-end flex gap-3'>
                        <Boton onClick={cerrarModal} text = "Cancelar" isNormal={true}/>
                        <Boton onClick={realizarAbono} text = "Pagar" />
                    </div>

                </div>
            </div>
            
        
        </div>
    )

}
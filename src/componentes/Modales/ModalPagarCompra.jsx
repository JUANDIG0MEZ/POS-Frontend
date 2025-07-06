import Boton from '../Boton'
import { useState, useContext } from 'react'
import {toast} from 'sonner'
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones'
import InputNumber from '../InputNumber'
import { ContextInventario } from '../../contextInventario'
import Select from '../Select'
import InputText from '../InputText'
import { FaLongArrowAltRight } from "react-icons/fa"
export default function ModalPagarCompra(props){

    const {
        metodosPago
    } = useContext(ContextInventario)

    const numeroFactura = props.numeroFactura
    const porPagar = props.total - props.pagado
    
    const [descripcion, setDescripcion] = useState("")
    const [valorAbono, setValorAbono] = useState(0) 
    const [metodoPago, setMetodoPago] = useState(null)


    function cerrarModal(){
        props.setShowModal(false)
    }


    function realizarPago(){
        if (valorAbono > porPagar) return toast.warning("El abono no puede ser mayor al total a pagar")
        
        const valorFetch = Number(valorAbono)
        const metodoPagoFetch = Number(metodoPago)

        if (!metodoPagoFetch) return toast.warning('Selecciona el metodo de pago')
        if (!valorAbono) return toast.warning('Agrega un valor')
        if (metodoPagoFetch > 1 && !descripcion)return toast.warning('Agrega el numero de referencia')


        const body = {
            compra_id: Number(numeroFactura),
            valor: valorFetch,
            id_metodo_pago: metodoPagoFetch,
        }
        if (descripcion) body.descripcion = descripcion

        function cbAbono(resData){
            props.setPagado(resData.pagado)
            cerrarModal()
        }
        fetchManager(`http://localhost:3000/api/v1/pago/compra`, cbAbono, "POST", body)
        
        cerrarModal()
      
    }



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[900px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-3">
                    <h2 className="titulo mb-3">Realizar pago</h2>
                    <h2 className='subtitulo mb-4'>Informacion de la factura</h2>
                    <div className='flex gap-3 mb-3 items-center'>
                        <InputNumber estilo='w-44' valor = {props.total} label ="Total factura" format={true}/>
                        <InputNumber estilo='w-44' valor = {props.pagado} label="Pagado" format={true}/>
                        <FaLongArrowAltRight />
                        <InputNumber estilo="w-44" valor = {porPagar} label="Por pagar" format={true} />
                    </div>
                    <h2 className='subtitulo mb-4'>Informacion del pago</h2>
                    <div className="flex gap-3 justify-end">
                        
                        <Select opciones={metodosPago} label="Metodo pago" setValor = {setMetodoPago} valorDefault={0}/>
                        <div className={`${metodoPago < 2 ? "opacity-50 pointer-events-none": ""} flex flex-1 gap-3`}>
                            <InputText valor={descripcion} setValor={setDescripcion} label="Agrega la referencia o nro de comprobante"/>
                        </div>
                        <InputNumber estilo="w-44" valor = {valorAbono} setValor={setValorAbono}  label="Valor de pago" isPrice={true} format={true} />
                        
                    </div>
                    <div className='justify-end flex gap-3'>
                        <Boton onClick={cerrarModal} texto = "Cancelar" isNormal={true}/>
                        <Boton onClick={realizarPago} texto = "Pagar" />
                    </div>

                </div>
            </div>
            
        
        </div>
    )

}
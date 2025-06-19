import Boton from '../Boton'
import { useState, useContext } from 'react'
import {toast} from 'sonner'
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones'
import InputNumber from '../InputNumber'
import Select from '../Select'

import { ContextInventario } from '../../contextInventario'
import InputText from '../InputText'

export default function ModalPagarCliente(props){

    const [valorPago, setValorPago] = useState(0) 
    const [metodoPago, setMetodoPago] = useState(0)
    const [descripcion, setDescripcion ] = useState('')
    const restante = props.porPagar - valorPago
    const {
        metodosPago
    } = useContext(ContextInventario)

    function cerrarModal(){
        props.setShowModal(false)
    }


    function realizarAbono(){
        const valorPagoFetch = Number(valorPago)
        const metodoPagoFetch = Number(metodoPago)
        if (restante < 0){
            toast.warning("El abono no puede ser mayor al total a pagar")
            return
        }
        if (valorPagoFetch < 1){
            toast.warning("Ingresa el valor del pago")
            return
        }
        if (metodoPagoFetch === 0){
            toast.warning("Agrega el metodo de pago")
            return
        }
        if (!(metodoPagoFetch < 2) && !descripcion){
            toast.warning("Agrega la referencia o nro de comprobante")
            return
        }

        const body = {
            valor: valorPagoFetch,
            metodoPagoId: metodoPagoFetch,
            descripcion
        }

        function cbAbono(resData){
            props.setPorPagarle(resData.por_pagarle)
        }
        fetchManager(`http://localhost:3000/api/v1/clientes/${props.clienteId}/pagar`, cbAbono, "POST", body)
        

        cerrarModal()

    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[1000px] items-center gap-6">    
                <div className="flex flex-col flex-1 gap-3">
                    <h2 className="titulo mb-3">Realizar pago al cliente</h2>
                    <h3 className='subtitulo mb-4'>Informacion del cliente</h3>
                    <InputNumber estilo="w-40" valor = {props.porPagar} label ="Saldo a favor" format={true}/>

                    <p className='subtitulo mb-4'>Informacion del pago</p>
                    <div className="flex gap-3 justify-end">
                        <Select label="Metodo pago" valorDefault={0} opciones={metodosPago} valor={metodoPago} setValor={setMetodoPago} />
                        <div className={`${metodoPago < 2 ? "opacity-50 pointer-events-none": ""} flex flex-1 gap-3`}>
                            <InputText valor={descripcion} setValor={setDescripcion} label="Agrega la referencia o nro de comprobante" />
                        </div>
                        <InputNumber 
                            estilo="w-40"
                            valor = {valorPago}
                            setValor={setValorPago} 
                            label="Valor de pago"
                            isPrice={true} format={true} />

                    </div>
                    <div className='flex gap-3 justify-between'>
                        <Boton onClick = {() => setValorPago(props.porPagar)} texto="Pago completo" isNormal={true}/>
                        
                        

                        <div className='flex gap-3'>
                            <Boton onClick={cerrarModal} texto = "Cancelar" isNormal={true}/>
                            <Boton onClick={realizarAbono} texto = "Pagar" />
                        </div>
                        
                    </div>

                </div>
            </div>
            
        
        </div>
    )

}
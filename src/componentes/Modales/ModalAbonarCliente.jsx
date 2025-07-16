import Boton from '../Boton'
import { useState, useContext } from 'react'
import {toast} from 'sonner'
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones'
import InputNumber from '../InputNumber'
import Select from '../Select'
import Decimal from 'decimal.js'
import { ContextInventario } from '../../contextInventario'
import InputText from '../InputText'


export default function ModalAbonoCliente({debe, clienteId,setDebe, setShowModal}){

    const [valorPago, setValorPago] = useState("") 
    const [metodoPago, setMetodoPago] = useState(0)
    const [descripcion, setDescripcion] = useState('')

    const {
        metodosPago,
        totalNumber
    } = useContext(ContextInventario)

    console.log('metodosPago', metodosPago)

    function cerrarModal(){
        setShowModal(false)
    }


    function realizarAbono(){

        const pagadoDecimal = new Decimal(valorPago)
        const debeDecimal = new Decimal(debe)
        const restante = debeDecimal.minus(pagadoDecimal)
        const metodoPagoFetch = Number(metodoPago)

        if (restante.lt(0)) return toast.warning("El abono no puede ser mayor al total a pagar")
        if (!pagadoDecimal.gt(0)) return toast.warning("Ingresa el valor del pago")
        if (metodoPagoFetch === 0) return toast.warning("Agrega el metodo de pago")
        if (!(metodoPagoFetch < 2) && !descripcion) return toast.warning("Agrega la referencia o nro de comprobante")

        const body = {
            cliente_id: Number(clienteId),
            valor: pagadoDecimal,
            id_metodo_pago: metodoPagoFetch,
        }
        if (descripcion) body.descripcion = descripcion

        function cbAbono(resData){
            setDebe(resData.debe)
        }
        fetchManager(`http://localhost:3000/api/v1/abono/cliente`, cbAbono, "POST", body)
        
        // cerrarModal()
    }



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[1000px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-3">
                    <h2 className="titulo mb-3">Crear abono del cliente</h2>
                    <h3 className='subtitulo mb-4'>Informacion del cliente</h3>
                    <InputNumber style="w-40" value = {debe} label1 ="Por pagar" instanceNumber={totalNumber} />

                    <p className='subtitulo mb-4'>Informacion de pago</p>
                    <div className='flex gap-3 justify-end'>
                        <Select label="Metodo pago" defaultValue={0} listItems={metodosPago} setValue={setMetodoPago} />
                        <div className={`${metodoPago < 2 ? "opacity-50 pointer-events-none": ""} flex flex-1 gap-3`}>
                            <InputText value={descripcion} setValue={setDescripcion} label1="Agrega la referencia o nro de comprobante" />
                        </div>
                        <InputNumber 
                            style="w-40"
                            value = {valorPago}
                            setValue={setValorPago} 
                            label1="Valor de pago"
                            instanceNumber={totalNumber}
                            />
                    </div>

                    <div className='flex gap-3 justify-between'>
                        <Boton onClick = {() => setValorPago(debe)} text="Pago completo" isNormal={true}/>
                        <div className='flex gap-3'>
                            <Boton onClick={cerrarModal} text = "Cancelar" isNormal={true}/>
                            <Boton onClick={realizarAbono} text = "Pagar" />
                        </div>
                        
                    </div>

                </div>
            </div>
            
        
        </div>
    )

}
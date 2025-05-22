import Boton from '../Boton'
import { useState } from 'react'
import {toast} from 'sonner'
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones'
import InputNumber from '../InputNumber'
export default function ModalAbonarCompra(props){
    const numeroFactura = props.numeroFactura
    const porPagar = props.total - props.pagado

    const [valorAbono, setValorAbono] = useState(0) 


    function cerrarModal(){
        props.setShowModal(false)
    }


    function realizarAbono(){
        if (valorAbono > porPagar){
            toast.warning("El abono no puede ser mayor al total a pagar")
        }
        else if (valorAbono > 0){

            const body = {
                valor: valorAbono
            }

            function cbAbono(resData){
                props.setPagado(resData.pagado)
            }
            fetchManager(`http://localhost:3000/api/v1/facturas/ventas/${numeroFactura}/abonar`, cbAbono, "PATCH", body)
            
            cerrarModal()
            
        }
    }



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[600px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-3">
                    <h2 className="w-full text-2xl font-bold mb-3">REALIZAR PAGO</h2>
                    <p></p>

                    <div className='flex gap-3 mb-3'>
                        <InputNumber valor = {props.total} label ="Total"/>
                        <button className='font-bold'>-</button>
                        <InputNumber valor = {props.pagado} label="Pagado"/>
                        <button className='font-bold'>=</button>
                        <InputNumber valor = {porPagar} label="Por pagar" />
                    </div>

                    <div className="flex gap-3 justify-end">
                        <InputNumber valor = {valorAbono} setValor={setValorAbono}  label="Valor de pago" isPrice={true} format={true} />
                        <Boton onClick={realizarAbono} texto = "Pagar" />
                        <Boton onClick={cerrarModal} texto = "Cancelar" isNormal={true}/>
                    </div>

                </div>
            </div>
            
        
        </div>
    )

}
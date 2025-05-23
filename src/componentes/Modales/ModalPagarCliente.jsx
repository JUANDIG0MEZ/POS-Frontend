import Boton from '../Boton'
import { useState } from 'react'
import {toast} from 'sonner'
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones'
import InputNumber from '../InputNumber'

import { FaArrowRight } from "react-icons/fa";

export default function ModalPagarCliente(props){

    const [valorPago, setValorPago] = useState(0) 
    const restante = props.porPagar - valorPago


    


    function cerrarModal(){
        props.setShowModal(false)
    }


    function realizarAbono(){
        if (restante < 0){
            toast.warning("El abono no puede ser mayor al total a pagar")
        }
        else if (valorPago > 0){

            const body = {
                valor: valorPago
            }

            function cbAbono(resData){
                props.setPorPagarle(resData.por_pagarle)
            }
            fetchManager(`http://localhost:3000/api/v1/clientes/${props.clienteId}/pagar`, cbAbono, "POST", body)
            
            cerrarModal()
            
        }
    }



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[600px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-3">
                    <h2 className="titulo mb-3">Realizar pago</h2>
                    <p></p>

                    <div className='flex gap-3 mb-3 items-center'>
                        <InputNumber valor = {props.porPagar} label ="Por pagarle" format={true}/>
                        <FaArrowRight className=''/>
                        <InputNumber valor = {restante} label="Restante" format={true} />
                    </div>

                    <div>
                        
                    </div>

                    <div className="flex gap-3 justify-end">
                        <InputNumber valor = {valorPago} setValor={setValorPago}  label="Valor de pago" isPrice={true} format={true} />
                        <Boton onClick={realizarAbono} texto = "Pagar" />
                        <Boton onClick={cerrarModal} texto = "Cancelar" isNormal={true}/>
                    </div>

                </div>
            </div>
            
        
        </div>
    )

}
import Boton from "../Boton"
import InputNumber from "../InputNumber"
import { useState } from "react"
import InputLista from "../InputLista"
import InputText from "../InputText"
export default function ModalConfirmarFactura(props){
    const [estado, setEstado] = useState("Recibido")
    const [pagado , setPagado] = useState("")
    const [idEstado, setIdEstado] = useState(1)

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
        
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[800px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-4">
                    <h2 className="subtitulo mb-4">Confirmar factura</h2>
                    <div className="flex flex-col gap-8">
                        <InputText label={"Cliente"} valor={props.clienteNombre}></InputText>
                        <div className="flex gap-3">
                            <InputNumber label={"Pagado por el cliente"} valor={pagado} setValor={setPagado} format={true}/>
                            <InputNumber label={"Total"} valor={props.total} format={true}/>
                            <InputLista label={"Estado"} lista={[{id: 1, nombre: "Recibido"}, {id: 2, nombre: "No recibido"}]} valor={estado} setValor={setEstado} setIdSeleccionado={setIdEstado}/>
                        </div>
                        <div className="flex gap-3 justify-between">
                            <div>
                                <Boton onClick={cerrarModal} texto = "Pago completo" isNormal={true} />
                            </div>
                            <div className="flex gap-3">
                                
                                <Boton onClick={cerrarModal} texto = "Cancelar" isNormal={true}/>
                                <Boton onClick={()=> {props.onConfirm(pagado, idEstado)}} texto = "Confirmar" />
                            </div>
                            
                        </div>
                    </div>
                    

                </div>
            </div>
            
        
        </div>
    )
}
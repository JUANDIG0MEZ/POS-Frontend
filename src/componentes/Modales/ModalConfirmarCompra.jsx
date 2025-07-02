import Boton from "../Boton"
import InputNumber from "../InputNumber"
import { useContext, useState } from "react"
import InputLista from "../InputLista"
import InputText from "../InputText"

import Select from "../Select"
import { ContextInventario } from "../../contextInventario"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import { toast } from "sonner"

export default function ModalConfirmarCompra(props){

    const {
        estadosComprasEntrega,
        metodosPago,
        clientesNombres,
    } = useContext(ContextInventario)

    const [nombreCliente, setNombreCliente] = useState("")
    const [idCliente, setIdCliente] = useState("")

    const [estadoEntrega, setEstadoEntrega] = useState("0")
    const [metodoPago, setMetodoPago] = useState("0")
    const [pagado , setPagado] = useState("")
    const [descripcion, setDescripcion] = useState("")




    function finalizarCompra(){
        if (props.carritoDeCompras.length === 0) return toast.info("Agrega productos al carrito.")
        if( Number(pagado) > Number(props.total)) return toast.error("El monto pagado es mayor al total.")
        if (Number(pagado) < Number(props.total) && !Number(idCliente)) return toast.error("Un cliente no registrado no puede tener deuda.")
        if (!Number(estadoEntrega)) return toast.warning('Elije el estado de la entrega.')
        if (!nombreCliente) return toast.warning('Debes agregar el nombre del cliente.')

        else {
            const info = {
                cliente_id: idCliente,
                id_estado_entrega: Number(estadoEntrega),
                id_metodo_pago: Number(metodoPago),
                pagado: Number(pagado),    
                total: props.total,
                nombre_cliente: nombreCliente
            }
            if (descripcion) info.descripcion = descripcion

            const detalles = props.carritoDeCompras.map(item => {
                return {
                    producto_id: item.id,
                    cantidad: item.cantidad,
                    precio: Number(item.precio)
                }
            })

            const compraEnviar = {info: info, datos: detalles}

            function cbCompra(res) {
                props.reset()
                props.setShowModal(false)
            }
            fetchManager(`http://localhost:3000/api/v1/compra`, cbCompra, "POST", compraEnviar)

        }

    }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-40 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[950px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-4">
                    <h2 className="titulo mb-4">Confirmar factura compra</h2>
                    <div className="flex flex-col gap-8">
                        <p className="subtitulo">Informacion factura</p>
                        <div className="flex gap-3">
                            <InputNumber estilo="w-40 pointer-events-none" label={"Total"} valor={props.total} format={true}/>
                            <InputLista
                                valor={nombreCliente}
                                setValor={setNombreCliente}
                                label="Cliente"
                                lista={clientesNombres}
                                setIdSeleccionado = {setIdCliente}
                                />
                            <Select opciones={estadosComprasEntrega} valor = {estadoEntrega} setValor={setEstadoEntrega} label={"Estado entrega"} valorDefault={0}/>
                            
                        </div>
                        

                        <p className="subtitulo">Informacion pago</p>
                        <div className="flex gap-3">
                            <InputNumber estilo="w-1/3" label={"Valor pagado"} valor={pagado} setValor={setPagado} format={true}/>
                            <Select opciones={metodosPago} label="Metodo pago" valorDefault={0} valor={metodoPago} setValor={setMetodoPago}/>
                            <div className={`${(metodoPago == 0 || metodoPago == 1) ? "pointer-events-none opacity-30" : ""}  w-full`}>
                                <InputText label="Escribre la Refencia, Nro del comprobante o una descripcion" valor={descripcion} setValor={setDescripcion}/>
                            </div>
                            
                        </div>

                        <div className="flex gap-3 justify-between">
                            <div>
                                <Boton onClick={()=> setPagado(props.total)} texto = "Pago completo" isNormal={true} />
                            </div>
                            <div className="flex gap-3">
                                
                                <Boton onClick={() => {props.setShowModal(false)}} texto = "Cancelar" isNormal={true}/>
                                <Boton onClick={finalizarCompra} texto = "Confirmar" />
                            </div>
                            
                        </div>
                    </div>
                    

                </div>
            </div>
            
        
        </div>
    )
}
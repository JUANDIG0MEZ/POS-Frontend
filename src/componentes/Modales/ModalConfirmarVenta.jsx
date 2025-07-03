import Boton from "../Boton"
import InputNumber from "../InputNumber"
import { useState, useContext } from "react"
import InputLista from "../InputLista"
import InputText from "../InputText"
import Select from "../Select"
import { toast } from "sonner"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"


import { ContextInventario } from "../../contextInventario"

export default function ModalConfirmarVenta(props){

    const {
        clientesNombres,
        estadosVentasEntrega,
        metodosPago
    } =useContext(ContextInventario)


    // informacion factura
    const [nombreCliente, setNombreCliente] = useState("")
    const [idCliente, setIdCliente] = useState("")
    const [direccion, setDireccion] = useState("Recogido en bodega")


    // Informacion pago
    const [metodoPago, setMetodoPago] = useState(0)
    const [descripcion, setDescripcion] = useState(0)


    const [estadoEntrega, setEstadoEntrega] = useState(0)


    const [pagado , setPagado] = useState("")
    


    function finalizarVenta(){
        if (props.carritoDeVentas.length === 0) return toast.info("Agrega productos al carrito.")
        if( Number(pagado) > Number(props.total)) return toast.error("El monto pagado es mayor al total.")
        if (Number(pagado) < Number(props.total) && !Number(idCliente)) return toast.error("Un cliente no registrado no puede tener deuda.")
        if (!Number(estadoEntrega))return toast.warning('Elije el estado de la entrega.')

        else {
            const info = {
                cliente_id: idCliente,
                id_stado_entrega: estadoEntrega,
                id_metodo_pago: metodoPago,
                pagado: pagado || 0,
                nombre_cliente: nombreCliente,
                total: props.total,
                direccion
            }
            if (descripcion) info.descripcion = descripcion

            const detalles = props.carritoDeVentas.map(item => {
                return {
                    producto_id: item.id,
                    cantidad: item.cantidad,
                    precio: item.precio,
                    subtotal: item.subtotal
                }
            })

            const compraEnviar = {info: info, datos: detalles}

            function cbCompra(res) {
                
           
                props.setShowModal(false)
                props.reset()
            }
            fetchManager(`http://localhost:3000/api/v1/venta`, cbCompra, "POST", compraEnviar)

        }

    }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[950px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-4">
                    <h2 className="titulo mb-2">Confirmar factura venta</h2>
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
                            <Select opciones={estadosVentasEntrega} valor = {estadoEntrega} setValor={setEstadoEntrega} label={"Estado entrega"} valorDefault={0}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 flex-1">
                        <p className="subtitulo">Informacion pago</p>
                        <div className="flex gap-3">


                            <InputNumber estilo="w-2/5" label={"Valor pagado"} valor={pagado} setValor={setPagado} format={true}/>
                            <Select opciones={metodosPago} label="Metodo pago" valorDefault={0} valor={metodoPago} setValor={setMetodoPago}/>
                            <div className={`${(metodoPago == 0 || metodoPago == 1) ? "pointer-events-none opacity-30" : ""} w-full`}>
                                <InputText estilo="w-full" label="Escribre la Refencia, Nro del comprobante o una descripcion" valor={descripcion} setValor={setDescripcion}/>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-between">
                            <div>
                                <Boton onClick={()=> setPagado(props.total)} texto = "Pago completo" isNormal={true} />
                            </div>
                            <div className="flex gap-3">
                                
                                <Boton onClick={()=> props.setShowModal(false)} texto = "Cancelar" isNormal={true}/>
                                <Boton onClick={finalizarVenta} texto = "Confirmar" />
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
            
        
        </div>
    )
}
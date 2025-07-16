import Boton from "../Boton"
import InputNumber from "../InputNumber"
import { useState, useContext } from "react"
import InputLista from "../InputLista"
import InputText from "../InputText"
import Select from "../Select"
import { toast } from "sonner"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import Decimal from 'decimal.js'

import { ContextInventario } from "../../contextInventario"

export default function ModalConfirmarVenta({total, carritoDeVentas, setShowModal, reset}){

    const {
        clientesNombres,
        estadosVentasEntrega,
        metodosPago,
        totalNumber
    } =useContext(ContextInventario)


    // informacion factura
    const [nombreCliente, setNombreCliente] = useState("")
    const [idCliente, setIdCliente] = useState("")
    const [direccion, setDireccion] = useState("Recogido en bodega")


    // Informacion pago
    const [metodoPago, setMetodoPago] = useState(0)
    const [descripcion, setDescripcion] = useState(0)


    const [estadoEntrega, setEstadoEntrega] = useState(0)
    const [pagado , setPagado] = useState("0")
    


    function finalizarVenta(){
        const pagadoDecimal = new Decimal(pagado)
        const totalDecimal = new Decimal(total)
        if (carritoDeVentas.length === 0) return toast.info("Agrega productos al carrito.")
        if (pagadoDecimal.gt(totalDecimal)) return toast.error("El monto pagado es mayor al total.")
        if (pagadoDecimal.lt(totalDecimal) && !Number(idCliente)) return toast.error("Un cliente no registrado no puede tener deuda.")
        if (!Number(estadoEntrega))return toast.warning('Elije el estado de la entrega.')
        if (!nombreCliente) return toast.warning('Debes agregar el nombre del cliente')
        if (!Number(metodoPago)) return toast.warning('Debes agregar el metodo de pago')

        else {
            const info = {
                cliente_id: idCliente,
                id_estado_entrega: Number(estadoEntrega),
                id_metodo_pago: Number(metodoPago),
                pagado: pagadoDecimal.toString(),
                nombre_cliente: nombreCliente,
                total: totalDecimal.toString(),
                direccion
            }
            if (descripcion) info.descripcion = descripcion

            const detalles = carritoDeVentas.map(item => {
                return {
                    producto_id: item.id,
                    cantidad: item.cantidad,
                    precio: item.precio
                }
            })

            const compraEnviar = {info: info,  detalles}

            function cbCompra(res) {
                
           
                setShowModal(false)
                reset()
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
                            <InputNumber style="w-40 pointer-events-none" label1={"Total"} value={total} instanceNumber={totalNumber}/>
                            <InputLista
                                value={nombreCliente}
                                setValue={setNombreCliente}
                                label="Cliente"
                                listItems={clientesNombres}
                                setIdSelected = {setIdCliente}
                                />
                            <Select listItems={estadosVentasEntrega} setValue={setEstadoEntrega} label={"Estado entrega"} defaultValue={0}/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 flex-1">
                        <p className="subtitulo">Informacion pago</p>
                        <div className="flex gap-3">


                            <InputNumber style="w-2/5" label1={"Valor pagado"} value={pagado} setValue={setPagado} instanceNumber={totalNumber}/>
                            <Select listItems={metodosPago} label="Metodo pago" defaultValue={0} value={metodoPago} setValue={setMetodoPago}/>
                            <div className={`${(metodoPago == 0 || metodoPago == 1) ? "pointer-events-none opacity-30" : ""} w-full`}>
                                <InputText style="w-full" label1="Escribre la Refencia, Nro del comprobante o una descripcion" value={descripcion} setValue={setDescripcion}/>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-between">
                            <div>
                                <Boton onClick={()=> setPagado(total)} text = "Pago completo" isNormal={true} />
                            </div>
                            <div className="flex gap-3">
                                
                                <Boton onClick={()=> setShowModal(false)} text = "Cancelar" isNormal={true}/>
                                <Boton onClick={finalizarVenta} text = "Confirmar" />
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
            
        
        </div>
    )
}
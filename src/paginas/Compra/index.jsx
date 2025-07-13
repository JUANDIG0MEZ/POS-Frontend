
import { useEffect } from "react"
import Tabla from "../../componentes/Tabla"
import InputText from "../../componentes/InputText"
import InputNumber from "../../componentes/InputNumber"
import Boton from "../../componentes/Boton"
import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import ModalPagarCompra from "../../componentes/Modales/ModalPagarCompra"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import Opciones from "../../componentes/Opciones"
import { ContextInventario } from "../../contextInventario"

const renombrar = {
    id: "Id",
    descripcion: "Descripcion",
    medida: "Medida",
    cantidad: "Cantidad",
    precio: "Precio",
    subtotal: "Subtotal"
}

export default function Compra(){

    const {
        estadosComprasEntrega
    } = useContext(ContextInventario)


    const [pagado, setPagado] = useState(null)
    const [total, setTotal] = useState(null)
    const {id} = useParams()

    const [showModalAbonar, setShowModalAbonar] = useState(false)

    const [factura, setFactura] = useState([])
    const [fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [idEstadoEntrega, setIdEstadoEntrega] = useState("")

    useEffect(()=>{
        function cbFactura(resData){
            setFactura(resData.datos)
            setFecha(resData.info.fecha)
            setNombre(resData.info.nombre_cliente)
            setTelefono(resData.info.telefono)
            setEmail(resData.info.email)
            setIdEstadoEntrega(resData.info.id_estado_entrega)
            setPagado(resData.info.pagado)
            setTotal(resData.info.total)
        }
        fetchManager(`http://localhost:3000/api/v1/compra/${id}`, cbFactura, "GET")
    }, [id])


    async function actualizarEstadoEntrega(nuevoEstado) {
        const cb = (res) => {

        }
        fetchManager(`http://localhost:3000/api/v1/compra/${id}/estado-entrega`, cb, "PATCH", { id_estado_entrega: nuevoEstado })
        setIdEstadoEntrega(nuevoEstado)
    }

    async function anularFactura(nuevoEstado) {
        function cb () {

        }
    }


    return (
        <div className="w-[1400px] flex flex-col mx-auto gap-3">
            <div className="flex justify-between my-2">
                <h1 className="titulo flex items-center">Factura de compra:  <p className="subtitulo etiqueta border p-1 rounded-md ml-6">{}{id}</p></h1>
                <h1 className="text-xl font-bold flex items-center"> Fecha: {fecha}</h1>
            </div>

            <div className="flex flex-col gap-8 w-full">
                <div className="w-full flex gap-3">
                    <InputText label="Nombre cliente" valor={nombre}/>
                    <InputNumber estilo={"w-48"} label="Telefono" valor={telefono}/>
                    <InputText estilo={"w-96"} label="Email" valor={email}/>
                </div>
                <div className="w-full flex gap-6 justify-between items-center">                 
                    <div className="flex gap-3 items-center">
                        <InputNumber estyle={"w-44"} label1="Total" value={total}/>
                        <button className='font-bold'>-</button>
                        <InputNumber estyle={"w-44"} label1="Pagado" value={pagado}/>
                        <button className='font-bold'>=</button>
                        <InputNumber estyle={"w-44"} label1="Por pagar" value={total - pagado}/>
                        <Boton texto="Abonar" isNormal={true} onClick={() => setShowModalAbonar(true)}></Boton>
                    </div>   
                    <div className="flex gap-4 items-center">
                        <Opciones name={'estado_entrega'} opciones={estadosComprasEntrega} setSeleccionado = {actualizarEstadoEntrega} seleccionado = {idEstadoEntrega}  /> 
                    </div>
                    
                    
                </div>
            </div>         
                
                
            <h1 className="subtitulo mb-3">Productos y servicios adquiridos</h1>
            {
                factura.length ? <Tabla datos={factura} total = {total}/> : null

    
            }
            
            <div className="flex gap-3">
                    <Boton texto={"Anular factura"} onClick={anularFactura} isNormal={true}/>
                </div>
        
            <div>
                {/* {showModalConfirmar &&  <ModalConfirmar titulo="Estado del pedido" mensaje="¿Estás seguro de que deseas establecer como entregado este pedido? No podras revertir esta accion." setConfirmacion={setConfirmacionEntrega}/>} */}
                {showModalAbonar && <ModalPagarCompra setShowModal={setShowModalAbonar} numeroFactura={id} pagado = {pagado} setPagado = {setPagado} total = {total}/>}

            </div>
        </div>
    )
}
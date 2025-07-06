
import { useEffect } from "react"
import DiffTabla from "../../componentes/DiffTabla"
import InputText from "../../componentes/InputText"
import InputNumber from "../../componentes/InputNumber"
import Boton from "../../componentes/Boton"
import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import ModalPagarCompra from "../../componentes/Modales/ModalPagarCompra"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import ModalModificarProductoFactura from "../../componentes/Modales/ModalModificarProductoFactura"
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
    const [showModalModificar, setShowModalModificar] = useState(false)


    const [idItemSeleccionado, setIdItemSeleccionado] = useState(null)

    const [facturaOriginal, setFacturaOriginal] = useState([])
    const [facturaModificada, setFacturaModificada] = useState([])

    const [fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [estadoEntrega, setEstadoEntrega] = useState("")

    
    
    const [totalOriginal, setTotalOriginal] = useState(null)
    const [totalModificado, setTotalModificado] = useState(null)

    useEffect(()=>{
        setFacturaModificada(facturaOriginal)
    }, [facturaOriginal])
    useEffect(()=> { 
        if (facturaModificada.length) setTotalModificado(facturaModificada.reduce((acc, item)=> acc + Number(item.subtotal), 0) )
    }, [facturaModificada])
    useEffect(()=>{
        if (idItemSeleccionado) setShowModalModificar(true)    
    }, [idItemSeleccionado])

    function cancelarCambios(){
        setFacturaModificada(facturaOriginal)
    }

    useEffect(()=>{
        function cbFactura(resData){
            setFacturaOriginal(resData.datos)
            setFecha(resData.info.fecha)
            setNombre(resData.info.nombre_cliente)
            setTelefono(resData.info.telefono)
            setEmail(resData.info.email)
            setEstadoEntrega(resData.info.id_estado_entrega)
            setPagado(resData.info.pagado)
            setTotal(resData.info.total)
            setTotalOriginal(resData.datos.reduce((acc, item) => acc + parseInt(item.subtotal), 0))
        }
        fetchManager(`http://localhost:3000/api/v1/compra/${id}`, cbFactura, "GET")
    }, [])

    function guardarCambios(){
        const detalles = facturaModificada.map(item => {
            return {
                producto_id: item.id,
                cantidad: Number(item.cantidad),
                precio: item.precio ,
                subtotal: item.subtotal
            }})  

    
        function cb(res){
            setFacturaOriginal(facturaModificada)
            setTotalOriginal(res.info.total)
            setTotal(res.info.total)
            setPagado(res.info.pagado)
        }
        fetchManager(`http://localhost:3000/api/v1/compra/${id}/detalle`, cb, "PATCH", {detalles})
    }

    function devolverTodo() {
        const devolucion = facturaOriginal.map(producto => ({...producto, cantidad: 0}));
        setFacturaModificada(devolucion)
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
                        <InputNumber estilo={"w-44"} label="Total" valor={total} isPrice={true} format={true}/>
                        <button className='font-bold'>-</button>
                        <InputNumber estilo={"w-44"} label="Pagado" valor={pagado} isPrice={true} format={true}/>
                        <button className='font-bold'>=</button>
                        <InputNumber estilo={"w-44"} label="Por pagar" valor={total - pagado} isPrice={true} format={true}/>
                        <Boton texto="Abonar" isNormal={true} onClick={() => setShowModalAbonar(true)}></Boton>
                    </div>   
                    <div className="flex gap-4 items-center">
                        <Opciones opciones={estadosComprasEntrega} setSeleccionado = {setEstadoEntrega} seleccionado = {estadoEntrega}  /> 
                    </div>
                    
                    
                </div>
            </div>         
                
                
            <h1 className="subtitulo mb-3">Productos y servicios adquiridos</h1>
            {
                facturaModificada.length ? <DiffTabla
                tabla1 = {facturaOriginal}
                tabla2={facturaModificada}
                total={totalOriginal}
                total2={totalModificado}
                setIdItemSeleccionado={setIdItemSeleccionado}
                rename = {renombrar}
                /> : null
            }

            {
                (totalModificado < pagado) && <p className="animate-bounce w-full justify-center text-lg"><strong className="text-xl">Nota</strong>: En caso de realizar el proveedor debe pagarte <span className=" text-red-500 text-xl"> <strong> ${pagado - totalModificado}</strong> </span></p>
            }
            
            <div className="flex gap-3">
                    <Boton texto={"Devolver productos"} onClick={devolverTodo} isNormal={true}/>
                    <Boton texto={"Cancelar cambios"} onClick={cancelarCambios} isNormal={true}/>
                    <Boton texto={"GuardarCambios"} onClick={()=>guardarCambios()} isNormal={true}/>
                </div>
        
            <div>
                {/* {showModalConfirmar &&  <ModalConfirmar titulo="Estado del pedido" mensaje="¿Estás seguro de que deseas establecer como entregado este pedido? No podras revertir esta accion." setConfirmacion={setConfirmacionEntrega}/>} */}
                {showModalAbonar && <ModalPagarCompra setShowModal={setShowModalAbonar} numeroFactura={id} pagado = {pagado} setPagado = {setPagado} total = {total}/>}
                {showModalModificar ? 
                        <ModalModificarProductoFactura
                            setShowModal={setShowModalModificar}
                            idProductoSeleccionado={idItemSeleccionado}
                            setIdProductoSeleccionado={setIdItemSeleccionado}
                            datos={facturaModificada}
                            setDatos={setFacturaModificada} />
                        :null
                        }

            </div>
        </div>
    )
}

import { useEffect } from "react"
import DiffTabla from "../../componentes/DiffTabla"
import InputText from "../../componentes/InputText"
import InputNumber from "../../componentes/InputNumber"
import Boton from "../../componentes/Boton"
import RadioBoton from "../../componentes/RadioBoton"
import { useState } from "react"
import { useParams } from "react-router-dom"
import ModalModificarProductoFactura from "../../componentes/Modales/ModalModificarProductoFactura"
import ModalConfirmar from "../../componentes/Modales/ModalConfirmar"
import ModalPagarCompra from "../../componentes/Modales/ModalPagarCompra"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
export default function Compra(){

    const {id} = useParams()

    const [showModal, setShowModal] = useState(false)
    const [showModalConfirmar, setShowModalConfirmar] = useState(false)
    const [showModalAbonar, setShowModalAbonar] = useState(false)
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null)

    const [facturaOriginal, setFacturaOriginal] = useState([])
    const [facturaModificada, setFacturaModificada] = useState([])

    const [fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [estado, setEstado] = useState("")

    const [total, setTotal] = useState(null)
    const [totalModificado, setTotalModificado] = useState(null)
    const [totalTabla, setTotalTabla] = useState(null)
    const [pagado, setPagado] = useState(null)

    

    useEffect(()=>{

        if (idProductoSeleccionado){
            setShowModal(true)      
        }

    }, [idProductoSeleccionado])

    function cancelarCambios(){
        setFacturaModificada(facturaOriginal)
    }

    useEffect(()=>{
        function cbFactura(resData){
            setFacturaOriginal(resData.datos)
            setFacturaModificada(resData.datos)
            setFecha(resData.info.fecha)
            setNombre(resData.info.cliente)
            setTelefono(resData.info.telefono)
            setEmail(resData.info.email)
            setEstado(resData.info.estado)
            setPagado(resData.info.pagado)
            setTotal(resData.info.total)
            setTotalTabla(resData.datos.reduce((acc, item) => acc + parseInt(item.subtotal), 0))
        }
        fetchManager(`http://localhost:3000/api/v1/facturas/compras/${id}`, cbFactura, "GET")
    }, [])

    useEffect(()=> {
        setTotalModificado(facturaModificada.reduce((acc, item) => acc + parseInt(item.subtotal), 0))
    }, [facturaModificada])

    function guardarCambios(){
        const detalles = facturaModificada.map(item => {
            return {
                producto_id: item.id,
                cantidad: item.cantidad,
                precio: item.precio ,
                subtotal: item.subtotal
            }
        })  

        function cb(resData){
            setFacturaOriginal(facturaModificada)
            setTotalTabla(resData.total)
            setTotal(resData.total)
            setPagado(resData.pagado)
        }
        
        fetchManager(`http://localhost:3000/api/v1/facturas/compras/${id}`, cb, "PATCH", detalles)
    }

    function cambiarEstado(nuevoValor){
        if (nuevoValor === "Entregado"){
            setEstado(nuevoValor)
        }
        
    }
    return (
        <div className="w-[1400px] flex flex-col mx-auto gap-3">
            <div className="flex justify-between my-2">
                <h1 className="text-3xl font-bold flex items-center">Factura de compra ID:<p className="text-red-500 border p-1 rounded-md">{id}</p></h1>
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
                        <InputNumber estilo={"w-48"} label="Total" valor={total} isPrice={true} format={true}/>
                        <button className='font-bold'>-</button>
                        <InputNumber estilo={"w-48"} label="Pagado" valor={pagado} isPrice={true} format={true}/>
                        <button className='font-bold'>=</button>
                        <InputNumber estilo={"w-48"} label="Por pagar" valor={total - pagado} isPrice={true} format={true}/>
                        <Boton texto="Abonar" onClick={() => setShowModalAbonar(true)}></Boton>
                    </div>   
                    <div className="flex gap-4 items-center">
                        <RadioBoton onChange={cambiarEstado} name="estado" valor="Por entregar" label="Por entregar" checked={estado === "Por entregar"}/>
                        <RadioBoton onChange={cambiarEstado} name="estado" valor="Entregado" label="Entregado" checked={estado === "Entregado"}/>
                    </div>
                    
                    
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-3">Producto comprados</h1>
                <DiffTabla tabla1={facturaOriginal} tabla2={facturaModificada} total={totalTabla} total2= {totalModificado} setIdItemSeleccionado={setIdProductoSeleccionado}/>
            </div>
            
            <div className="flex justify-between items-center">
                <Boton texto="Devolver todo" isNormal={true}/>
                {
                    (totalModificado < pagado) && <p className="text-lg font-semibold animate-bounce">Nota: En caso de realizar la modficacion debes pagarle al cliente <span className="font-semibold text-red-500">{pagado - totalModificado}</span></p>
                }
                <div className="flex gap-3">
                    <Boton texto="Cancelar cambios" isNormal={true} onClick={cancelarCambios}/>
                    <Boton texto="Guardar Cambios" onClick = {() => guardarCambios()}/>
                </div>
                
            </div>
            <div>
                {showModal && <ModalModificarProductoFactura setShowModal={setShowModal} idProductoSeleccionado={idProductoSeleccionado} datos={facturaModificada} setDatos={setFacturaModificada}/>}
                {showModalConfirmar &&  <ModalConfirmar titulo="Estado del pedido" mensaje="¿Estás seguro de que deseas establecer como entregado este pedido? No podras revertir esta accion." setConfirmacion={setConfirmacionEntrega}/>}
                {showModalAbonar && <ModalPagarCompra setShowModal={setShowModalAbonar} numeroFactura={id} pagado = {pagado} setPagado = {setPagado} total = {total}/>}
            </div>
        </div>
    )
}
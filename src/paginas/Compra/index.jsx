
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
import CrudDatosFacturasCompra from "../../servicios/crudDatosFacturasCompra"
import {toast} from 'sonner'

export default function Compra(){

    const {id} = useParams()

    const [showModal, setShowModal] = useState(false)
    const [showModalConfirmar, setShowModalConfirmar] = useState(false)
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(undefined)
    const [productoSeleccionado, setProductoSeleccionado] = useState(undefined)

    const [facturaOriginal, setFacturaOriginal] = useState([])
    const [facturaModificada, setFacturaModificada] = useState([])

    const mensajesPrueba = [
        {titulo: "Error", mensaje: "No se pudo guardar los cambios, este mensaje es un poco mas largo", tipo: "error"},
        {titulo: "Exito", mensaje: "Cambios guardados correctamente", tipo: "success"},
        {titulo: "Advertencia", mensaje: "No se puede modificar el producto", tipo: "warning"},
        {titulo: "Informacion", mensaje: "El producto se ha eliminado", tipo: "info"}
    ]

    const [fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [estado, setEstado] = useState("")
    const [total, setTotal] = useState("")
    const [totalTabla, setTotalTabla] = useState("")
    const [pagado, setPagado] = useState("")

    

    useEffect(()=>{

        if (idProductoSeleccionado){
            setShowModal(true)      
        }

    }, [idProductoSeleccionado])

    function cancelarCambios(){
        setFacturaModificada(facturaOriginal)
    }

    useEffect(()=>{

        toast.promise(
            CrudDatosFacturasCompra.factura(id),
            {
                loading: "Cargando datos de la factura",
                success: (data) => {
                    setFacturaOriginal(data.datos)
                    setFacturaModificada(data.datos)
                    setFecha(data.info.fecha)
                    setNombre(data.info.cliente)
                    setTelefono(data.info.telefono)
                    setEmail(data.info.email)
                    setEstado(data.info.estado)
                    setPagado(data.info.pagado)
                    setTotal(data.info.total)
                    setTotalTabla(data.datos.reduce((acc, item) => acc + parseInt(item.subtotal), 0))
                    return "Datos cargados correctamente"
                },
                error: "Error al cargar los datos de la factura"
            }
        )
    }, [])

    function guardarCambios(){

        const datosFormateados = facturaModificada.map(item => {
            return {
                producto_id: item.id,
                cantidad: item.cantidad,
                precio: item.precio,
                subtotal: item.subtotal
            }
        })

        toast.promise(
            fetch(`http://localhost:3000/api/v1/facturas/compras/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosFormateados)
            })
            .then(async (response) => {
                if (!response.ok){
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }

                const data = await response.json()
                
                if (data.status === "success"){
                    return data;
                }
                else {
                    throw new Error(data.message)
                }
            })
            ,
            {
                loading: "Guardando cambios.",
                success: (data) => {
                    setFacturaOriginal(facturaModificada)
                    return data.message
                },
                error: (error) => error
            }

        )
    }

    function cambiarEstado(nuevoValor){
        if (nuevoValor === "Entregado"){
            setEstado(nuevoValor)
        }
        
    }
    return (
        <div className="w-[1400px] flex flex-col mx-auto gap-3">
            
            
            <div className="flex justify-between my-2">
                <h1 className="text-2xl font-bold flex items-center">FACTURA DE COMPRA ID:<p className="text-red-500 border p-1 rounded-md">{id}</p></h1>
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
                        <InputNumber estilo={"w-48"} label="Pagado" valor={pagado} isPrice={true} format={true}/>
                        <InputNumber estilo={"w-48"} label="Total" valor={total} isPrice={true} format={true}/>
                        <Boton texto="Abonar"></Boton>
                    </div>   
                    <div className="flex gap-4 items-center">
                        <RadioBoton onChange={cambiarEstado} name="estado" valor="Por entregar" label="Por entregar" checked={estado === "Por entregar"}/>
                        <RadioBoton onChange={cambiarEstado} name="estado" valor="Entregado" label="Entregado" checked={estado === "Entregado"}/>
                    </div>
                    
                    
                </div>
            </div>
            <div>
                <h1 className="text-xl font-bold mb-3">FACTURA DE COMPRA</h1>
                <DiffTabla tabla1={facturaOriginal} tabla2={facturaModificada} total={totalTabla} setIdItemSeleccionado={setIdProductoSeleccionado}/>
            </div>
            
            <div className="flex justify-between">
                <Boton texto="Devolver todo" isNormal={true}/>
                
                <div className="flex gap-3">
                    <Boton texto="Cancelar cambios" isNormal={true} onClick={cancelarCambios}/>
                    <Boton texto="Guardar Cambios" onClick = {guardarCambios}/>
                </div>
                
            </div>
            <div>
                {showModal && <ModalModificarProductoFactura setShowModal={setShowModal} idProductoSeleccionado={idProductoSeleccionado} datos={facturaModificada} setDatos={setFacturaModificada}/>}
                {showModalConfirmar &&  <ModalConfirmar titulo="Estado del pedido" mensaje="¿Estás seguro de que deseas establecer como entregado este pedido? No podras revertir esta accion." setShowModal={setShowModal}/>}
            </div>
        </div>
    )
}
import { useEffect } from "react"
import Tabla  from "../../componentes/Tabla"
import InputLista from "../../componentes/InputLista"
import InputText from "../../componentes/InputText"
import Boton from "../../componentes/Boton"
import RadioBoton from "../../componentes/RadioBoton"
import { ObtenerDatos } from "../../servicios/datos"
import { useState } from "react"
import ModalModificarProductoFactura from "../../componentes/Modales/ModalModificarProductoFactura"
import CrudDatosProductos from "../../servicios/crudDatosProductos"

export default function Compra(){


    const [showModal, setShowModal] = useState(false)


    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(undefined)
    const [productoSeleccionado, setProductoSeleccionado] = useState(undefined)

    const [facturaModificada, setFacturaModificada] = useState([])
    const [fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [estado, setEstado] = useState("")
    const [total, setTotal] = useState("")
    const [porPagar, setPorPagar] = useState("")
    const [facturaOriginal, setFacturaOriginal] = useState([])

    useEffect(()=>{
        console.log(idProductoSeleccionado)
        if (idProductoSeleccionado){
            setShowModal(true)      
            const producto = CrudDatosProductos.encontrarPorId(idProductoSeleccionado, facturaModificada)
            setProductoSeleccionado(producto)
        }

    }, [idProductoSeleccionado])

    function cancelarCambios(){
        console.log("cambios cancelados")
        setFacturaModificada(facturaOriginal)
    }

    useEffect(()=>{
        const factura = ObtenerDatos.ejemploFacturaCompra().data
        setFacturaOriginal(factura)
        setFacturaModificada(factura)
        //setFactura(ObtenerDatos.ejemploFacturaCompra().data)
        setFecha(ObtenerDatos.ejemploFacturaCompra().info[0].fecha)
        setNombre(ObtenerDatos.ejemploFacturaCompra().info[0].nombre)
        setDireccion(ObtenerDatos.ejemploFacturaCompra().info[0].direccion)
        setTelefono(ObtenerDatos.ejemploFacturaCompra().info[0].telefono)
        setEmail(ObtenerDatos.ejemploFacturaCompra().info[0].email)
        setEstado(ObtenerDatos.ejemploFacturaCompra().info[0].estado)
        setTotal(ObtenerDatos.ejemploFacturaCompra().info[0].total)
        setPorPagar(ObtenerDatos.ejemploFacturaCompra().info[0].porPagar)


    }, [])


    function cambiarEstado(nuevoValor){
        setEstado(nuevoValor)
    }
    return (
        <div className="w-[1400px] flex flex-col mx-auto gap-3">
            
            
            <div className="flex justify-between my-2">
                <h1 className="text-2xl font-bold flex items-center">FACTURA DE COMPRA ID:<p className="text-red-500 border p-1">{"450"}</p></h1>
                <h1 className="text-xl font-bold flex items-center"> Fecha: {fecha}</h1>
            </div>

            <div className="flex flex-col gap-6 w-full">
                <div className="w-full flex gap-3">
                    <InputLista label="Nombre cliente" valor={nombre} setValor={setNombre}/>
                    <InputText estilo={"w-[500px]"} label="Direccion" valor={direccion} setValor={setDireccion}/>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex gap-3">
                        <InputText estilo={"w-48"} label="Telefono" valor={telefono} setValor={setTelefono} isNumber={true}/>
                        <InputText estilo={"w-96"} label="Email" valor={email} setValor={setEmail}/>
                    </div>
                    
                    <div className="flex gap-4">
                        <RadioBoton onChange={cambiarEstado} name="estado" valor="Por entregar" label="No entregado" checked={estado === "Por entregar"}/>
                        <RadioBoton onChange={cambiarEstado} name="estado" valor="Entregado" label="Entregado" checked={estado === "Entregado"}/>
                    </div>
                    <div className="flex gap-3">
                        <InputText estilo={"w-48"} label="Pagado" valor={porPagar} setValor={setPorPagar} isNumber={true} isPrice={true}/>
                        <InputText estilo={"w-48"} label="Total" valor={total} setValor={setTotal} isNumber={true} isPrice={true}/>
                    </div>
                    
                </div>
            </div>
            <div>
                <h1 className="text-xl font-bold">FACTURA DE COMPRA</h1>
                <Tabla datos={facturaModificada} total={total} setIdItemSeleccionado={setIdProductoSeleccionado}></Tabla>
            </div>
            
            <div className="flex justify-between">
                <Boton texto="Devolver todo" isNormal={true}/>
                
                <div className="flex gap-3">
                    <Boton texto="Cancelar cambios" isNormal={true} onClick={cancelarCambios}/>
                    <Boton texto="Guardar Cambios"/>
                </div>
                
            </div>
            
            <div>
                
            </div>
                {showModal && <ModalModificarProductoFactura setShowModal={setShowModal} productoSeleccionado={productoSeleccionado} />}
            <div>
            </div>
        </div>
    )
}
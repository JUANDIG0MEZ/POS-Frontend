import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import DiffTabla from "../../componentes/DiffTabla"
import InputText from "../../componentes/InputText"
import InputNumber from "../../componentes/InputNumber"
import Boton from "../../componentes/Boton"
import Opciones from "../../componentes/Opciones"

import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import ModalModificarProductoFactura from "../../componentes/Modales/ModalModificarProductoFactura"
import ModalPagarVenta from "../../componentes/Modales/ModalPagarVenta"
import { ContextInventario } from "../../contextInventario"



export default function Venta(){

    const {
        estadosVentasEntrega
    } = useContext(ContextInventario)

    const {id} = useParams()

    const [showModal, setShowModal] = useState(false)
    const [showModalAbonar, setShowModalAbonar] = useState(false)

    const [idItemSeleccionado, setIdItemSeleccionado] = useState(null)

    const [facturaOriginal, setFacturaOriginal] = useState([])
    const [facturaModificada, setFacturaModificada] = useState([])

    const [fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [idEstadoEntrega, setIdEstadoEntrega] = useState("")

    const [total, setTotal] = useState("")
    const [totalModificado, setTotalModificado] = useState(null)
    const [totalTabla, setTotalTabla] = useState(null)
    const [pagado, setPagado] = useState(null)


    useEffect(()=>{
        setFacturaModificada(facturaOriginal)
        setTotalTabla(facturaOriginal.reduce((acc, item)=> acc + Number(item.subtotal), 0))
    }, [facturaOriginal])

    useEffect(()=> {
        setTotalModificado(facturaModificada.reduce((acc, item) => acc + Number(item.subtotal), 0))
    }, [facturaModificada])

    useEffect(()=>{

        if (idItemSeleccionado){
            setShowModal(true)      
        }

    }, [idItemSeleccionado])

    function cancelarCambios(){
        setFacturaModificada(facturaOriginal)
    }


    useEffect(()=>{
        function cb(resData){
            setFacturaOriginal(resData.datos)
            setFacturaModificada(resData.datos)
            setFecha(resData.info.fecha)
            setNombre(resData.info.nombre_cliente)
            setTelefono(resData.info.telefono)
            setEmail(resData.info.email)
            setDireccion(resData.info.direccion)
            setIdEstadoEntrega(resData.info.id_estado_entrega)
            setPagado(resData.info.pagado)
            setTotal(resData.info.total)
            setTotalTabla(resData.datos.reduce((acc, item) => acc + parseInt(item.subtotal), 0))
        }
        fetchManager(`http://localhost:3000/api/v1/venta/${id}`, cb, "GET")
    }, [id])


    function guardarCambios(){
        const detalles = facturaModificada.map(item => {
            return {
                producto_id: item.id,
                cantidad: Number(item.cantidad),
                precio: item.precio ,
                subtotal: item.subtotal
            }
        })
        
        function cb(res){
            setFacturaOriginal(facturaModificada)
            setTotal(res.info.total)
            setPagado(res.info.pagado)
        }
        fetchManager(`http://localhost:3000/api/v1/venta/${id}/detalle`,cb, "PATCH", {detalles})    
    }


    async function actualizarEstadoEntrega(nuevoEstado) {
        const cb = (res) => {
        }

        fetchManager(`http://localhost:3000/api/v1/venta/${id}/estado-entrega`, cb, "PATCH", { id_estado_entrega: nuevoEstado })
        setIdEstadoEntrega(nuevoEstado)

    }


    return (
        <div className="w-[1400px] flex flex-col mx-auto gap-3">
            
            
            <div className="flex justify-between my-2 ">
                <h1 className="titulo items-center flex ">Factura de venta: <p className="subtitulo etiqueta border rounded-md p-1 ml-4">{id}</p></h1>
                <h1 className="text-xl font-bold flex items-center"> Fecha: {fecha}</h1>
            </div>

            <div className="flex flex-col gap-6 w-full">
                <div className="w-full flex gap-3 ">
                    <InputText estilo={"w-[500px]"} label="Nombre cliente" valor = {nombre}/>
                    <InputText estilo={"w-[500px]"} label="Direccion entrega" valor={direccion}/>
                    <InputText estilo={"w-[500px]"} label="Email" valor={email}/>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex gap-3">
                        <InputNumber estilo={"w-48"} label="Total" valor={total} isPrice={true} format={true}/>
                        <button className='font-bold'>-</button>
                        <InputNumber estilo={"w-48"} label="Pagado" valor={pagado} isPrice={true} format={true}/>
                        <button className='font-bold'>=</button>
                        <InputNumber estilo={"w-48"} label="Por pagar" valor={total - pagado} isPrice={true} format={true}/>
                        <Boton texto="Abonar" isNormal={true} onClick={() => setShowModalAbonar(true)}/>
                    </div>
                        
                    <div className="flex gap-3">  
                        <Opciones opciones= {estadosVentasEntrega} seleccionado={idEstadoEntrega} setSeleccionado ={actualizarEstadoEntrega}  />
                    </div>
                </div>
            </div>
            <div>
                <h1 className="subtitulo">Producto comprados</h1>
                <DiffTabla 
                    tabla1={facturaOriginal} 
                    tabla2={facturaModificada}
                    total={totalTabla} 
                    total2= {totalModificado} 
                    setIdItemSeleccionado={setIdItemSeleccionado}/>
            </div>

            <div>
            {
                (totalModificado < pagado) && <p className="animate-bounce w-full justify-center text-lg"><strong className="text-xl">Nota</strong>: En caso de realizar las modificaciones, se debe pagar al cliente: <span className=" text-red-500 text-xl"> <strong> ${pagado - totalModificado}</strong> </span></p>
            }
            </div>
            
            <div className="flex justify-between">
                <Boton texto="Devolver todo" isNormal={true}/>
                
                <div className="flex gap-3">
                    <Boton texto="Cancelar cambios" isNormal={true} onClick={cancelarCambios}/>
                    <Boton texto="Guardar Cambios" onClick={() => guardarCambios()}/>
                </div>
                
            </div>
            
            <div>
                
            </div>
                {showModal ?
                    <ModalModificarProductoFactura
                        setShowModal={setShowModal}
                        idProductoSeleccionado={idItemSeleccionado}
                        setIdProductoSeleccionado={setIdItemSeleccionado}
                        datos={facturaModificada}
                        setDatos={setFacturaModificada} />
                    :null
                }

                {showModalAbonar && <ModalPagarVenta  
                    setShowModal={setShowModalAbonar}
                    numeroFactura={id}
                    total={total}
                    pagado={pagado}
                    setPagado={setPagado}/>}
            <div>
            </div>
        </div>
    )
}
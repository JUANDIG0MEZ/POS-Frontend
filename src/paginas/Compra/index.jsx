
import { useEffect } from "react"
import Tabla from "../../componentes/Tabla"
import InputText from "../../componentes/InputText"
import InputNumber from "../../componentes/InputNumber"
import Boton from "../../componentes/Boton"
import { useState } from "react"
import { useParams } from "react-router-dom"
import ModalPagarCompra from "../../componentes/Modales/ModalPagarCompra"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import ModificarFactura from "../../componentes/ModificarFactura"
export default function Compra(){

    const {id} = useParams()

    const [showModalAbonar, setShowModalAbonar] = useState(false)
    const [showModalModificar, setShowModalModificar] = useState(false)


    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null)

    const [facturaOriginal, setFacturaOriginal] = useState([])

    const [fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [estado, setEstado] = useState("")

    const [total, setTotal] = useState(null)
    const [totalTabla, setTotalTabla] = useState(null)
    const [pagado, setPagado] = useState(null)

    

    useEffect(()=>{

        if (idProductoSeleccionado){
            setShowModal(true)      
        }

    }, [idProductoSeleccionado])

    // function cancelarCambios(){
    //     setFacturaModificada(facturaOriginal)
    // }

    useEffect(()=>{
        function cbFactura(resData){
            setFacturaOriginal(resData.datos)
            setFecha(resData.info.fecha)
            setNombre(resData.info.nombre_cliente)
            setTelefono(resData.info.telefono)
            setEmail(resData.info.email)
            setEstado(resData.info.estado)
            setPagado(resData.info.pagado)
            setTotal(resData.info.total)
            setTotalTabla(resData.datos.reduce((acc, item) => acc + parseInt(item.subtotal), 0))
        }
        fetchManager(`http://localhost:3000/api/v1/facturas/compras/${id}`, cbFactura, "GET")
    }, [])


    


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
                        <InputNumber estilo={"w-48"} label="Total" valor={total} isPrice={true} format={true}/>
                        <button className='font-bold'>-</button>
                        <InputNumber estilo={"w-48"} label="Pagado" valor={pagado} isPrice={true} format={true}/>
                        <button className='font-bold'>=</button>
                        <InputNumber estilo={"w-48"} label="Por pagar" valor={total - pagado} isPrice={true} format={true}/>
                        <Boton texto="Abonar" onClick={() => setShowModalAbonar(true)}></Boton>
                    </div>   
                    <div className="flex gap-4 items-center">
                        {/* <RadioBoton onChange={cambiarEstado} name="estado" valor="Por entregar" label="Por entregar" checked={estado === "Por entregar"}/> */}
                        {/* <RadioBoton onChange={cambiarEstado} name="estado" valor="Entregado" label="Entregado" checked={estado === "Entregado"}/> */}
                    </div>
                    
                    
                </div>
            </div>
            <div className="flex justify-between items-center">
                {/* {
                    (totalModificado < pagado) && <p className="text-lg font-semibold animate-bounce">Nota: En caso de realizar la modficacion debes pagarle al cliente <span className="font-semibold text-red-500">{pagado - totalModificado}</span></p>
                } */}
                <div className="flex gap-3">
                    <Boton texto={"Modificar factura"} onClick={()=>setShowModalModificar(true)} isNormal={true}/>
                    <Boton texto={"Anular factura"} isNormal={true}/>
                    <Boton texto={"Agregar costos adicionales"} isNormal={true}/>
                    {/* <Boton texto="Guardar Cambios" onClick = {() => guardarCambios()}/> */}
                </div>
                
            </div>
            <div>
                <h1 className="subtitulo mb-3">Productos y servicios adquiridos</h1>
                <Tabla datos = {facturaOriginal} total={total}/>
                
            </div>
            
            
            <div>
                <p className="subtitulo">Notas credito</p>
            </div>
            <div>
                <p className="subtitulo">Notas de debito</p>
            </div>
            <div>
                {/* {showModalConfirmar &&  <ModalConfirmar titulo="Estado del pedido" mensaje="¿Estás seguro de que deseas establecer como entregado este pedido? No podras revertir esta accion." setConfirmacion={setConfirmacionEntrega}/>} */}
                {showModalAbonar && <ModalPagarCompra setShowModal={setShowModalAbonar} numeroFactura={id} pagado = {pagado} setPagado = {setPagado} total = {total}/>}
                {showModalModificar && <ModificarFactura idFactura={id} total={total} setShowModal={setShowModalModificar} facturaOriginal={facturaOriginal}/>}
            </div>
        </div>
    )
}
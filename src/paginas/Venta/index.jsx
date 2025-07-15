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
import Tabla from "../../componentes/Tabla"
import Decimal from 'decimal.js'

const columns = [
    'id',
    'descripcion',
    'medida',
    'cantidad',
    'precio',
    'subtotal'
]

const rename = {
    id: 'Id',
    descripcion: 'Descripcion',
    medida: 'Medida',
    cantidad: 'Cantidad',
    precio: 'Precio',
    subtotal: 'Subtotal'

}

export default function Venta(){

    const {
        estadosVentasEntrega,
        totalNumber
    } = useContext(ContextInventario)

    const {id} = useParams()

    const [showModalAbonar, setShowModalAbonar] = useState(false)

    const [factura, setFactura] = useState([])

    const [fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [idEstadoEntrega, setIdEstadoEntrega] = useState("")

    const [total, setTotal] = useState("")
    const [pagado, setPagado] = useState(null)



    useEffect(()=>{
        function cb(resData){
            setFactura(resData.datos)
            setFecha(resData.info.fecha)
            setNombre(resData.info.nombre_cliente)
            setTelefono(resData.info.telefono)
            setEmail(resData.info.email)
            setDireccion(resData.info.direccion)
            setIdEstadoEntrega(resData.info.id_estado_entrega)
            setPagado(resData.info.pagado)
            setTotal(resData.info.total)
        }
        fetchManager(`http://localhost:3000/api/v1/venta/${id}`, cb, "GET")
    }, [id])



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
                    <InputText style={"w-[500px]"} label1="Nombre cliente" value = {nombre}/>
                    <InputText style={"w-[500px]"} label1="Direccion entrega" value={direccion}/>
                    <InputText style={"w-[500px]"} label1="Email" value={email}/>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex gap-3">
                        <InputNumber style={"w-48"} label="Total" value={total} isPrice={true} instanceNumber={totalNumber} />
                        <button className='font-bold'>-</button>
                        <InputNumber style={"w-48"} label="Pagado" value={pagado} isPrice={true} instanceNumber={totalNumber} />
                        <button className='font-bold'>=</button>
                        <InputNumber style={"w-48"} label="Por pagar" value={total - pagado} instanceNumber={totalNumber} />
                        <Boton text="Abonar" onClick={() => setShowModalAbonar(true)}/>
                    </div>
                        
                    <div className="flex gap-3">  
                        <Opciones listItems= {estadosVentasEntrega} idSelected={idEstadoEntrega} setIdSelected ={actualizarEstadoEntrega}  />
                    </div>
                </div>
            </div>
            <div>
                <h1 className="subtitulo">Producto comprados</h1>
                <Tabla
                    listItems = {factura} 
                   total= {total}
                   columns={columns}
                   rename={rename}
                   
                   />
                <Boton text="Anular factura" isNormal={true}/>
            </div>

            {showModalAbonar && <ModalPagarVenta  
                setShowModal={setShowModalAbonar}
                numeroFactura={id}
                total={total}
                pagado={pagado}
                setPagado={setPagado}/>}

        </div>
    )
}
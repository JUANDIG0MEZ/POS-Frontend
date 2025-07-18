import Tabla from "../../componentes/Tabla"
import {useState, useContext, useEffect} from 'react'
import { ContextInventario } from "../../contextInventario"
import Boton from "../../componentes/Boton"
import InputListaMultiple from "../../componentes/InputListaMultiple"
import InputNumber from "../../componentes/InputNumber"
import { toast } from "sonner"
import ModalConfirmarCompra from "../../componentes/Modales/ModalConfirmarCompra"
import MostrarImagen from "../../componentes/MostrarImagen"
import { FaTrash, FaBalanceScale, FaPlus } from "react-icons/fa"
import { fetchFilesManager } from "../../serviciosYFunciones/fetchFunciones"
import BotonIcono from "../../componentes/BotonIcono"

import Decimal from 'decimal.js'
import { multiplicarYRedondear, redondear } from "../../utils/decimales"

const renombrar = {
    id: "ID",
    nombre: "Nombre",
    medida: "Medida",
    cantidad: "Cantidad",
    precio: "Precio",
    subtotal: "Subtotal"
}

const columns = [
    'id',
    'nombre',
    'medida',
    'cantidad',
    'precio',
    'subtotal',
]

export default function Comprar() {

    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false)

    const {
        productos,
        cantidadNumber,
        precioNumber,
        totalNumber
    } = useContext(ContextInventario)
    const [carritoDeCompras, setCarritoDeCompras] = useState([])
    

    const [nombreProducto, setNombreProducto] = useState("")
    const [medida, setMedida] = useState("")
    const [imagenes, setImagenes] = useState([])
    const [idProductoSeleccionadoTabla, setIdProductoSeleccionadoTabla] = useState(null)

    // Casillas
    const [idProducto, setIdProducto]= useState("")
    const [cantidadProducto, setCantidadProducto] = useState("")
    const [precioProducto, setPrecioProducto] = useState("")
    const [totalProducto, setTotalProducto] = useState("")
    const [total , setTotal] = useState('')

    function limpiarCampos(){
        setNombreProducto("")
        setCantidadProducto("")
        setPrecioProducto("")
        setTotalProducto("")

        setIdProductoSeleccionadoTabla(null)
        setIdProducto(null)
    }

    useEffect(()=>{
        const producto = productos.find(producto => producto.id == idProducto)
        if (producto){
            setMedida(producto.medida)
            fetchFilesManager(`http://localhost:3000/api/v1/productos/${idProducto}/imagenes`, setImagenes)
        } 
    }, [productos, idProducto])
    useEffect(()=> {
        const totalFactura = carritoDeCompras.reduce((acc, item) => acc.plus(item.subtotal), new Decimal(0))
        setTotal(totalFactura.toString())
    }, [carritoDeCompras])
    useEffect(()=> {
        if (cantidadProducto !== "" && precioProducto !== "") {
             setTotalProducto(multiplicarYRedondear(cantidadProducto, precioProducto, totalNumber.maxDecimals).toString())
        }  
    }, [precioProducto, cantidadProducto])


    useEffect(()=>{
        if (idProductoSeleccionadoTabla){
            // se obtiene el indice del producto seleccionado
            const infoProductoTabla = carritoDeCompras.find(producto => producto.id == idProductoSeleccionadoTabla)
            
            // se pone en la informacion nuevamente en los inputs
            if (infoProductoTabla){
                setIdProducto(infoProductoTabla.id)
                setNombreProducto(infoProductoTabla.nombre)
                setCantidadProducto(infoProductoTabla.cantidad)
                setTotalProducto(infoProductoTabla.subtotal)
            }
            // se elimina el producto seleccionado del carrito
            const nuevoCarrito = carritoDeCompras.filter(producto => producto?.id != idProductoSeleccionadoTabla)
            toast.info("Producto eliminado")
            setCarritoDeCompras(nuevoCarrito)

        }
        
    }, [idProductoSeleccionadoTabla])


    function agregarProducto(){
        
        if (!idProducto ) return toast.error("El producto no fue encontrado")
        if (!cantidadProducto) return toast.error("Agrega la cantidad")
        if (!precioProducto) return toast.error("Agrega el precio del prducto")
        if (carritoDeCompras.some(producto => producto.id === idProducto)) return toast.warning("El producto ya fue agregado")

    
        const producto = productos.find(producto => producto.id == idProducto)
        
        const productoFormateado = {
            id: idProducto,
            nombre: producto.nombre,
            medida: producto.medida,
            cantidad: redondear(cantidadProducto).toString(),
            precio: redondear(precioProducto).toString(),
            subtotal: totalProducto,
            
        }
        setIdProductoSeleccionadoTabla(null)
        setIdProducto(null)
        limpiarCampos()
        setCarritoDeCompras([...carritoDeCompras, productoFormateado])
    }


    



    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <div className="flex gap-3 justify-between">
                <div>
                    <MostrarImagen imagenes={imagenes}/>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <h1 className="titulo mb-8">Crear compra</h1>
                    <div className="flex flex-col gap-8">

                        
                        <div className="flex gap-3">
                            <InputListaMultiple
                                value={nombreProducto}
                                setValue={setNombreProducto}
                                label="Producto"
                                listItems={productos}
                                setIdSelected = {setIdProducto}/>

                            <div className="flex py-2 px-3 borde-1 rounded-lg w-44 text-center items-center justify-end gap-4">
                                
                                <p className="font-bold" >{medida || " Medida"}</p> 
                                <FaBalanceScale className="text-gray-700 text-xl"/>
                            </div>
                        </div>
                        
                        <div className="flex w-full items-center justify-between gap-3">
                            <div className="flex gap-3">
                                <InputNumber
                                style = {"w-28"}
                                value={cantidadProducto}
                                setValue={setCantidadProducto}
                                label1="Cantidad"
                                instanceNumber={cantidadNumber}
                                />
                            <InputNumber
                                style = {"w-40"}
                                value={precioProducto}
                                setValue={setPrecioProducto}
                                label1="Precio"
                                instanceNumber={precioNumber}
                                />
                            
                            
                            <InputNumber
                                style = {"w-40"}
                                label1="Total"
                                value={totalProducto}
                                instanceNumber={totalNumber}
                                />
                            
                            <BotonIcono
                                onClick={limpiarCampos}
                                icon={<FaTrash />}
                                isNormal={true}/>
                            </div>
                            
                        
                            
                            <BotonIcono
                                onClick={agregarProducto}
                                icon={<FaPlus/>}/>
                        </div>

                    </div>
                
                </div>
            </div>

            <h2 className="text-2xl font-semibold">Productos comprados</h2>
            
            <div>
                <Tabla 
                listItems = {carritoDeCompras}
                rename= {renombrar}
                setIdSelected = {setIdProductoSeleccionadoTabla}
                total = {total}
                columns= {columns}
                />
            </div>
            <div className="flex w-full justify-end">
                <Boton text="Finalizar Compra" onClick={()=>setShowModalConfirmacion(true)}/>       
            </div>
            {
                showModalConfirmacion &&
                <ModalConfirmarCompra
                    setShowModal={setShowModalConfirmacion}
                    total = {total}
                    carritoDeCompras={carritoDeCompras}
                    reset={() => {
                        limpiarCampos()
                        setCarritoDeCompras([])
                    }}

                />
            }
        </div>
        
        
    )
}


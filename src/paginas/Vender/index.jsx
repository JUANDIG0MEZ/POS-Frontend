import Tabla from "../../componentes/Tabla"
import {useState, useContext, useEffect} from 'react'
import { ContextInventario } from "../../contextInventario"
import Boton from "../../componentes/Boton"
import BotonIcono from "../../componentes/BotonIcono"
import InputListaMultiple from "../../componentes/InputListaMultiple"
import InputNumber from "../../componentes/InputNumber"
import { toast } from "sonner"
import ModalConfirmarFactura from "../../componentes/Modales/ModalConfirmarVenta"
import MostrarImagen from "../../componentes/MostrarImagen"
import { fetchFilesManager } from "../../serviciosYFunciones/fetchFunciones"

import { FaPlus, FaTrash, FaBalanceScale } from "react-icons/fa"

const renombrar = {
    id: "ID",
    nombre: "Nombre",
    medida: "Medida",
    cantidad: "Cantidad",
    precio: "Precio",
    subtotal: "Subtotal"
}

const columns = ['id','nombre','medida', 'cantidad', 'precio', 'subtotal']


export default function Vender() {

    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false)

    const {
        productos,
        cantidadNumber,
        precioNumber,
        totalNumber
    } = useContext(ContextInventario)
    const [carritoDeVentas, setCarritoDeVentas] = useState([])
    
    const [nombreProducto, setNombreProducto] = useState("")
    const [cantidadProducto, setCantidadProducto] = useState("")
    const [precioProducto, setPrecioProducto] = useState("")
    const [totalProducto, setTotalProducto] = useState("")
    const [idProducto, setIdProducto]= useState("")
    
    const [total , setTotal] = useState(0)
    const [medida, setMedida] = useState("")
    const [imagenes, setImagenes] = useState([])

    const [idProductoSeleccionadoTabla, setIdProductoSeleccionadoTabla] = useState(null)



    function limpiarCampos(){
        setNombreProducto("")
        setCantidadProducto("")
        setPrecioProducto("")
        setMedida("")
    
        setIdProducto(null)
        setIdProductoSeleccionadoTabla(null)
    }

    useEffect(()=>{
        const producto = productos.find(producto => producto.id == idProducto)
        if (producto){
            setMedida(producto.medida)
            fetchFilesManager(`http://localhost:3000/api/v1/productos/${idProducto}/imagenes`, setImagenes)
        }
    }, [productos, idProducto])

    useEffect(()=> {
        setTotal(carritoDeVentas.reduce((acc, item) => acc + item.subtotal, 0))
    }, [carritoDeVentas])

    useEffect(()=> {
        setTotalProducto(cantidadProducto * precioProducto)
    }, [precioProducto, cantidadProducto])


    useEffect(()=>{
        if (idProductoSeleccionadoTabla){
            // se obtiene el indice del producto seleccionado
            const infoProductoTabla = carritoDeVentas.find(producto => producto.id == idProductoSeleccionadoTabla)
            
            // se pone en la informacion nuevamente en los inputs
            if (infoProductoTabla){
                setIdProducto(infoProductoTabla.id)
                setNombreProducto(infoProductoTabla.nombre)
                setCantidadProducto(infoProductoTabla.cantidad)
                setTotalProducto(infoProductoTabla.subtotal)
            }
            // se elimina el producto seleccionado del carrito
            const nuevoCarrito = carritoDeVentas.filter(producto => producto?.id != idProductoSeleccionadoTabla)
            toast.info("Producto eliminado")
            setCarritoDeVentas(nuevoCarrito)

        }
        
    }, [idProductoSeleccionadoTabla])


    function agregarProducto(){
        if (!idProducto ) return toast.error("El producto no fue encontrado")
        if (cantidadProducto === "") return toast.error("Agrega cantidad")
        if (precioProducto === "" && totalProducto === "") return toast.error("Agrega el precio o el total")
        if (carritoDeVentas.some(producto => producto.id === idProducto))return toast.warning("El producto ya fue agregado")

        const producto = productos.find(producto => producto.id == idProducto)
        const productoFormateado = {
            id: idProducto,
            nombre: producto.nombre,
            medida: producto.medida,
            cantidad: cantidadProducto,
            precio: precioProducto,
            subtotal: totalProducto,
            
        }
        setIdProductoSeleccionadoTabla(null)
        setIdProducto(null)
        limpiarCampos()
        setCarritoDeVentas([...carritoDeVentas, productoFormateado])
    }


    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <div className="flex gap-3 items-between">
                <div>
                    <MostrarImagen imagenes={imagenes}/>
                </div>
                
                <div className="flex flex-col gap-4 w-full">
                    <h1 className="titulo mb-8">Crear venta</h1>
                    <div className="flex flex-col gap-8">
                        
                        <div className="flex gap-3">
                            <InputListaMultiple

                            value={nombreProducto}
                            setValue={setNombreProducto}
                            label="Producto*"
                            listItems={productos}
                            setIdSelected = {setIdProducto}
                            />

                            <div className="flex py-2 px-3 borde-1 rounded-lg w-44 text-center items-center justify-end gap-4">
                                                            
                                <p className="font-bold" >{medida || " Medida"}</p> 
                                <FaBalanceScale className="text-gray-700 text-xl"/>
                            </div>
                        </div>
                        
                        <div className="flex w-full items-center justify-between">
                            <div className="flex gap-3">
                                <InputNumber
                                style = {"w-28"}
                                value={cantidadProducto}
                                setValue={setCantidadProducto}
                                label1="Cantidad*"
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
                                icon={<FaTrash/>}/>
                            </div>
                            
                            <BotonIcono
                                onClick={agregarProducto}
                                icon={<FaPlus/>}/>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold">Productos vendidos</h2>
            
            <div>
                <Tabla 
                listItems = {carritoDeVentas}
                rename= {renombrar}
                setIdSelected = {setIdProductoSeleccionadoTabla}
                total = {total}
                columns = {columns}
                />
            </div>
            <div className="flex w-full justify-end">
                <Boton text="Finalizar venta" onClick={()=>setShowModalConfirmacion(true)}/>       
            </div>
            {
                showModalConfirmacion && 
                <ModalConfirmarFactura 
                    setShowModal={setShowModalConfirmacion} 
                    total = {total}
                    carritoDeVentas={carritoDeVentas} 
                    reset = {() => {
                        limpiarCampos()
                        setCarritoDeVentas([])
                    }}
                />
            }
        </div>
    )
}


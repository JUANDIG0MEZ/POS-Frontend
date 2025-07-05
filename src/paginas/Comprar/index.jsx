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



const renombrar = {
    id: "ID",
    nombre: "Nombre",
    medida: "Medida",
    cantidad: "Cantidad",
    precio: "Precio",
    subtotal: "Subtotal"
}


export default function Comprar() {

    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false)

    const {
        productos
    } = useContext(ContextInventario)
    const [carritoDeCompras, setCarritoDeCompras] = useState([])
    


    // Informacion de la compra
    //const [nombreCliente, setNombreCliente] = useState("")
    const [nombreProducto, setNombreProducto] = useState("")
    const [medida, setMedida] = useState("")
    const [imagenes, setImagenes] = useState([])




    // Manipulacion tabla
    const [idProductoSeleccionadoTabla, setIdProductoSeleccionadoTabla] = useState(null)


    



    // Casillas
    const [idProducto, setIdProducto]= useState("")
    const [cantidadProducto, setCantidadProducto] = useState("")
    const [precioProducto, setPrecioProducto] = useState("")
    const [totalProducto, setTotalProducto] = useState("")
    const [total , setTotal] = useState(0)

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
        setTotal(carritoDeCompras.reduce((acc, item) => acc + item.subtotal, 0))
    }, [carritoDeCompras])
    useEffect(()=> {
        setTotalProducto(cantidadProducto * precioProducto)
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
            cantidad: Number(cantidadProducto),
            precio: Number(precioProducto),
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
                                valor={nombreProducto}
                                setValor={setNombreProducto}
                                label="Producto"
                                lista={productos}
                                setIdSeleccionado = {setIdProducto}/>

                            <div className="flex py-2 px-3 borde-1 rounded-lg w-44 text-center items-center justify-end gap-4">
                                
                                <p className="font-bold" >{medida || " Medida"}</p> 
                                <FaBalanceScale className="text-gray-700 text-xl"/>
                            </div>
                        </div>
                        
                        <div className="flex w-full items-center justify-between gap-3">
                            <div className="flex gap-3">
                                <InputNumber
                                estilo = {"w-28"}
                                valor={cantidadProducto}
                                setValor={setCantidadProducto}
                                label="Cantidad"
                                isNumber={true}
                                format={true}
                                />
                            <InputNumber
                                estilo = {"w-40"}
                                valor={precioProducto}
                                setValor={setPrecioProducto}
                                // labelSeleccionado = {precioParcial}
                                label="Precio"
                                isNumber={true}
                                isPrice={true}
                                format={true}
                                />
                            
                            
                            <InputNumber
                                estilo = {"w-40"}
                                label="Total"
                                valor={totalProducto}
                                // labelSeleccionado = {totalParcial}
                                format={true}
                                isPrice= {true}
                                />
                            
                            <BotonIcono
                                onClick={limpiarCampos}
                                texto={<FaTrash />}
                                isNormal={true}/>
                            </div>
                            
                        
                            
                            <BotonIcono
                                onClick={agregarProducto}
                                texto={<FaPlus/>}/>
                        </div>

                    </div>
                
                </div>
            </div>

            <h2 className="text-2xl font-semibold">Productos comprados</h2>
            
            <div>
                <Tabla 
                datos = {carritoDeCompras}
                rename= {renombrar}
                setIdItemSeleccionado = {setIdProductoSeleccionadoTabla}
                total = {total}
                />
            </div>
            <div className="flex w-full justify-end">
                <Boton texto="Finalizar Compra" onClick={()=>setShowModalConfirmacion(true)}/>       
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


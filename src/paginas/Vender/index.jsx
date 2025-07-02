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
    marca: "Marca",
    medida: "Medida",
    cantidad: "Cantidad",
    precio: "Precio",
    subtotal: "Subtotal"
}


export default function Comprar() {

    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false)

    const {
        productos,
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


    const [totalParcial, setTotalParcial] = useState("")
    const [precioParcial, setPrecioParcial] = useState("")


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
    
    }, [idProducto])

    useEffect(()=> {
        setTotal(carritoDeVentas.reduce((acc, item) => acc + item.subtotal, 0))
    }, [carritoDeVentas])

    useEffect(()=> {
        if (precioProducto){
            setTotalProducto("")
        }
        setTotalParcial(cantidadProducto * precioProducto)
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
        
    }, [idProductoSeleccionadoTabla, carritoDeVentas])


    function agregarProducto(){
        
        if (!idProducto ){
            toast.error("El producto no fue encontrado")
            return 
        }
        else if (cantidadProducto === ""){
            toast.error("Agrega cantidad")
            return 
        } 
        else if (precioProducto === "" && totalProducto === ""){
            toast.error("Agrega el precio o el total")
            return
        }

        else if (carritoDeVentas.some(producto => producto.id === idProducto)){
            toast.warning("El producto ya fue agregado")
            return
        }

        let total
        let precio

        if (cantidadProducto !== "" && precioProducto !== ""){
            precio = precioProducto
            total = cantidadProducto * precioProducto
        }
        else if (cantidadProducto !== "" && totalProducto !== ""){
            total = totalProducto
            precio = totalProducto / cantidadProducto
        }

        const producto = productos.find(producto => producto.id == idProducto)
        const productoFormateado = {
            id: idProducto,
            nombre: producto.nombre,
            marca: producto.marca,
            medida: producto.medida,
            cantidad: cantidadProducto,
            precio: precio,
            subtotal: total,
            
        }
        setIdProductoSeleccionadoTabla(null)
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

                            valor={nombreProducto}
                            setValor={setNombreProducto}
                            label="Producto*"
                            lista={productos}
                            setIdSeleccionado = {setIdProducto}
                            />

                            <div className="flex py-2 px-3 borde-1 rounded-lg w-44 text-center items-center justify-end gap-4">
                                                            
                                <p className="font-bold" >{medida || " Medida"}</p> 
                                <FaBalanceScale className="text-gray-700 text-xl"/>
                            </div>


                        </div>
                        
                        <div className="flex w-full items-center justify-between">
                            <div className="flex gap-3">
                                <InputNumber
                                estilo = {"w-28"}
                                valor={cantidadProducto}
                                setValor={setCantidadProducto}
                                label="Cantidad*"
                                isNumber={true}
                                format={true}
                                />
                            <InputNumber
                                estilo = {"w-40"}
                                valor={precioProducto}
                                setValor={setPrecioProducto}
                                labelSeleccionado = {precioParcial}
                                label="Precio"
                                isNumber={true}
                                isPrice={true}
                                format={true}
                                />
                                
                            <InputNumber
                                estilo = {"w-40"}
                                label="Total"
                                valor={totalProducto}
                                setValor={setTotalProducto}
                                labelSeleccionado = {totalParcial}
                                format={true}
                                isPrice= {true}
                                />
                        
                            <BotonIcono
                                onClick={limpiarCampos}
                                texto={<FaTrash/>}/>
                            </div>
                            
                            <BotonIcono
                                onClick={agregarProducto}
                                texto={<FaPlus/>}/>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold">Productos vendidos</h2>
            
            <div>
                <Tabla 
                datos = {carritoDeVentas}
                rename= {renombrar}
                setIdItemSeleccionado = {setIdProductoSeleccionadoTabla}
                total = {total}
                />
            </div>
            <div className="flex w-full justify-end">
                <Boton texto="Finalizar venta" onClick={()=>setShowModalConfirmacion(true)}/>       
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


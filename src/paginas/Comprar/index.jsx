import Tabla from "../../componentes/Tabla"
import {useState, useContext, useEffect} from 'react'
import { ContextInventario } from "../../contextInventario"
import Boton from "../../componentes/Boton"
import InputListaMultiple from "../../componentes/InputListaMultiple"
import InputLista from "../../componentes/InputLista"
import CrudDatosClientes from "../../serviciosYFunciones/crudDatosClientes"
import InputNumber from "../../componentes/InputNumber"
import { toast } from "sonner"
import ModalConfirmarFactura from "../../componentes/Modales/ModalConfirmarFactura"
import MostrarImagen from "../../componentes/MostrarImagen"

import { obtenerImagenes } from "../../serviciosYFunciones/servicioImagenes"
import { fetchFilesManager, fetchManager } from "../../serviciosYFunciones/fetchFunciones"

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
        clientes,
        productos
    } = useContext(ContextInventario)
    const [carritoDeCompras, setCarritoDeCompras] = useState([])
    
    const [nombreCliente, setNombreCliente] = useState("")
    const [nombreProducto, setNombreProducto] = useState("")
    const [nombreProductoSeleccionado, setNombreProductoSeleccionado] = useState("")
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


    const [idCliente, setIdCliente]= useState("")
    

    function limpiarCampos(){
        setNombreProducto("")
        setCantidadProducto("")
        setPrecioProducto("")
        setTotalProducto("")
    }

    useEffect(()=>{

        const producto = productos.find(producto => producto.id == idProducto)
        if (producto){
            setNombreProductoSeleccionado(producto.nombre)
            setMedida(producto.medida)

            fetchFilesManager(`http://localhost:3000/api/v1/productos/${idProducto}/imagenes`, setImagenes)
            //obtenerImagenes(idProducto, setImagenes)
        }
    
    }, [idProducto])

    useEffect(()=> {
        setTotal(carritoDeCompras.reduce((acc, item) => acc + item.subtotal, 0))
    }, [carritoDeCompras])

    useEffect(()=>{
        const cliente = CrudDatosClientes.encontrarPorNombre(nombreCliente, clientes)
        if (cliente){
            setIdCliente(cliente.id)
        }
        else {
            setIdCliente("")
        }
    }, [nombreCliente, clientes])



    useEffect(()=>{
        if (totalProducto){
            setPrecioProducto("")
        }
        
        setPrecioParcial(Math.ceil(totalProducto / cantidadProducto))
    }, [totalProducto, cantidadProducto])

    useEffect(()=> {
        if (precioProducto){
            setTotalProducto("")
        }
        setTotalParcial(cantidadProducto * precioProducto)
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

        else if (carritoDeCompras.some(producto => producto.id === idProducto)){
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
        setCarritoDeCompras([...carritoDeCompras, productoFormateado])
    }


    function finalizarCompra(pagado, estado_id){
        if (carritoDeCompras.length === 0){
            toast.info("Agrega productos al carrito")
            return
        }
        else if (!idCliente){
            toast.info("Selecciona un cliente")
            return
        }
        else if( pagado > total){
            toast.error("El monto pagado es mayor al total")
            return
        }
        else {
            const info = {
                cliente_id: idCliente,
                estado_id: estado_id,
                pagado: pagado,
            }

            const detalles = carritoDeCompras.map(item => {
                return {
                    producto_id: item.id,
                    cantidad: item.cantidad,
                    precio: item.precio,
                    subtotal: item.subtotal
                }
            })

            const compraEnviar = {info: info, datos: detalles}

            function cbCompra(resData) {
                setCarritoDeCompras([])
                setTotal(0)
            }
            fetchManager(`http://localhost:3000/api/v1/facturas/compras`, cbCompra, "POST", compraEnviar)

        }

    }

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <div className="flex gap-3 items-center">
                <MostrarImagen imagenes={imagenes}/>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold mb-3">COMPRAR</h1>
                    <div className="flex flex-col gap-8">
                        <InputLista
                            valor={nombreCliente}
                            setValor={setNombreCliente}
                            label="Cliente*"
                            lista={clientes}
                            setIdSeleccionado = {setIdCliente}
                            />
                        <InputListaMultiple

                            valor={nombreProducto}
                            setValor={setNombreProducto}
                            label="Producto*"
                            lista={productos}
                            setIdSeleccionado = {setIdProducto}
                            labelSeleccionado = {nombreProductoSeleccionado}
                            />
                        <div className="flex w-full items-center justify-between gap-3">
                            <InputNumber
                                estilo = {"w-28"}
                                valor={cantidadProducto}
                                setValor={setCantidadProducto}
                                label="Cantidad*"
                                isNumber={true}
                                format={true}
                                />
                            <InputNumber
                                estilo = {"w-52"}
                                valor={precioProducto}
                                setValor={setPrecioProducto}
                                labelSeleccionado = {precioParcial}
                                label="Precio"
                                isNumber={true}
                                isPrice={true}
                                format={true}
                                />
                                <p className="p-2 border rounded-md bg-gray-50 w-52 text-center font-semibold text-gray-800">{medida || " Medida"}</p> 
                            <InputNumber
                                estilo = {"w-62"}
                                label="Total"
                                valor={totalProducto}
                                setValor={setTotalProducto}
                                labelSeleccionado = {totalParcial}
                                format={true}
                                isPrice= {true}
                                />
                        
                            <Boton
                                onClick={limpiarCampos}
                                texto="Limpiar"
                                isNormal={true}/>
                            <Boton
                                onClick={agregarProducto}
                                texto="Agregar"/>
                        </div>

                    </div>
                
                </div>
            </div>

            <h2 className="text-2xl font-semibold">FACTURA DE COMPRA</h2>
            
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
                showModalConfirmacion && <ModalConfirmarFactura setShowModal={setShowModalConfirmacion} total = {total} clienteNombre={nombreCliente} onConfirm = {finalizarCompra}
                />
            }
        </div>
        
        
    )
}


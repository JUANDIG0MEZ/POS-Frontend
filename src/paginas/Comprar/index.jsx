import Tabla from "../../componentes/Tabla"
import {useState, useContext, useEffect} from 'react'
import { ContextInventario } from "../../contextInventario"

import InputText from "../../componentes/InputText"
import Boton from "../../componentes/Boton"
import InputLista from "../../componentes/InputLista"

import CrudDatosProductos from "../../servicios/crudDatosProductos"
import CrudDatosClientes from "../../servicios/crudDatosClientes"


export default function Comprar() {

    const {
        clientes,
        productos
    } = useContext(ContextInventario)


    const [carritoDeCompras, setCarritoDeCompras] = useState([])
    
    const [nombreCliente, setNombreCliente] = useState("")
    const [nombreProducto, setNombreProducto] = useState("")
    const [cantidadProducto, setCantidadProducto] = useState("")
    const [precioProducto, setPrecioProducto] = useState("")
    const [totalProducto, setTotalProducto] = useState("")
    
    const [idProducto, setIdProducto]= useState("")

    const [idCliente, setIdCliente]= useState("")
    //const [filaProductoSeleccionado, setFilaProductoSeleccionado] = useState({})

    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(undefined)

    const [mensaje, setMensaje] = useState("")

    const [totalParcial, setTotalParcial] = useState("")
    const [precioParcial, setPrecioParcial] = useState("")




    function limpiarCampos(){
        setNombreProducto("")
        setCantidadProducto("")
        setPrecioProducto("")
        setTotalProducto("")
    }

    useEffect(()=>{
        const producto = CrudDatosProductos.encontrarPorNombre(nombreProducto, productos)
        if (producto){
            setIdProducto(producto.id)
        }
        else {
            setIdProducto("")
        }
    }, [nombreProducto, productos])

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


    function listaNombreProductos(){
        return productos.map(producto => producto.nombre)
    }

    function listaNombreClientes(){
        return clientes.map(cliente => cliente.nombre)
    }


    useEffect(()=>{
        if (idProductoSeleccionado){
            // se obtiene el indice del producto seleccionado
            const infoProductoTabla = carritoDeCompras.find(producto => producto.id == idProductoSeleccionado)
            // se pone en la informacion nuevamente en los inputs
            if (infoProductoTabla){
                setNombreProducto(infoProductoTabla.nombre)
                setCantidadProducto(infoProductoTabla.cantidad)
                setTotalProducto(infoProductoTabla.subtotal)
            }
            // se elimina el producto seleccionado del carrito

            const nuevoCarrito = carritoDeCompras.filter(producto => producto.id != idProductoSeleccionado)
            setCarritoDeCompras(nuevoCarrito)

        }
        
    }, [idProductoSeleccionado])


    function agregarProducto(){
        
        if (idProducto === "" ){
            setMensaje("El producto no fue encontrado")
            return 
        }
        else if (cantidadProducto === ""){
            setMensaje("Agrega cantidad")
            return 
        } 
        else if (precioProducto === "" && totalProducto === ""){
            setMensaje("Agrega el precio o el total")
            return
        }

        else if (carritoDeCompras.some(producto => producto.id === idProducto)){
            setMensaje("El producto ya fue agregado")
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

        const producto = {
            cantidad: cantidadProducto,
            nombre: nombreProducto,
            precio: precio,
            subtotal: total,
            id: idProducto,
        }
        setIdProductoSeleccionado(undefined)
        setMensaje("")
        limpiarCampos()
        setCarritoDeCompras([...carritoDeCompras, producto])
    }

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <div className="flex gap-3 items-center">
                <figure className="">
                    <img src="
                    https://www.semana.com/resizer/v2/ZBUPHEFWHNHIFE3VQP5VISURGM.jpg?auth=652e54160a25d475ded57e8c6950da4f6af5a4e7251e56525f1f0bff93b71c37&smart=true&quality=75&width=1280
                    " className="w-[400PX] h-52 border object-contain rounded-lg"/>
                </figure>
                <div className="flex flex-col w-full gap-2">
                    <h1 className="text-2xl font-bold mb-3">COMPRAR</h1>
                    <div className="flex flex-col gap-6">

                        <InputLista 
                            valor={nombreProducto}
                            setValor={setNombreProducto}
                            label="Producto*"
                            lista={listaNombreProductos()}/>
                        <div className="flex w-full items-center justify-between">
                            <InputText
                                estilo = {"w-28"}
                                valor={cantidadProducto}
                                setValor={setCantidadProducto}
                                label="Cantidad*"
                                isNumber={true}
                                />
                            <InputText
                                estilo = {"w-52"}
                                valor={precioProducto}
                                setValor={setPrecioProducto}
                                labelSeleccionado = {precioParcial}
                                label="Precio"
                                isNumber={true}
                                isPrice={true}
                                />
                                <p className="p-1 border rounded-md bg-gray-100 w-52 text-center font-semibold text-gray-800">Metro Cuadrado</p> 
                            <InputText
                                estilo = {"w-62"}
                                label="Total"
                                valor={totalProducto}
                                setValor={setTotalProducto}
                                labelSeleccionado = {totalParcial}
                                isNumber={true}
                                isPrice={true}/>
                        
                            <Boton
                                onClick={limpiarCampos}
                                texto="Limpiar"
                                isNormal={true}/>
                            <Boton
                                onClick={agregarProducto}
                                texto="Agregar"/>
                        </div>

                    </div>
                    
                    <p className="text-red-500 font-bold animate-bounce">{mensaje || "Agrega productos"}</p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold">FACTURA DE COMPRA</h2>
            
            <div>
                <Tabla 
                datos = {carritoDeCompras}
                setIdItemSeleccionado = {setIdProductoSeleccionado}
                isVisible = {{
                    nombre: true,
                    cantidad: true,
                    precio: true,
                    subtotal: true,
                    id: false
                }}
                total = {2500000}
                />
            </div>
            <div className="flex w-full justify-end">
                <Boton texto="Finalizar Compra"/>       
            </div>

        </div>
        
        
    )
}


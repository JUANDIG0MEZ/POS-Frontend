import InputText from "../InputText"
import InputLista from "../InputLista"
import Boton from "../Boton"
import { useState, useEffect, useContext, useRef} from "react"
import ModificarImagenes from "../ModificarImagenes"

import { ContextInventario } from "../../contextInventario"
import { fetchFilesManager, fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import InputNumber from "../InputNumber"
import { toast } from "sonner"

export default function ModalModificarProducto(props){

    const {
        categorias
    } = useContext(ContextInventario)


    const productoSeleccionado = props.productoSeleccionado

    const precioVenta = useRef(productoSeleccionado.precio_venta)
    const precioCompra = useRef(productoSeleccionado.precio_compra)
    const categoria = useRef(productoSeleccionado.categoria)

    const [imagenes, setImagenes] = useState(props.imagenes)
    const [files, setFiles] = useState([])
    const [borradas, setBorradas] = useState([])

    const [categoriaBusqueda, setCategoriaBusqueda] = useState("")
    const [nuevaCategoriaId, setNuevaCategoriaId] = useState(null)
    const [nuevoPrecioCompra, setNuevoPrecioCompra]= useState(null)
    const [nuevoPrecioVenta, setNuevoPrecioVenta] = useState(null)

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
    }



    function modificarProducto(){
        if (!productoSeleccionado.id) return toast.warning('Debes seleccionar un articulo.')
        // El nombre y la marca no se pueden modificar
        const body = { }
        if (nuevaCategoriaId) body.categoria_id = nuevaCategoriaId
        if (Number(nuevoPrecioCompra)) body.precio_compra = Number(nuevoPrecioCompra)
        if (Number(nuevoPrecioVenta)) body.precio_venta = Number(nuevoPrecioVenta)

        function cb (res) {

        }
        fetchManager(`http://localhost:3000/api/v1/producto/${productoSeleccionado.id}`, cb, "PATCH", body)

        
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[1000px] items-center gap-4">
                <div className="w-[400px]">
                    <ModificarImagenes imagenes={imagenes} files={files} setFiles = {setFiles} borradas={borradas} setBorradas= {setBorradas} />
                </div>
                
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="titulo">Modificar producto <span className="px-2 py-1 border rounded-md texto-label">{productoSeleccionado.id} </span></h2>
                    <div className="flex gap-3">
                        <InputText label="Nombre" valor={productoSeleccionado.nombre}/>
                    </div>
                    <p className="subtitulo">Modificables</p>
                    <div className="flex gap-3">
                        <InputText label="Categoria" valor= {categoria.current} />
                        <InputLista label="Nueva categoria" valor={categoriaBusqueda} setValor={setCategoriaBusqueda} lista = {categorias} setIdSeleccionado={setNuevaCategoriaId} />
                    </div>
                    <div className="flex gap-3">
                        <InputNumber label="Valor compra" valor={precioCompra.current} format={true}/>
                        <InputNumber label="Nuevo valor compra" valor={nuevoPrecioCompra} setValor={setNuevoPrecioCompra} format={true}/>
                    </div>
                    <div className="flex gap-3">
                        <InputNumber label="Valor venta" valor={precioVenta.current} format={true}/>
                        <InputNumber label="Nuevo valor venta" valor={nuevoPrecioVenta} setValor={setNuevoPrecioVenta} format={true}/>
                    </div>
                    
                    <div className="flex w-full justify-end gap-3">
                        <Boton onClick={cerrarModal} texto = "Cancelar"  isNormal = {true}/>
                        <Boton texto = "Modificar" onClick= {modificarProducto} />
                    </div>

                </div>
            </div>
            
        </div>
    )
}
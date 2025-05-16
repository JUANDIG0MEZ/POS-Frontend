import InputText from "../InputText"
import InputLista from "../InputLista"
import Boton from "../Boton"
import { useState, useEffect, useContext} from "react"
import ModificarImagenes from "../ModificarImagenes"

import { ContextInventario } from "../../contextInventario"
import { fetchFilesManager } from "../../serviciosYFunciones/fetchFunciones"
import InputNumber from "../InputNumber"

export default function ModalModificarProducto(props){

    const {
        categorias
    } = useContext(ContextInventario)


    const productoSeleccionado = props.productoSeleccionado

    const [precioVenta, setPrecioVenta] = useState(productoSeleccionado.precio_venta)
    const [precioCompra, setPrecioCompra] = useState(productoSeleccionado.precio_compra)
    const [categoria, setCategoria] = useState(productoSeleccionado.categoria)
    const [idCategoria, setIdCategoria] = useState(NaN)
    const [imagenes, setImagenes] = useState(props.imagenes)
    const [files, setFiles] = useState([])
    const [borradas, setBorradas] = useState([])

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
    }



    function modificarProducto(){
        // El nombre y la marca no se pueden modificar
        if (productoSeleccionado.id){

            const formData = new FormData()


            const body = {}

            if (idCategoria){
                body.categoria_id = idCategoria
            }else {
                body.categoria = categoria
            }

            if (precioCompra !== productoSeleccionado.precio_compra){
                body.precio_compra = precioCompra
            }
            if (precioVenta !== productoSeleccionado.precio_venta){
                body.precio_venta = precioVenta
            }

            if (borradas.length > 0){
                body.borradas = borradas
            }

            if (files.length > 0){
                files.forEach((file) => {
                    formData.append("files", file)
                })
            }

            formData.append("data", JSON.stringify(body))


            function cbModificar(data){
                //console.log(data)
            }


            fetchFilesManager(`http://localhost:3000/api/v1/productos/${productoSeleccionado.id}`, cbModificar, "PATCH", formData)


            // fetchFilesManager('http://localhost:3000/api/v1/productos', cbModificar')

            //fetchFilesManager(`http://localhost:3000/api/v1/productos/${productoSeleccionado.id}`, cbModificar, "PATCH", modificaciones)

        }
        
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[1200px] items-center gap-4">
                <div className="">
                    <ModificarImagenes imagenes={imagenes} files={files} setFiles = {setFiles} borradas={borradas} setBorradas= {setBorradas} />
                </div>
                
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="w-full text-2xl font-semibold">MODIFICAR PRODUCTO. ID:<span className="px-2 py-1 border rounded-md text-orange-600">{productoSeleccionado.id} </span></h2>
                    <div className="flex flex-col gap-6">
                        <InputText label="Nombre" valor={productoSeleccionado.nombre}/>
                        
                    </div>
                    <div className="flex w-full gap-3">
                        <InputText label = "Marca" valor={productoSeleccionado.marca}/>
                        <InputLista label="Categoria" valor={categoria} setValor={setCategoria} lista = {categorias} setIdSeleccionado={setIdCategoria} />
                    </div>
                    <div className="flex gap-3">
                        <InputNumber label="Cantidad" valor={productoSeleccionado.cantidad} format={true}/>
                        <InputNumber label="Valor Compra" valor={precioCompra} setValor={setPrecioCompra} format={true}/>
                        <InputNumber label="Valor Venta" valor={precioVenta} setValor={setPrecioVenta} format={true}/>
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
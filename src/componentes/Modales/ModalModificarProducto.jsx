import InputText from "../InputText"
import InputLista from "../InputLista"
import Boton from "../Boton"
import { useState, useEffect, useContext} from "react"
import MostrarImagen from "../MostrarImagen"

import { ContextInventario } from "../../contextInventario"
import { toastFetchPromise } from "../../serviciosYFunciones/fetchFunciones"

export default function ModalModificarProducto(props){

    const {
        categorias
    } = useContext(ContextInventario)


    const productoSeleccionado = props.productoSeleccionado

    const [precioVenta, setPrecioVenta] = useState(productoSeleccionado.precio_venta)
    const [marca, setMarca] = useState(productoSeleccionado.marca)
    const [categoria, setCategoria] = useState(productoSeleccionado.categoria)
    const [imagenes, setImagenes] = useState(props.imagenes)
    console.log(imagenes)

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
        
    }



    function modificarProducto(){
        // El nombre y la marca no se pueden modificar
        if (productoSeleccionado.id){
            const modificaciones = {}
            modificaciones.id = productoSeleccionado.id
            modificaciones.marca = marca
            modificaciones.categoria = categoria
            modificaciones.precio_venta = precioVenta
            fetch('http://localhost:3000/api/v1/productos', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modificaciones)
            }).then(response=> {
                if (response.ok){
                    return response.json()
                }
            }).then(data => {
                console.log("Producto modificado", data)
            }).catch(error => {
                console.log("Error al modificar el producto", error)
            })

        }
        
    }
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[1200px] items-center gap-4">
                <div className="">
                    <MostrarImagen imagenes={imagenes}/>
                </div>
                
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="w-full text-2xl font-semibold">MODIFICAR PRODUCTO. ID:<span className="px-2 py-1 border rounded-md text-orange-600">{productoSeleccionado.id} </span></h2>
                    <div className="flex flex-col gap-6">
                        <InputText label="Nombre" valor={productoSeleccionado.nombre}/>
                        
                    </div>
                    <div className="flex w-full gap-3">
                        <InputText label = "Marca" valor={productoSeleccionado.marca}/>
                        <InputLista label="Categoria" valor={categoria} lista = {categorias} />
                    </div>
                    <div className="flex gap-3">
                        <InputText label="Cantidad" valor={productoSeleccionado.cantidad} isNumber={true}/>
                        <InputText label="Valor Compra" valor={productoSeleccionado.precio_compra} isNumber={true}/>
                        <InputText label="Valor Venta" valor={productoSeleccionado.precio_venta} isNumber={true}/>
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
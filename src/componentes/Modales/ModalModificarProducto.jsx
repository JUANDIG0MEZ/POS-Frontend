import InputText from "../InputText"
import InputLista from "../InputLista"
import Boton from "../Boton"
import { useState} from "react"
import { ObtenerDatos } from "../../servicios/datos"
import DropZone from "../DropZona"




export default function ModalModificarProducto(props){

    const productoSeleccionado = props.productoSeleccionado
    const [nombre, setNombre] = useState(productoSeleccionado.nombre)
    const [precioCompra, setPrecioCompra] = useState(productoSeleccionado.precioCompra)
    const [precioVenta, setPrecioVenta] = useState(productoSeleccionado.precioVenta)
    const [medida, setMedida] = useState(productoSeleccionado.medida)
    const [marca, setMarca] = useState(productoSeleccionado.marca)
    const [cantidad, setCantidad] = useState(productoSeleccionado.cantidad)
    const [categoria, setCategoria] = useState(productoSeleccionado.categoria)

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
        
    }



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[1050px] items-center gap-4">
                <div className="items-center w-80 h-64">
                    <DropZone></DropZone>
                </div>
                
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="w-full text-2xl font-semibold">MODIFICAR PRODUCTO. ID:<span className="px-2 py-1 border rounded-md text-orange-600">{productoSeleccionado.id} </span></h2>
                    <div className="flex gap-3">
                        <InputText label="Nombre" valor={nombre} setValor={setNombre}/>
                    </div>
                    <div className="flex w-full gap-3">
                        <InputLista label="Marca" valor = {marca} setValor={setMarca} lista = {ObtenerDatos.marcas()}/>
                        <InputLista label="Categoria" valor={categoria} setValor={setCategoria} lista = {ObtenerDatos.categorias()} />
                    </div>
                    <div className="flex gap-3">
                        <div className="w-3/12">
                            <InputLista label="Medida" valor= {medida} setValor={setMedida} lista = {ObtenerDatos.medidas()}/>
                        </div>
                        <InputText label="Cantidad" valor={cantidad} setValor={setCantidad} isNumber={true}/>
                        <InputText label="Valor Compra" valor={precioCompra} setValor={setPrecioCompra} isNumber={true}/>
                        <InputText label="Valor Venta" valor={precioVenta} setValor={setPrecioVenta} isNumber={true}/>
                    </div>
                    <div className="flex w-full justify-end gap-3">
                        <Boton onClick={cerrarModal} texto = "Cancelar"  isNormal = {true}/>
                        <Boton texto = "Modificar" />
                    </div>

                </div>
            </div>
            
            
            
        </div>
    )
}
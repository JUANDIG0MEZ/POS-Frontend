import InputText from "../InputText"
import InputLista from "../InputLista"
import Boton from "../Boton"
import { useState, useEffect} from "react"
import DropZone from "../DropZona"
import CrudDatosProductos from "../../servicios/crudDatosProductos"



export default function ModalModificarProducto(props){

    const productoSeleccionado = props.productoSeleccionado
    const [nombre, setNombre] = useState(productoSeleccionado.nombre)
    const [precioCompra, setPrecioCompra] = useState(productoSeleccionado.precio_compra)
    const [precioVenta, setPrecioVenta] = useState(productoSeleccionado.precio_venta)
    const [medida, setMedida] = useState(productoSeleccionado.medida)
    const [marca, setMarca] = useState(productoSeleccionado.marca)
    const [cantidad, setCantidad] = useState(productoSeleccionado.cantidad)
    const [categoria, setCategoria] = useState(productoSeleccionado.categoria)


    const [listaMarca, setListaMarca] = useState([])
    const [listaCategoria, setListaCategoria] = useState([])
    const [listaMedida, setListaMedida] = useState([])

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


    useEffect(()=>{
    
            async function cargarListas(){
                try {
                    const marcas = await CrudDatosProductos.marcas()
                    setListaMarca(marcas)
                }
                catch {
                    console.log("Error al cargar las marcas del modal crear productos")
                }
    
                try {
                    const categorias = await CrudDatosProductos.categorias()
                    setListaCategoria(categorias)
                }
                catch {
                    console.log("Error al cargar las categorias del modal crear productos")
                }
    
                try {
                    const medidas = await CrudDatosProductos.medidas()
                    setListaMedida(medidas)
                    console.log(medidas)
                }
                catch{
                    console.log("Error al cargar las medidas del modal crear productos")
                }
            }
            cargarListas()
            }, [])



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[1200px] items-center gap-4">
                <div className="items-center w-80 h-64">
                    <DropZone></DropZone>
                </div>
                
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="w-full text-2xl font-semibold">MODIFICAR PRODUCTO. ID:<span className="px-2 py-1 border rounded-md text-orange-600">{productoSeleccionado.id} </span></h2>
                    <div className="flex flex-col gap-6">
                        <InputText label="Nombre" valor={nombre}/>
                        
                    </div>
                    <div className="flex w-full gap-3">
                        <InputText label = "Marca" valor={marca} setValor={setMarca}/>
                        <InputLista label="Categoria" valor={categoria} setValor={setCategoria} lista = {listaCategoria} />
                    </div>
                    <div className="flex gap-3">
                        <InputText label="Cantidad" valor={cantidad} isNumber={true}/>
                        <InputText label="Valor Compra" valor={precioCompra} isNumber={true}/>
                        <InputText label="Valor Venta" valor={precioVenta} setValor={setPrecioVenta} isNumber={true}/>
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
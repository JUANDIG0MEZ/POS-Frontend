import InputText from "../InputText"
import InputNumber from "../InputNumber"
import InputLista from "../InputLista"
import Boton from "../Boton"
import { useEffect, useState} from "react"
import CargarArchivos from "../CargarArchivos"
import  {toast} from 'sonner'
import { useContext } from "react"
import { ContextInventario } from "../../contextInventario"
import { fetchFilesManager, fetchManager } from "../../serviciosYFunciones/fetchFunciones"

export default function ModalCrearProducto(props){

    // Se trae la lista de productos
    const {
        productos,
        setProductos
    } = useContext(ContextInventario)

    const [nombre, setNombre] = useState("")
    const [precioCompra, setPrecioCompra] = useState(null)
    const [precioVenta, setPrecioVenta] = useState(null)

    const [medida, setMedida] = useState(null)
    const [marca, setMarca] = useState(null)
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState(null)
    
    const [listaMarca, setListaMarca] = useState([])
    const [listaCategoria, setListaCategoria] = useState([])
    const [listaMedida, setListaMedida] = useState([])
    const [files, setFiles] = useState([])

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
    }

    function crearProducto(){
        if (nombre){
            const nuevoProducto = {
            nombre: nombre,
            marca: marca,
            categoria: categoria,
            medida: medida,
            precio_compra: precioCompra,
            precio_venta: precioVenta,
            cantidad: cantidad }
            
            // se eliminan los valores nulos
            for (const key in nuevoProducto){
                if (!nuevoProducto[key]){
                    delete nuevoProducto[key]
                }
            }

            function cbCrearProducto(resData){
                setProductos([...productos, resData])
                return "Producto creado"
            }

            const formData = new FormData()
            formData.append("data", JSON.stringify(nuevoProducto))

            files.forEach((imagen) => {
                formData.append("files", imagen)
            })

            fetchFilesManager('http://localhost:3000/api/v1/productos', cbCrearProducto, "POST", formData)
        }
        else{
            toast.warning("El nombre del producto es obligatorio")
        }
    }

    useEffect(()=>{
        fetchManager('http://localhost:3000/api/v1/productos/marcas', setListaMarca, "GET")
        fetchManager('http://localhost:3000/api/v1/productos/categorias', setListaCategoria, "GET")
        fetchManager('http://localhost:3000/api/v1/productos/medidas', setListaMedida, "GET")

        }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="w-[1400px] flex bg-white p-5 rounded-lg items-center gap-4">
                <CargarArchivos setFiles = {setFiles} files={files}/>

                
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="w-full text-2xl font-semibold mb-2">CREAR PRODUCTO</h2>
                    <div className="flex gap-3">
                        <InputText
                        label="Nombre"
                        valor={nombre}
                        setValor={setNombre}/>
                        <InputLista
                        estilo={"w-72"}
                        label="Marca"
                        valor = {marca}
                        setValor={setMarca}
                        lista = {listaMarca}/>
                    </div>
                    <div className="flex w-full gap-3">
                       
                        <InputLista label="Categoria" valor={categoria} setValor={setCategoria} lista = {listaCategoria} />
                        <InputLista estilo={"w-72"} label="Medida" valor= {medida} setValor={setMedida} lista = {listaMedida}/>
                        <InputNumber
                            estilo="w-48"
                            label="Cantidad"
                            valor={cantidad}
                            setValor={setCantidad}
                            format={true}
                            />
                    </div>
                    <div className="flex gap-3 items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <InputNumber
                                estilo="w-52"
                                label="Valor Compra" 
                                valor={precioCompra}
                                setValor={setPrecioCompra}
                                format={true}
                                />
                                
                            <InputNumber
                                estilo="w-52"
                                label="Valor Venta"
                                valor={precioVenta}
                                setValor={setPrecioVenta}
                                format={true}
                                />
                            <Boton
                            onClick={cerrarModal}
                            texto = "Limpiar"
                            isNormal = {true}/>
                        </div>
                        
                        <div className="flex gap-3">
                            <Boton
                                onClick={cerrarModal}
                                texto = "Cancelar"
                                isNormal = {true}/>
                            <Boton
                                onClick={crearProducto}
                                texto = "Agregar" />
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            
            
            
        </div>
    )
}
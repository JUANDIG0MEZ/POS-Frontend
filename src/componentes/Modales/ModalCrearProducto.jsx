import InputText from "../InputText"
import InputNumber from "../InputNumber"
import InputLista from "../InputLista"
import Select from "../Select"
import Boton from "../Boton"
import { useState} from "react"
import CargarArchivos from "../CargarArchivos"
import  {toast} from 'sonner'
import { useContext } from "react"
import { ContextInventario } from "../../contextInventario"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"

export default function ModalCrearProducto(props){

    // Se trae la lista de productos
    const {
        productos,
        setProductos,
        categorias,
        medidas
    } = useContext(ContextInventario)

    const [nombre, setNombre] = useState("")
    const [precioCompra, setPrecioCompra] = useState(null)
    const [precioVenta, setPrecioVenta] = useState(null)

    const [medida, setMedida] = useState(null)
    const [medidaId, setMedidaId] = useState(null)

    const [cantidad, setCantidad] = useState("")
    const [categoriaId, setCategoriaId] = useState(null)
    const [files, setFiles] = useState([])

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
    }

    function crearProducto(){

        if (Number(precioVenta) < Number(precioCompra)) {
            toast.error('El valor de venta debe ser mayor que el de compra.')
            return
        }
        if (nombre){
            const nuevoProducto = {
            nombre: nombre,
            categoria_id: Number(categoriaId),
            id_medida: Number(medidaId),
            precio_compra: Number(precioCompra),
            precio_venta: Number(precioVenta),
            cantidad: Number(cantidad) }
            
            // se eliminan los valores nulos
            for (const key in nuevoProducto){
                if (!nuevoProducto[key]){
                    delete nuevoProducto[key]
                }
            }

            function cbCrearProducto(res){
                setProductos([...productos, res.producto])
                // return "Producto creado"
            }
            fetchManager('http://localhost:3000/api/v1/producto', cbCrearProducto, "POST", nuevoProducto)
        }
        else{
            toast.warning("El nombre del producto es obligatorio")
        }
    }

    // function crearImagenes(){
    //     // const formData = new FormData()
    //         // formData.append("data", JSON.stringify(nuevoProducto))

    //         // files.forEach((imagen) => {
    //         //     formData.append("files", imagen)
    //         // })

    //     // fetchFilesManager('http://localhost:3000/api/v1/productos', cbCrearProducto, "POST", formData)
    // }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="w-[1000px] flex bg-white border rounded-lg  gap-3 p-4 ">
                <CargarArchivos setFiles = {setFiles} files={files}/>                
                <div className="flex flex-col gap-6 w-full">
                    <h2 className="titulo">Crear producto</h2>
                    <div>
                        <InputText
                        label1="Nombre"
                        value={nombre}
                        setValue={setNombre}/>
                    </div>
                    
                    <div className="flex gap-3">
                        <Select listItems={categorias} label ="Categoria" setValue={setCategoriaId}  />
                        <InputLista style={"w-1/2"} label="Medida" value={medida} setValue={setMedida} listItems = {medidas} setIdSelected={setMedidaId}/>
                    </div>
                    <div className="flex w-full gap-3">
                        
                        {/* <InputLista label="Categoria"  lista = {listaCategoria} /> */}
                        
                        
                    </div>
                    <div className="flex gap-3 items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <InputNumber
                            style="w-32"
                            label1="Cantidad"
                            value={cantidad}
                            setValue={setCantidad}
                            />
                            <InputNumber
                                style="flex-1"
                                label1="Valor Compra" 
                                value={precioCompra}
                                setValue={setPrecioCompra}
                                />
                                
                            <InputNumber
                                style="flex-1"
                                label1="Valor Venta"
                                value={precioVenta}
                                setValue={setPrecioVenta}
                                />
                            
                        </div>
                        
                        
                        
                        
                    </div>
                    <div className="flex gap-3 w-full justify-between">
                        <Boton
                            text = "Limpiar"
                            isNormal = {true}/>

                        <div className="flex gap-3">
                            <Boton
                                onClick={cerrarModal}
                                text = "Cancelar"
                                isNormal = {true}/>
                            <Boton
                                onClick={crearProducto}
                                text = "Agregar" />
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        </div>
    )
}
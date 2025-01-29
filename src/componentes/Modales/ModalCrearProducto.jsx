import InputText from "../InputText"
import InputLista from "../InputLista"
import Boton from "../Boton"
import { useState} from "react"
import { ObtenerDatos } from "../../servicios/datos"
import DropZone from "../DropZona"

export default function ModalCrearProducto(props){

    const [nombre, setNombre] = useState("")
    const [precioCompra, setPrecioCompra] = useState("")
    const [precioVenta, setPrecioVenta] = useState("")
    const [medida, setMedida] = useState("")
    const [marca, setMarca] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
    }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[1200px] items-center gap-4">
                <div className="items-center w-80 h-64">
                    <DropZone></DropZone>
                </div>
                
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
                        lista = {ObtenerDatos.marcas()}/>
                    </div>
                    <div className="flex w-full gap-3">
                       
                        <InputLista label="Categoria" valor={categoria} setValor={setCategoria} lista = {ObtenerDatos.categorias()} />
                        <InputLista estilo={"w-72"} label="Medida" valor= {medida} setValor={setMedida} lista = {ObtenerDatos.medidas()}/>
                        <InputText
                            estilo="w-48"
                            label="Cantidad"
                            valor={cantidad}
                            setValor={setCantidad}
                            isNumber={true}
                            />
                    </div>
                    <div className="flex gap-3 items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <InputText 
                                estilo="w-52"
                                label="Valor Compra" 
                                valor={precioCompra}
                                setValor={setPrecioCompra}
                                isNumber={true}
                                />
                                
                            <InputText
                                estilo="w-52"
                                label="Valor Venta"
                                valor={precioVenta}
                                setValor={setPrecioVenta}
                                isNumber={true}
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
                            <Boton texto = "Agregar" />
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            
            
            
        </div>
    )
}
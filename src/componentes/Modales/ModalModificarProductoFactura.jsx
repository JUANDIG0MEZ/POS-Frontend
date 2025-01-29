

import InputText from "../InputText"
import Boton from "../Boton"
import { useState, useEffect} from "react"




export default function ModalModificarProductoFactura(props){

    const productoSeleccionado = props.productoSeleccionado
    const [nombre, setNombre] = useState(productoSeleccionado.nombre)
    const [precio, setPrecio]= useState(productoSeleccionado.precio)
    const [medida, setMedida] = useState(productoSeleccionado.medida)
    const [marca, setMarca] = useState(productoSeleccionado.marca)
    const [cantidad, setCantidad] = useState(productoSeleccionado.cantidad)
    const [categoria, setCategoria] = useState(productoSeleccionado.categoria)
    const [total, setTotal] = useState(undefined)


    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
        
    }

    

    useEffect(()=>{
        setTotal(cantidad * precio)
    }, [cantidad, precio])




    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[800px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-5">
                    <h2 className="w-full text-xl font-semibold mb-5">MODIFICAR PRODUCTO: <span className="font-normal text-lg">{nombre}</span></h2>
                    <div className="flex gap-3">
                        <InputText estilo={'w-32'} label="Cantidad" valor={cantidad} setValor={setCantidad} isNumber={true}/>
                        <InputText estilo={'w-60'} label="Precio" valor={precio} setValor={setPrecio} isNumber={true}/>
                        <div className="pointer-events-none">
                            <InputText label="Total" valor={total} isNumber={true}/>
                        </div>

                    </div>
                    <div className="flex w-full justify-between gap-3">
                        <div className="flex gap-3">
                            <Boton onClick={cerrarModal} texto = "Cancelar"  isNormal = {true}/>
                            <Boton texto = "Eliminar Producto" isNormal={true}/>
                        </div>
                        
                        <Boton texto = "Guardar cambios" />
                    </div>

                </div>
            </div>
            
            
            
        </div>
    )
}
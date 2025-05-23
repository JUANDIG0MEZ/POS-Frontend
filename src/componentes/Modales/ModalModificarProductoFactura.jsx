import InputNumber from "../InputNumber"
import Boton from "../Boton"
import { useState, useEffect} from "react"




export default function ModalModificarProductoFactura(props){
    const id = props.idProductoSeleccionado
    const indiceFila = encontrarIndiceFila(id)
    const productoSeleccionado = props.datos[indiceFila]

    const [precio, setPrecio]= useState(productoSeleccionado.precio)
    const [cantidad, setCantidad] = useState(productoSeleccionado.cantidad)
    const [total, setTotal] = useState(productoSeleccionado.subtotal)

    function encontrarIndiceFila(id){
        return props.datos.findIndex(fila => fila.id == id)
    }

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
        
    }

    useEffect(()=>{
        setTotal(cantidad * precio) 
    }, [cantidad, precio])


    function guardarCambios(){
        const productoModificado = {
            ...productoSeleccionado,
            cantidad: cantidad,
            precio: precio,
            subtotal: total
        }
        const nuevosDatos = [...props.datos]
        nuevosDatos[indiceFila] = productoModificado
        props.setDatos(nuevosDatos)
        cerrarModal()
    }



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[800px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-5">
                    <h2 className="titulo mb-5">Modificar producto: <span className="font-bold text-lg text-red-400">{productoSeleccionado.nombre}</span></h2>
                    <div className="flex gap-3">
                        <InputNumber estilo={'w-32'} label="Cantidad" valor={cantidad} setValor={setCantidad} format={true}/>
                        <InputNumber estilo={'w-60'} label="Precio" valor={precio} setValor={setPrecio} format={true}/>
                        <div className="pointer-events-none">
                            <InputNumber label="Total" valor={total} format={true}/>
                        </div>

                    </div>
                    <div className="flex w-full justify-between gap-3">
                        <div className="flex gap-3">
                            <Boton onClick={cerrarModal} texto = "Cancelar"  isNormal = {true}/>
                            <Boton texto = "Eliminar Producto" isNormal={true}/>
                        </div>
                        
                        <Boton texto = "Guardar cambios" onClick={guardarCambios} />
                    </div>

                </div>
            </div>
            
            
            
        </div>
    )
}
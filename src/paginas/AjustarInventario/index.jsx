import {useContext, useEffect, useState} from 'react'
import { ContextInventario } from '../../contextInventario'
import InputListaMultiple from '../../componentes/InputListaMultiple'
import InputNumber from '../../componentes/InputNumber'
import MostrarImagen from '../../componentes/MostrarImagen'
import Boton from '../../componentes/Boton'
import BotonIcono from '../../componentes/BotonIcono'
import DiffTabla from '../../componentes/DiffTabla'
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones'
import { toast } from 'sonner'
export default function AjustarInventario(){
    const [idItemSeleccionad, setIdItemSeleccionado] = useState(null)
    const [busquedaNombre, setBusquedaNombre] = useState('')
    const [productoSeleccionadoId, setProductoSeleccionadoId] = useState()
    const [productosModificados, setProductosModificados] = useState()
    const [cantidadActual, setCantidadActual] = useState(null)
    const [cantidadAjustada, setCantidadAjustada] = useState(null)

    const [productoSeleccionado, setProductoSeleccionado] = useState()

    const [productosActuales, setProductoActuales] = useState([])
    const [productosAjustados, setProductoAjustados] = useState([])

    const {
        productos
    } = useContext(ContextInventario)
    
    useEffect(() => {
        if (productoSeleccionadoId){
            const producto = productos.find((value)=> value.id == productoSeleccionadoId)
            setCantidadActual(producto.cantidad)
            setProductoSeleccionado(producto)
        }
    }, [productoSeleccionadoId, productos])

    function guardarCambios() {

        const ajustes = productosAjustados.map((producto) => ({producto_id: producto.id, cantidad: Number(producto.cantidad)}))
        function cb (res){
            
        }
        fetchManager('http://localhost:3000/api/v1/producto/ajuste', cb, "POST", {detalles: ajustes})

    }

    function ajustarProducto(){
        if (!productoSeleccionadoId) return toast.warning('Produto seleccionado invalido')
        if (Number(cantidadActual) === Number(cantidadAjustada)) return toast.warning('las cantidades deben ser diferentes para ajustar el producto')
        if (productosAjustados.some(producto => producto.id == productoSeleccionadoId)) return toast.warning('El producto ya esta en la lista de ajustados')
        
        const productoInfo = {
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            categoria: productoSeleccionado.categoria,
            medida: productoSeleccionado.medida
        }


        const productoActual= {...productoInfo, cantidad: productoSeleccionado.cantidad}
        const productoAjustado= {...productoInfo, cantidad: cantidadAjustada}
        
        setProductoActuales([...productosActuales, productoActual])
        setProductoAjustados([...productosAjustados, productoAjustado])

    }

    return (
        <div className="w-full mx-auto justify-between flex">
            <div className='w-[1000px] mx-auto gap-6 flex flex-col'>
                <h1 className='titulo'>Crear ajuste de inventario</h1>
                <div className="flex w-full gap-3">
                    <InputListaMultiple
                        lista={productos}
                        valor={busquedaNombre}
                        setValor={setBusquedaNombre}
                        setIdSeleccionado={setProductoSeleccionadoId}
                        label={"Nombre producto"}
                    />
                    <div className='w-[300px] flex gap-3'>
                        <InputNumber label={'Cantidad actual'} valor={cantidadActual} />
                        <InputNumber label={'Cantidad ajustada'} valor={cantidadAjustada} setValor={setCantidadAjustada}/>
                    </div>
                    
                    <Boton texto = 'Guardar' onClick={ajustarProducto} isNormal = {true}/>
                </div>

                <DiffTabla
                    tabla1 = {productosActuales}
                    tabla2= {productosAjustados}
                    setIdItemSeleccionado = {setIdItemSeleccionado}/>
                <div className='ml-auto'>
                    <Boton texto='Guardar cambios' onClick={guardarCambios} /> 
                </div>
            </div>
            <div className="w-fit h-fit mt-3 mr-4 py-3 px-2 rounded-xl border-2">
                <MostrarImagen imagenes={[]} />
                <h1 className='mt-3 text-lg font-semibold'>Nombre del producto aqui</h1>

            </div>
        </div>
    )
    
}
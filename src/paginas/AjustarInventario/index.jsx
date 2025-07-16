import {useContext, useEffect, useState} from 'react'
import { ContextInventario } from '../../contextInventario'
import InputListaMultiple from '../../componentes/InputListaMultiple'
import InputNumber from '../../componentes/InputNumber'
import MostrarImagen from '../../componentes/MostrarImagen'
import Boton from '../../componentes/Boton'
import DiffTabla from '../../componentes/DiffTabla'
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones'
import { toast } from 'sonner'
export default function AjustarInventario(){
    const [idItemSeleccionad, setIdItemSeleccionado] = useState(null)
    const [busquedaNombre, setBusquedaNombre] = useState('')
    const [productoSeleccionadoId, setProductoSeleccionadoId] = useState()
    const [cantidadActual, setCantidadActual] = useState('')
    const [cantidadAjustada, setCantidadAjustada] = useState('')

    const [productoSeleccionado, setProductoSeleccionado] = useState()

    const [productosActuales, setProductosActuales] = useState([])
    const [productosAjustados, setProductosAjustados] = useState([])

    const {
        productos,
        cantidadNumber
    } = useContext(ContextInventario)
    
    useEffect(() => {
        if (productoSeleccionadoId){
            const producto = productos.find((value)=> value.id == productoSeleccionadoId)
            setCantidadActual(producto.cantidad)
            setProductoSeleccionado(producto)
        }
    }, [productoSeleccionadoId, productos])

    function guardarCambios() {

        const ajustes = productosAjustados.map((producto) => ({producto_id: producto.id, cantidad: producto.cantidad}))
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

        console.log(productoSeleccionado)


        const productoActual= {...productoInfo, cantidad: productoSeleccionado.cantidad}
        const productoAjustado= {...productoInfo, cantidad: cantidadAjustada}
        
        setProductosActuales([...productosActuales, productoActual])
        setProductosAjustados([...productosAjustados, productoAjustado])

        console.log(productoAjustado, productoActual)

    }

    return (
        <div className="w-full mx-auto justify-between flex">
            <div className='w-[1000px] mx-auto gap-6 flex flex-col'>
                <h1 className='titulo'>Crear ajuste de inventario</h1>
                <div className="flex w-full gap-3">
                    <InputListaMultiple
                        listItems={productos}
                        value={busquedaNombre}
                        setValue={setBusquedaNombre}
                        setIdSelected={setProductoSeleccionadoId}
                        label={"Nombre producto"}
                    />
                    <div className='w-[300px] flex gap-3'>
                        <InputNumber label1={'Cantidad actual'} value={cantidadActual} instanceNumber={cantidadNumber} />
                        <InputNumber label1={'Cantidad ajustada'} value={cantidadAjustada} setValue={setCantidadAjustada} instanceNumber={cantidadNumber}/>
                    </div>
                    
                    <Boton text = 'Guardar' onClick={ajustarProducto} isNormal = {true}/>
                </div>

                <DiffTabla
                    listItems1 = {productosActuales}
                    listItems2= {productosAjustados}
                    setIdSelected = {setIdItemSeleccionado}
                    compare={ {cantidad: true}}
                    />
                <div className='ml-auto'>
                    <Boton text='Guardar cambios' onClick={guardarCambios} /> 
                </div>
            </div>
            <div className="w-fit h-fit mt-3 mr-4 py-3 px-2 rounded-xl border-2">
                <MostrarImagen imagenes={[]} />
                <h1 className='mt-3 text-lg font-semibold'>Nombre del producto aqui</h1>

            </div>
        </div>
    )
    
}
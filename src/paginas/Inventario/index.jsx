import { ContextInventario } from "../../contextInventario"
import { useContext, useEffect } from "react"
import { useState } from "react"

import { FaSearch, FaTrash} from "react-icons/fa"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"

import Tabla from "../../componentes/Tabla"
import InputText from "../../componentes/InputText"
import Boton from "../../componentes/Boton"
import BotonIcono from "../../componentes/BotonIcono"
import ModalCrearProducto from "../../componentes/Modales/ModalCrearProducto"
import ModalModificarProducto from "../../componentes/Modales/ModalModificarProducto"
import { FiltradoDatos } from "../../serviciosYFunciones/filtradoDatos"
import MostrarImagen from "../../componentes/MostrarImagen"
import { fetchManager} from "../../serviciosYFunciones/fetchFunciones"
import CambiarPagina from "../../componentes/CambiarPagina"

import Select from "../../componentes/Select"
import InputLista from "../../componentes/InputLista"
import { IdNumber } from "../../utils/numeros"
import InputNumber from "../../componentes/InputNumber"




const columnasObjeto = {
        id: 'ID',
        nombre: 'Nombre',
        marca: 'Marca',
        categoria: 'Categoria',
        medida: 'Medida',
        precio_compra: 'Precio Compra',
        precio_venta: 'Precio Venta',
        cantidad: 'Cantidad',
        total: 'Total'
    }

const columnasObjeto2 = [
    {id: "id", nombre: "ID"},
    {id: "nombre", nombre: "Nombre"},
    {id: "categoria", nombre: "Categoria"},
    {id: "medida", nombre: "Medida"},
    {id: "precio_compra", nombre: "Precio Compra"},
    {id: "precio_venta", nombre: "Precio Venta"},
    {id: "cantidad", nombre: "Cantidad"},
    {id: "total", nombre: "Total"}
]


const columns = [
    'id',
    'nombre',
    'categoria',
    'medida',
    'precio_compra',
    'precio_venta',
    'cantidad',
    'total'
]

const defaultLimite = 20
const defaultOffset = 0

export default function Inventario() {
    const {
        productos,
        ordenOpciones,
        medidas,
        categorias,
        limiteOpciones
    } = useContext(ContextInventario)

    const [busquedaNombre, setBusquedaNombre] = useState(null)
    const [busquedaCategoria, setBusquedaCategoria] = useState(null)
    const [busquedaId, setBusquedaId] = useState(null)
    const [busquedaMedida, setBusquedaMedida] = useState(null)


    const [productosFiltrados, setProductosFiltrados] = useState([])
    const [productosOrdenados, setProductosOrdenados] = useState(productosFiltrados)

    const [productoSeleccionado, setProductoSeleccionado] = useState({})
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null)
    const [imagenes, setImagenes] = useState([])

    const [pagina, setPagina] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [limite, setLimite] = useState(defaultLimite)
    const [offset, setOffset] = useState(defaultOffset)

    const [showModalCrear, setShowModalCrear] = useState(false)
    const [showModalModificar, setShowModalModificar] = useState(false)


    const [propiedadOrden, setPropiedadOrden] = useState("id")
    const [orden, setOrden] = useState("DESC")

    function filtrarDatos() {
        let datosFiltrados = FiltradoDatos.filtroCadena(productos, "nombre", busquedaNombre)
        datosFiltrados = FiltradoDatos.filtroCadena(datosFiltrados, "categoria", busquedaCategoria)
        datosFiltrados = FiltradoDatos.filtroCadena(datosFiltrados, "medida", busquedaMedida)
        datosFiltrados = FiltradoDatos.filtroNumero(datosFiltrados, "id", busquedaId)
        setProductosFiltrados(datosFiltrados)
    }

    useEffect(()=> {
        setProductosFiltrados(productos)
    }, [productos])

    useEffect(()=> {
        const numeroPaginas = Math.ceil(productosFiltrados.length / parseInt(limite))
        setTotalPaginas(numeroPaginas)
        setPagina(0)
        setOffset(0)
    }, [productosFiltrados, limite])

    useEffect(()=>{
        if (idProductoSeleccionado){
            setProductoSeleccionado(productos.find(producto => producto.id == idProductoSeleccionado))

            function cbObtenerUrlImagagenes(resData){
                setImagenes(resData)
            }
            fetchManager(`http://localhost:3000/api/v1/productos/${idProductoSeleccionado}/imagenes`, cbObtenerUrlImagagenes)
        }
    }, [idProductoSeleccionado, productos])


    useEffect(() => {
    if (productosFiltrados.length > 0) {
        const datosOrdenados = [...productosFiltrados].sort((a, b) => {
            // Si los valores son números, hacer comparación numérica
            if (typeof a[propiedadOrden] === 'number') {
                return orden === "ASC" 
                    ? a[propiedadOrden] - b[propiedadOrden]
                    : b[propiedadOrden] - a[propiedadOrden];
            }
            // Si son strings, hacer comparación alfabética
            return orden === "ASC"
                ? String(a[propiedadOrden]).localeCompare(String(b[propiedadOrden]))
                : String(b[propiedadOrden]).localeCompare(String(a[propiedadOrden]));
        });
        setProductosOrdenados(datosOrdenados);
    }
}, [productosFiltrados, propiedadOrden, orden]);


    function limipiarBusquedas(){
        setBusquedaNombre(null)
        setBusquedaCategoria(null)
        setBusquedaId(null)
        setBusquedaMedida(null)
    }

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-1 overflow-auto">
            <div className="flex items-center gap-3">
                <div>
                    <MostrarImagen imagenes = {imagenes}/>
                </div>

                <div className="flex w-full flex-col gap-8 justify-center">
                    <h2 className="titulo">Lista de productos</h2>
                    <div className="flex w-full gap-4 items-center">
                        <div className="flex gap-1 items-center">
                            <BotonIcono icon={<FaChevronLeft/>}/>
                            <InputNumber
                            style="w-20" 
                            label1="Id" 
                            label2={productoSeleccionado.id}
                            value={busquedaId} 
                            setValue={setBusquedaId}
                            instanceNumber={IdNumber}
                            />
                            <BotonIcono icon={<FaChevronRight/>} />
                        </div>
                        <InputLista
                            listItems={productos}
                            value={busquedaNombre}
                            setValue={setBusquedaNombre}
                            setIdSelected={setIdProductoSeleccionado}
                            label={"Nombre producto"}
                        />
                        <InputLista 
                            style="w-72"
                            label="Categoria" 
                            value={busquedaCategoria} 
                            setValue={setBusquedaCategoria} 
                            label2={productoSeleccionado.categoria}
                            listItems={categorias}
                            />

                    </div>
                    <div className="flex w-full items-center justify-between gap-3">
                        <div className="flex gap-3">
                            
                            <InputLista
                            label="Medida"
                            style="w-72"
                            value={busquedaMedida}
                            setValue={setBusquedaMedida}
                            label2={productoSeleccionado.medida}
                            listItems = {medidas}
                            />
                            
                            <BotonIcono icon={<FaSearch className=""/>} onClick={filtrarDatos} isNormal={true}/>
                            <BotonIcono icon={<FaTrash/>} onClick={limipiarBusquedas} isNormal={true}/>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Boton onClick={()=>( idProductoSeleccionado? setShowModalModificar(true): null)} text="Modificar" isNormal={true}/>
                            <Boton onClick={()=>setShowModalCrear(true)} text={"Agregar"} isNormal={true}/>   
                        </div>
                                         
                    </div>
                    <div className="justify-between flex mt-3">
                        <CambiarPagina
                            page={pagina}
                            setPage={setPagina}
                            totalPage={totalPaginas}
                            limit={limite}
                            setOffset={setOffset}
                            />
                        <div className="flex gap-3">
                            <Select 
                                listItems={columnasObjeto2}
                                label={"Columna"}
                                setValue={setPropiedadOrden}
                                defaultValue={"id"}/>
                            <Select
                                listItems={limiteOpciones}
                                label={"No. Filas"}
                                setValue={setLimite}
                                defaultValue={defaultLimite}/>
                            <Select 
                                listItems={ordenOpciones}
                                label={"Ordenar"}
                                setValue={setOrden}
                                defaultValue={"DESC"}/>
                        </div>

                        
                        
                    </div>
                </div>
            </div>
            <div className="w-full overflow-auto text-md ">
                <Tabla
                    listItems = {productosOrdenados.slice(offset, offset + parseInt(limite))}
                    setIdSelected={setIdProductoSeleccionado}
                    rename = {columnasObjeto}
                    columns={columns}
                />
                
            </div>
            
            {
                showModalCrear && <ModalCrearProducto setShowModal={setShowModalCrear}/> ||
                showModalModificar && <ModalModificarProducto setShowModal={setShowModalModificar} productoSeleccionado={productoSeleccionado} imagenes={imagenes}/>
            }
        </div>
    )
}


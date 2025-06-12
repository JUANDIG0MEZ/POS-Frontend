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
    {id: "marca", nombre: "Marca"},
    {id: "categoria", nombre: "Categoria"},
    {id: "medida", nombre: "Medida"},
    {id: "precio_compra", nombre: "Precio Compra"},
    {id: "precio_venta", nombre: "Precio Venta"},
    {id: "cantidad", nombre: "Cantidad"},
    {id: "total", nombre: "Total"}
]

const limiteObjeto = [
    {id: "10", nombre: 10},
    {id: "20", nombre: 20},
    {id: "30", nombre: 30},
    {id: "50", nombre: 50},
    {id: "100", nombre: 100}]


const defaultLimite = "20"
const defaultOffset = "0"

export default function Inventario() {
    const {
        productos,
        ordenOpciones
    } = useContext(ContextInventario)




    // const [isColumnasVisible, setIsColumnasVisible] = useState(columnas)
    const [busquedaNombre, setBusquedaNombre] = useState(null)
    const [busquedaMarca, setBusquedaMarca] = useState(null)
    const [busquedaCategoria, setBusquedaCategoria] = useState(null)
    const [busquedaId, setBusquedaId] = useState(null)
    const [busquedaMedida, setBusquedaMedida] = useState(null)


    const [productosFiltrados, setProductosFiltrados] = useState([])
    const [productosOrdenados, setProductosOrdenados] = useState(productosFiltrados)

    const [productoSeleccionado, setProductoSeleccionado] = useState({})
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState("")
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
        datosFiltrados = FiltradoDatos.filtroCadena(datosFiltrados, "marca", busquedaMarca)
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
        setBusquedaMarca(null)
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
                            <BotonIcono texto={<FaChevronLeft/>}/>
                            <InputText
                            estilo="w-20" 
                            label="Id" 
                            valor={busquedaId} 
                            setValor={setBusquedaId} 
                            isNumber = {true} 
                            labelSeleccionado={productoSeleccionado.id}/>
                            <BotonIcono texto={<FaChevronRight/>} />
                        </div>
                        <InputLista
                            lista={productos}
                            valor={busquedaNombre}
                            setValor={setBusquedaNombre}
                            setIdSeleccionado={setIdProductoSeleccionado}
                            label={"Nombre producto"}
                        />

                        <InputText
                        label="Marca"
                        estilo= "w-80"
                        valor={busquedaMarca}
                        setValor={setBusquedaMarca}
                        labelSeleccionado={productoSeleccionado.marca}/>

                    </div>
                    <div className="flex w-full items-center justify-between gap-3">
                        <div className="flex gap-3">
                            <InputText 
                            estilo="w-72"
                            label="Categoria" 
                            valor={busquedaCategoria} 
                            setValor={setBusquedaCategoria} 
                            labelSeleccionado={productoSeleccionado.categoria}/>
                            <InputText
                            label="Medida"
                            estilo="w-72"
                            valor={busquedaMedida}
                            setValor={setBusquedaMedida}
                            labelSeleccionado={productoSeleccionado.medida}/>
                            
                            <BotonIcono texto={<FaSearch className=""/>} onClick={filtrarDatos} isNormal={true}/>
                            <BotonIcono texto={<FaTrash/>} onClick={limipiarBusquedas} isNormal={true}/>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Boton onClick={()=>setShowModalModificar(true)} texto="Modificar" isNormal={true}/>
                            <Boton onClick={()=>setShowModalCrear(true)} texto={"Agregar"} isNormal={true}/>   
                        </div>
                                         
                    </div>
                    <div className="justify-between flex mt-3">
                        <CambiarPagina
                            pagina={pagina}
                            setPagina={setPagina}
                            totalPaginas={totalPaginas}
                            limite={limite}
                            setLimite={setLimite}
                            setOffset={setOffset}
                            />
                        <div className="flex gap-3">
                            <Select 
                                opciones={columnasObjeto2}
                                label={"Columna"}
                                setValor={setPropiedadOrden}
                                valorDefault={"id"}/>
                            <Select
                                opciones={limiteObjeto}
                                label={"No. Filas"}
                                setValor={setLimite}
                                valorDefault={defaultLimite}/>
                            <Select 
                                opciones={ordenOpciones}
                                label={"Ordenar"}
                                setValor={setOrden}
                                valorDefault={"DESC"}/>
                        </div>

                        
                        
                    </div>
                </div>
            </div>
            <div className="w-full px-2">
            </div>
            <div className="w-full overflow-auto text-md ">
                <Tabla
                    datos = {productosOrdenados.slice(offset, offset + parseInt(limite))}
                    setIdItemSeleccionado={setIdProductoSeleccionado}
                    rename = {columnasObjeto}
                />
                
            </div>
            
            {
                showModalCrear && <ModalCrearProducto setShowModal={setShowModalCrear}/> ||
                showModalModificar && <ModalModificarProducto setShowModal={setShowModalModificar} productoSeleccionado={productoSeleccionado} imagenes={imagenes}/>
            }
        </div>
    )
}


import { ContextInventario } from "../../contextInventario"
import { useContext, useEffect } from "react"
import { useState } from "react"

import Tabla from "../../componentes/Tabla"
import InputText from "../../componentes/InputText"
import Boton from "../../componentes/Boton"
import HabilitadorTabla from "../../componentes/HablitadorTabla"
import ModalCrearProducto from "../../componentes/Modales/ModalCrearProducto"
import ModalModificarProducto from "../../componentes/Modales/ModalModificarProducto"
import { FiltradoDatos } from "../../servicios/filtradoDatos"

import CrudDatosProductos from "../../servicios/crudDatosProductos"

const urlImage = "https://files.porsche.com/filestore/image/multimedia/none/992-gt3-rs-modelimage-sideshot/model/cfbb8ed3-1a15-11ed-80f5-005056bbdc38/porsche-model.png"
const urlImage2 = "https://www.mercedes-benz.com.co/mercedes/site/artic/20230718/imag/foto_0000001120230718122321/gexterior_4m.jpg"

export default function Inventario() {
    const {
        productos
    } = useContext(ContextInventario)
    const columnas = {
        'id': true,
        'nombre': true,
        'marca': true,
        'categoria': true,
        'medida': true,
        'precioCompra': true,
        'precioVenta': true,
        'cantidad': true,
        'total': true,
    }

    const [isColumnasVisible, setIsColumnasVisible] = useState(columnas)
    const [busquedaNombre, setBusquedaNombre] = useState("")
    const [busquedaMarca, setBusquedaMarca] = useState("")
    const [busquedaCategoria, setBusquedaCategoria] = useState("")
    const [busquedaId, setBusquedaId] = useState("")
    const [busquedaMedida, setBusquedaMedida] = useState("")
    const [productosFiltrados, setProductosFiltrados] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState([])
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState("")
    const [imagen, setImagen] = useState("")

    const [showModalCrear, setShowModalCrear] = useState(false)
    const [showModalModificar, setShowModalModificar] = useState(false)

    useEffect(()=>{
        let datosFiltrados = FiltradoDatos.filtroCadena(productos, "nombre", busquedaNombre)
        datosFiltrados = FiltradoDatos.filtroCadena(datosFiltrados, "marca", busquedaMarca)
        datosFiltrados = FiltradoDatos.filtroCadena(datosFiltrados, "categoria", busquedaCategoria)
        datosFiltrados = FiltradoDatos.filtroCadena(datosFiltrados, "medida", busquedaMedida)
        datosFiltrados = FiltradoDatos.filtroNumero(datosFiltrados, "id", busquedaId)
        setProductosFiltrados(datosFiltrados)
    }, [productos, busquedaNombre, busquedaMarca, busquedaCategoria, busquedaMedida, busquedaId])

    useEffect(()=>{
        const dato = CrudDatosProductos.encontrarPorId(idProductoSeleccionado, productos) 
        if (dato){
            setProductoSeleccionado(dato)

            if (imagen === urlImage){
                setImagen(urlImage2)
            }
            else{
                setImagen(urlImage)
            }
        }
        
    }, [idProductoSeleccionado])



    function limipiarBusquedas(){
        setBusquedaNombre("")
        setBusquedaMarca("")
        setBusquedaCategoria("")
        setBusquedaId("")
        setBusquedaMedida("")
    }

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <div className="flex items-cente justify-between h-56 w-full mx-auto gap-4">
                <figure className="h-52 w-[400px]">
                    <img className="h-full w-full object-contain border rounded-xl" src={imagen} alt="" />
                </figure>

                <div className="flex flex-col h-full w-full gap-6 justify-center">
                    <h2 className="text-2xl font-semibold w-full text-left mb-2">ENCONTRAR PRODUCTOS</h2>
                    <div className="flex w-full gap-4 items-center">
                        <div className="flex gap-1 items-center">
                            <Boton texto="<" isNormal={true}/>
                            <InputText
                            estilo="w-20" 
                            label="Id" 
                            valor={busquedaId} 
                            setValor={setBusquedaId} 
                            isNumber = {true} 
                            labelSeleccionado={productoSeleccionado.id}/>
                            <Boton texto=">" isNormal={true}/>
                        </div>
                        <InputText
                        label="Nombre" 
                        valor={busquedaNombre}
                        setValor={setBusquedaNombre} 
                        labelSeleccionado={productoSeleccionado.nombre}
                        />
                        <InputText
                        label="Marca"
                        estilo= "w-80"
                        valor={busquedaMarca}
                        setValor={setBusquedaMarca}
                        labelSeleccionado={productoSeleccionado.marca}/>

                    </div>
                    <div className="flex w-full items-center justify-between gap-3">
                        <InputText 
                        estilo="w-72"
                        label="Categoria" 
                        valor={busquedaCategoria} 
                        setValor={setBusquedaCategoria} 
                        labelSeleccionado={productoSeleccionado.categoria}/>
                        <InputText
                        label="Medida"
                        valor={busquedaMedida}
                        setValor={setBusquedaMedida}
                        labelSeleccionado={productoSeleccionado.medida}/>

                        <Boton texto="Limpiar" onClick={limipiarBusquedas} isNormal={true}/>
                        

                        <Boton texto="Eliminar" isNormal={true}/>
                        <Boton onClick={()=>setShowModalModificar(true)} texto="Modificar" isNormal={true}/>
                        <Boton onClick={()=>setShowModalCrear(true)} texto="Agregar" isNormal={false}/>
                        
                    </div>
                </div>
            </div>
            <div className="w-full px-2">
                <HabilitadorTabla isVisible = {isColumnasVisible} setVisible={setIsColumnasVisible}/>
            </div>
            <div className="w-full overflow-auto p-1 text-md mb-10">
                <Tabla
                    datos = {productosFiltrados}
                    isVisible = {isColumnasVisible}
                    setIdItemSeleccionado={setIdProductoSeleccionado}
                    total = {4500000}
                />
            </div>
            {
                showModalCrear && <ModalCrearProducto setShowModal={setShowModalCrear}/> ||
                showModalModificar && <ModalModificarProducto setShowModal={setShowModalModificar} productoSeleccionado={productoSeleccionado}/>
            }
        </div>
    )
}


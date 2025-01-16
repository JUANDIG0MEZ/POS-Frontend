import { ContextInventario } from "../../contextInventario"
import { useContext, useEffect } from "react"
import { useState } from "react"

import Tabla from "../../componentes/Tabla"
import InputText from "../../componentes/InputText"
import Boton from "../../componentes/Boton"
import HabilitadorTabla from "../../componentes/HablitadorTabla"

import { FiltradoDatosProductos } from "../../servicios/filtradoDatos"

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
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState({})
    const [imagen, setImagen] = useState("")

    useEffect(()=>{
        setProductosFiltrados([...productos])
    }, [productos])

    useEffect(()=>{
        setProductosFiltrados(FiltradoDatosProductos.fullFiltrado([...productos], busquedaNombre, busquedaMarca, busquedaCategoria))
    }, [productos, busquedaNombre, busquedaMarca, busquedaCategoria, busquedaMedida, busquedaId])

    useEffect(()=>{
        if (productoSeleccionado.id !== undefined){
            if (imagen === urlImage){
                setImagen(urlImage2)
            }
            else{
                setImagen(urlImage)
            }
            setBusquedaId(productoSeleccionado.id)
        }
        
    }, [productoSeleccionado])

    useEffect(()=>{
        console.time("buscando producto")
        const dato = CrudDatosProductos.encontrarPorId(idProductoSeleccionado, productos) 
        console.timeEnd("buscando producto")
        if (dato){
            setProductoSeleccionado(dato)
        }
    }, [idProductoSeleccionado])


    return (
        <>
            <div className="h-screen flex flex-col max-w-5xl min-w-[1200px] mx-auto px-5 py-3 gap-3">
                <div className="flex items-center justify-between h-64 w-full mx-auto gap-4">
                    <figure className="h-full w-[500px]">
                        <img className="h-full w-full object-contain border rounded-xl" src={imagen} alt="" />
                    </figure>

                    <div className="flex flex-col h-full w-full justify-between items-center gap-7">
                        <div className="w-full">
                            <h2 className="text-2xl font-semibold">Buscar Producto</h2>
                        </div>
                        <div className="flex w-full gap-4">
                            <InputText label="Nombre" setValor={setBusquedaNombre} valor={busquedaNombre}></InputText>
                            <div className="flex gap-1">
                                <Boton texto="<" isNormal={true}></Boton>
                                <InputText label="Id" setValor={setBusquedaId} valor={busquedaId}></InputText>
                                <Boton texto=">" isNormal={true}></Boton>
                            </div>
                        </div>
                        <div className="flex w-full gap-3">
                            
                            <InputText label="Marca" setValor={setBusquedaMarca} valor={busquedaMarca} ></InputText>
                            <InputText label="Categoria" setValor={setBusquedaCategoria} valor={busquedaCategoria}></InputText>
                            <InputText label="Medida" setValor={setBusquedaMedida} valor={busquedaMedida}></InputText>
                        </div>
                        <div className="w-full flex">
                            <Boton texto="Cancelar" isNormal={true}></Boton>
                            <div className="w-full flex aling-right gap-4 justify-end">
                                <Boton texto="Eliminar" isNormal={true}></Boton>
                                <Boton texto="Modificar" isNormal={true}></Boton>
                                <Boton texto="Agregar" isNormal={false}></Boton>
                            </div>
                            
                            
                        </div>
                    </div>

                </div>
                <div className="w-full px-2">
                    <HabilitadorTabla isVisible = {isColumnasVisible} setVisible={setIsColumnasVisible}></HabilitadorTabla>
                </div>
                <div className="w-full">
                    <Tabla
                    datos = {productosFiltrados}
                    isVisible = {isColumnasVisible}
                    setItemSeleccionado={setIdProductoSeleccionado}
                    itemSeleccionado={idProductoSeleccionado}
                    ></Tabla>
                </div>
                
            </div>
        </>
    )
}

import { useEffect, useState, useContext } from "react";
import Tabla from "../../componentes/Tabla";
import FechaInput from "../../componentes/FechaInput";
import InputNumber from "../../componentes/InputText";
import InputLista from "../../componentes/InputLista";
import CambiarPagina from "../../componentes/CambiarPagina";
import {FaSearch, FaShoppingCart} from "react-icons/fa"
import BotonIcono from "../../componentes/BotonIcono";
import {Link, useNavigate } from "react-router-dom";
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones";

import Select from "../../componentes/Select";

import { ContextInventario } from "../../contextInventario";

const renombrar = {
        id: 'ID',
        fecha: 'Fecha',
        hora: 'Hora',
        cliente: 'Cliente',
        por_pagar: 'Por pagar',
        total: 'Total',
        estado_entrega: 'Estado entrega',
        estado_pago: 'Estado pago',
        direccion: 'Direccion'
    }

const columnasObjeto = [
    {id: "venta_id", nombre: "ID"},
    {id: "por_pagar", nombre: "Por Pagar"},
]


const limiteObjeto = [
    {id: "10", nombre: 10},
    {id: "20", nombre: 20},
    {id: "30", nombre: 30},
    {id: "50", nombre: 50}]


const defaultColumn = "venta_id"
const defaultOrden = "DESC"
const defaultLimite = "20"
const defaultOffset = "0"
const defaultEstadoEntrega = "0"
const defaultEstadoPago = "0"




export default function Ventas(){

    const{
        estadosVentasEntrega,
        estadosVentasPago,
        clientesNombres,
        ordenOpciones,
    } = useContext(ContextInventario)

    const navigate = useNavigate()
    const [facturas, setFacturas] = useState([])

    

    const [idSeleleccionado, setIdSeleccionado] = useState(null)
    const [id, setId] = useState(null)
    const [nombreCliente, setNombreCliente] = useState(null)

    // Paginacion
    const [pagina, setPagina] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [limite, setLimite] = useState(defaultLimite)
    const [offset, setOffset] = useState(defaultOffset)

    // Filtros
    const [orden, setOrden] = useState(defaultOrden)
    const [columna, setColumna] = useState(defaultColumn)
    const [idCliente, setIdCliente] = useState(null)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    const [ idEstadoEntrega , setIdEstadoEntrega ] = useState(defaultEstadoEntrega)
    const [ idEstadoPago , setIdEstadoPago ] = useState(defaultEstadoPago)

    useEffect(() => {
        realizarPeticion()
    }, [offset])

    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/venta/${idSeleleccionado}`)
        }
    }, [idSeleleccionado, navigate])


    function realizarPeticion(){
        const paginacion = `limit=${limite}&offset=${offset}`

        const filtro = {
            ...(id && {venta_id: id}),
            ...(fechaInicio && {fechaInicio: fechaInicio}),
            ...(fechaFinal && {fechaFinal: fechaFinal}),
            ...(idCliente && {cliente_id: idCliente}),
            ...(idEstadoEntrega && {estado_entrega_id: idEstadoEntrega}),
            ...(idEstadoPago && {estado_pago_id: idEstadoPago}),
            ...(columna && {columna: columna}),
            ...(orden && {orden: orden}),
            
        }

        const filtroTexto = Object.entries(filtro).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');

        const params = `${paginacion}&${filtroTexto}`

        function cbVentas(respuesta){
            setTotalPaginas(Math.ceil(respuesta.count / limite))
            setFacturas(respuesta.rows)
        }
        fetchManager(`http://localhost:3000/api/v1/venta?${params}`, cbVentas, "GET")
    }

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-2 overflow-auto">
            <h1 className="titulo mb-5">Facturas de venta</h1>

            <div className="flex items-center gap-3">
                <div className="w-24">
                    <InputNumber label={"Id"} value = {id} setValue = {setId} />
                </div>

                <div className="flex gap-3">
                    <FechaInput label={"Desde"} value = {fechaInicio} setValue= {setFechaInicio}/>
                    <FechaInput label={"Hasta"} value= {fechaFinal} setValue= {setFechaFinal}/>
                </div>

                <InputLista listItems={clientesNombres} label={"Nombre cliente"} setValue={setNombreCliente} value={nombreCliente} setIdSeleccionado={setIdCliente}/>

                <Select 
                    label={"Estado entrega"}
                    listItems={estadosVentasEntrega}
                    setValue={setIdEstadoEntrega}
                    // value={idEstadoEntrega}
                    defaultValue={0}/>

                <Select 
                    label={"Estado entrega"}
                    listItems={estadosVentasPago}
                    setValue={setIdEstadoPago}
                    value={idEstadoPago}
                    defaultValue={0}/>
                
                <BotonIcono icon={<FaSearch/>} onClick={() => {      
                    if (offset == 0) {
                        realizarPeticion()
                    }
                    setPagina(0)
                    setOffset(0)
                }}/>
                <Link className="" to={'/vender'}><BotonIcono icon={<FaShoppingCart/>}/></Link>

            </div>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    

                    <Select
                        label={"Columna"}
                        listItems={columnasObjeto}
                        setValue={setColumna}
                        value={columna}
                        defaultValue={defaultColumn}
                    />

                    <Select 
                        label={"No. Filas"}
                        listItems={limiteObjeto}
                        setValue={setLimite}
                        value={limite}
                        defaultValue={defaultLimite}
                    />
                    <Select 
                        label={"Orden"}
                        listItems={ordenOpciones}
                        setValue={setOrden}
                        value={orden}
                        defaultValue={defaultOrden}
                    />

                </div>
                <div>
                    <CambiarPagina 
                    page={pagina}
                    setPage={setPagina}
                    setOffset={setOffset}
                    limit={limite} 
                    totalPage={totalPaginas}
                    />
                </div>
                
                
            </div>
            
            <div className="overflow-auto h-full">
                <Tabla
                    listItems={facturas}
                    setIdSelected={setIdSeleccionado}
                    rename = {renombrar}
                    />
            </div>
        </div>
    )
}
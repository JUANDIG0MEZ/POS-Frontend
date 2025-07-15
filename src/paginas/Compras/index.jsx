import { useEffect, useState, useContext, useRef } from "react";
import Tabla from "../../componentes/Tabla";
import FechaInput from "../../componentes/FechaInput";
import InputNumber from "../../componentes/InputNumber";
import InputLista from "../../componentes/InputLista";
import BotonIcono from "../../componentes/BotonIcono";
import {Link, useNavigate } from "react-router-dom";
import { FiltradoDatos } from "../../serviciosYFunciones/filtradoDatos";
import { fetchManager} from "../../serviciosYFunciones/fetchFunciones";
import { FaSearch, FaShoppingCart} from "react-icons/fa";
import CambiarPagina from "../../componentes/CambiarPagina";

import Select from "../../componentes/Select";

import { ContextInventario } from "../../contextInventario";
import { IdNumber } from "../../utils/numeros";


const renombrar = {
    id: 'ID',
    fecha: 'Fecha',
    hora: 'Hora',
    cliente: 'Cliente',
    pagado: 'Pagado',
    total: 'Total',
    estado_entrega: 'Estado entrega',
    estado_pago: 'Estado pago',
    por_pagar: 'Por Pagar',
    nombre_cliente: 'Nombre del proveedor',
    metodo_entrega: 'Estado entrega'
}


const estadosPagoObjeto = {
    0: "Por Pagar",
    1: "Pagado",
}

const columnasObjeto = [
    {id: "compra_id", nombre: "ID"},
    {id: "por_pagar", nombre: "Por Pagar"}
]

const columns = [
    'id',
    'fecha',
    'nombre_cliente',
    'estado_entrega',
    'estado_pago',
    'por_pagar',
    'total',
]

const defaultColumn = "compra_id"
const defaultOrden = "DESC"
const defaultlimite = 20
const defaultOffset = 0
const defaultEstadoEntrega = 0
const defaultEstadoPago = 0

export default function Compras(){

    const{
        estadosComprasEntrega,
        estadosComprasPago,
        clientesNombres,
        ordenOpciones,
        limiteOpciones
    } = useContext(ContextInventario)
    const navigate = useNavigate()

    const [facturas, setFacturas] = useState([])
    const [idSeleleccionado, setIdSeleccionado] = useState(null)
    const [id, setId] = useState(null)

    const [nombreCliente, setNombreCliente] = useState(null)
    
    // Paginacion

    const [pagina, setPagina] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)
  
    const [limite, setLimite] = useState(defaultlimite)
    const [offset, setOffset] = useState(defaultOffset)
    const [columna, setColumna] = useState(defaultColumn)
    const [orden, setOrden] = useState(defaultOrden)

    // Filtros
    const [idCliente, setIdCliente] = useState(null)
    const [idEstadoPago, setIdEstadoPago] = useState(defaultEstadoPago)
    const [idEstadoEntrega, setIdEstadoEntrega] = useState(defaultEstadoEntrega)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    
    useEffect(() => {
        realizarPeticion()
    }, [offset])

    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/compra/${idSeleleccionado}`)
        }
    }, [idSeleleccionado, navigate])

    function realizarPeticion(){
        const paginacion = `limit=${limite}&offset=${offset}`

        const filtro = {
            ...(id && {compra_id: id}),
            ...(idCliente && {cliente_id: idCliente}),
            ...(idEstadoEntrega && {id_estado_entrega: idEstadoEntrega}),
            ...(idEstadoPago && {id_estado_pago: idEstadoPago}),
            ...(fechaInicio && {fecha_desde: fechaInicio}),
            ...(fechaFinal && {fecha_hasta: fechaFinal}),
            ...(columna && {columna: columna}),
            ...(orden && {orden: orden}),
        }

        const filtroTexto = Object.entries(filtro).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');

        const params = `${paginacion}&${filtroTexto}`


        function cbCompras(respuesta){
            setTotalPaginas(Math.ceil(respuesta.count / limite))
            setFacturas(respuesta.rows)
        }
        fetchManager(`http://localhost:3000/api/v1/compra?${params}`, cbCompras, "GET")
    }


    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-2 overflow-auto">
            <h1 className="titulo mb-5">Facturas de compra</h1>

            <div className="flex items-center gap-3">
                <div className="w-24">
                    <InputNumber label1={"Id"} value={id} setValue = {setId} instanceNumber={IdNumber}/>
                </div>
                <div className="flex gap-3">
                    <FechaInput label={"Desde"} value = {fechaInicio} setValue= {setFechaInicio}/>
                    <FechaInput label={"Hasta"} value= {fechaFinal} setValue= {setFechaFinal}/>
                </div>
                <InputLista 
                    listItems={clientesNombres}
                    label={"Nombre proveedor"}
                    setvalue={setNombreCliente}
                    setIdSelected={setIdCliente}/>
                
                <Select 
                    label={"Estado entrega"}
                    listItems={estadosComprasEntrega}
                    setvalue={setIdEstadoEntrega}
                    defaultValue={defaultEstadoEntrega}/>

                <Select 
                    label={"Estado pago"}
                    listItems={estadosComprasPago}
                    setValue={setIdEstadoPago}
                    valorDefault={defaultEstadoPago}/>

                <BotonIcono icon={<FaSearch/>}
                    onClick={()=> {
                        if (offset == 0){
                            realizarPeticion()
                        }
                        setOffset(0)
                        setPagina(0)
                    }}/>
                
                <Link className="" to={'/comprar'}><BotonIcono icon={<FaShoppingCart/>}/></Link>

            </div>

            <div className="flex justify-between">
                <div className="flex gap-3">
                    

                    <Select
                        label={"Columna"}
                        listItems={columnasObjeto}
                        setValue={setColumna}
                        defaultValue={defaultColumn}
                    />

                    <Select 
                        label={"No. Filas"}
                        listItems={limiteOpciones}
                        setValue={setLimite}
                        // valor={limite}
                        defaultValue={defaultlimite}
                    />
                    <Select 
                        label={"Orden"}
                        listItems={ordenOpciones}
                        setValue={setOrden}
                        // value={orden}
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
                setIdSelected = {setIdSeleccionado}
                rename = {renombrar}
                columns= {columns}
                />
            </div>
            
        </div>
    )
}
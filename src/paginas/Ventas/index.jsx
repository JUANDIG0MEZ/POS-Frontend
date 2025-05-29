import { useEffect, useState, useContext } from "react";
import Tabla from "../../componentes/Tabla";
import FechaInput from "../../componentes/FechaInput";
import InputNumber from "../../componentes/InputText";
import InputLista from "../../componentes/InputLista";
import CambiarPagina from "../../componentes/CambiarPagina";
import {FaSearch, FaShoppingCart} from "react-icons/fa"
import BotonIcono from "../../componentes/BotonIcono";
import {Link, useNavigate } from "react-router-dom";
import { FiltradoDatos } from "../../serviciosYFunciones/filtradoDatos";
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones";

import Select from "../../componentes/Select";

import { ContextInventario } from "../../contextInventario";



export default function Ventas(){

    const{
        estadosVentas,
        clientes
    } = useContext(ContextInventario)

    const navigate = useNavigate()
    const [facturas, setFacturas] = useState([])

    const renombrar = {
        id: 'ID',
        fecha: 'Fecha',
        hora: 'Hora',
        cliente: 'Cliente',
        pagado: 'Pagado',
        total: 'Total',
        estado: 'Estado',
        direccion: 'Direccion'
    }

    const [idSeleleccionado, setIdSeleccionado] = useState(null)
    const [id, setId] = useState(null)
    const [nombreCliente, setNombreCliente] = useState(null)             
    const [estado, setEstado] = useState(null)

    // Paginacion
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [limite, setLimite] = useState(20)
    const [offset, setOffset] = useState(0)

    // Filtros
    const [idCliente, setIdCliente] = useState(null)
    const [estadoPago, setEstadoPago] = useState(null)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    const [idEstado, setIdEstado] = useState(null)

    useEffect(()=> {
        realizarPeticion()
    }, [limite, offset])

    useEffect(() => {
        realizarPeticion()
    }, [])



    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/venta/${idSeleleccionado}`)
        }
    }, [idSeleleccionado, navigate])


    function realizarPeticion(){
        const paginacion = `limit=${limite}&offset=${offset}`

        const filtro = {
            ...(idCliente && {cliente_id: idCliente}),
            ...(idEstado && {estado_id: idEstado}),
            ...(id && {id: id}),
            ...(fechaInicio && {fecha_desde: fechaInicio}),
            ...(fechaFinal && {fecha_hasta: fechaFinal}),
            ...(estadoPago && {estado_pago: estadoPago}),
        }

        const filtroTexto = Object.entries(filtro).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');

        const params = `${paginacion}&${filtroTexto}`

        console.log("params", params)
        function cbVentas(respuesta){
            setTotalPaginas(Math.ceil(respuesta.count / limite))
            setFacturas(respuesta.rows)
        }
        fetchManager(`http://localhost:3000/api/v1/facturas/ventas?${params}`, cbVentas, "GET")
    }

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-2 overflow-auto">
            <h1 className="titulo mb-5">Facturas de venta</h1>

            <div className="flex items-center gap-3">
                <div className="w-24">
                    <InputNumber label={"Id"} valor = {id} setValor = {setId} />
                </div>

                <div className="flex gap-3">
                    <FechaInput label={"Desde"} valor = {fechaInicio} setValor= {setFechaInicio}/>
                    <FechaInput label={"Hasta"} valor= {fechaFinal} setValor= {setFechaFinal}/>
                </div>

                <InputLista lista={clientes} label={"Nombre cliente"} setValor={setNombreCliente} valor={nombreCliente} setIdSeleccionado={setIdCliente}/>

                <Select 
                    label={"Estado"}
                    opciones={estadosVentas}
                    setValor={setIdEstado}
                    valor={idEstado}
                    valorDefault={0}/>
                
                <BotonIcono texto={<FaSearch/>} onClick={()=>{
                    setPagina(1)
                    setOffset(0)
                    realizarPeticion()
                }}/>
                <Link className="" to={'/vender'}><BotonIcono texto={<FaShoppingCart/>}/></Link>

            </div>
            
            <div className="overflow-auto h-full">
                <Tabla
                    datos={facturas}
                    setIdItemSeleccionado={setIdSeleccionado}
                    rename = {renombrar}
                    />
            </div>
            <CambiarPagina 
                pagina={pagina}
                setPagina={setPagina}
                setOffset={setOffset}
                limite={10} 
                totalPaginas={totalPaginas}
                setTotalPaginas={setTotalPaginas}
                />
        </div>
    )
}
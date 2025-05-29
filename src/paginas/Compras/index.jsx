import { useEffect, useState, useContext } from "react";
import Tabla from "../../componentes/Tabla";
import FechaInput from "../../componentes/FechaInput";
import InputText from "../../componentes/InputText";
import InputLista from "../../componentes/InputLista";
import BotonIcono from "../../componentes/BotonIcono";
import {Link, useNavigate } from "react-router-dom";
import { FiltradoDatos } from "../../serviciosYFunciones/filtradoDatos";
import { fetchManager} from "../../serviciosYFunciones/fetchFunciones";
import { FaSearch, FaShoppingCart} from "react-icons/fa";
import CambiarPagina from "../../componentes/CambiarPagina";

import Select from "../../componentes/Select";

import { ContextInventario } from "../../contextInventario";


const renombrar = {
    id: 'ID',
    fecha: 'Fecha',
    hora: 'Hora',
    cliente: 'Cliente',
    pagado: 'Pagado',
    total: 'Total',
    estado: 'Estado',
    por_pagar: 'Por Pagar',
}


const columnasObjeto = [
    {id: "id", nombre: "ID"},
    {id: "fecha", nombre: "Fecha"},
    {id: "hora", nombre: "Hora"},
    {id: "cliente", nombre: "Cliente"},
    {id: "estado_id", nombre: "Estado"},
    {id: "estado_pago", nombre: "Estado Pago"},
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





export default function Compras(){

    const{
        estadosCompras,
        clientes
    } = useContext(ContextInventario)
    const navigate = useNavigate()

    const [facturas, setFacturas] = useState([])
    const [idSeleleccionado, setIdSeleccionado] = useState(null)
    const [id, setId] = useState(null)




    const [nombreCliente, setNombreCliente] = useState(null)
    
    
    // Paginacion

    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [limite, setLimite] = useState(20)
    const [offset, setOffset] = useState(0)
    const [columna, setColumna] = useState("id")

    // Filtros
    const [idCliente, setIdCliente] = useState(null)
    const [estadoPago, setEstadoPago] = useState(null)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    const [idEstado, setIdEstado] = useState(null)


    useEffect(() => {
        realizarPeticion()
    }, [])

    

    useEffect(()=> {
        realizarPeticion()
    }, [limite, offset])




    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/compra/${idSeleleccionado}`)
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
        function cbCompras(respuesta){
            setTotalPaginas(Math.ceil(respuesta.count / limite))
            setFacturas(respuesta.rows)
        }
        fetchManager(`http://localhost:3000/api/v1/facturas/compras?${params}`, cbCompras, "GET")
    }

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-2 overflow-auto">
            <h1 className="titulo mb-5">Facturas de compra</h1>

            <div className="flex items-center gap-3">
                <div className="w-24">
                    <InputText label={"Id"} valor={id} setValor = {setId}/>
                </div>
                <div className="flex gap-3">
                    <FechaInput label={"Desde"} valor = {fechaInicio} setValor= {setFechaInicio}/>
                    <FechaInput label={"Hasta"} valor= {fechaFinal} setValor= {setFechaFinal}/>
                </div>
                <InputLista 
                    lista={clientes}
                    label={"Cliente"}
                    setValor={setNombreCliente}
                    valor={nombreCliente}
                    setIdSeleccionado={setIdCliente}/>
                
                <Select 
                    label={"Estado entrega"}
                    opciones={estadosCompras}
                    setValor={setIdEstado}
                    valor={idEstado}
                    valorDefault={0}/>

                <Select 
                    label={"Estado pago"}
                    opciones={columnasObjeto}
                    setValor={setColumna}
                    valor={idEstado}
                    valorDefault={0}/>

                <BotonIcono texto={<FaSearch/>} onClick={()=> {
                    setOffset(0)
                    setPagina(1)
                    realizarPeticion()}}/>
                
                <Link className="" to={'/comprar'}><BotonIcono texto={<FaShoppingCart/>}/></Link>

            </div>

            <div className="flex justify-between">
                <div className="flex gap-3">
                    <CambiarPagina 
                    pagina={pagina}
                    setPagina={setPagina}
                    setOffset={setOffset}
                    limite={limite} 
                    totalPaginas={totalPaginas}
                    setTotalPaginas={setTotalPaginas}
                    />

                    <Select
                        label={"Columna"}
                        opciones={columnasObjeto}
                        setValor={setColumna}
                        valor={columna}
                        valorDefault={"id"}
                    />

                    <Select 
                        label={"No. Filas"}
                        opciones={limiteObjeto}
                        setValor={setLimite}
                        valor={limite}
                        valorDefault={20}
                    />
                </div>
                
                
            </div>
            
            <div className="overflow-auto h-full">
            <Tabla
                datos={facturas}
                setIdItemSeleccionado = {setIdSeleccionado}
                rename = {renombrar}
                />
            </div>
            
        </div>
    )
}
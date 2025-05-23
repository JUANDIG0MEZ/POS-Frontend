import { useEffect, useState } from "react";
import Tabla from "../../componentes/Tabla";
import FechaInput from "../../componentes/FechaInput";
import InputText from "../../componentes/InputText";
import InputLista from "../../componentes/InputLista";
import BotonIcono from "../../componentes/BotonIcono";
import {Link, useNavigate } from "react-router-dom";
import { FiltradoDatos } from "../../serviciosYFunciones/filtradoDatos";
import { fetchManager} from "../../serviciosYFunciones/fetchFunciones";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import CambiarPagina from "../../componentes/CambiarPagina";

import Select from "../../componentes/Select";

const renombrar = {
    id: 'ID',
    fecha: 'Fecha',
    hora: 'Hora',
    cliente: 'Cliente',
    pagado: 'Pagado',
    total: 'Total',
    estado: 'Estado'
}


const estadoObjeto = {
    1: 'Recibido',
    2: 'No recibido'
}

export default function Compras(){

    const [facturas, setFacturas] = useState([])
    const [facturasFiltradas, setFacturasFiltradas] = useState(facturas)
    const navigate = useNavigate()

 
    const [idSeleleccionado, setIdSeleccionado] = useState(null)
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [estado, setEstado] = useState(null)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    const [idEstado, setIdEstado] = useState(null)

    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [limite, setLimite] = useState(40)
    const [offset, setOffset] = useState(0)

    

    useEffect(()=> {
        function cbCompras(respuesta){
            setTotalPaginas(Math.ceil(respuesta.count / limite))
            setFacturas(respuesta.rows)
        }

        fetchManager(`http://localhost:3000/api/v1/facturas/compras?limit=${limite}&offset=${offset}`, cbCompras, "GET")
    }, [limite, offset])

    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/compra/${idSeleleccionado}`)
        }
    }, [idSeleleccionado])

    useEffect(()=> { 
        let filtradas = FiltradoDatos.filtroNumero(facturas, 'estado_id', idEstado)
        filtradas = FiltradoDatos.filtroNumero(filtradas, 'id', id)
        filtradas = FiltradoDatos.filtroCadena(filtradas, 'cliente', nombre)
        setFacturasFiltradas(FiltradoDatos.filtroFecha(filtradas, 'fecha', fechaInicio, fechaFinal))
    }, [facturas, id, idEstado, nombre, fechaInicio, fechaFinal])

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
                
                <InputText label={"Cliente"} setValor={setNombre} valor={nombre}/>
                <Select label={"Estado"} objeto={estadoObjeto} setValor={setIdEstado} valor={idEstado}/>

                <BotonIcono texto={<FaSearch/>} onClick={()=>{}}/>
                
                <Link className="" to={'/comprar'}><BotonIcono texto={<FaShoppingCart/>}/></Link>

            </div>
            
            <div className="overflow-auto h-full">
            <Tabla
                datos={facturasFiltradas}
                setIdItemSeleccionado = {setIdSeleccionado}
                rename = {renombrar}
                />
            </div>
            <CambiarPagina 
                pagina={pagina}
                setPagina={setPagina}
                setOffset={setOffset}
                limite={limite} 
                totalPaginas={totalPaginas}
                setTotalPaginas={setTotalPaginas}
                />
        </div>
    )
}
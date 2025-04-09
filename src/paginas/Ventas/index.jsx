import { useEffect, useState } from "react";
import Tabla from "../../componentes/Tabla";
import FechaInput from "../../componentes/FechaInput";
import InputText from "../../componentes/InputText";
import InputLista from "../../componentes/InputLista";
import Boton from "../../componentes/Boton";
import {Link, useNavigate } from "react-router-dom";
import { FiltradoDatos } from "../../serviciosYFunciones/filtradoDatos";
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones";
export default function Ventas(){

    const navigate = useNavigate()
    const [facturas, setFacturas] = useState([])
    const [facturasFiltradas, setFacturasFiltradas] = useState(facturas)

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
    const [nombre, setNombre] = useState(null)
    const [estado, setEstado] = useState(null)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    const [idEstado, setIdEstado] = useState(null)

    useEffect(()=> {
        fetchManager('http://localhost:3000/api/v1/facturas/ventas', setFacturas, "GET")
    }, [])

    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/venta/${idSeleleccionado}`)
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
            <h1 className="text-2xl font-bold w-fit mb-5">FACTURAS DE VENTAS</h1>

            <div className="flex items-center gap-3">
                <div className="w-24">
                    <InputText label={"Id"} valor = {id} setValor = {setId} />
                </div>

                <div className="flex gap-3">
                    <FechaInput label={"Desde"} valor = {fechaInicio} setValor= {setFechaInicio}/>
                    <FechaInput label={"Hasta"} valor= {fechaFinal} setValor= {setFechaFinal}/>
                </div>

                <InputText 
                label={"Cliente"}
                valor = {nombre}
                setValor = {setNombre}
                />
                <div className="w-40">
                    <InputLista
                    label={"Estado"}
                    lista={[{id: 1, nombre: "Recibido"}, {id: 2, nombre: "No recibido"}]}
                    valor={estado} setValor={setEstado} setIdSeleccionado={setIdEstado}/>

                </div>
                <Link className="" to={'/vender'}><Boton texto={"Vender"}/></Link>

            </div>
            
            <div>
            <Tabla
                datos={facturasFiltradas}
                setIdItemSeleccionado={setIdSeleccionado}
                rename = {renombrar}
                />
            </div>
        </div>
    )
}
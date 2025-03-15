import { useEffect, useState } from "react";
import Tabla from "../../componentes/Tabla";
import FechaInput from "../../componentes/FechaInput";
import InputText from "../../componentes/InputText";
import InputLista from "../../componentes/InputLista";
import Boton from "../../componentes/Boton";
import {Link, useNavigate } from "react-router-dom";
import { FiltradoDatos } from "../../servicios/filtradoDatos";
import { toast} from 'sonner';
export default function Compras(){

    const [facturas, setFacturas] = useState([])
    const [facturasFiltradas, setFacturasFiltradas] = useState(facturas)
    const navigate = useNavigate()

    const renombrar = {
        id: 'ID',
        fecha: 'Fecha',
        hora: 'Hora',
        cliente: 'Cliente',
        pagado: 'Pagado',
        total: 'Total',
        estado: 'Estado'
    }

    const [idSeleleccionado, setIdSeleccionado] = useState(null)
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [estado, setEstado] = useState(null)
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    const [idEstado, setIdEstado] = useState(null)

    

    useEffect(()=> {
        toast.promise(
            fetch('http://localhost:3000/api/v1/facturas/compras')
                .then(async response => {
                    if (!response.ok){
                        throw new Error(`Error ${response.status}: ${response.statusText}`)
                    }

                    const data = await response.json()
                    if (data.status === 'success'){
                        return data
                    }
                    else {
                        throw new Error(data.message)
                    }
                }),
            {
                loading: 'Cargando facturas de compras',
                success: (data) => {
                    setFacturas(data.body)
                    return `${data.body.length} Facturas cargadas`;
                },
                error: 'Error al cargar las facturas de compras'
            }
        )
    }, [])

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
            <h1 className="text-2xl font-bold w-fit mb-5">FACTURAS DE COMPRAS</h1>

            <div className="flex items-center gap-3">
                <div className="w-24">
                    <InputText label={"Id"} valor={id} setValor = {setId}/>
                </div>
                <div className="flex gap-3">
                    <FechaInput label={"Desde"} valor = {fechaInicio} setValor= {setFechaInicio}/>
                    <FechaInput label={"Hasta"} valor= {fechaFinal} setValor= {setFechaFinal}/>
                </div>
                
                <InputText label={"Cliente"} setValor={setNombre} valor={nombre}/>
                <div className="w-40">
                    <InputLista label={"Estado"} lista={[{id: 1, nombre: "Recibidos"}, {id: 2, nombre: "No recibido"}]} valor={estado} setValor={setEstado} setIdSeleccionado={setIdEstado}/>

                </div>
                
                <Link className="" to={'/comprar'}><Boton texto={"+"}/></Link>

            </div>
            
            <div>
            <Tabla
                datos={facturasFiltradas}
                setIdItemSeleccionado = {setIdSeleccionado}
                rename = {renombrar}
                />
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import Tabla from "../../componentes/Tabla";
import FechaInput from "../../componentes/FechaInput";
import InputText from "../../componentes/InputText";
import InputLista from "../../componentes/InputLista";
import Boton from "../../componentes/Boton";
import {Link, useNavigate } from "react-router-dom";
import CrudDatosFacturasVenta from "../../servicios/crudDatosFacturasVentas";

export default function Ventas(){

    const navigate = useNavigate()
    const [facturas, setFacturas] = useState([])
    const [idSeleleccionado, setIdSeleccionado] = useState(null)

    const [id, setId] = useState("")
    const [nombre, setNombre] = useState("")
    const [estado, setEStado] = useState("")


    useEffect(()=> {
        async function cargarFacturas(){
            try {
                const facturas = await CrudDatosFacturasVenta.facturas()
                setFacturas(facturas)
            }
            catch {
                console.log("Error al cargar las facturas de venta")
            }
        }
        cargarFacturas()
    }, [])

    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/venta/${idSeleleccionado}`)
        }
    }, [idSeleleccionado])

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-2 overflow-auto">
            <h1 className="text-2xl font-bold w-fit mb-5">FACTURAS DE VENTAS</h1>

            <div className="flex items-center gap-3">
                <div className="w-24">
                    <InputText
                    label={"Id"}
                    valor = {id}
                    setValor = {setId}
                    isNumber = {true}
                    />
                </div>
                <InputText 
                label={"Cliente"}
                valor = {nombre}
                setValor = {setNombre}
                />
                <div className="w-40">
                    <InputLista
                    label={"Estado"}
                    lista={["Entregado", "Por entregar"]}
                    valor={estado}
                    setValor={setEStado}/>

                </div>
                <div className="flex gap-3">
                    <FechaInput
                    label={"Desde"}/>
                    <FechaInput
                    label={"Hasta"}/>
                </div>
                <Link className="" to={'/vender'}><Boton texto={"+"}/></Link>

            </div>
            
            <div>
            <Tabla
                datos={facturas}
                setIdItemSeleccionado={setIdSeleccionado}
                />
            </div>
        </div>
    )
}
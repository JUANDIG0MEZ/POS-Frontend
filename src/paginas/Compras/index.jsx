import { useEffect, useState } from "react";
import Tabla from "../../componentes/Tabla";
import {ObtenerDatos} from "../../servicios/datos";
import FechaInput from "../../componentes/FechaInput";
import InputText from "../../componentes/InputText";
import InputLista from "../../componentes/InputLista";
import Boton from "../../componentes/Boton";
import {Link } from "react-router-dom";
export default function Compras(){

    const [facturas, setFacturas] = useState([])

    useEffect(()=> {
        setFacturas(ObtenerDatos.compras())
    }, [])
    console.log(facturas)
    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-2 overflow-auto">
            <h1 className="text-2xl font-bold w-fit mb-5">FACTURAS DE COMPRAS</h1>

            <div className="flex items-center gap-3">
                <div className="w-24">
                    <InputText label={"Id"}/>
                </div>
                
                <InputText label={"Cliente"}/>
                <div className="w-40">
                    <InputLista label={"Estado"} lista={["Entregado", "Por entregar"]} valor=""/>

                </div>
                <div className="flex gap-3">
                    <FechaInput label={"Desde"}/>
                    <FechaInput label={"Hasta"}/>
                </div>
                <Link className="" to={'/comprar'}><Boton texto={"+"}/></Link>

            </div>
            
            <div>
            <Tabla
                datos={facturas}/>
            </div>
        </div>
    )
}
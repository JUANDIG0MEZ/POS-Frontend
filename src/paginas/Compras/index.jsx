import { useEffect, useState } from "react";
import Tabla from "../../componentes/Tabla";
import FechaInput from "../../componentes/FechaInput";
import InputText from "../../componentes/InputText";
import InputLista from "../../componentes/InputLista";
import Boton from "../../componentes/Boton";
import {Link, useNavigate } from "react-router-dom";
import CrudDAtosFacturasCompra from "../../servicios/crudDatosFacturasCompra";


export default function Compras(){

    const [facturas, setFacturas] = useState([])
    const navigate = useNavigate()


    const [idSeleleccionado, setIdSeleccionado] = useState(null)
    const [id, setId] = useState("")
    const [nombre, setNombre] = useState("")
    const [estado, setEstado] = useState("")


    useEffect(()=> {
        async function cargarFacturas(){
            try {
                const facturas = await CrudDAtosFacturasCompra.facturas()
                setFacturas(facturas)
            }
            catch {
                console.log("Error al cargar las facturas de compras")
            }
        }
        cargarFacturas()
    }, [])

    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/compra/${idSeleleccionado}`)
        }
    }, [idSeleleccionado])

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-2 overflow-auto">
            <h1 className="text-2xl font-bold w-fit mb-5">FACTURAS DE COMPRAS</h1>

            <div className="flex items-center gap-3">
                <div className="w-24">
                    <InputText label={"Id"} valor={id} setValor = {setId}/>
                </div>
                
                <InputText label={"Cliente"} setValor={setNombre} valor={nombre}/>
                <div className="w-40">
                    <InputLista label={"Estado"} lista={["Entregado", "Por entregar"]} valor={estado} setValor={setEstado}/>

                </div>
                <div className="flex gap-3">
                    <FechaInput label={"Desde"}/>
                    <FechaInput label={"Hasta"}/>
                </div>
                <Link className="" to={'/comprar'}><Boton texto={"+"}/></Link>

            </div>
            
            <div>
            <Tabla
                datos={facturas}
                setIdItemSeleccionado = {setIdSeleccionado}
                />
            </div>
        </div>
    )
}
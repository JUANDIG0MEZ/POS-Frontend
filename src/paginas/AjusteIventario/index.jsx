import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import DiffTabla from "../../componentes/DiffTabla"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import InputHora from "../../componentes/InputHora"
import FechaInput from "../../componentes/FechaInput"
export default function AjusteInventario() {

    
    const { id } = useParams()
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [detallesAhora, setDetallesAhora] = useState([])
    const [detallesAntes, setDetallesAntes] = useState([])

    useEffect(()=> {
        function cb (res) {
            setFecha(res.ajuste.fecha)
            setHora(res.ajuste.hora)
            setDetallesAntes(res.detallesAntes)
            setDetallesAhora(res.detallesAhora)
        }
        fetchManager(`http://localhost:3000/api/v1/producto/ajuste/${id}`, cb, 'GET')
    }, [])

    return (
        <div className="w-[1000px] flex flex-col mx-auto gap-4">
            <h1 className="titulo mt-4">Producto ajustados</h1>
            <div className="flex gap-3">
                <FechaInput valor ={fecha} />
                <InputHora valor={hora} />
            </div>
            <h2 className="subtitulo">Producto modificados</h2>
            <DiffTabla tabla1={detallesAntes} tabla2 = {detallesAhora}  />
        </div>
    )
}
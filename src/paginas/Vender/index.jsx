import Tabla from "../../componentes/Tabla"
import {useState, useContext} from 'react'
import { ContextInventario } from "../../contextInventario"

import InputText from "../../componentes/InputText"
import Boton from "../../componentes/Boton"
import InputLista from "../../componentes/InputLista"


export default function Vender() {

    const {
        clientes
    } = useContext(ContextInventario)

    const [idCliente, setIdCliente]= useState("")
    const [nombreCliente, setNombreCliente] = useState("")
    const [direccionCliente, setDireccionCliente] = useState("")


    const [idProducto, setIdProducto]= useState("")
    const [nombreProducto, setNombreProducto] = useState("")
    const [categoriaProducto, setCategoriaProducto] = useState("")
    const [cantidadProducto, setCantidadProducto] = useState("")
    const [precioProducto, setPrecioProducto] = useState("")
    //const [totalProducto, setTotalProducto] = useState("")


    function limpiar(){
        setIdCliente("")
        setNombreCliente("")
        setDireccionCliente("")

        setIdProducto("")
        setNombreProducto("")
        setCategoriaProducto("")
        setCantidadProducto("")
        setPrecioProducto("")

    }

    return (
        <div>
            vender
        </div>
        
    )
}
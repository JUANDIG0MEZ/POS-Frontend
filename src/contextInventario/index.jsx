import { createContext, useState, useEffect } from 'react'
import { ObtenerDatos } from '../servicios/datos'
import CrudDatosProductos from '../servicios/crudDatosProductos'

const ContextInventario = createContext()


const InventarioProvider = ({children}) => {
    const [productos, setProductos] = useState([])
    const [clientes, setClientes] = useState([]) 

    useEffect(() => {
        setProductos(CrudDatosProductos.productos())
        setClientes(ObtenerDatos.clientes())
    }, [])

    return (
        <ContextInventario.Provider value={
            {
            productos,
            setProductos,
            clientes,
            setClientes
            }
        }>
            {children}
        </ContextInventario.Provider>
    )
}

export {ContextInventario, InventarioProvider}
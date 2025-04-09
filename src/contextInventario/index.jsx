import { createContext, useState, useEffect } from 'react'
import { fetchManager } from '../serviciosYFunciones/fetchFunciones'
const ContextInventario = createContext()

const InventarioProvider = ({children}) => {
    const [productos, setProductos] = useState([])
    const [clientes, setClientes] = useState([]) 

    useEffect(() => {
        fetchManager('http://localhost:3000/api/v1/productos', setProductos, "GET")
        fetchManager('http://localhost:3000/api/v1/clientes', setClientes, "GET")
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
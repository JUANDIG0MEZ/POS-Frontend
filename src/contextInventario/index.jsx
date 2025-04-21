import { createContext, useState, useEffect } from 'react'
import { fetchManager } from '../serviciosYFunciones/fetchFunciones'
const ContextInventario = createContext()

const InventarioProvider = ({children}) => {
    const [productos, setProductos] = useState([])
    const [clientes, setClientes] = useState([]) 
    const [marcas, setMarcas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [medidas, setMedidas] = useState([])

    useEffect(() => {
        fetchManager('http://localhost:3000/api/v1/productos', setProductos, "GET")
        fetchManager('http://localhost:3000/api/v1/clientes', setClientes, "GET")
        fetchManager('http://localhost:3000/api/v1/productos/marcas', setMarcas, "GET")
        fetchManager('http://localhost:3000/api/v1/productos/categorias', setCategorias, "GET")
        fetchManager('http://localhost:3000/api/v1/productos/medidas', setMedidas, "GET")
    }, [])

    return (
        <ContextInventario.Provider value={
            {
            productos,
            setProductos,
            clientes,
            setClientes,
            marcas,
            setMarcas,
            categorias,
            setCategorias,
            medidas,
            setMedidas
            
            }
        }>
            {children}
        </ContextInventario.Provider>
    )
}

export {ContextInventario, InventarioProvider}
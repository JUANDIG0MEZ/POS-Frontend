import { createContext, useState, useEffect } from 'react'
import { fetchManager } from '../serviciosYFunciones/fetchFunciones'
const ContextInventario = createContext()

const InventarioProvider = ({children}) => {
    const [productos, setProductos] = useState([])
    const [clientes, setClientes] = useState([]) 
    const [marcas, setMarcas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [medidas, setMedidas] = useState([])
    const [estadosCompras, setEstadosCompras] = useState([])
    const [estadosVentas, setEstadosVentas] = useState([])
    const [tiposClientes, setTiposClientes] = useState([])


    useEffect(() => {
        fetchManager('http://localhost:3000/api/v1/productos', setProductos, "GET")
        fetchManager('http://localhost:3000/api/v1/clientes', setClientes, "GET")
        fetchManager('http://localhost:3000/api/v1/productos/marcas', setMarcas, "GET")
        fetchManager('http://localhost:3000/api/v1/productos/categorias', setCategorias, "GET")
        fetchManager('http://localhost:3000/api/v1/productos/medidas', setMedidas, "GET")
        fetchManager('http://localhost:3000/api/v1/facturas/compras/estados', setEstadosCompras, "GET")
        fetchManager('http://localhost:3000/api/v1/facturas/ventas/estados', setEstadosVentas, "GET")
        fetchManager('http://localhost:3000/api/v1/clientes/tipos', setTiposClientes, "GET")
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
            setMedidas,
            estadosCompras,
            estadosVentas,
            tiposClientes
            
            }
        }>
            {children}
        </ContextInventario.Provider>
    )
}

export {ContextInventario, InventarioProvider}
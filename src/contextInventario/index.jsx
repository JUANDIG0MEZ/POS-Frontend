import { createContext, useState, useEffect } from 'react'
import CrudDatosProductos from '../servicios/crudDatosProductos'
import CrudDatosClientes from '../servicios/crudDatosClientes'

const ContextInventario = createContext()


const InventarioProvider = ({children}) => {
    const [productos, setProductos] = useState([])
    const [clientes, setClientes] = useState([]) 

    useEffect(() => {

        async function cargar() {
            try {
                const productos = await CrudDatosProductos.productos()
                setProductos(productos)
            } catch {
                console.log('Error al cargar productos')
            }

            try {
                const clientes = await CrudDatosClientes.clientes()
                setClientes(clientes)
            } catch {
                console.log('Error al cargar clientes')
            }
        }
        cargar()
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
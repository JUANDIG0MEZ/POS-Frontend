import { createContext, useState, useEffect } from 'react'
import {toast} from 'sonner'
const ContextInventario = createContext()


const InventarioProvider = ({children}) => {
    const [productos, setProductos] = useState([])
    const [clientes, setClientes] = useState([]) 

    useEffect(() => {
        toast.promise(
            fetch('http://localhost:3000/api/v1/productos')
                .then(async response => {
                    if (!response.ok){
                        throw new Error(`Error ${response.status}: ${response.statusText}`)
                    }

                    const data = await response.json()

                    if (data.status === 'success'){
                        return data
                    }
                    else {
                        throw new Error(data.message)
                    }
                }),
            {
                loading: 'Cargando productos',
                success: (data) => {
                    setProductos(data.body)
                    return `${data.body.length} Productos cargados`;
                },
                error: 'Error al cargar los productos'
            }   
        )

        toast.promise(
            fetch('http://localhost:3000/api/v1/clientes')
            .then(async response => {
                if (!response.ok){
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }

                const data = await response.json()

                if (data.status === 'success'){
                    return data
                }
                else {
                    throw new Error(data.message)
                }
            }),
            {
                loading: 'Cargando clientes',
                success: (data) => {
                    setClientes(data.body)
                    return `${data.body.length} Clientes cargados`;
                },
                error: 'Error al cargar los clientes'
            })

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
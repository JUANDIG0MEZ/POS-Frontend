import { createContext, useState, useEffect } from 'react'
import { fetchManager } from '../serviciosYFunciones/fetchFunciones'
const ContextInventario = createContext()

const InventarioProvider = ({children}) => {
    const [productos, setProductos] = useState([])
    const [clientesNombres, setClientesNombres] = useState([])
    const [categorias, setCategorias] = useState([])
    const [medidas, setMedidas] = useState([])
    const [estadosComprasEntrega, setEstadosComprasEntrega] = useState([])
    const [estadosComprasPago, setEstadosComprasPago] = useState([])
    const [estadosVentasPago, setEstadosVentasPago] = useState([])
    const [estadosVentasEntrega, setEstadosVentasEntrega] = useState([])
    const [tiposClientes, setTiposClientes] = useState([])
    const [metodosPago, setMetodosPago] = useState([])


    const ordenOpciones = [
        {id: "ASC", nombre: "ASC"},
        {id: "DESC", nombre: "DESC"}
    ]


    useEffect(() => {
        // function cbInit(res){
        //     setProductos(res.producto)
        //     setClientesNombres(res.clientes)
        //     setCategorias(res.productoCategoria)
        //     setMedidas(res.productoMedida)
        //     setEstadosComprasEntrega(res.compraEstadoEntrega)
        //     setEstadosComprasPago(res.compraEstadoPago)
        //     setEstadosVentasEntrega(res.ventaEstadoEntrega)
        //     setEstadosVentasPago(res.ventaEstadoPago)
        //     setTiposClientes(res.clienteTipo)
        //     setMetodosPago(res.metodoPago)
        // }
        // fetchManager('http://localhost:3000/api/v1/init', cbInit, "GET")
        
        fetchManager('http://localhost:3000/api/v1/cliente/nombre', setClientesNombres, "GET")
        fetchManager('http://localhost:3000/api/v1/producto/categoria', setCategorias, "GET")
        fetchManager('http://localhost:3000/api/v1/producto', setProductos, "GET")
        fetchManager('http://localhost:3000/api/v1/producto/medida', setMedidas, "GET")
        fetchManager('http://localhost:3000/api/v1/compra/estadoentrega', setEstadosComprasEntrega, "GET")
        fetchManager('http://localhost:3000/api/v1/compra/estadopago', setEstadosComprasPago, "GET")

        fetchManager('http://localhost:3000/api/v1/venta/estadoentrega', setEstadosVentasEntrega, "GET")
        fetchManager('http://localhost:3000/api/v1/venta/estadopago', setEstadosVentasPago, "GET")
        fetchManager('http://localhost:3000/api/v1/cliente/tipo', setTiposClientes, "GET")

        fetchManager('http://localhost:3000/api/v1/init/metodopago', setMetodosPago,"GET")
    }, [])

    return (
        <ContextInventario.Provider value={
            {
            productos,
            setProductos,
            clientesNombres,
            setClientesNombres,
            categorias,
            setCategorias,
            medidas,
            setMedidas,
            estadosComprasEntrega,
            estadosComprasPago,
            estadosVentasEntrega,
            estadosVentasPago,


            tiposClientes,
            metodosPago,


            //

            ordenOpciones
            
            }
        }>
            {children}
        </ContextInventario.Provider>
    )
}

export {ContextInventario, InventarioProvider}
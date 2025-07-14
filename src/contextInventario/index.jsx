import { createContext, useState, useEffect, useRef } from 'react'
import { fetchManager } from '../serviciosYFunciones/fetchFunciones'
import { DecimalNumber } from '../utils/numeros'
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
    const [cantidadNumber, setCantidadNumber] = useState(null) 
    const [precioNumber, setPrecioNumber] = useState(null)
    const [totalNumber, setTotalNumber] = useState(null)


    const ordenOpciones = [
        {id: "ASC", nombre: "ASC"},
        {id: "DESC", nombre: "DESC"}
    ]

    const limiteOpciones = [
        {id: "10", nombre: 10},
        {id: "20", nombre: 20},
        {id: "30", nombre: 30},
        {id: "50", nombre: 50}
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
        const cbConfiguracion =(res) =>{
            setCantidadNumber(new DecimalNumber(res.decimalesCantidad))
            setPrecioNumber(new DecimalNumber(res.decimalesPrecio))
            setTotalNumber(new DecimalNumber(res.decimalesTotal))
        }
        fetchManager('http://localhost:3000/api/v1/init/configuracion',cbConfiguracion, 'GET' )
        fetchManager('http://localhost:3000/api/v1/cliente/nombre', setClientesNombres, "GET")
        fetchManager('http://localhost:3000/api/v1/producto/categoria', setCategorias, "GET")
        fetchManager('http://localhost:3000/api/v1/producto', setProductos, "GET")
        fetchManager('http://localhost:3000/api/v1/producto/medida', setMedidas, "GET")
        fetchManager('http://localhost:3000/api/v1/compra/estadoentrega', setEstadosComprasEntrega, "GET")
        fetchManager('http://localhost:3000/api/v1/compra/estadopago', setEstadosComprasPago, "GET")

        fetchManager('http://localhost:3000/api/v1/venta/estadoentrega', setEstadosVentasEntrega, "GET")
        fetchManager('http://localhost:3000/api/v1/venta/estadopago', setEstadosVentasPago, "GET")
        fetchManager('http://localhost:3000/api/v1/cliente/tipo', setTiposClientes, "GET")

        fetchManager('http://localhost:3000/api/v1/init/metodo-pago', setMetodosPago,"GET")
        
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

            ordenOpciones,
            limiteOpciones,



            cantidadNumber,
            precioNumber,
            totalNumber,
            
            }
        }>
            {children}
        </ContextInventario.Provider>
    )
}

export {ContextInventario, InventarioProvider}
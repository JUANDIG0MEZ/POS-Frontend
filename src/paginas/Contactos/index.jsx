import Tabla from "../../componentes/Tabla"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import {useState, useContext, useEffect} from 'react'
import { ContextInventario } from "../../contextInventario"
import InputNumber from "../../componentes/InputNumber"

import Select from "../../componentes/Select"
import CambiarPagina from "../../componentes/CambiarPagina"



import {FaSearch, FaUser} from "react-icons/fa"
import BotonIcono from "../../componentes/BotonIcono";


import ModalCrearCliente from "../../componentes/Modales/ModalCrearCliente"
import { useNavigate } from "react-router-dom"
import InputLista from "../../componentes/InputLista"
import { IdNumber } from "../../utils/numeros"


const renombrar = {
        id: 'ID',
        nombre: 'Nombre',
        direccion: 'Direccion',
        telefono: 'Telefono',
        email: 'Email',
        tipo: 'Tipo',
        total: 'Total',
        por_pagarle: 'Por pagarle',
        debe: 'Debe'
    }

const columns = [
    'id',
    'nombre',
    'tipo',
    'por_pagarle',
    'debe'
]

const columnasObjeto = [
    {id: "id", nombre: "ID"},
    {id: "por_pagarle", nombre: "Por pagarle"},
    {id: "debe", nombre: "Debe"},
]

const limiteObjeto = [
    {id: "10", nombre: 10},
    {id: "20", nombre: 20},
    {id: "30", nombre: 30},
    {id: "50", nombre: 50},
    {id: "100", nombre: 100}
]


const ordenOpciones = [
    {id: "ASC", nombre: "Ascendente"},
    {id: "DESC", nombre: "Descendente"}
]

const defaultLimite = 25
const defaultColumna = null
const defaultOrden = "DESC"
const defaultOffset = 0
const defaultTipo = 0



export default  function Clientes() {

    const navigate = useNavigate()

    const {
        clientesNombres,
        tiposClientes
    } = useContext(ContextInventario)

    

    const [idSeleleccionado, setIdSeleccionado] = useState("")
    const [clientes, setClientes] = useState([])
    const [nombreCliente, setNombreCliente] = useState("")
    const [tipoId, setTipoId] = useState(defaultTipo)

    // Paginacion

    const [pagina, setPagina] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)


    // Orden

    const [limite, setLimite] = useState(defaultLimite)
    const [offset, setOffset] = useState(defaultOffset)
    const [columna, setColumna] = useState(defaultColumna)
    const [orden, setOrden] = useState(defaultOrden)

    // Filtros
    const [idCliente, setIdCliente] = useState(null)
    
    const [showModalCrear, setShowModalCrear] = useState(false)



    useEffect(()=> {
        realizarPeticion()
    }, [offset])

    function realizarPeticion(){
        const paginacion = `limit=${limite}&offset=${offset}`

        const filtro = {
            ...(idCliente && {cliente_id: idCliente}),
            ...(columna && {columna: columna}),
            ...(orden && {orden: orden}),
            ...(tipoId  && {id_tipo: tipoId}),
        }



        const filtroTexto = Object.entries(filtro).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');

        const params = `${paginacion}&${filtroTexto}`

        function cbClientes(respuesta){
            setTotalPaginas(Math.ceil(respuesta.count / limite))
            setClientes(respuesta.rows)
        }
        fetchManager(`http://localhost:3000/api/v1/cliente?${params}`, cbClientes, "GET")
    }

    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/contactos/${idSeleleccionado}`)
        }
    }, [ idSeleleccionado, navigate ])


    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <div className="flex flex-col gap-2">
                <h2 className="titulo mb-5">Contactos</h2>
                <div className="flex gap-3 items-center">
                    <InputNumber
                        style={"w-20"}
                        label1="Id"
                        value={idCliente}
                        instanceNumber={IdNumber}
                        />


                    <InputLista 
                        listItems={clientesNombres}    
                        value={nombreCliente}
                        setValue={setNombreCliente}
                        label={"Nombre"} 
                        setIdSelected={setIdCliente}/>


                    
                    <Select listItems={tiposClientes} label={"Tipo cliente"} setValue={setTipoId} defaultValue={defaultTipo}/>

                    <BotonIcono icon ={<FaSearch/>} onClick={()=>{
                        if (offset == 0) {
                            realizarPeticion()
                        }
                        setOffset(0)
                        setPagina(0)
                    }}/>
                    <BotonIcono onClick={()=>setShowModalCrear(true)} icon={<FaUser/>}/>      
                </div>
                <div className="flex justify-between">

                    <div className="flex gap-3">
                        <Select
                            label={"Columna"}
                            listItems={columnasObjeto}
                            setValue={setColumna}
                            value={columna}
                            defaultValue={defaultColumna}
                        />
    
                        <Select 
                            label={"No. Filas"}
                            listItems={limiteObjeto}
                            setValue={setLimite}
                            value={limite}
                            defaultValue={defaultLimite}
                        />
                        <Select 
                            label={"Orden"}
                            listItems={ordenOpciones}
                            setValue={setOrden}
                            value={orden}
                            defaultValue={defaultOrden}
                        />
                    </div>

                    <CambiarPagina 
                        page={pagina}
                        setPage={setPagina}
                        setOffset={setOffset}
                        limit={limite} 
                        totalPage={totalPaginas}
                        />
                </div>
            </div>
            
            <div className="overflow-auto h-full">
                <Tabla listItems = {clientes} setIdSelected={setIdSeleccionado} rename = {renombrar} columns={columns}/>
            </div>   
            {
                showModalCrear ? <ModalCrearCliente setShowModal={setShowModalCrear} clientes={clientes} setClientes={setClientes}/> : null
            } 
        </div> 
    )
}
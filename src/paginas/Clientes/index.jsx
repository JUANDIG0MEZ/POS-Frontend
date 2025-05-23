import Tabla from "../../componentes/Tabla"
import {FiltradoDatos} from "../../serviciosYFunciones/filtradoDatos"
import {useState, useContext, useEffect} from 'react'
import { ContextInventario } from "../../contextInventario"
import InputLista from "../../componentes/InputLista"
import InputText from "../../componentes/InputText"

import Select from "../../componentes/Select"

import CambiarPagina from "../../componentes/CambiarPagina"



import {FaSearch, FaUser} from "react-icons/fa"
import BotonIcono from "../../componentes/BotonIcono";


import ModalCrearCliente from "../../componentes/Modales/ModalCrearCliente"
import { useNavigate } from "react-router-dom"


const renombrar = {
        id: 'ID',
        nombre: 'Nombre',
        direccion: 'Direccion',
        telefono: 'Telefono',
        email: 'Email',
        tipo: 'Tipo',
        total: 'Total',
        por_pagarle: 'Por Pagarle',
        debe: 'Debe'

    }


const tipoObjeto = {
    1: 'Proveedor',
    2: 'Cliente',
    3: 'Ambos'
}



export default  function Clientes() {

    const navigate = useNavigate()

    const {
        clientes
    } = useContext(ContextInventario)

    

    const [idSeleleccionado, setIdSeleccionado] = useState("")
    const [clientesFiltrados, setClientesFiltrados] = useState([])
    const [nombre, setNombre] = useState("")
    const [tipo, setTipo] = useState("")
    const [id, setId] = useState("")



    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [limite, setLimite] = useState(50)
    const [offset, setOffset] = useState(0)

    const [showModalCrear, setShowModalCrear] = useState(false)

    useEffect(()=> {
        let datosFiltrados = FiltradoDatos.filtroCadena(clientes, "nombre", nombre)
        datosFiltrados = FiltradoDatos.filtroCadena(datosFiltrados, "tipo", (tipo.nombre || ""))
        datosFiltrados = FiltradoDatos.filtroNumero(datosFiltrados, "id", id)
        setClientesFiltrados(datosFiltrados)
        setTotalPaginas(Math.ceil(datosFiltrados.length / limite))
    }, [clientes, nombre, tipo, id])

    useEffect(()=>{
        if (idSeleleccionado){
            navigate(`/cliente/${idSeleleccionado}`)
        }
    }, [ idSeleleccionado ])


    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <div className="flex flex-col gap-2">
                <h2 className="titulo mb-5">Lista de clientes</h2>
                <div className="flex gap-3 items-center">
                    <InputText
                    estilo={"w-20"}
                    label="Id"
                    valor={id}
                    setValor={setId}
                    isNumber= {true}
                    />

                    <InputText
                    label="Nombre"
                    valor={nombre}
                    setValor = {setNombre}
                    />
                    
                    <Select objeto={tipoObjeto} label={"Tipo cliente"}/>

                    <BotonIcono texto ={<FaSearch/>} onClick={()=>{}}/>
                    <BotonIcono onClick={()=>setShowModalCrear(true)} texto={<FaUser/>}/>      
                </div>
            </div>
            
            <div className="overflow-auto h-full">
                <Tabla datos = {clientesFiltrados.slice(offset, offset + limite)} setIdItemSeleccionado={setIdSeleccionado} rename = {renombrar}/>
            </div>    
            <CambiarPagina 
                pagina={pagina}
                setPagina={setPagina}
                setOffset={setOffset}
                limite={limite} 
                totalPaginas={totalPaginas}
                setTotalPaginas={setTotalPaginas}
                />
            
            {
                showModalCrear && <ModalCrearCliente setShowModal={setShowModalCrear}/>
            }
        </div>
        
    )
}
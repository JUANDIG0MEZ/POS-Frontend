import Tabla from "../../componentes/Tabla"
import {FiltradoDatos} from "../../serviciosYFunciones/filtradoDatos"
import {useState, useContext, useEffect} from 'react'
import { ContextInventario } from "../../contextInventario"
import InputLista from "../../componentes/InputLista"
import InputText from "../../componentes/InputText"
import Boton from "../../componentes/Boton"



import {FaSearch, FaUser} from "react-icons/fa"
import BotonIcono from "../../componentes/BotonIcono";


import ModalCrearCliente from "../../componentes/Modales/ModalCrearCliente"
import { useNavigate } from "react-router-dom"

export default  function Clientes() {

    const navigate = useNavigate()

    const {
        clientes
    } = useContext(ContextInventario)

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

    const [idSeleleccionado, setIdSeleccionado] = useState("")
    const [clientesFiltrados, setClientesFiltrados] = useState([])
    const [nombre, setNombre] = useState("")
    const [tipo, setTipo] = useState("")
    const [id, setId] = useState("")

    const [showModalCrear, setShowModalCrear] = useState(false)

    useEffect(()=> {
        let datosFiltrados = FiltradoDatos.filtroCadena(clientes, "nombre", nombre)
        datosFiltrados = FiltradoDatos.filtroCadena(datosFiltrados, "tipo", (tipo.nombre || ""))
        datosFiltrados = FiltradoDatos.filtroNumero(datosFiltrados, "id", id)
        setClientesFiltrados(datosFiltrados)
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
                    isNumber={true}
                    />

                    <InputText
                    label="Nombre"
                    valor={nombre}
                    setValor = {setNombre}
                    />
                    
                    <InputLista 
                    estilo={"w-40"}
                    lista = {[{id: 1, nombre: "Proveedor"}, {id: 2, nombre: "Cliente"}, {id:3, nombre: "Ambos"}]}
                    label="tipo"
                    valor={tipo}
                    setValor={setTipo}/>
                    <BotonIcono texto ={<FaSearch/>} onClick={()=>{}}/>
                    <BotonIcono onClick={()=>setShowModalCrear(true)} texto={<FaUser/>}/>      
                </div>
            </div>
            
            <div className="overflow-auto">
                <Tabla datos = {clientesFiltrados} setIdItemSeleccionado={setIdSeleccionado} rename = {renombrar}/>
            </div>    
            
            {
                showModalCrear && <ModalCrearCliente setShowModal={setShowModalCrear}/>
            }
        </div>
        
    )
}
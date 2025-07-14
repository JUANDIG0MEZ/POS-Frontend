import InputText from "../InputText"
import Boton from "../Boton"
import { useState, useEffect, useContext} from "react"
import { ContextInventario } from "../../contextInventario"
import { FaTrash } from "react-icons/fa"
import Botonicono from "../BotonIcono"
import Select from "../Select"
import {toast} from 'sonner'
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
export default function ModalCrearCliente(props){
    const {
        tiposClientes
    } = useContext(ContextInventario)

    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [tipo, setTipo] = useState("")

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
        
    }

    function crearCliente(){
        const nuevoCliente = {}
        const tipo_id = Number(tipo)
        if (!tipo_id)return toast.error('Selecciona el tipo de cliente')
        if (!nombre) return toast.error('Escribe el nombre del nuevo cliente')

        nuevoCliente.nombre = nombre
        nuevoCliente.id_tipo = tipo_id
        if (direccion) nuevoCliente.direccion = direccion
        if (telefono) nuevoCliente.telefono = telefono
        if (email) nuevoCliente.email = email

        function cbCrearCliente(res){
            if (props.setClientes && props.clientes) props.setClientes([...props.clientes, res])
        }


        fetchManager('http://localhost:3000/api/v1/cliente', cbCrearCliente, "POST", nuevoCliente)

    }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[600px] items-center gap-4">
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="titulo">Crear contacto</h2>
                    <div className="flex gap-3">
                        <InputText label1="Razon social o nombre completo" value={nombre} setValue={setNombre}/>
                        <Select listItems={tiposClientes} setValue={setTipo} label={"Tipo cliente"} defaultValue={0}/> 
                    </div>
                             
                    <div className="flex gap-3">
                        <InputText label1 = "Direccion" value = {direccion} setValue = {setDireccion}/>               
                        
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <InputText style="w-80" label1 = "Email" value = {email} setValue={setEmail}/>
                            <InputText style="w-44" label1 = "Telefono" value={telefono} setValue={setTelefono}/>
                        </div>
                        
                        <div className="flex gap-3">  

                            <Botonicono
                            icon={<FaTrash/>}/>
                        </div>
                        
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3 items-center">
                            
                        </div>
                        
                        <div className="flex w-full justify-end gap-3">  
                            <Boton onClick={cerrarModal}  text = "Cancelar"  isNormal = {true}/>
                            <Boton onClick={crearCliente} text = "Crear" />  
                        </div>
                    </div>
                    

                </div>
            </div>

        </div>
    )
}
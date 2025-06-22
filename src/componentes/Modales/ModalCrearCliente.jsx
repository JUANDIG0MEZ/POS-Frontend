import InputText from "../InputText"
import InputNumber from "../InputNumber"
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
        const tipo_id = Number(tipo)
        const telefonoFetch = Number(telefono)
        if (!tipo_id){
            toast.error('Selecciona el tipo de cliente')
            return 
        }
        if (!nombre){
            toast.error('Escribe el nombre del nuevo cliente')
            return 
        }


        const nuevoCliente = {
            nombre: nombre,
            direccion: direccion,
            telefono: telefonoFetch? telefonoFetch : null,
            email: email,
            tipo_id: tipo_id
        }

        function cbCrearCliente(res){
            console.log(res)
        }


        fetchManager('http://localhost:3000/api/v1/clientes', cbCrearCliente, "POST", nuevoCliente)

        console.log(nuevoCliente)
    }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[600px] items-center gap-4">
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="titulo">Crear contacto</h2>
                    <div className="flex gap-3">
                        <InputText label="Razon social o nombre completo" valor={nombre} setValor={setNombre}/>
                        <Select opciones={tiposClientes} setValor={setTipo} label={"Tipo cliente"} valorDefault={0}/> 
                    </div>
                             
                    <div className="flex gap-3">
                        <InputText label = "Direccion" valor = {direccion} setValor = {setDireccion}/>               
                        
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <InputText estilo="w-80" label = "Email" valor = {email} setValor={setEmail}/>
                            <InputText estilo="w-44" label = "Telefono" valor={telefono} setValor={setTelefono} isNumber={true}/>
                        </div>
                        
                        <div className="flex gap-3">  

                            <Botonicono
                            texto={<FaTrash/>}/>
                        </div>
                        
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3 items-center">
                            
                        </div>
                        
                        <div className="flex w-full justify-end gap-3">  
                            <Boton onClick={cerrarModal}  texto = "Cancelar"  isNormal = {true}/>
                            <Boton onClick={crearCliente} texto = "Crear" />  
                        </div>
                    </div>
                    

                </div>
            </div>

        </div>
    )
}
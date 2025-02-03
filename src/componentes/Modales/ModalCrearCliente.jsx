import InputText from "../InputText"
import InputLista from "../InputLista"
import Boton from "../Boton"
import { useState, useEffect} from "react"
import crudDatosClientes from "../../servicios/crudDatosClientes"

export default function ModalCrearCliente(props){

    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [porPagarle, setPorPagarle] = useState("")
    const [debe, setDebe] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [tipo, setTipo] = useState("")

    const [listaTipo, setListaTipo] = useState([])


    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
        
    }

    useEffect(()=>{
        async function cargarListas(){
            try {
                const tipoCliente = await crudDatosClientes.tiposClientes()
                setListaTipo(tipoCliente)
            }
            catch {
                console.log("Error al cargar los tipos de clientes en el modal crear cliente")
            }
        }
        cargarListas()
    }, [])


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[1100px] items-center gap-4">
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="w-full text-2xl font-semibold">CREAR CLIENTE</h2>
                    <div className="flex gap-3">
                        <InputText label="Nombre" valor={nombre} setValor={setNombre}/>
                        <InputLista 
                        estilo="w-48"
                        label="Tipo" valor = {tipo} setValor={setTipo} lista = {listaTipo}/>                        
                        
                    </div>
                    <div className="flex gap-3">
                        <InputText label = "Direccion" valor = {direccion} setDireccion = {setDireccion}/> 
                        <InputText estilo="w-80" label = "Email" valor = {email} setValor={setEmail}/>
                        <InputText estilo="w-48" label="Telefono" valor={telefono} setValor={setTelefono} isNumber={true}/>
                        
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3 items-center">
                            <InputText
                            estilo="w-44" label="Debe" valor={debe} setValor={setDebe} isNumber={true}/>
                            <InputText 
                            estilo="w-44"
                            label="Por pagarle" valor={porPagarle} setValor={setPorPagarle} isNumber={true}/>
                            <Boton
                            texto="Limpiar"
                            isNormal={true}/>
                        </div>
                        
                        <div className="flex w-full justify-end gap-3">  
                            <Boton onClick={cerrarModal} texto = "Cancelar"  isNormal = {true}/>
                            <Boton texto = "Agregar" />  
                        </div>
                    </div>
                    

                </div>
            </div>
            
            
            
        </div>
    )
}
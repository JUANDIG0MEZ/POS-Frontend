import { useState, useEffect } from 'react';
import InputText from '../../componentes/InputText';
import {useParams} from 'react-router-dom';
import Boton from '../../componentes/Boton';
import { cargarCliente } from '../../servicios/obtenerDatos';
export default function Cliente() {

    const {id} = useParams();
    const [nombre, setNombre]= useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [tipo, setTipo] = useState("")
    const [porPagarle, setPorPagarle] = useState("")
    const [debe, setDebe] = useState("")

    useEffect(()=>{
        async function cargar(){
            try{
                const cliente = await cargarCliente(id)
                setNombre(cliente.nombre)
                setDireccion(cliente.direccion)
                setTelefono(cliente.telefono)
                setEmail(cliente.email)
                setTipo(cliente.tipo)
                setPorPagarle(cliente.porPagarle)
                setDebe(cliente.debe)

            }
            catch{
                console.log(`error al cargar el cliente ${id}`)
            }   
        }
        cargar()
    }, [])

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <h1 className="text-2xl font-bold mb-3">CLIENTE ID <span className='text-red-500 p-1 border rounded-md'>{id}</span></h1>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 mb-2'>
                    <InputText label="Nombre"  valor={nombre}/>
                    <InputText label="Direccion"  valor={direccion}/>


                </div>
                <div className='flex gap-3 items-center'>
                    <InputText estilo="w-48" label="Telefono"  valor={telefono} isNumber={true}/>
                    <InputText estilo="w-96" label="Email"  valor={email} />
                    <InputText estilo="w-40" label="Tipo"  valor={tipo} />

                    <InputText estilo="w-48" label="Por pagarle"  valor={porPagarle} isNumber={true}/>
                    <Boton texto="Pagar"/>
                    <InputText estilo="w-48" label="Debe"  valor={debe} isNumber={true}/>
                    <Boton texto="Abonar"/>
                    
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-3'>
                        <Boton texto="Ventas" isNormal={true}/>
                        <Boton texto="Compras" isNormal={true}/>
                        <Boton texto="Abonos" isNormal={true}/>
                        <Boton texto="Pagos" isNormal={true}/>
                    </div>
                    <Boton texto="Modificar datos" isNormal="true"/>

                </div>
                
            </div>
            
        </div>

        
    )
}
import { useState } from 'react';
import InputText from '../../componentes/InputText';
import {useParams} from 'react-router-dom';
import Boton from '../../componentes/Boton';

export default function Cliente() {

    const {id} = useParams();
    const [nombre, setNombre]= useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [tipo, setTipo] = useState("")
    const [porPagarle, setPorPagarle] = useState("")
    const [debe, setDebe] = useState("")

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <h1 className="text-2xl font-bold mb-3">CLIENTE ID <span className='text-red-500 p-1 border rounded-md'>{id}</span></h1>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 mb-2'>
                    <InputText label="Nombre"  valor={nombre} setValor={setNombre}/>
                    <InputText label="Direccion"  valor={direccion} setValor={setDireccion}/>


                </div>
                <div className='flex gap-3 items-center'>
                    <InputText estilo="w-48" label="Telefono"  valor={telefono} setValor={setTelefono} isNumber={true}/>
                    <InputText estilo="w-96" label="Email"  valor={email} setValor={setEmail}/>
                    <InputText estilo="w-40" label="Tipo"  valor={tipo} setValor={setTipo}/>

                    <InputText estilo="w-48" label="Por pagarle"  valor={porPagarle} setValor={setPorPagarle} isNumber={true}/>
                    <Boton texto="Pagar"/>
                    <InputText estilo="w-48" label="Debe"  valor={debe} setValor={setDebe} isNumber={true}/>
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
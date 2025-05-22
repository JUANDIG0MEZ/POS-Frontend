import { useState, useEffect } from 'react';
import InputText from '../../componentes/InputText';
import {useParams} from 'react-router-dom';
import Boton from '../../componentes/Boton';
import Tabla from '../../componentes/Tabla';
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones';
import InputNumber from '../../componentes/InputNumber';
import ModalPagarCliente from '../../componentes/Modales/ModalPagarCliente';
import ModalAbonarCliente from '../../componentes/Modales/ModalAbonarCliente';
export default function Cliente() {
    const {id} = useParams();
    const [nombre, setNombre]= useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [tipo, setTipo] = useState("")
    const [porPagarle, setPorPagarle] = useState("")
    const [debe, setDebe] = useState("")

    const [pagos, setPagos]= useState([])
    const [compras, setCompras]= useState([])
    const [abonos, setAbonos]= useState([])
    const [ventas, setVentas]= useState([])

    const [showModalPago, setShowModalPago] = useState(false)
    const [showModalAbono, setShowModalAbono] = useState(false)

    const [mostrarTabla, setMostrarTabla] = useState({
        pagos: true,
        compras: false,
        abonos: false,
        ventas: false
    })

    useEffect(()=>{
        function cbCliente(resData){
            setNombre(resData.nombre)
            setDireccion(resData.direccion)
            setTelefono(resData.telefono)
            setEmail(resData.email)
            setTipo(resData.tipo)
            setPorPagarle(resData.por_pagarle)
            setDebe(resData.debe)
        }
        fetchManager(`http://localhost:3000/api/v1/clientes/${id}`, cbCliente, "GET")
    }, [])

    function cambiarTabla(tabla){
        setMostrarTabla({
            pagos: false,
            compras: false,
            abonos: false,
            ventas: false,
            [tabla]: true
        })
    }

    async function cargarVentas(){
        fetchManager(`http://localhost:3000/api/v1/clientes/${id}/ventas`, setVentas, "GET")
        cambiarTabla("ventas")
    }

    async function cargarcompras(){
        fetchManager(`http://localhost:3000/api/v1/clientes/${id}/compras`, setCompras, "GET")
        cambiarTabla("compras")
    }

    async function cargarAbonos(){
        fetchManager(`http://localhost:3000/api/v1/clientes/${id}/abonos`, setAbonos, "GET")
        cambiarTabla("abonos")
    }

    async function cargarPagos(){
        fetchManager(`http://localhost:3000/api/v1/clientes/${id}/pagos`, setPagos, "GET")
        cambiarTabla("pagos")
    }

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <h1 className="text-3xl font-bold mb-3">Cliente ID <span className='text-red-500 p-1 border rounded-md'>{id}</span></h1>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 mb-2'>
                    <InputText label="Nombre"  valor={nombre}/>
                    <InputText label="Direccion"  valor={direccion}/>


                </div>
                <div className='flex gap-3 items-center'>
                    <InputText estilo="w-48" label="Telefono"  valor={telefono} isNumber={true}/>
                    <InputText estilo="w-96" label="Email"  valor={email} />
                    <InputText estilo="w-40" label="Tipo"  valor={tipo} />
                    
                    <InputNumber estilo = {"w-62"} label="Por pagarle" valor={porPagarle} format={true} isPrice= {true}/>
                    {/* <InputText estilo="w-48" label="Por pagarle"  valor={porPagarle} isNumber={true}/> */}
                    <Boton texto="Pagar"
                    onClick={() => setShowModalPago(true)}/>
                    <InputNumber
                        estilo = {"w-62"}
                        label="Debe"
                        valor={debe}
                        format={true}
                        isPrice= {true}
                        />
                    {/* <InputText estilo="w-48" label="Debe"  valor={debe} isNumber={true}/> */}
                    <Boton texto="Abonar"
                    onClick={() => setShowModalAbono(true)}/>
                
                    
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-3'>
                        <Boton
                        texto="Ventas"
                        onClick={cargarVentas}
                        isNormal={true}/>

                        <Boton 
                        onClick={cargarcompras}
                        texto="Compras" isNormal={true}/>

                        <Boton
                        onClick={cargarAbonos}
                        texto="Abonos"
                        isNormal={true}/>

                        <Boton texto="Pagos" 
                        onClick={cargarPagos}
                        isNormal={true}/>
                    </div>
                    <Boton texto="Modificar datos" isNormal="true"/>

                </div>
                
            </div>
            <div className='w-full overflow-auto p-1 text-md mb-10'>

                {mostrarTabla.pagos && <Tabla datos={pagos}/>}
                {mostrarTabla.compras && <Tabla datos={compras}/>}
                {mostrarTabla.abonos && <Tabla datos={abonos}/>}
                {mostrarTabla.ventas && <Tabla datos={ventas}/>}
            </div>
            {showModalPago && <ModalPagarCliente clienteId={id} porPagar = {porPagarle} setShowModal = {setShowModalPago} setPorPagarle={setPorPagarle}/>}
            {showModalAbono && <ModalAbonarCliente clienteId={id} debe = {debe} setShowModal = {setShowModalAbono} setDebe={setDebe}/>}
        </div>

        
    )
}
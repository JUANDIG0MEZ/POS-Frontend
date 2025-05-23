import { useState, useEffect } from 'react';
import InputText from '../../componentes/InputText';
import {useParams} from 'react-router-dom';
import Boton from '../../componentes/Boton';
import Tabla from '../../componentes/Tabla';
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones';
import InputNumber from '../../componentes/InputNumber';
import ModalPagarCliente from '../../componentes/Modales/ModalPagarCliente';
import ModalAbonarCliente from '../../componentes/Modales/ModalAbonarCliente';
import CambiarPagina from '../../componentes/CambiarPagina';

export default function Cliente() {
    const {id} = useParams();
    const [nombre, setNombre]= useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [tipo, setTipo] = useState("")
    const [porPagarle, setPorPagarle] = useState("")
    const [debe, setDebe] = useState("")

    const [datos, setDatos] = useState([])

    const [showModalPago, setShowModalPago] = useState(false)
    const [showModalAbono, setShowModalAbono] = useState(false)


    const [pagina, setPagina] = useState(1)
    const [limite, setLimite] = useState(30)
    const [offset, setOffset] = useState(0)
    const [numFilas, setNumFilas] = useState(0)

    const [totalPaginas, setTotalPaginas] = useState(1)

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
    }, [id])


    function cbTablas(res) {
        setDatos(res.rows)
        setTotalPaginas(Math.ceil(res.count / limite))
        setNumFilas(res.count)
    }

    async function cargarVentas(){
        fetchManager(`http://localhost:3000/api/v1/clientes/${id}/ventas?limit=${limite}&offset=${offset}`, cbTablas, "GET")
    }
    async function cargarcompras(){
        fetchManager(`http://localhost:3000/api/v1/clientes/${id}/compras?limit=${limite}&offset=${offset}`, cbTablas, "GET")
    }
    async function cargarAbonos(){
        fetchManager(`http://localhost:3000/api/v1/clientes/${id}/abonos?limit=${limite}&offset=${offset}`, cbTablas, "GET")

    }
    async function cargarPagos(){
        fetchManager(`http://localhost:3000/api/v1/clientes/${id}/pagos?limit=${limite}&offset=${offset}`, cbTablas, "GET")
    }
    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <h1 className="text-3xl font-bold mb-3">Cliente ID <span className='text-color-2 p-1 border rounded-md'>{id}</span></h1>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 mb-2'>
                    <InputText label="Nombre"  valor={nombre}/>
                    <InputText label="Direccion"  valor={direccion}/>
                    <Boton texto="Modificar datos" isNormal="true"/>

                </div>
                <div className='flex gap-3 items-center'>
                    <InputText estilo="w-48" label="Telefono"  valor={telefono} isNumber={true}/>
                    <InputText estilo="w-96" label="Email"  valor={email} />
                    <InputText estilo="w-40" label="Tipo"  valor={tipo} />
                    
                    <InputNumber estilo = {"w-62"} label="Por pagarle" valor={porPagarle} format={true} isPrice= {true}/>
                    <Boton texto="Pagar"
                    onClick={() => setShowModalPago(true)}/>
                    <InputNumber
                        estilo = {"w-62"}
                        label="Debe"
                        valor={debe}
                        format={true}
                        isPrice= {true}
                        />
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

                        

                        <Boton texto="Pagos" 
                        onClick={cargarPagos}
                        isNormal={true}/>
                        <Boton
                        onClick={cargarAbonos}
                        texto="Abonos"
                        isNormal={true}/>
                    </div>

                    <CambiarPagina 
                        pagina={pagina}
                        setPagina={setPagina}
                        setOffset={setOffset}
                        limite={limite} 
                        totalPaginas={totalPaginas}
                        setTotalPaginas={setTotalPaginas}
                        />

                </div>
                
            </div>
            <div className='w-full overflow-auto p-1 text-md mb-10'>

                <Tabla datos={datos}/>

            </div>
            {showModalPago && <ModalPagarCliente clienteId={id} porPagar = {porPagarle} setShowModal = {setShowModalPago} setPorPagarle={setPorPagarle}/>}
            {showModalAbono && <ModalAbonarCliente clienteId={id} debe = {debe} setShowModal = {setShowModalAbono} setDebe={setDebe}/>}
        </div>

        
    )
}
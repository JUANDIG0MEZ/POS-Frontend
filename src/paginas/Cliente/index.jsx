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
import Select from '../../componentes/Select';


import {useRef} from 'react';

const limiteObjeto = [
    {id: "10", nombre: 10},
    {id: "20", nombre: 20},
    {id: "30", nombre: 30},
    {id: "50", nombre: 50},
]


const defaultLimite = "15"


let renombrarTabla = {}


export default function Cliente() {

    const ifFirstRender = useRef(true)

    const {id} = useParams();
    const [nombre, setNombre]= useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [tipo, setTipo] = useState("")
    const [porPagarle, setPorPagarle] = useState("")
    const [debe, setDebe] = useState("")

    const [totalPaginas, setTotalPaginas] = useState(1)

    const [datos, setDatos] = useState([])

    const [showModalPago, setShowModalPago] = useState(false)
    const [showModalAbono, setShowModalAbono] = useState(false)


    const [pagina, setPagina] = useState(0)
    const [limite, setLimite] = useState(defaultLimite)
    const [offset, setOffset] = useState(0)


    const [nombreTabla, setNombreTabla] = useState("")




    useEffect(()=> {
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

    useEffect(()=> {
        function cbTablas(res) {
            setDatos(res.rows)
            setTotalPaginas(Math.ceil(res.count / limite))
        }

        if (nombreTabla){
            fetchManager(`http://localhost:3000/api/v1/clientes/${id}/${nombreTabla}?limit=${limite}&offset=${offset}`, cbTablas, "GET")
        }
        
    }, [offset, limite, nombreTabla, id])

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
                        onClick={()=> {
                            setOffset(0)
                            setPagina(0)
                            setNombreTabla("ventas")
                        }}
                        isNormal={true}/>

                        <Boton 
                        texto="Compras"
                        onClick={()=> {
                            setOffset(0)
                            setPagina(0)
                            setNombreTabla("compras")
                        }}
                        isNormal={true}/>

                        

                        <Boton
                            texto="Pagos" 
                            onClick={() => {
                                setOffset(0)
                                setPagina(0)
                                setNombreTabla("pagos")}}
                            isNormal={true}/>
                        <Boton
                            texto="Abonos"
                            onClick={() => {
                                setOffset(0)
                                setPagina(0)
                                setNombreTabla("abonos")
                            }}
                            isNormal={true}/>
                    </div>
                    <div className='flex gap-3'>
                            <Select 
                                label={"No. Filas"}
                                opciones={limiteObjeto}
                                setValor={setLimite}
                                valor={limite}
                                valorDefault={defaultLimite}
                            />

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
                
            </div>
            <div className='w-full overflow-auto p-1 text-md mb-10'>

                <Tabla datos={datos} rename={renombrarTabla}/>

            </div>
            {showModalPago && <ModalPagarCliente clienteId={id} porPagar = {porPagarle} setShowModal = {setShowModalPago} setPorPagarle={setPorPagarle}/>}
            {showModalAbono && <ModalAbonarCliente clienteId={id} debe = {debe} setShowModal = {setShowModalAbono} setDebe={setDebe}/>}
        </div>

        
    )
}
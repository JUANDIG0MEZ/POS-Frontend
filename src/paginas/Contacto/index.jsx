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



const limiteObjeto = [
    {id: "10", nombre: 10},
    {id: "20", nombre: 20},
    {id: "30", nombre: 30},
    {id: "50", nombre: 50},
]


const renombrar = {
    ventas : {
        id: 'Id',
        fecha: 'Fecha',
        hora: 'Hora',
        total: 'Total',
        por_pagar: 'Por pagar',
        estado_pago: 'Estado pago'
    },
    compras: {
        id: "Id",
        fecha: "Fecha",
        hora: "Hora",
        total: "Total",
        por_pagar: 'Debe',
        estado_pago: 'Estado pago'
    },
    abonos: {
        id: "Id",
        fecha: "Fecha",
        hora: "Hora",
        valor: "Valor",
        descripcion: "Descripcion",
        metodo_pago: "Metodo Pago"
    }, 
    
    pagos: {
        id: 'Id',
        fecha: 'Fecha',
        hota: 'Hora',
        valor: 'Valor',
        descripcion: 'Descripcion'
    }
    
}


const defaultLimite = "15"




export default function Contacto() {

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
    const [renombrarTabla, setRenombrarTabla] = useState({})



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
        fetchManager(`http://localhost:3000/api/v1/cliente/${id}`, cbCliente, "GET")
    }, [])


    function funRenombrarTabla(tabla){
        setRenombrarTabla(renombrar[tabla])
    }

    useEffect(()=> {
        function cbTablas(res) {
            setDatos(res.rows)
            setTotalPaginas(Math.ceil(res.count / limite))
            funRenombrarTabla(nombreTabla)
        }

        if (nombreTabla){
            fetchManager(`http://localhost:3000/api/v1/cliente/${id}/${nombreTabla}?limit=${limite}&offset=${offset}`, cbTablas, "GET")
        }
        
    }, [offset, limite, nombreTabla, id])

    

    return (
        <div className="h-full flex flex-col max-w-5xl min-w-[1400px] mx-auto px-5 py-3 gap-3 overflow-auto">
            <h1 className="text-3xl font-bold mb-3">Contacto ID <span className='text-color-2 p-1 border rounded-md'>{id}</span></h1>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3 mb-2'>
                    <InputText label1="Nombre"  value={nombre}/>
                    <InputText label1="Direccion"  value={direccion}/>
                    <Boton text="Modificar datos" isNormal="true"/>

                </div>
                <div className='flex gap-3 items-center'>
                    <InputText style="w-48" label1="Telefono"  value={telefono}/>
                    <InputText style="w-96" label1="Email"  value={email} />
                    <InputText style="w-40" label1="Tipo"  value={tipo} />          
                    <InputNumber style = {"w-62"} label1="Saldo a favor" value={porPagarle}/>
                    <Boton text="Pagar"
                    onClick={() => setShowModalPago(true)}/>
                    <InputNumber
                        style = {"w-62"}
                        label1="Debe"
                        value={debe}
                        />
                    <Boton text="Abonar"
                    onClick={() => setShowModalAbono(true)}/>         
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-3'>
                        <Boton
                        text="Ventas"
                        onClick={()=> {
                            setOffset(0)
                            setPagina(0)
                            setNombreTabla("ventas")
                        }}
                        isNormal={true}/>

                        <Boton 
                        text="Compras"
                        onClick={()=> {
                            setOffset(0)
                            setPagina(0)
                            setNombreTabla("compras")
                        }}
                        isNormal={true}/>
                        <Boton
                            text="Pagos" 
                            onClick={() => {
                                setOffset(0)
                                setPagina(0)
                                setNombreTabla("pagos")}}
                            isNormal={true}/>
                        <Boton
                            text="Abonos"
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
                                listItems={limiteObjeto}
                                setValue={setLimite}
                                value={limite}
                                defaultValue={defaultLimite}
                            />
                            <CambiarPagina 
                                page={pagina}
                                setPage={setPagina}
                                setOffset={setOffset}
                                limit={limite} 
                                totalPage={totalPaginas}
                                />
                    </div>
                    

                </div>
                
            </div>
            <div className='w-full overflow-auto p-1 text-md mb-10'>

                <Tabla listItems={datos} rename={renombrarTabla}/>

            </div>
            {showModalPago && <ModalPagarCliente clienteId={id} porPagar = {porPagarle} setShowModal = {setShowModalPago} setPorPagarle={setPorPagarle}/>}
            {showModalAbono && <ModalAbonarCliente clienteId={id} debe = {debe} setShowModal = {setShowModalAbono} setDebe={setDebe}/>}
        </div>

        
    )
}
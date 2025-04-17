import Boton from '../Boton'
import { fetchManager } from '../../serviciosYFunciones/fetchFunciones'

export default function ModalAbonarCompra(props){
    const numeroFactura = props.numeroFactura
    const idCliente = props.idCliente

    function cerrarModal(){
        props.setShowModal(false)
    }


    function realizarAbono(){
        fetchManager('http//localhost/api/v1/clientes/1/')
    }



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white py-5 px-7 rounded-3xl w-[600px] items-center gap-4">    
                <div className="flex flex-col flex-1 gap-4">
                    <h2 className="w-full text-xl font-semibold">{} </h2>
                    <p>{}</p>
                    <div className="flex gap-3 justify-end">
                        <Boton onClick={cerrarModal} texto = "Ok" />
                        <Boton onClick={cerrarModal} texto = "Cancelar" isNormal={true}/>
                    </div>

                </div>
            </div>
            
        
        </div>
    )

}
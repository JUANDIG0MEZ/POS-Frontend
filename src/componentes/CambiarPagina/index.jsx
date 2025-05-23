
import BotonIcono from "../BotonIcono"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function CambiarPagina(props){

    function paginaSiguiente() {
        if (props.totalPaginas > props.pagina) {
            props.setOffset(props.pagina * props.limite)            
            props.setPagina(props.pagina + 1)
        }

    }

    function paginaAnterior() {
        if (props.pagina > 1) {
            props.setOffset((props.pagina -2)  * props.limite)
            props.setPagina(props.pagina - 1)
            
        }
    }

    return (
         <div className="flex items-center justify-center">
            <BotonIcono texto={<FaChevronLeft />} onClick={()=>paginaAnterior()}/>
            <p className="px-2"> <span className="font-bold">{props.pagina}</span> de <span className="font-bold">{props.totalPaginas}</span></p>
            <BotonIcono texto={<FaChevronRight/>} onClick={()=>paginaSiguiente()}/> 
        </div>
    )
}
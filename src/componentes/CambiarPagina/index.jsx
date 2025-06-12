
import BotonIcono from "../BotonIcono"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function CambiarPagina(props){

    const pagina = parseInt(props.pagina)
    const limite = parseInt(props.limite)
    const totalPaginas = parseInt(props.totalPaginas)

    function paginaSiguiente() {
        
        if (totalPaginas > pagina + 1) {
            props.setOffset((pagina+1) * limite)        
            props.setPagina(pagina + 1)
        }}

    function paginaAnterior() {
        const pagina = parseInt(props.pagina)
        const limite = parseInt(props.limite)
        if (pagina > 0) {
            props.setOffset((pagina-1)  * limite)
            props.setPagina(pagina - 1)
        }
    }

    return (
         <div className="flex items-center justify-center">
            <BotonIcono texto={<FaChevronLeft />} onClick={paginaAnterior}/>
            <p className="px-2"> <span className="font-bold">{pagina + 1}</span> de <span className="font-bold">{totalPaginas}</span></p>
            <BotonIcono texto={<FaChevronRight/>} onClick={paginaSiguiente}/> 
        </div>
    )
}
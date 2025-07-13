
import BotonIcono from "../BotonIcono"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function CambiarPagina({page, limit, totalPage, setOffset, setPage}){

    function paginaSiguiente() {
        
        if (totalPage > page + 1) {
            setOffset((page+1) * limit)        
            setPage(limit + 1)
        }}

    function paginaAnterior() {
        if (page > 0) {
            setOffset((page-1)  * limit)
            setPage(page - 1)
        }
    }

    return (
         <div className="flex items-center justify-center">
            <BotonIcono texto={<FaChevronLeft />} onClick={paginaAnterior}/>
            <p className="px-2"> <span className="font-bold">{page + 1}</span> de <span className="font-bold">{totalPage + 1}</span></p>
            <BotonIcono texto={<FaChevronRight/>} onClick={paginaSiguiente}/> 
        </div>
    )
}
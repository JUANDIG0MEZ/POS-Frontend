import { useEffect, useState, useContext } from "react"
import Boton from "../../componentes/Boton"
import Tabla from "../../componentes/Tabla"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import CambiarPagina from "../../componentes/CambiarPagina"
import { ContextInventario } from "../../contextInventario"
import Select from "../../componentes/Select"
import BotonIcono from "../../componentes/BotonIcono"
import { FaSearch } from "react-icons/fa"
import {  useNavigate } from "react-router-dom"
export default function AjustesInventario(props){
    const navigate = useNavigate()
    const [ ajustes, setAjustes] = useState([])
    const [ limit, setLimit] = useState(50)
    const [ offset, setOffset] = useState(0)
    const [ count, setCount] = useState(0)
    const [ totalPaginas, setTotalPaginas] = useState(0)
    const [ pagina, setPagina] = useState(0)
    const [ ajusteSeleccionadoId, setAjusteSeleccionId] = useState(null)
    const {
        limiteOpciones
    } = useContext(ContextInventario)

    useEffect(()=> {
        setTotalPaginas(Math.ceil(count / limit))
    }, [ajustes, limit])


    function buscarAjustes() {
        function cb(res){
            setCount(res.count),
            setAjustes(res.rows)
        }
        fetchManager(`http://localhost:3000/api/v1/producto/ajuste?limit=${limit}&offset=${offset}`, cb)
    }

    useEffect(()=> {
        buscarAjustes()
    }, [])

    useEffect(() => {
        console.log(ajusteSeleccionadoId)
        if(ajusteSeleccionadoId) navigate(`/ajuste-inventario/${ajusteSeleccionadoId}`)
    }, [ajusteSeleccionadoId, navigate])

    

    return (
        <>
            <div className="w-[1000px] mx-auto gap-6 flex-col flex mt-4">
                <div className="flex justify-between mt-4">
                    <h1 className="titulo">Ajuste de inventario</h1>
                    <Boton text={'Crear ajuste'} onClick={()=> navigate('/ajustar-inventario')}/>
                </div>
                <div>
                    <div className="flex justify-between mb-3">
                        <div className="flex gap-3">
                            <CambiarPagina 
                            pagina={pagina}
                            setPagina={setPagina}
                            totalPaginas={totalPaginas}
                            limite={limit}
                            setLimite={setLimit}
                            setOffset={setOffset}/>
                            <Select label={"No. Filas"} listItems = {limiteOpciones} setValue={setLimit} defaultValue={10}/>
                        </div>
                        <BotonIcono icon={<FaSearch className=""/>} onClick={buscarAjustes} isNormal={true}/>
                    </div>
                {
                    ajustes.length ? <Tabla listItems = {ajustes} setIdselected = {setAjusteSeleccionId}/> : null
                }
                </div>
                
            </div>
        </>
    )
}
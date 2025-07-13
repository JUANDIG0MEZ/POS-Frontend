import { useState, useContext } from 'react'
import Boton from '../../componentes/Boton'
import Tabla from '../../componentes/Tabla'
import { ContextInventario } from '../../contextInventario'
import ModalCrearCategoria from '../../componentes/Modales/ModalCrearCategoria'

const renombrar = {
    id : "Id",
    nombre : "Categoria",
    descripcion: "Descripcion" 
}

export default function CrearCategoria() {
    //const [categorias, setCategorias] = useState([])
    const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState(null)
    const [showModalCrear, setShowModalCrear] = useState(false)
    const {
        categorias
     } = useContext(ContextInventario)

    return (
        <>
            <div className="w-[1100px] flex flex-col mx-auto">
                <div className='flex justify-between w-full mt-4'>
                    <h1 className="titulo"> Categorias </h1>
                    <Boton text="Crear categoria" onClick={() => setShowModalCrear(true)}/>
                </div>
                <h2 className='subtitulo'> Lista de categorias</h2>
                
                <Tabla listItems = {categorias} setIdSelected={setIdCategoriaSeleccionada} rename = {renombrar} />
            </div>
            {
                showModalCrear ? <ModalCrearCategoria setShowModal = {setShowModalCrear} /> : null
            }
        </>
    )
}
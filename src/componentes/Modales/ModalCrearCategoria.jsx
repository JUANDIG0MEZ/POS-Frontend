import Boton from "../Boton"
import InputText from "../InputText"
import { useState, useContext } from "react"
import {fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import { toast } from "sonner"
import { ContextInventario } from "../../contextInventario"

export default function CrearCategoria(props) {

    const {
        categorias,
        setCategorias
    } = useContext(ContextInventario)

    const [descripcion, setDescripcion] = useState("")
    const [nombre, setNombre] = useState("")

    function crearCategoria() {
        if (!nombre){
            toast.error("Debe ingresar un nombre")
            return
        }
        const categoria = {
            nombre
        }
        if (descripcion) categoria.descripcion = descripcion

        function cbCrear(res){

            setCategorias([...categorias, res.categoria])
    
            toast.success("Categoria creada")
            props.setShowModal(false)
        }

        fetchManager("http://localhost:3000/api/v1/producto/categoria", cbCrear, "POST", categoria)
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center ">
                <div className="flex flex-col w-[600px] bg-white gap-8 p-6 rounded">
                    <h1 className="titulo">Crear categoria</h1>
                    <div className="flex flex-col gap-6">
                        <InputText style='w-48' value={nombre} setValue={setNombre} label1={"Nombre"} />
                        <InputText value={descripcion} setValue={setDescripcion} label1={"Descripcion"}/>
                    </div>
                    <div className="flex gap-3 justify-end w-full">
                        <Boton text ="Cancelar" onClick = {() => props.setShowModal(false)} isNormal={true} />
                        <Boton text ="Crear categoria" onClick ={crearCategoria}/>
                    </div>
                    
                </div>

                
            </div>
        </>
    )
}
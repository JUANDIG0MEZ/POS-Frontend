import { useState, useEffect } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import MostrarImagen from "../MostrarImagen";
import {toast} from 'sonner';

const numeroMaximoArchivos = 20;

export default function ModificarImagenes(props) {
    const [urlsIniciales, setUrlsIniciales] = useState(props.imagenes)
    const [urlsSinBorradas, setUrlsSinBorradas] = useState(props.imagenes)

    const [urlsFiles, setUrlsFiles] = useState([])
    const [urlsMostrar, setUrlsMostrar] = useState([])
    const [indice, setIndice] = useState(0);

    useEffect(()=> {
        const urls = props.files.map((file) => {
            return URL.createObjectURL(file);
        });
        setUrlsFiles(urls);

        const mostrar = [...urls, ...urlsSinBorradas]
        setUrlsMostrar(mostrar)
    }, [props.files, urlsSinBorradas])

    const handleFileChange = (event) => {
        const archivosSeleccionados = Array.from(event.target.files);
        // Se deben eliminar los archivos que ya estan en el estado
        const archivosFiltrados = archivosSeleccionados.filter((selectedFile) => {
            // Se verifica si el archivo ya existe en el estado
                const existe = props.files.some((file) => {
                return selectedFile.name === file.name;
            });

            const esImagen = selectedFile.type.startsWith("image/");

            if (!esImagen || existe) {
                return false;
            }
            return true;
        });

        const totalArchivos = props.files.length
        const disponibles = numeroMaximoArchivos - totalArchivos - urlsSinBorradas.length

        if (disponibles <=0 ){
            toast.error("No puedes subir mas archivos")
            return
        }

        if (archivosFiltrados.length > disponibles){
            toast.warning(`Solo se pueden subir ${disponibles} archivos`)
        }

        const archivosPermitidos = archivosFiltrados.slice(0, disponibles)

        props.setFiles(props.files.concat(archivosPermitidos));
    };

    function eliminarImagen(){
        if (urlsMostrar.length >= 0){

            if (indice <= (urlsFiles.length - 1)){
                const nuevoFiles = [...props.files]
                nuevoFiles.splice(indice, 1)
                props.setFiles(nuevoFiles)
            }
            else if ( indice >= 0){
                const urlsOriginales = [... urlsSinBorradas]
                const borrada = urlsMostrar[indice]

                props.setBorradas([...props.borradas, borrada])
                urlsOriginales.splice(indice, 1)
                setUrlsSinBorradas(urlsOriginales)
            }
        }
        
        
    }

    return (
    <div className="flex flex-col items-center p-4 gap-2">
        <MostrarImagen imagenes={urlsMostrar} setIndice={setIndice}/>

        <div className="flex justify-evenly w-full items-center">
        <label className="bg-gray-50 border p-2 text-gray-600 rounded-lg hover:text-red-500 cursor-pointer hover:shadow-lg">
            <FaUpload className="w-5 h-5 text-inherit"/>
            <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            />
        </label>
        
        <div>
            {indice} de {urlsMostrar.length}
        </div>

        <div onClick={()=> eliminarImagen()} className="bg-gray-50 border p-2 text-gray-600 rounded-lg hover:text-red-500 cursor-pointer hover:shadow-lg">
            <FaTrash  className="w-5 h-5"/>
        </div>
        

        
        </div>
    </div>
    );
    }
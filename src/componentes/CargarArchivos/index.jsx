import { useState, useEffect } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import MostrarImagen from "../MostrarImagen";


const urlPrueba = "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=90"


export default function CargarArchivos(props) {

  const [urls, setUrls] = useState([]);
  const [indice, setIndice] = useState(0);

  useEffect(()=> {
    const urls = props.files.map((file) => {
      return URL.createObjectURL(file);
    });
    setUrls(urls);
  }, [props.files])


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    // Se deben eliminar los archivos que ya estan en el estado
    const filteredFiles = selectedFiles.filter((selectedFile) => {
      return !props.files.some((file) => {
        return selectedFile.name === file.name;
      });
    }
    );
    props.setFiles(props.files.concat(filteredFiles));
  };

  function eliminarImagen(){
    const nuevoFiles = [...props.files]
    nuevoFiles.splice(indice, 1)
    props.setFiles(nuevoFiles)
  }

  return (
    <div className="flex flex-col items-center p-4 gap-2">
      <MostrarImagen imagenes={urls} setIndice={setIndice}/>

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
          1 de 1
        </div>

        <div onClick={()=> eliminarImagen()} className="bg-gray-50 border p-2 text-gray-600 rounded-lg hover:text-red-500 cursor-pointer hover:shadow-lg">
          <FaTrash  className="w-5 h-5"/>
        </div>
        

        
      </div>
    </div>
  );
}
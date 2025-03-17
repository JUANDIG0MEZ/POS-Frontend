import { useState } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import MostrarImagen from "../MostrarImagen";


const urlPrueba = "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=90"


export default function CargarArchivos() {
  const [files, setFiles] = useState([]);



  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    // Se deben eliminar los archivos que ya estan en el estado
    const filteredFiles = selectedFiles.filter((selectedFile) => {
      return !files.some((file) => {
        return selectedFile.name === file.name;
      });
    }
    );
    setFiles(files.concat(filteredFiles));
  };


  return (
    <div className="flex flex-col items-center p-4 gap-2">
      <MostrarImagen imagenes={urlPrueba}/>

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

        <div className="bg-gray-50 border p-2 text-gray-600 rounded-lg hover:text-red-500 cursor-pointer hover:shadow-lg">
          <FaTrash className="w-5 h-5"/>
        </div>
        

        
      </div>
    </div>
  );
}
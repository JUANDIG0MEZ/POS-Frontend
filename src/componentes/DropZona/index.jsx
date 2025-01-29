import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";


export default function DropZona () {
  const [imagenPreview, setImagenPreview] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file); // Crear URL de vista previa
      setImagenPreview(previewUrl); 
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ 
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
  }});

  return (
    <div      
      {...getRootProps()}
      className={`flex flex-col rounded-xl cursor-pointer w-full h-full justify-center items-center ${
        isDragReject
          ? "border-red-500"
          : isDragActive
          ? "border-blue-500"
          : ""
      }
      
      ${
        acceptedFiles.length > 0 ? "border" : "border-dashed border-2"
      }
      `}
    >

      <input {...getInputProps()} />
      {
      
      acceptedFiles.length > 0 ? (
        <img className="rounded-xl w-full h-full object-contain" src={imagenPreview} alt="" />
      ) : isDragReject ? (
        <p className="text-red-500 w-fit p-2 bg-gray-100 rounded-md">Imagen invalida.</p>
      ) : isDragActive ? (
        <p className="text-blue-500 w-fit p-2 bg-gray-100 rounded-md">Suelta Aqui</p>
      ) : (
        <div className="justify-center items-center flex flex-col gap-4">
          <FaUpload className="w-16 h-16 text-gray-600"></FaUpload>
          <p className="w-fit p-2 bg-gray-100 rounded-md font-bold text-gray-600">Cargar imagen</p>
        </div>
        
      )}
    </div>
  );
};


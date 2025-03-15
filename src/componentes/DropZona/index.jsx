import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload, FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";

export default function DropZona() {
  const [imagenes, setImagenes] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const nuevasImagenes = acceptedFiles.map(file => URL.createObjectURL(file));
    setImagenes(prevImagenes => [...prevImagenes, ...nuevasImagenes]);
    if (imagenes.length === 0) {
      setIndiceActual(0);
    }
  }, [imagenes]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({ 
    onDrop,
    multiple: true,
    accept: { "image/*": [] }
  });

  const avanzarImagen = () => {
    if (imagenes.length > 0) {
      setIndiceActual((prev) => (prev + 1) % imagenes.length);
    }
  };

  const retrocederImagen = () => {
    if (imagenes.length > 0) {
      setIndiceActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    }
  };

  const eliminarImagenActual = (e) => {
    e.stopPropagation();
    if (imagenes.length > 0) {
      const nuevasImagenes = imagenes.filter((_, index) => index !== indiceActual);
      setImagenes(nuevasImagenes);
      setIndiceActual(prev => (prev >= nuevasImagenes.length ? 0 : prev));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div {...getRootProps()} className="relative w-96 h-80 flex justify-center items-center overflow-hidden border-2 rounded-2xl hover:border-rose-500 hover:shadow-2xl">
        <input {...getInputProps()} />
        {imagenes.length === 0 ? (
          isDragReject ? (
            <p className="text-red-500">Imagen inválida.</p>
          ) : isDragActive ? (
            <p className="text-green-500">Suelta aquí</p>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <FaUpload className="w-16 h-16 text-gray-600" />
              <p className="font-bold text-gray-600">Cargar imágenes</p>
            </div>
          )
        ) : (
          <>
            <img className="w-full h-full object-contain" src={imagenes[indiceActual]} alt="Vista previa" />
            <button 
              onClick={eliminarImagenActual} 
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full">
              <FaTrash />
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4">
          <button 
            onClick={retrocederImagen} 
            type="button"
            className="bg-gray-50 border p-2 rounded-full hover:shadow-lg">
            <FaArrowLeft />
          </button>
          <p className="text-gray-600">{indiceActual + 1} de {imagenes.length}</p>
          <button 
            onClick={avanzarImagen} 
            type="button"
            className="bg-gray-50 border p-2 rounded-full hover:shadow-lg">
            <FaArrowRight />
          </button>
        </div>
    </div>
  );
}

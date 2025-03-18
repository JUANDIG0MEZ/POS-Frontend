import {useEffect, useState} from 'react'
import {FaChevronRight, FaChevronLeft} from 'react-icons/fa'

export default function MostrarImagen(props){

    const [indexImagen, setIndexImagen] = useState(0)


    useEffect(()=> {
        if (indexImagen >= props.imagenes.length){
            if (props.imagenes.length > 0){
                setIndexImagen(props.imagenes.length -1 )
            }
            else {
                setIndexImagen(0)
            }
        }
    }, [props.imagenes])

    useEffect(()=> {
        if (props.setIndice){
            props.setIndice(indexImagen)
        }
    }, [indexImagen])

    function siguienteImagen(){
        if (indexImagen < props.imagenes.length - 1){
            setIndexImagen(indexImagen + 1)
        }
        else{
            setIndexImagen(0)
        }
    }

    function anteriorImagen(){
        if (indexImagen > 0){
            setIndexImagen(indexImagen - 1)
        }
        else{
            setIndexImagen(props.imagenes.length - 1)
        }
    }

    return (    
        <div className="flex flex-col items-center">
            <figure className='overflow-hidden relative rounded-lg border'>
                <div onClick={() => anteriorImagen()} className='absolute top-1/2 left-1 bg-gray-50 rounded-md cursor-pointer border text-gray-600 hover:text-red-500 hover:shadow-lg'>
                    <FaChevronLeft className='text-inherit m-1 w-5 h-5 '/>
                </div>
                <img className="w-[400px] h-80 object-contain" src={props.imagenes[indexImagen]} alt="" />
                <div onClick={()=> siguienteImagen()} className='absolute top-1/2 right-1 bg-gray-50 rounded-md cursor-pointer border text-gray-600 hover:text-red-500 hover:shadow-lg'>
                    <FaChevronRight className='text-inherit m-1 w-5 h-5'/>
                </div>
            </figure>

            {/* Puntitos indicadores */}
            <div className="flex gap-2 mt-2">
                {props.imagenes.map((_, i) => (
                    <span 
                        key={i} 
                        className={`w-3 h-3 rounded-full transition-all ${
                            indexImagen === i ? "bg-red-500" : "bg-gray-300"
                        }`}
                    ></span>
                ))}
            </div>
        </div>
    )
}

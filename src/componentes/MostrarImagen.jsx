import {useEffect, useState} from 'react'
import {FaChevronRight, FaChevronLeft, FaImages} from 'react-icons/fa'

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
        <figure className='w-[400px] h-[300px] overflow-hidden relative rounded-lg border flex items-center justify-center'>
            <div onClick={() => anteriorImagen()} className='absolute top-1/2 -left-2 bg-gray-50 rounded-md cursor-pointer border text-gray-600 hover:text-red-500 hover:shadow-lg'>
                <FaChevronLeft className='text-inherit m-1 w-5 h-5 '/>
            </div>
            {
                props.imagenes.length > 0 && <img className="w-[400px] h-[300px] object-contain" src={props.imagenes[indexImagen]} alt="" />
            }
            {
                props.imagenes.length === 0 && <FaImages className=' w-1/2 h-1/2 text-gray-300' />
            }
            
            <div onClick={()=> siguienteImagen()} className='absolute top-1/2 -right-2 bg-gray-50 rounded-md cursor-pointer border text-gray-600 hover:text-red-500 hover:shadow-lg'>
                <FaChevronRight className='text-inherit m-1 w-5 h-5'/>
            </div>

        </figure> 
    )
}

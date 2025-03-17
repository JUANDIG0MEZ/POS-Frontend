// se importar los iconos de la flechita hacia la derecha y hacia la izquierda
import {FaChevronRight, FaChevronLeft} from 'react-icons/fa'

export default function MostrarImagen(props){



    return (    
        
        <figure className='overflow-hidden relative rounded-lg border t'>
            <div className='absolute top-1/2 left-1 bg-gray-50 rounded-md cursor-pointer border text-gray-600 hover:text-red-500 hover:shadow-lg'>
                <FaChevronLeft className='text-inherit m-1 w-5 h-5 '/>
            </div>
            <img className="w-[400px] h-80 object-contain" src={props.imagenes} alt="" />
            <div className='absolute top-1/2 right-1 bg-gray-50 rounded-md cursor-pointer border text-gray-600 hover:text-red-500 hover:shadow-lg'>
                <FaChevronRight className='text-inherit m-1 w-5 h-5'/>
            </div>
        </figure>
        
    )
}
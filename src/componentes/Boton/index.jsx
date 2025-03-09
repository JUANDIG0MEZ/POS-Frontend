export default function Boton(props){

    function handleClick(){
        if (props.onClick){
            props.onClick()
        }
    }   

    return (
        <button onClick={handleClick} className={`${props.isNormal? 'text-gray-600 bg-gray-50 border hover:shadow-md' : ' bg-black text-white hover:shadow-xl'} px-4 py-2 rounded-lg font-bold  `}>
            {props.texto}
        </button>
    )
}
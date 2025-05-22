export default function BotonIcono(props){

    function handleClick(){
        if (props.onClick){
            props.onClick()
        }
    }   
    return (
        <button
        onClick={handleClick}
        className={'hover:text-red-500 text-gray-600 bg-gray-50 border hover:shadow-md px-3 py-3 rounded-lg font-bold text-md'}>
            {props.texto}
        </button>
    )
}
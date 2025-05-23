export default function BotonIcono(props){

    function handleClick(){
        if (props.onClick){
            props.onClick()
        }
    }   
    return (
        <button
        onClick={handleClick}
        className={'texto-hover texto-color bg-color texto-size borde hover:shadow-md px-3 py-3 boton-normal'}>
            {props.texto}
        </button>
    )
}
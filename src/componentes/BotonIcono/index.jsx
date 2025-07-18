export default function BotonIcono({onClick, icon}){

    function handleClick(){
        if (onClick) onClick()
    }   
    return (
        <button
        onClick={handleClick}
        className={'texto-hover texto-color bg-color texto-size borde hover:shadow-md px-3 py-3 boton-normal'}>
            {icon}
        </button>
    )
}
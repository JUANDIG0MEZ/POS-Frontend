export default function Boton({onClick, isNormal, text}){

    function handleClick(){
        if (onClick) onClick()
    }   
    return (
        <button
        onClick={handleClick}
        className={`${isNormal ? 'boton-normal' : ' boton-negro'} px-4 py-2 borde font-bold`}>
            {text}
        </button>
    )
}
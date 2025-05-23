export default function Boton(props){

    function handleClick(){
        if (props.onClick){
            props.onClick()
        }
    }   
    return (
        <button
        onClick={handleClick}
        className={`${props.isNormal? 'boton-normal' : ' boton-negro'} px-4 py-2 borde font-bold`}>
            {props.texto}
        </button>
    )
}
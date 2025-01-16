export default function Boton(props){
    return (
        <button className={`${props.isNormal? 'text-gray-600 bg-gray-100' : ' bg-black text-white'} px-4 py-2 rounded-lg font-bold`}>
            {props.texto}
        </button>
    )
}
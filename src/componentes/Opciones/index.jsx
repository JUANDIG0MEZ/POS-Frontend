export default function Opciones(props){

    return (
        <div className="flex items-center gap-2">
            {
            props.opciones.length > 0 ? props.opciones.map( opcion => {
                return (
                    <label key = {opcion.id} className={`flex items-center gap-2 cursor-pointer`}>
                        <input
                            type="radio"
                            checked={opcion.id == props.seleccionado}
                            onChange={() => props.setSeleccionado(opcion.id)}
                            
                            />
                            <span className="px-2 py-2 boton-normal">{opcion.nombre}</span> 
                    </label>
                )}) : null
            }
        </div>
        
    )
}
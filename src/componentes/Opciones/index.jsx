export default function Opciones({listItems, idSelected, setIdSelected}){

    return (
        <div className="flex items-center gap-2">
            {
            listItems.length > 0 ? listItems.map( opcion => {
                return (
                    <label key = {opcion.id} className={`flex items-center gap-2 cursor-pointer`}>
                        <input
                            type="radio"
                            checked={opcion.id == idSelected}
                            onChange={() => setIdSelected(opcion.id)}
                            />
                            <span className="px-2 py-2 boton-normal">{opcion.nombre}</span> 
                    </label>
                )}) : null
            }
        </div>
        
    )
}
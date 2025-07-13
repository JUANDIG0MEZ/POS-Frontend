




export default function Select({listItems, setValue, defaultValue, label}) {

    function handleChange(e) {
        const valor = e.target.value
        setValue(valor)
    }
    
    return (
        <form className="">
            <select
            className="py-2.5 px-4 boton-normal"
            onClick={handleChange}>
            <option value={defaultValue} >{label}</option>
            {
                listItems.map( opcion  => {
                    return (
                        <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
                    )
                })
            }
            </select>
        </form>
    )
}





export default function Select(props) {

    function handleChange(e) {
        const valor = e.target.value
        props.setValor(valor)
    }
    
    return (
        <form className="">
            <select
            className="py-2.5 px-4 boton-normal"
            onClick={handleChange}>
            <option value={props.valorDefault} >{props.label}</option>
            {
                props.opciones.map( opcion  => {
                    return (
                        <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
                    )
                })
            }
            </select>
        </form>
    )
}
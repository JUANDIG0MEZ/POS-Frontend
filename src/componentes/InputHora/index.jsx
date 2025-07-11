

export default function inputHora(props){
    function onChange (e) {
        if (props.setValor) props.setValor(e.target.value)
    }
    return (
        <div className="flex flex-col gap-2 relative">
            <label htmlFor="fecha" className="text-sm/6 font-medium absolute -top-6 ">{props.label || ""}</label>
            <input
                type="time"
                className="p-2 border rounded-md borde-input"
                onChange={onChange}
                value={props.valor.slice(0,5)}
                />
        </div>
    )
}
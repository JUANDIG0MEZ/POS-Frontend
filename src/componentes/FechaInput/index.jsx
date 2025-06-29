

export default function FechaInput(props){

    return (
        <div className="flex flex-col gap-2 relative">
            <label htmlFor="fecha" className="text-sm/6 font-medium absolute -top-6 ">{props.label || ""}</label>
            <input
                type="date"
                name="fecha"
                id="fecha"
                className="p-2 border rounded-md borde-input"
                onChange={e => props.setValor(e.target.value)}
                value={props.valor}
                />
        </div>
    )
}
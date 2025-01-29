

export default function FechaInput(props){
    return (
        <div className="flex flex-col gap-2 relative">
            <label htmlFor="fecha" className="absolute -top-6 font-semibold text-gray-600">{props.label || ""}</label>
            <input type="date" name="fecha" id="fecha" className="p-2 border rounded-md"/>
        </div>
    )
}


export default function FechaInput({value, setValue, label}){

    function onChange (e) {
        if (setValue) setValue(e.target.value)
    }

    return (
        <div className="flex flex-col gap-2 relative">
            <label htmlFor="fecha" className="text-sm/6 font-medium absolute -top-6 ">{label || ""}</label>
            <input
                type="date"
                name="fecha"
                id="fecha"
                className="p-2 border rounded-md borde-input"
                onChange={onChange}
                value={value}
                />
        </div>
    )
}
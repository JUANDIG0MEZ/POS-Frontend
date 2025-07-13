

export default function inputHora({value, setValue, label}){
    function onChange (e) {
        if (setValue) setValue(e.target.value)
    }
    return (
        <div className="flex flex-col gap-2 relative">
            <label htmlFor="fecha" className="text-sm/6 font-medium absolute -top-6 ">{label || ""}</label>
            <input
                type="time"
                className="p-2 border rounded-md borde-input"
                onChange={onChange}
                value={value.slice(0,5)}
                />
        </div>
    )
}

export default function RadioBoton({value, name, checked, label, onChange}){
    return (
        <label className="flex items-center gap-2 cursor-pointer "> 
            <input
            type="radio"
            value={value}
            name={name}
            checked={checked}
            onChange={()=>onChange(value)}            />
            <span className="px-2 py-2 boton-normal">{label}</span>
        </label>
    )
}

export default function RadioBoton(props){



    return (
        <label className="flex items-center gap-2 cursor-pointer"> 
            <input
            type="radio"
            value={props.valor}
            name={props.name}
            checked={props.checked}
            onChange={()=>props.onChange(props.valor)}            />
            <span className="bg-slate-50 px-2 py-1 border rounded-lg">{props.label}</span>
        </label>
    )
}
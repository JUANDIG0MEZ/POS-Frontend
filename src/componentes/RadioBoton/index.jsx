
export default function RadioBoton(props){



    return (
        <label className="flex items-center gap-2 cursor-pointer "> 
            <input
            type="radio"
            value={props.valor}
            name={props.name}
            checked={props.checked}
            onChange={()=>props.onChange(props.valor)}            />
            <span>{props.label}</span>
        </label>
    )
}
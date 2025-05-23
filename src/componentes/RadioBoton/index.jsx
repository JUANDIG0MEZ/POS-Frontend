
export default function RadioBoton(props){



    return (
        <label className="flex items-center gap-2 cursor-pointer "> 
            <input
            type="radio"
            value={props.valor}
            name={props.name}
            checked={props.checked}
            onChange={()=>props.onChange(props.valor)}            />
            <span className="px-2 py-2 boton-normal">{props.label}</span>
        </label>
    )
}

export default function InputText(props){
    function labelSeleccionado (labelSolo) {
        if (props.labelSeleccionado){
            return (
                <>
                    <span >{labelSolo}</span>
                    <span>{" "}</span>
                    <span className="etiqueta">{props.labelSeleccionado}</span>
                </>
                
            )
        }
        return labelSolo
    }
    

    const establecerValor = (e) => {
        const regex = /[^a-zA-Z0-9\s\p{P}]/gu;
        
        const nuevoValor = e.target.value.replace(regex, "")
        if (props.setValor){
            props.setValor(nuevoValor)       
        }
    }


    return (
        <div className={`relative ${props.estilo ? props.estilo : "flex-1"}`}>
            <label className="text-sm/6 font-medium text-gray-900 absolute -top-7 text-nowrap">{labelSeleccionado(props.label)}</label>
            <input 
            onChange={establecerValor}
            type="text" 
            value={props.valor || ""}
            className={` ${props.isNumber ? "tracking-widest" : "tracking-wide"}  px-3 py-1.5 text-base w-full rounded-lg borde-input`}
            />
        </div>
    )
}
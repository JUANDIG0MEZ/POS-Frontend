
export default function InputText(props){
    function labelSeleccionado (labelSolo) {

        if (props.labelSeleccionado){
            return (
                <>
                    {labelSolo + "  "}  
                    {
                    <span className="etiqueta">
                        {props.isPrice ? "$ ": ""}
                        {formattedValue(props.labelSeleccionado, true)}
                    </span>
                    }
                </>               
            )
        }
        return labelSolo
    }
    

    const establecerValor = (e) => {
        const regex = /[^0-9]/g
        
        const nuevoValor = e.target.value.replace(regex, "")

        if (props.setValor){
            props.setValor(parseInt(nuevoValor || 0))            
        }
    }


    return (
        <div className={`relative ${props.estilo ? props.estilo : "flex-1"}`}>
            <label className="font-semibold absolute -top-6 text-nowrap">{labelSeleccionado(props.label)}</label>
            <input 
            onChange={establecerValor}
            type="text" 
            value={ props.format ? formattedValue(props.valor, props.format) : props.valor || "0"}
            className={` ${props.isNumber ? "tracking-widest" : "tracking-wide"} w-full border rounded-md p-2  borde-input `}/>
        </div>
    )
}


function formattedValue(value, format){
    if (value){
        if (format) {
            return `${Number(value).toLocaleString()}`
        }
        return value 
        
    }
    else{
        return "0"
    }
    
}
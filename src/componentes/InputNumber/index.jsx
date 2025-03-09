
export default function InputText(props){
    function labelSeleccionado (labelSolo) {

        if (props.labelSeleccionado){
            return (
                <>
                    {labelSolo + "  "}  
                    {
                    <span className="text-black">
                        {props.isPrice ? "$ ": ""}
                        {props.format ? formattedValue(props.labelSeleccionado) : props.labelSeleccionado}
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
            props.setValor(parseInt(nuevoValor))            
        }
    }


    return (
        <div className={`relative ${props.estilo ? props.estilo : "flex-1"}`}>
            <label className="font-semibold absolute -top-6 text-gray-600 text-md text-nowrap">{labelSeleccionado(props.label)}</label>
            <input 
            onChange={establecerValor}
            type="text" 
            value={ props.format ? formattedValue(props.valor, props.format) : props.valor || ""}
            className={` ${props.isNumber ? "tracking-widest" : "tracking-wide"} w-full border rounded-md px-2 py-1 focus:outline-none focus:border-black focus:ring-neutral-600 focus:ring-2 transition duration-200`}/>
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
        return ""
    }
    
}
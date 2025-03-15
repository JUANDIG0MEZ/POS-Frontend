
export default function InputText(props){
    function labelSeleccionado (labelSolo) {

        if (props.labelSeleccionado){
            return (
                <>
                    {labelSolo + "  "}  
                    {
                    <span className="text-black">
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
            <label className="font-semibold absolute -top-6 text-gray-600 text-md text-nowrap">{labelSeleccionado(props.label)}</label>
            <input 
            onChange={establecerValor}
            type="text" 
            value={ props.format ? formattedValue(props.valor, props.format) : props.valor || ""}
            className={` ${props.isNumber ? "tracking-widest" : "tracking-wide"} font-semibold w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-rose-600 ring-red-300 text-gray-600 transition duration-200`}/>
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
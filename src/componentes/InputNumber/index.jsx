
export default function InputNumber(props){

    function labelSeleccionado (labelSolo) {

        if (props.labelSeleccionado){
            return (
                <>
                    {labelSolo + "  "}  
                    {
                    <span className="etiqueta">
                        {props.isPrice ? "$ ": ""}
                        {`${Number(props.labelSeleccionado).toLocaleString()}`}
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
            props.setValor(nuevoValor)            
        }
    }


    return (
        <div className={`relative ${props.estilo ? props.estilo : "flex-1"}`}>
            <label className="text-sm/6 font-medium absolute -top-7 text-nowrap">{labelSeleccionado(props.label)}</label>
            <input 
            onFocus={()=> props.setValor ? props.setValor("") : null}
            onChange={establecerValor}
            type="text" 
            value={ props.valor ? Number(props.valor).toLocaleString() : ""}
            className={`px-3 py-1.5 text-base tracking-widest w-full border rounded-md  borde-input `}/>
        </div>
    )
}


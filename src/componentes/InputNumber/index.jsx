
export default function InputNumber({label1, label2, isPrice, value, setValue, style, instanceNumber }){

    function label () {
        if (label2){
            return (
                <>
                    {label1 + "  "}  
                    {
                    <span className="etiqueta">
                        {isPrice ? "$ ": ""}
                        {`${Number(label2).toLocaleString()}`}
                    </span>
                    }
                </>               
            )
        }
        return label1
    }


    const establecerValor = (e) => {
        let valor = e.target.value.replace(/,/g, "")

        if (instanceNumber.test(valor)){
            if (setValue){
            setValue(valor)}
        }


    } 


    if (!instanceNumber) return null
    return (
        <div className={`relative ${style ? style : "flex-1"}`}>
            <label className="text-sm/6 font-medium absolute -top-7 text-nowrap">{label()}</label>
            <input 
            onFocus={()=> setValue ? setValue("") : null}
            onChange={establecerValor}
            type="text" 
            value={ instanceNumber.show(value)}
            className={`px-3 py-1.5 text-base tracking-widest w-full border rounded-md  borde-input `}/>
        </div>
    )
}


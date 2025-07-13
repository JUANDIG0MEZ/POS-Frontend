
export default function InputText({value, setValue, label1, label2, style}){
    function showLabel () {
        if (label2){
            return (
                <>
                    <span >{label1}</span>
                    <span>{" "}</span>
                    <span className="etiqueta">{label2}</span>
                </>
                
            )
        }
        return label1
    }
    

    const establecerValor = (e) => {
        const regex = /[^a-zA-Z0-9\s\p{P}]/gu;
        
        const nuevoValor = e.target.value.replace(regex, "")
        if (setValue){
            setValue(nuevoValor)       
        }
    }


    return (
        <div className={`relative ${style ? style : "flex-1"}`}>
            <label className="text-sm/6 font-medium text-gray-900 absolute -top-7 text-nowrap">{showLabel()}</label>
            <input 
            onChange={establecerValor}
            type="text" 
            value={value || ""}
            className={`tracking-wide px-3 py-1.5 text-base w-full rounded-lg borde-input`}
            />
        </div>
    )
}
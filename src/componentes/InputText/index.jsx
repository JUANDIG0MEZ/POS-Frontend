

export default function InputText(props){
    
    const establecerValor = (e) => {
        const nuevoValor = e.target.value
        if (props.setValor){
            props.setValor(nuevoValor)
        }
    }



    return (
        <>
            <div className="relative w-full">
                <label className="font-semibold absolute -top-6 text-gray-500 text-md">{props.label}</label>
                <input 
                onChange={establecerValor}
                value={props.valor}
                type="text" 
                className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-black focus:ring-neutral-600 focus:ring-2 transition duration-200"/>
            </div>
        </>
    )
}
import { useState} from "react"
import { FaChevronDown } from "react-icons/fa"


export default function InputListaMultiple({listItems, value, label, setValue, setIdSelected, style}) {
    const [showLista, setShowLista] = useState(false)


    // function labelSeleccionado () {
    //     if (props.labelSeleccionado){
    //         return (
    //             <>
    //                 {props.label}
    //                 {<span className="etiqueta">    {props.labelSeleccionado}</span>}
    //             </>               
    //         )
    //     }
    //     return props.label
    // }

    function seleccionarItem(e){
        const fila = e.target.closest('li')
        if (fila){
            const id = parseInt(fila.dataset.id)
            const nuevoValor = listItems.find(item => item.id == id).nombre
            setShowLista(false)
            setValue(nuevoValor)
            if (setIdSelected){
                setIdSelected(id)
            }
        }      
    }

    const establecerValor = (e) => {
        const regex = /[^a-zA-Z0-9\s\p{P}]/gu;

        const nuevoValor = e.target.value.replace(regex, "")
        if (setValue) setValue(nuevoValor)        
    }

    // Esta 
    function listaFiltrada(valor) {
        if (!valor) return listItems;
        return listItems.filter(obj => obj.nombre.toLowerCase().includes(valor.toLowerCase()));
    }

    function mostrarObjeto(item) {
        return (
        <div className="flex gap-3 text-nowrap">
            <p className="text-gray-500">{item.id}  </p>
            <p className="w-[220px] overflow-hidden font-bold text-color-" >{item.nombre}</p>
            <p className="w-[100px] overflow-hidden text-red-500">{item.medida}</p>
            <p className="w-[160px] overflow-hidden text-gray-500">{item.categoria}</p>
        </div>
        )
    }


    function onFocus(){
        setValue("")
        setShowLista(true)
        if (setIdSelected) setIdSelected(null)
    }
    


    return (
        <div className={`relative ${style ? style : "flex-1"}`}>
            <label className="text-sm/6 font-medium absolute -top-6 text-md">{label}</label>
            <div className="items-center flex aling-center">
                <input 
                onFocus={onFocus} 
                onBlur={()=>{setShowLista(false)}}
                onChange={establecerValor}
                value = {value || ""}
                
                className={`tracking-wide w-full border p-2 pr-6  focus:outline-none  ${showLista ? "rounded-t-lg border-b-white": "rounded-lg" }   `}/>

                <FaChevronDown
                className={` text-sm absolute right-2 top-3 w-4 h-4 transition-transform ${showLista ? "rotate-180" : "rotate-0"}`}/>
            </div>
  
            <ul       
                onMouseDown={seleccionarItem}
                className={`bg-white absolute w-full z-10  border overflow-y-auto rounded-b-lg shadow-lg max-h-72 ${showLista ? "block" : "hidden"}`}>
                    {
                        listItems.length ?  listaFiltrada(value).slice(0, 20).map((item, indice)=>{
                            return <li key={indice} data-id={item.id} className=" hover-1 p-2 rounded-lg font-semibold">{mostrarObjeto(item)}</li>
                        }) : null
                    }
            </ul>
        </div>

    )
}
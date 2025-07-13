import { useState} from "react"
import { FaChevronDown } from "react-icons/fa"

export default function InputLista({listItems, value, setValue, setIdSelected, style, label}) {
    const [showLista, setShowLista] = useState(false)


    function seleccionarItem(e){
        const fila = e.target.closest('li')
        if (fila){
            const valor = fila.textContent
            const id = parseInt(fila.dataset.id)
            setValue(valor)
            
            
            if (setIdSelected) setIdSelected(id)
            setShowLista(false)
        }      
    }

    const establecerValor = (e) => {

        const regex = /[^a-zA-Z0-9\s\p{P}]/gu;

        const nuevoValor = e.target.value.replace(regex, "")
        setValue(nuevoValor)

        if (setIdSelected){
            setIdSelected(null)
        }      
    }



    function onFocus(){
        setShowLista(true)
        setValue("")
        if (setIdSelected){
            setIdSelected(null)
        }     
    }

    

    function listaFiltrada(){
        return listItems.filter(item => item.nombre.toLowerCase().includes((value || "").toLowerCase()))
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
                className={`tracking-wide w-full border p-2 pr-6 focus:outline-none  ${showLista ? "rounded-t-lg border-b-white": "rounded-lg" }   `}/>

                <FaChevronDown
                className={` text-sm absolute right-2 top-3 w-4 h-4 transition-transform ${showLista ? "rotate-180" : "rotate-0"}`}/>
            </div>
  
            <ul       
                onMouseDown={seleccionarItem}
                className={`absolute w-full z-10 bg-white border overflow-y-auto rounded-b-lg shadow-lg max-h-52 ${showLista ? "block" : "hidden"}`}>
                    {
                        listItems.length ? listaFiltrada(value).slice(0, 20).map((item, indice)=>{
                            return <li key={indice} data-id={item.id} className="hover-1 hover:font-semibold p-2 rounded-lg">{item.nombre}</li>
                        }): null
                    }
            </ul>
        </div>

    )
}
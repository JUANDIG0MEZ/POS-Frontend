import { useState} from "react"
import { FaChevronDown } from "react-icons/fa"

export default function InputLista(props) {
    const [showLista, setShowLista] = useState(false)


    function seleccionarItem(e){
        const fila = e.target.closest('li')
        if (fila){
            const valor = fila.textContent
            const id = parseInt(fila.dataset.id)
            props.setValor(valor)
            
            
            if (props.setIdSeleccionado){
                props.setIdSeleccionado(id)
            }
            setShowLista(false)
        }      
    }

    const establecerValor = (e) => {

        const regex = /[^a-zA-Z0-9\s\p{P}]/gu;

        const nuevoValor = e.target.value.replace(regex, "")
        props.setValor(nuevoValor)

        if (props.setIdSeleccionado){
            props.setIdSeleccionado(null)
        }      
    }


    function onFocus(){
        setShowLista(true)
        props.setValor("")
        if (props.setIdSeleccionado){
            props.setIdSeleccionado(null)
        }     
    }


    function listaFiltrada(){
        return (props.lista.filter(item => item.nombre.toLowerCase().includes((props.valor || "").toLowerCase())))
    }

    


    return (
        <div className={`relative ${props.estilo ? props.estilo : "flex-1"}`}>
            <label className="text-sm/6 font-medium absolute -top-6 text-md">{props.label}</label>
            <div className="items-center flex aling-center">
                <input
                onFocus={onFocus} 
                onBlur={()=>{setShowLista(false)}}
                onChange={establecerValor}
                value = {props.valor || ""}
                className={`tracking-wide w-full border p-2 pr-6 focus:outline-none  ${showLista ? "rounded-t-lg border-b-white": "rounded-lg" }   `}/>

                <FaChevronDown
                className={` text-sm absolute right-2 top-3 w-4 h-4 transition-transform ${showLista ? "rotate-180" : "rotate-0"}`}/>
            </div>
  
            <ul       
                onMouseDown={seleccionarItem}
                className={`absolute w-full z-10 bg-white border overflow-y-auto rounded-b-lg shadow-lg max-h-52 ${showLista ? "block" : "hidden"}`}>
                    {
                        listaFiltrada(props.valor).slice(0, 20).map((item, indice)=>{
                            return <li key={indice} data-id={item.id} className="hover-1 hover:font-semibold p-2 rounded-lg">{item.nombre}</li>
                        })
                    }
            </ul>
        </div>

    )
}
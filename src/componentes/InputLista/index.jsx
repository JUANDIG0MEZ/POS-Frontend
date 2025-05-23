import { useState} from "react"
import { FaChevronDown } from "react-icons/fa"

export default function InputLista(props) {
    const [showLista, setShowLista] = useState(false)


    function seleccionarItem(e){
        const fila = e.target.closest('li')
        if (fila){
            const valor = fila.textContent
            const id = parseInt(fila.dataset.id)
            const nuevoValor = valor
            setShowLista(false)
            props.setValor(nuevoValor)
            if (props.setIdSeleccionado){
                props.setIdSeleccionado(id)
            }
        }      
    }

    const establecerValor = (e) => {
        let regex
        if (props.isNumber){    
            regex = /[^0-9]/g
        }
        else {
            regex = /[^a-zA-Z0-9\s\p{P}]/gu;
        }

        const nuevoValor = e.target.value.replace(regex, "")
        if (props.setValor){
            props.setValor(nuevoValor)
            if (props.setIdSeleccionado){
                props.setIdSeleccionado(null)
            }
        }        
    }


    function labelSeleccionado (labelSolo) {
        if (props.labelSeleccionado){
            return (
                <>
                    {labelSolo}
                    {<span className="text-black">    {props.labelSeleccionado}</span>}
                </>               
            )
        }
        return labelSolo
    }

    function listaFiltrada(){
        if (props.lista){
            if (props.isNumber){
                return (props.lista.filter(item => item.nombre.toString().includes(props.valor || "")))
            }
            else{
                return (props.lista.filter(item => item.nombre.toLowerCase().includes((props.valor || "").toLowerCase())))
            }

        }
        else{
            return []
        }
    }

    


    return (
        <div className={`relative ${props.estilo ? props.estilo : "flex-1"}`}>
            <label className="absolute -top-6  font-semibold  text-md">{labelSeleccionado(props.label)}</label>
            <div className="items-center flex aling-center">
                <input 
                onFocus={()=>{setShowLista(true)}} 
                onBlur={()=>{setShowLista(false)}}
                onChange={establecerValor}
                value = {props.valor || ""}
                className={`${props.isNumber ? "tracking-wider" : "tracking-wide"} w-full border p-2 pr-6 focus:outline-none  ${showLista ? "rounded-t-lg border-b-white": "rounded-lg" }   `}/>

                <FaChevronDown
                className={` text-sm absolute right-2 top-3 w-4 h-4 transition-transform ${showLista ? "rotate-180" : "rotate-0"}`}/>
            </div>
  
            <ul       
                onMouseDown={seleccionarItem}
                className={`absolute w-full z-10 bg-white border overflow-y-auto rounded-b-lg shadow-lg max-h-52 ${showLista ? "block" : "hidden"}`}>
                    {
                        listaFiltrada(props.valor) && listaFiltrada(props.valor).slice(0, 20).map((item, indice)=>{
                            return <li key={indice} data-id={item.id} className="hover-1 hover:font-semibold p-2 rounded-lg">{item.nombre}</li>
                        })
                    }
            </ul>
        </div>

    )
}
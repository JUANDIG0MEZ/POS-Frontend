import { useState} from "react"
import { FaChevronDown } from "react-icons/fa"

export default function InputLista(props) {
    const [showLista, setShowLista] = useState(false)
    console.log(props.valor)
    function seleccionarItem(e){
        const fila = e.target.closest('li')
        if (fila){
            const valor = fila.textContent
            const key = fila.getAttribute("key")
            const nuevoValor = {id: key, nombre: valor}
            setShowLista(false)
            props.setValor(nuevoValor)
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

        const nuevoValorNombre = e.target.value.replace(regex, "")
        if (props.setValor){
            
            const nuevoValor = { id: null, nombre: nuevoValorNombre }
            props.setValor(nuevoValor)

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

    function listaFiltrada(nuevoValor){
        if (props.lista){
            if (props.isNumber){
                return (props.lista.filter(item => item.nombre.toString().includes(nuevoValor.nombre || "")))
            }
            else{
                return (props.lista.filter(item => item.nombre.toLowerCase().includes((nuevoValor.nombre || "").toLowerCase())))
            }

        }
        else{
            return []
        }
    }

    


    return (
        <div className={`relative ${props.estilo ? props.estilo : "flex-1"}`}>
            <label className="absolute -top-6  font-semibold text-gray-600 text-md">{labelSeleccionado(props.label)}</label>
            <div className="items-center flex aling-center">
                <input 
                onFocus={()=>{setShowLista(true)}} 
                onBlur={()=>{setShowLista(false)}}
                onChange={establecerValor}
                value = {props.valor.nombre || ""}
                className={`${props.isNumber ? "tracking-wider" : "tracking-wide"} w-full border px-2 py-1 pr-6 focus:outline-none  ${showLista ? "rounded-t-md border-b-white": "rounded-md" }   `}/>

                <FaChevronDown
                className={` text-sm absolute right-2 top-2 transition-transform ${showLista ? "rotate-180" : "rotate-0"}`}/>
            </div>
  
            <ul       
                onMouseDown={seleccionarItem}
                className={`absolute w-full z-10 bg-white border overflow-y-auto rounded-b-md shadow-lg max-h-52 ${showLista ? "block" : "hidden"}`}>
                    {
                        listaFiltrada(props.valor) && listaFiltrada(props.valor).slice(0, 20).map((item)=>{
                            return <li key={item.id} className="hover:bg-red-300 px-2 py-1 rounded-sm">{item.nombre}</li>
                        })
                    }
            </ul>
        </div>

    )
}
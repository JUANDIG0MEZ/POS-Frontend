import { useState} from "react"
import { FaChevronDown } from "react-icons/fa"

export default function InputListaMultiple(props) {
    const [showLista, setShowLista] = useState(false)


    function labelSeleccionado () {
        if (props.labelSeleccionado){
            return (
                <>
                    {props.label}
                    {<span className="etiqueta">    {props.labelSeleccionado}</span>}
                </>               
            )
        }
        return props.label
    }

    function seleccionarItem(e){
        const fila = e.target.closest('li')
        if (fila){
            const id = parseInt(fila.dataset.id)
            const nuevoValor = props.lista.find(item => item.id == id).nombre
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

        }        
    }

    // Esta 
    function listaFiltrada(valor) {
        if (!valor) return props.lista;
        return props.lista.filter(obj => obj.nombre.toLowerCase().includes(valor.toLowerCase()));
    }

    function mostrarObjeto(item) {
        return (
        <div className="flex gap-3 text-nowrap">
            <p className="">{item.id}</p>
            <p className="w-[220px] overflow-hidden font-bold text-color-" >{item.nombre}</p>
            <p className="w-[100px] overflow-hidden text-teal-500">{item.medida}</p>
            <p className="w-[160px] overflow-hidden text-gray-500">{item.categoria}</p>
        </div>
        )
    }


    function onFocus(){
        props.setValor("")
        setShowLista(true)
        if (props.setIdSeleccionado){
            props.setIdSeleccionado(null)
        }
    }
    


    return (
        <div className={`relative ${props.estilo ? props.estilo : "flex-1"}`}>
            <label className="text-sm/6 font-medium absolute -top-6 text-md">{labelSeleccionado()}</label>
            <div className="items-center flex aling-center">
                <input 
                onFocus={onFocus} 
                onBlur={()=>{setShowLista(false)}}
                onChange={establecerValor}
                value = {props.valor || ""}
                
                className={`${props.isNumber ? "tracking-wider" : "tracking-wide"} w-full border p-2 pr-6  focus:outline-none  ${showLista ? "rounded-t-lg border-b-white": "rounded-lg" }   `}/>

                <FaChevronDown
                className={` text-sm absolute right-2 top-3 w-4 h-4 transition-transform ${showLista ? "rotate-180" : "rotate-0"}`}/>
            </div>
  
            <ul       
                onMouseDown={seleccionarItem}
                className={`bg-white absolute w-full z-10  border overflow-y-auto rounded-b-lg shadow-lg max-h-72 ${showLista ? "block" : "hidden"}`}>
                    {
                        props.lista.length ? listaFiltrada(props.valor) && listaFiltrada(props.valor).slice(0, 20).map((item, indice)=>{
                            return <li key={indice} data-id={item.id} className=" hover-1 p-2 rounded-lg font-semibold">{mostrarObjeto(item)}</li>
                        }) : null
                    }
            </ul>
        </div>

    )
}
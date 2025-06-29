import BotonIcono from "../BotonIcono"
import { useState } from "react"
import { FaEye } from "react-icons/fa"
export default function InputPassword(props) {
    const [mostrarConstrasenia, setMostrarContrasenia] = useState(false)
    function labelSeleccionado(labelSolo) {
        if (props.labelSeleccionado) {
            return (
                <div className="flex w-full justify-between">
                    <span>{labelSolo}</span>
                    
                    <span className="etiqueta">{props.labelSeleccionado}</span>
                </div>
            )
        }
        return labelSolo
    }

    const establecerValor = (e) => {
        const nuevoValor = e.target.value;
        if (props.setValor) {
            props.setValor(nuevoValor);
        }
    }

    return (
        <div className={`relative ${props.estilo ? props.estilo : "flex-1"}`}>
            <label className="text-sm/6 font-medium text-gray-900 absolute -top-7 text-nowrap">{labelSeleccionado(props.label)}</label>

            <div className="flex gap-1">
                <input
                onChange={establecerValor}
                type={!mostrarConstrasenia ? "password" : "text"}
                value={props.valor || ""}
                className={`px-3 py-1.5 text-base w-full rounded-lg borde-input`}/>

                <div onMouseDown={() => {setMostrarContrasenia(!mostrarConstrasenia)}}>

                    <BotonIcono texto={<FaEye/>}/>
                </div>
            </div>
            
        </div>
    )
}
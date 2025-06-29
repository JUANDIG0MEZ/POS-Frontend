import { useState } from "react"
import InputText from "../../componentes/InputText"
import { FaReact } from "react-icons/fa"
import { Link } from "react-router-dom"
import InputPassword from "../../componentes/InputPassword"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import { useNavigate } from "react-router-dom"

export default function Login () {
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")


    const navigate = useNavigate();

    function cbInicioSesion(res) {
      navigate("/inventario")
    }

    function iniciarSesion() {
      fetchManager("http://localhost:3000/api/v1/autenticacion/ingresar", cbInicioSesion, "POST", { email, contrasenia: password })
    }

    return (
    <>
      <div className="flex max-w-sm sm:w-full sm:max-w-sm mx-auto flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="max-w-sm mx-auto">
            <div className="h-10 w-10 mx-auto">
                <FaReact className='animate-spin rain w-full h-full'/>
            </div>
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Ingresa a tu cuenta
          </h2>
        </div>

        <div className="flex flex-col gap-10 mt-10 mx-auto max-w-sm sm:w-full sm:max-w-sm">
            <InputText label='Correo electronico' valor={email} setValor={setEmail}/>
            <InputPassword label='Contrasenia' valor={password} setValor={setPassword}/>
                        
        </div>
        
        <button onClick={() => iniciarSesion()} className="w-full font-semibold bg-black rounded-lg hover:shadow-lg text-white py-1 hover:bg-slate-800 mt-4">Iniciar sesion</button>
        <h3 className="mx-auto mt-6">No tienes cuenta? <Link to="/registrar"><strong>Crear aqui</strong> </Link></h3>
      </div>
    </>
    )
}
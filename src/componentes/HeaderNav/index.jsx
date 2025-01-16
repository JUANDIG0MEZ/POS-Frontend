import {FaHome, FaBox, FaUser, FaShoppingCart, FaCashRegister, FaReact} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'

const navItems = {
    'Inicio': {
        icon: <FaHome />,
        to: '/'
    },
    'Inventario': {
        icon: <FaBox />,
        to: '/inventario'
    },
    'Compras': {
        icon: <FaShoppingCart />,
        to: '/compras'
    },
    'Ventas': {
        icon: <FaCashRegister />,
        to: '/ventas'
    },
    'Clientes': {
        icon: <FaUser />,
        to: '/clientes'
    },
}

export default function HeaderNav() {
    return (
        <nav className='flex bg-black justify-between p-3 text-lg px-6'>
            <h1 className='flex text-xl text-white items-center gap-2'><FaReact className='animate-spin rain'/>Inventario</h1>
            <ul className='flex gap-6'>
                {
                    Object.keys(navItems).map((item, index)=>{
                        return (
                            <li key={index}>
                                <NavLink to={navItems[item].to} className={({isActive}) => `${isActive ? "font-bold": "font-thin"} text-white flex items-center gap-3`}>
                                    {item}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>

            <ul className='grow-0 flex items-center text-white gap-4'>
                <li>
                    Juan Diego
                </li>
                <li>
                    <NavLink className=''>
                        <FaUser/>
                    </NavLink> 
                </li>
                   
                
                
            </ul>

            
        </nav>
    )
}
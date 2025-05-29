import {FaHome, FaBox, FaUser, FaShoppingCart, FaCashRegister, FaReact} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'

const navItems = {
    'Inicio': {
        icon: <FaHome />,
        to: '/'
    },
    'Productos': {
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
    }
}

export default function HeaderNav() {
    return (
        <nav className='flex bg-black justify-between p-3 text-xl px-6'>
            <h1 className='flex font-bold text-white items-center gap-2'><FaReact className='animate-spin rain'/>PersonalPos</h1>
            <ul className='flex gap-6'>
                {
                    Object.keys(navItems).map((item, index)=>{
                        return (
                            <li key={index}>
                                <NavLink to={navItems[item].to} className={({isActive}) => `${isActive ? "font-bold": "font-normal"} text-white flex items-center gap-3`}>
                                    {item}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
            
            <NavLink to='/perfil' className=''>
                <p className='grow-0 flex items-center text-white gap-4'>Juan Diego <FaUser/></p>
            </NavLink> 
            

            
        </nav>
    )
}
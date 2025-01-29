import HeaderNav from '../HeaderNav';
import {Outlet} from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className='flex flex-col h-screen'>
            <HeaderNav/>
            <Outlet />
            
            
        </div>
    )
}
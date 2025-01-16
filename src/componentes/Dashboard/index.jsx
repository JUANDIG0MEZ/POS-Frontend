import HeaderNav from '../HeaderNav';
import {Outlet} from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className=''>
            <HeaderNav/>
            <Outlet />
        </div>
    )
}
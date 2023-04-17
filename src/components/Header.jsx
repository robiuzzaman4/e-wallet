import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { WalletIcon, Bars2Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { AuthContext } from '../provider/AuthProvider';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogOut = () => {
        logout()
            .then(() => {
                console.log('Log out successful');
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <header className='bg-slate-900/50'>
            <nav className='custom-container py-6'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-8 relative'>
                    <Link to='/' className='flex items-center gap-2'>
                        <WalletIcon className="h-6 w-6 text-blue-500" />
                        <span className='text-2xl text-slate-50 font-semibold '>e-wallet</span>
                    </Link>
                    <div className={`md:flex flex-col md:flex-row md:items-center gap-4 font-medium ${!isMenuOpen ? 'hidden' : 'flex'}`}>
                        <NavLink to='/'
                            className={({ isActive }) => isActive ? 'text-blue-500' : ''}>
                            Home
                        </NavLink>
                        <NavLink to='/dashbord'
                            className={({ isActive }) => isActive ? 'text-blue-500' : ''}>
                            Dashbord
                        </NavLink>
                        {
                            user ?
                                <button onClick={handleLogOut} className='btn-red w-full md:w-auto'>
                                    Log Out
                                </button>
                                : <Link to='/login'>
                                    <button className='btn w-full md:w-auto'>
                                        Login
                                    </button>
                                </Link>
                        }
                        {/* <Link to='/login'>
                            <button className='btn w-full md:w-auto'>
                                Login
                            </button>
                        </Link> */}
                        {/* {
                            user &&
                            <div className='flex items-center gap-1'>
                                <small>{user.displayName}</small>
                                <button onClick={handleLogOut} className='btn-red w-full md:w-auto'>
                                    Log Out
                                </button>
                            </div>
                        } */}
                    </div>
                    <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='absolute top-1 right-0 cursor-pointer md:hidden'>

                        {
                            isMenuOpen ? <XMarkIcon className="h-6 w-6 text-slate-50" />
                                : <Bars2Icon className="h-6 w-6 text-slate-50" />
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
import React, { useContext, useState } from 'react';
import { EyeIcon, EyeSlashIcon} from '@heroicons/react/24/solid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {
    const [validationErr, setValidationErr] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        login(email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setValidationErr('');
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
                if (error.message === 'Firebase: Error (auth/user-not-found).') {
                    setValidationErr('User Not Found')
                } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
                    setValidationErr('Wrong Password');
                }
            })
    }

    return (
        <section className='custom-container py-10 flex flex-col gap-4'>
            <h1 className='text-center text-3xl font-semibold mb-4'>Login Now</h1>
            <form onSubmit={handleLogin} className='md:w-[400px] mx-auto flex flex-col gap-4 rounded-md p-4 md:p-8 bg-slate-900/50'>
                <label className='grid gap-1'>
                    <span>Email:</span>
                    <input type="email" name='email' className='w-full px-6 py-3 rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none'
                        placeholder='Enter Your Email'
                        required />
                </label>
                <label className='grid gap-1 relative'>
                    <span>Password:</span>
                    <input type={`${showPassword ? 'text' : 'password'}`} name='password' className='w-full px-6 py-3 rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none'
                        placeholder='Enter Your Password'
                        required />
                    <div onClick={() => setShowPassword(!showPassword)} className='cursor-pointer absolute top-10 right-2'>
                        {
                            showPassword ? 
                            <EyeIcon className='w-6 h-6 text-blue-500'/> 
                            : <EyeSlashIcon className='w-6 h-6 text-blue-500'/>
                        }
                    </div>
                </label>
                <span className='text-sm text-rose-500'>
                    {validationErr}
                </span>
                <button className='btn w-full'>
                    Login
                </button>
                <div className='grid gap-1 text-sm'>
                    <label className='flex items-center gap-1'>
                        <span>Forget password? </span>
                        <span className='text-blue-500 cursor-pointer'>reset now</span>
                    </label>
                    <label className='flex items-center gap-1'>
                        <span>Don't have an account?</span>
                        <Link to='/register'>
                            <span className='text-blue-500 cursor-pointer'>register now</span>
                        </Link>
                    </label>
                </div>
            </form>
        </section>
    );
};

export default Login;
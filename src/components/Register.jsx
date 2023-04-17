import React, { useContext, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const [validationErr, setValidationErr] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        setValidationErr('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        // validation
        if (!/(?=.*[A-Z])/.test(password)) {
            setValidationErr('Please give at least one uppercase!');
            return;
        }

        // register user
        register(email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserData(loggedUser, name);
                setValidationErr('');
                form.reset();
            })
            .catch((error) => {
                console.log(error.message);
            })

        // update user profile
        const updateUserData = (user, name) => {
            updateProfile(user, {
                displayName: name
            })
                .then(() => {
                    console.log('User data updated!');
                })
                .catch((error) => {
                    console.log(error.message);
                })
        }
    }

    return (
        <section className='custom-container py-10 flex flex-col gap-4'>
            <h1 className='text-center text-3xl font-semibold mb-4'>Register Now</h1>
            <form onSubmit={handleRegister} className='md:w-[400px] mx-auto flex flex-col gap-4 rounded-md p-4 md:p-8 bg-slate-900/50'>
                <label className='grid gap-1'>
                    <span>Name:</span>
                    <input type="text" name='name' className='w-full px-6 py-3 rounded-md bg-slate-900 border border-slate-700 focus:border-blue-500 focus:outline-none'
                        placeholder='Enter Your Name'
                        required />
                </label>
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
                                <EyeIcon className='w-6 h-6 text-blue-500' />
                                : <EyeSlashIcon className='w-6 h-6 text-blue-500' />
                        }
                    </div>
                </label>
                <span className='text-sm text-rose-500'>
                    {validationErr}
                </span>
                <button className='btn w-full'>
                    Register
                </button>
                <label className='flex items-center gap-1 text-sm'>
                    <span>Already have an account?</span>
                    <Link to='/login'>
                        <span className='text-blue-500 cursor-pointer'>login now</span>
                    </Link>
                </label>
            </form>
        </section>
    );
};

export default Register;
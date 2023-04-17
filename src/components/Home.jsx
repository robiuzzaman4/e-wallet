import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Home = () => {
    return (
        <section className='custom-container py-20'>
            <div className='grid place-items-center gap-4'>
                <h1 className='md:px-40 leading-snug md:leading-snug text-center text-4xl md:text-5xl font-bold'>Explore modern financial solution with <span className='text-gradient'>e-wallet</span></h1>
                <Link to='/login'>
                    <button className='btn'>
                        Get Started
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Home;
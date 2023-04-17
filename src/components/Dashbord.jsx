import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Dashbord = () => {
    const user = useContext(AuthContext);

    const expenses = [
        { id: 1, category: "Rent", amount: 1200 },
        { id: 2, category: "Groceries", amount: 500 },
        { id: 3, category: "Utilities", amount: 200 },
        { id: 4, category: "Transportation", amount: 100 },
        { id: 5, category: "Entertainment", amount: 50 }
    ];

    const investments = [
        { id: 1, type: "Stocks", amount: 5000 },
        { id: 2, type: "Bonds", amount: 3000 },
        { id: 3, type: "Mutual Funds", amount: 2000 },
        { id: 4, type: "Real Estate", amount: 10000 }
    ];

    const savingsgoals = [
        { id: 1, category: "Vacation", goal: 5000, current: 2500 },
        { id: 2, category: "Emergency Fund", goal: 10000, current: 6000 },
        { id: 3, category: "Retirement", goal: 50000, current: 10000 }
    ];


    return (
        <section className='custom-container py-20 grid gap-12'>

            <div className='bg-slate-900/50 w-full rounded-md p-4'>
                <h1 className='text-2xl font-medium'>Name: {user.user.displayName}</h1>
                <h2 className='text-xl text-slate-400 font-medium'>Email: {user.user.email}</h2>
            </div>

            <figure className='grid gap-2'>
                <h1 className='text-2xl font-medium'>Monthly Expenses:</h1>
                <div className='grid md:grid-cols-3 gap-4'>
                    {
                        expenses.map((expense) => {
                            return (
                                <div className='bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-md p-4 grid gap-2' key={expense.id}>
                                    <h1 className='text-xl'>${expense.amount}</h1>
                                    <p>Category: {expense.category}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </figure>
            <figure className='grid gap-2'>
                <h1 className='text-2xl font-medium'>Monthly Investments:</h1>
                <div className='grid md:grid-cols-3 gap-4'>
                    {
                        investments.map((investment) => {
                            return (
                                <div className='bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-md p-4 grid gap-2' key={investment.id}>
                                    <h1 className='text-xl'>${investment.amount}</h1>
                                    <p>Type: {investment.type}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </figure>
            <figure className='grid gap-2'>
                <h1 className='text-2xl font-medium'>Savings Goals:</h1>
                <div className='grid md:grid-cols-3 gap-4'>
                    {
                        savingsgoals.map((savingsgoal) => {
                            return (
                                <div className='bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-md p-4 grid gap-2' key={savingsgoal.id}>
                                    <h1 className='text-xl'>Goal: ${savingsgoal.goal}</h1>
                                    <h1 className='text-xl'>Current: ${savingsgoal.current}</h1>
                                    <p>Category: {savingsgoal.category}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </figure>

        </section>
    );
};

export default Dashbord;
import React from 'react';
import Checkout from './Checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const Payment = () => {
    const location = useLocation();
    const {price,classId} = location.state;
    return (
        <div className='p-5'>
            <h2 className='text-3xl'>Payment Section</h2>

            <Elements stripe={stripePromise}>
                <Checkout price={price} classId={classId}></Checkout>
            </Elements>
            
        </div>
    );
};

export default Payment;
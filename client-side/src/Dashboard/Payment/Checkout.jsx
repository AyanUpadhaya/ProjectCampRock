import React, { useEffect, useState } from 'react';
import {CardElement,Elements ,useElements, useStripe} from '@stripe/react-stripe-js'
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const Checkout = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxios();
    const [cardError,setCardError] = useState('');
    const [clientSecret,setClientSecret] = useState('')
    const {user} = useAuth();
    const [processing,setProcessing] = useState(false)
    const [transactionId,setTranSactionId] = useState('')
    const current = parseFloat(props.price);
    const price = current.toFixed(2);
    const total = parseFloat(price);
    const amount = total*100;
    const classId = props.classId;
    const navigate = useNavigate()
    
    const currentDate = new Date();
    const dateOptions ={
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const timeOptions ={
        hour:'numeric',
        minute:'numeric',
        second:'numeric',
        timezone:'short',
    }
    const formatDate = currentDate.toLocaleDateString(undefined,dateOptions);
    const formatTime = currentDate.toLocaleTimeString(undefined,timeOptions);
    const formatDateandTime = `${formatDate} ${formatTime}`;

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent',{price:amount})
        .then(res=>{
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
    },[price, axiosSecure])


    

    const handleSubmit = async(event)=>{
        event.preventDefault();

        //if stripe not loaded
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement);
        if(card == null){
            return
        }
        console.log(card)

        const { error,paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('[error]',error);
            setCardError(error)
        }else{
            setCardError('')
            // console.log('[PaymentMethod]',paymentMethod);
        }
        setProcessing(true)

        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName || 'anonymous',
                  email: user?.email || 'unknowm'
                },
              },
            },
          );

        if(confirmError){
            console.log(confirmError)
        }
        console.log(paymentIntent)
        setProcessing(false)
        if(paymentIntent.status === "succeeded"){
            setTranSactionId(paymentIntent.id)
            //Save payment info to the server
            const payment = {
                email:user?.email,
                classId,
                transactionId: paymentIntent.id,
                price:parseFloat(price),
                date:formatDateandTime
            }
            //posting payment information
            axiosSecure.post('/payments',payment)
            .then(res=>{
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({title:'Payment confirmed',icon:'success'})
                }

            })
            //update class collection
            axiosSecure.put(`/api/classes/${classId}`)
            .then(res=>{
                if(res.data.modifiedCount){
                    console.log('class updated')
                    // navigate('/dashboard/student')
                }
            })

            // removed from the My Selected Classes page.
            axiosSecure.delete(`/api/classes/${classId}`)
            .then(res=>{
               console.log(res.data)
            })

        }
    }
    
    return (
        <div>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <form onSubmit={handleSubmit} className='w-2/4 m-8 bg-white p-5 rounded-t-md'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret || processing} className='mt-3 btn-sm btn-secondary text-white'>
                    Pay
                </button>
            </form>
            {cardError&&<p className='text-red-600'>{cardError}</p>}
            {transactionId&&<p className='text-green-600'>Transaction completed, id:{transactionId}</p>}

        </div>
    );
};

export default Checkout;
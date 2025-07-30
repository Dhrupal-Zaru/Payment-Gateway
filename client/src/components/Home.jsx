import React from 'react'
import { loadStripe } from '@stripe/stripe-js';


const product = {
    id: 1,
    name: "T-Shirt",
    image: "https://m.media-amazon.com/images/I/71+x0eG5vQL._SY741_.jpg",
    qty: 1,
    price: 200,
    totPrice: 200
}
const stripePromise = loadStripe('pk_test_51RqU0OK3EgJ2WMPBt8Cvs84Eh9PuidoEKtnLdStxiDTl93WUaQKoZrtHb2cscrrRuor2nCL19r27rCvBzmPXMqFE00x8bH2h0r');


export default function Home() {
    const handleClick = async () => {

        const orderData = {
            email: 'abc@gmail.com',
            productName:product.name,
            amount: product.totPrice
        }
        const res = await fetch('http://localhost:4000/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        const data = await res.json();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.id });
    }
    return (
        <div className='app'>
            <h1>Payment</h1>
            <div className='items'>
                <div className='item'>
                    <img src={product.image} />
                    <h3>Name: {product.name}</h3>
                    <p>Qty: {product.qty}</p>
                    <p>Price: {product.price}</p>
                    <p>Total Price: {product.totPrice}</p>
                </div>
            </div>

            <button onClick={handleClick}>Pay</button>
        </div>
    )
}

import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

export default function Success() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    

    useEffect(() => {
        fetch(`http://localhost:4000/api/session/${sessionId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log("Order saved");
                }
            });
    }, [sessionId]);
    return (
        <div className='success'>
            <div>
                <h2>Payment Successfull</h2>
            </div>
        </div>
    )
}

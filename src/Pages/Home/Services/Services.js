import React, { useEffect, useState } from 'react';
import ServicesCart from './ServicesCart';

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://y-one-delta.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    return (
        <div className='py-10'>
            <div className='text-center'>
                <p className='text-2xl font-bold text-orange-600 mb-5'>
                    Service
                </p>
                <h2 className='text-4xl font-bold mb-5'>Our Service Area</h2>
                <p className='text-base font-normal mb-12'>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <ServicesCart key={service._id} service={service} ></ServicesCart>)
                }
            </div>
        </div>
    );
};

export default Services;
import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ServicesCart = ({ service }) => {
    const { title, img, price, _id} = service;
    return (

        <div className="card  bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className='flex items-center justify-between'>
                    <p className='text-2xl text-orange-600 font-semibold'>Price: ${price}</p>
                    <Link to={`/checkout/${_id}`}><FaArrowRight className='cursor-pointer text-orange-600'></FaArrowRight></Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesCart;
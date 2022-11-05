import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const CheckOut = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const { _id, title, price } = service;

    const hadlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastname.value}`;
        const phone = form.phone.value;
        const email = user?.email || 'UnRegistered';
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }



        fetch('https://y-one-delta.vercel.app/orders', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    form.reset();
                    toast.success('Order placed successfully', { autoClose: '1500' });
                }
            })
            .catch(er => console.error(er))


    }


    return (
        <section className="p-6 dark:bg-gray-200 dark:text-gray-50">

            <h2 className='text-3xl text-black'>You are about to Order: {title}</h2>
            <h4 className='text-2xl text-black'>Price: ${price}</h4>

            <form onSubmit={hadlePlaceOrder} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">

                <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-200">
                    <div className="grid grid-cols-6 gap-6 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <input type="text" name="firstName" id="firstname" required placeholder="First Name" className="w-full  px-4 py-3 rounded-md dark:border-gray-700 dark:text-gray-900 focus:dark:border-violet-400" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <input type="text" name="lastname" id="lastName" required placeholder="Last Name" className="w-full  px-4 py-3 rounded-md dark:border-gray-700 dark:text-gray-900 focus:dark:border-violet-400" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <input type="text" name="phone" id="phone" required placeholder="Your Phone" className="w-full  px-4 py-3 rounded-md dark:border-gray-700 dark:text-gray-900 focus:dark:border-violet-400" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <input type="email" name="email" id="email" defaultValue={user?.email} placeholder="Your Email" className="w-full  px-4 py-3 rounded-md  dark:border-gray-700 dark:text-gray-900 focus:dark:border-violet-400" readOnly />
                        </div>
                        <div className="col-span-full">
                            <textarea id="bio" name='message' rows='5' required placeholder="Your Message" className="w-full px-3 py-3 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" spellcheck="false"></textarea>
                        </div>
                    </div>
                </fieldset>
                <div className='px-6'>
                    <input className="block w-full p-3 text-center rounded-lg dark:text-white dark:bg-orange-600 font-semibold text-xl" type="submit" value="Order Confirm" />
                </div>
            </form>
        </section>
    );
};

export default CheckOut;
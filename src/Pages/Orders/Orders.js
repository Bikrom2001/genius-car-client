import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';
import { toast } from 'react-toastify';

const Orders = () => {

    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([])


    useEffect(() => {
        fetch(`https://y-one-delta.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            })
            .then(data => setOrders(data))
    }, [user?.email, logOut])

    const handleDelete = id => {
        const proceed = window.confirm('are you sure, you want to canncel this order')
        if (proceed) {
            fetch(`https://y-one-delta.vercel.app/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.success('Delete success', { autoClose: '1000' });
                        const remaining = orders.filter(odr => odr._id !== id);
                        setOrders(remaining);
                    }
                })
        }

    }


    const handleStatusUpdate = id => {
        fetch(`https://y-one-delta.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id);
                    const approveing = orders.find(odr => odr._id === id);
                    approveing.status = 'Approved';
                    const newOrders = [approveing, ...remaining];
                    setOrders(newOrders);
                }
            })
    }




    return (
        <div className='py-12'>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow key={order._id} handleDelete={handleDelete} order={order} handleStatusUpdate={handleStatusUpdate}></OrderRow>)
                        }
                    </tbody>
                </table>
                <hr />
            </div>
        </div>
    );
};

export default Orders;
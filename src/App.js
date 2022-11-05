import {RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {



  return (
    <div className='max-w-screen-xl mx-auto'>
       <ToastContainer position="top-center" />
        <RouterProvider router={router}>
        </RouterProvider>
    </div>
  );
}

export default App;

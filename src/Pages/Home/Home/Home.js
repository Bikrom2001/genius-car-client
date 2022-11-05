import React from 'react';
import About from '../About/About';
import Bannaer from '../Bannaer/Bannaer';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
           <Bannaer></Bannaer>
           <About></About>
           <Services></Services>
        </div>
    );
};

export default Home;